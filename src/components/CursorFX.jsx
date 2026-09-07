import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, .btn, input, textarea, .lock-overlay, .role-mini-card, .project-card, .nav-links a, .logo'

export default function CursorFX() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches || reduceMotion) {
      setTouch(true)
      return
    }

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move)

    let raf
    const render = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(render)
    }
    render()

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) setHovering(false)
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (touch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hover' : ''}`} />
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
          border-radius: 50%; will-change: transform;
        }
        .cursor-dot {
          width: 6px; height: 6px; background: var(--accent);
        }
        .cursor-ring {
          width: 34px; height: 34px; border: 1px solid var(--accent);
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.35);
        }
        .cursor-ring.hover {
          width: 56px; height: 56px;
          background: rgba(34, 211, 238, 0.08);
        }
        @media (max-width: 720px) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
    </>
  )
}
