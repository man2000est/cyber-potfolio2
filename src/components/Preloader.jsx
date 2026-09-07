import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let p = 0
    let timer
    const tick = () => {
      p += Math.random() * 18 + 6
      if (p >= 100) p = 100
      setProgress(p)
      if (p < 100) {
        timer = setTimeout(tick, 120)
      } else {
        timer = setTimeout(() => setDone(true), 350)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="preloader-inner">
            <span className="preloader-tag">INITIALIZING PORTFOLIO</span>
            <div className="preloader-bar"><span style={{ width: `${progress}%` }} /></div>
            <span className="preloader-count">{Math.floor(progress)}%</span>
          </div>
          <style>{`
            .preloader {
              position: fixed; inset: 0; z-index: 100000; background: var(--bg);
              display: flex; align-items: center; justify-content: center;
            }
            .preloader-inner { display: flex; flex-direction: column; align-items: center; gap: 18px; }
            .preloader-tag { font-family: var(--mono); font-size: 0.75rem; letter-spacing: 4px; color: var(--text-dim); }
            .preloader-bar { width: 220px; height: 2px; background: var(--border); position: relative; overflow: hidden; }
            .preloader-bar span {
              position: absolute; inset: 0; display: block;
              background: linear-gradient(90deg, var(--accent), #7c5cff);
              box-shadow: 0 0 12px var(--accent); transition: width 0.15s ease;
            }
            .preloader-count { font-family: var(--mono); font-size: 0.8rem; color: var(--accent); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
