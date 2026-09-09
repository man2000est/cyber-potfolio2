import { useEffect, useRef, useCallback } from 'react'

// Ported from a warping-grid canvas concept: a fine technical grid that bends
// toward the cursor and ripples outward on click. Re-themed to this site's own
// cyan/violet accent tokens (not the original's blue) so it reads as part of
// the same brand rather than a bolted-on effect, and kept transparent so the
// existing ambient glow shows through instead of being covered by a flat fill.
const CELL_SIZE = 60
const INFLUENCE_RADIUS = 220
const MAX_WARP = 18
const LERP_SPEED = 0.08

const LINE_BASE = { r: 148, g: 163, b: 184, a: 0.07 }
const LINE_ACTIVE = { r: 34, g: 211, b: 238, a: 0.55 }
const NODE_BASE = { r: 148, g: 163, b: 184, a: 0.15 }
const NODE_ACTIVE = { r: 34, g: 211, b: 238, a: 0.9 }
const GLOW_RGB = '34, 211, 238'
const RIPPLE_RGB = '124, 92, 255'

function lerpN(a, b, t) { return a + (b - a) * t }
function lerpColor(base, active, t) {
  const r = Math.round(lerpN(base.r, active.r, t))
  const g = Math.round(lerpN(base.g, active.g, t))
  const b = Math.round(lerpN(base.b, active.b, t))
  const a = lerpN(base.a, active.a, t)
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}

export default function KineticGrid() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const targetMouseRef = useRef({ x: -9999, y: -9999 })
  const ripplesRef = useRef([])
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const getWarpedPoint = useCallback((gx, gy, col, row, mouse, ripples, cols, rows) => {
    const edgeMargin = 1.5
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1)
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1)
    const pinFactor = colPin * colPin * rowPin * rowPin

    const dx = gx - mouse.x
    const dy = gy - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor

    let rx = 0, ry = 0
    for (const r of ripples) {
      const rdx = gx - r.x, rdy = gy - r.y
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
      const waveWidth = 50
      const diff = rdist - r.radius
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 14 * pinFactor
        const angle = Math.atan2(rdy, rdx)
        const sign = diff < 0 ? -1 : 1
        rx += Math.cos(angle) * strength * sign * -1
        ry += Math.sin(angle) * strength * sign * -1
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
      const t = dist / INFLUENCE_RADIUS
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60)
      const warpAmt = eased * MAX_WARP * pinFactor
      const angle = Math.atan2(dy, dx)
      return {
        pt: { x: gx - Math.cos(angle) * warpAmt + rx, y: gy - Math.sin(angle) * warpAmt + ry },
        proximity,
      }
    }
    return { pt: { x: gx + rx, y: gy + ry }, proximity }
  }, [])

  const draw = useCallback((now) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w: W, h: H } = sizeRef.current
    const mouse = mouseRef.current
    const ripples = ripplesRef.current

    ctx.clearRect(0, 0, W, H)

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      const age = (now - r.born) / 1000
      r.radius = Math.max(0, age * 380)
      r.opacity = Math.max(0, 1 - age * 1.2)
      if (r.opacity <= 0) ripples.splice(i, 1)
    }

    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1
    const cellW = W / (cols - 1)
    const cellH = H / (rows - 1)

    const pts = [], prox = []
    for (let row = 0; row < rows; row++) {
      pts[row] = []; prox[row] = []
      for (let col = 0; col < cols; col++) {
        const { pt, proximity } = getWarpedPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows)
        pts[row][col] = pt
        prox[row][col] = proximity
      }
    }

    const drawSeg = (p1, p2, pr1, pr2) => {
      const avg = (pr1 + pr2) / 2
      const t = avg * avg * (3 - 2 * avg)
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = lerpColor(LINE_BASE, LINE_ACTIVE, t)
      ctx.lineWidth = lerpN(0.7, 1.3, t)
      ctx.stroke()
    }

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols - 1; col++)
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1])
    for (let col = 0; col < cols; col++)
      for (let row = 0; row < rows - 1; row++)
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col])

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col]
        const pr = prox[row][col]
        const t = pr * pr * (3 - 2 * pr)
        const r = lerpN(1.4, 2.6, t)

        if (t > 0.3) {
          const glowR = r + lerpN(0, 5, (t - 0.3) / 0.7)
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR)
          grd.addColorStop(0, `rgba(${GLOW_RGB},${(t * 0.25).toFixed(3)})`)
          grd.addColorStop(1, `rgba(${GLOW_RGB},0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = lerpColor(NODE_BASE, NODE_ACTIVE, t)
        ctx.fill()
      }
    }

    for (const r of ripples) {
      const safeRadius = Math.max(0, r.radius)
      ctx.beginPath()
      ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${RIPPLE_RGB},${(r.opacity * 0.3).toFixed(3)})`
      ctx.lineWidth = 1.3
      ctx.stroke()
    }
  }, [getWarpedPoint])

  const animate = useCallback((now) => {
    const m = mouseRef.current
    const t = targetMouseRef.current
    m.x = lerpN(m.x, t.x, LERP_SPEED)
    m.y = lerpN(m.y, t.y, LERP_SPEED)
    draw(now)
    rafRef.current = requestAnimationFrame(animate)
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const isNarrow = window.innerWidth < 720
    // Skip the interactive warp entirely on touch/narrow screens — keeps
    // scrolling smooth and there's no cursor to warp toward anyway.
    if (isCoarse || isNarrow) return

    const ctx = canvas.getContext('2d')
    let dpr

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w, h }
    }
    setSize()
    window.addEventListener('resize', setSize)

    if (reduceMotion) {
      draw(performance.now())
      return () => window.removeEventListener('resize', setSize)
    }

    const onMouseMove = (e) => { targetMouseRef.current = { x: e.clientX, y: e.clientY } }
    const onClick = (e) => {
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, opacity: 1, born: performance.now() })
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate, draw])

  return (
    <>
      <canvas ref={canvasRef} className="kinetic-grid-bg" aria-hidden="true" />
      <style>{`
        .kinetic-grid-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          display: block;
        }
        @media (max-width: 720px), (hover: none) {
          .kinetic-grid-bg { display: none; }
        }
      `}</style>
    </>
  )
}
