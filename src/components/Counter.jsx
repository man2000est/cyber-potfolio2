import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const numeric = parseFloat(value)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, numeric])

  const formatted = Number.isInteger(numeric) ? Math.round(display) : display.toFixed(1)

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  )
}
