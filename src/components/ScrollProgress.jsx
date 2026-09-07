import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress">
      <span style={{ width: `${pct}%` }} />
      <style>{`
        .scroll-progress {
          position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 9998;
        }
        .scroll-progress span {
          display: block; height: 100%;
          background: linear-gradient(90deg, var(--accent), #7c5cff);
          box-shadow: 0 0 10px var(--accent);
          transition: width 0.1s linear;
        }
      `}</style>
    </div>
  )
}
