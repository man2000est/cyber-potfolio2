import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import Magnetic from './Magnetic'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="back-to-top"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        >
          <Magnetic strength={0.4}>
            <button onClick={scrollTop} aria-label="Back to top">
              <FaArrowUp />
            </button>
          </Magnetic>
          <style>{`
            .back-to-top { position: fixed; bottom: 28px; right: 28px; z-index: 500; }
            .back-to-top button {
              width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--border);
              background: var(--surface); color: var(--accent); display: flex; align-items: center;
              justify-content: center; font-size: 1rem; cursor: pointer;
              box-shadow: 0 8px 24px rgba(0,0,0,0.35);
              transition: border-color 0.25s, box-shadow 0.25s;
            }
            .back-to-top button:hover {
              border-color: var(--accent);
              box-shadow: 0 0 24px rgba(34,211,238,0.4);
            }
            @media (max-width: 720px) {
              .back-to-top { bottom: 18px; right: 18px; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
