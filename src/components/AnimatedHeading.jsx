import { motion } from 'framer-motion'

// Splits a heading into words and reveals them with a staggered
// blur-to-focus + slide-up cascade as it scrolls into view.
export default function AnimatedHeading({ text, className = '', as = 'h2' }) {
  const words = text.split(' ')
  const Tag = motion[as] || motion.h2

  return (
    <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
