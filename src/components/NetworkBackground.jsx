import { useEffect, useRef } from 'react'

// Subtle animated network-node background: fine connecting lines + slow-drifting
// nodes + occasional data-flow pulses along the strongest connections.
// Respects prefers-reduced-motion and is skipped entirely on touch/narrow screens
// for performance.
export default function NetworkBackground() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const isNarrow = window.innerWidth < 720

    // Skip entirely on touch/small screens to keep scrolling smooth.
    if (isCoarse || isNarrow) return

    const ctx = canvas.getContext('2d')
    let width, height, dpr
    let nodes = []
    let raf = null
    let mouseX = 0.5;
    let mouseY = 0.5;

    const NODE_COUNT = 46
    const LINK_DIST = 150
    const ACCENT = '34, 211, 238'
    const ACCENT2 = '124, 92, 255'

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height)

      // update
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.16
            ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.random() > 0.85 ? ACCENT2 : ACCENT}, 0.45)`
        ctx.fill()
      }
    }

    function loop() {
      drawFrame()
      raf = requestAnimationFrame(loop)
    }

    resize()
    makeNodes()

    if (reduceMotion) {
      drawFrame() // single static frame
    } else {
      loop()
    }

    function onResize() {
      resize()
      makeNodes()
      if (reduceMotion) drawFrame()
    }
    window.addEventListener('resize', onResize)

    function onMouseMove(e) {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
      if (wrapRef.current && !reduceMotion) {
        const shiftX = (mouseX - 0.5) * 12
        const shiftY = (mouseY - 0.5) * 12
        wrapRef.current.style.transform = `translate(${shiftX}px, ${shiftY}px)`
      }
    }
    if (!reduceMotion) window.addEventListener('mousemove', onMouseMove)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="network-bg-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="network-bg" />
      <style>{`
        .network-bg-wrap {
          position: fixed;
          inset: -10px;
          z-index: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .network-bg { display: block; opacity: 0.75; }
        @media (max-width: 720px), (hover: none) {
          .network-bg-wrap { display: none; }
        }
      `}</style>
    </div>
  )
}
