import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { FaFish, FaBolt, FaTerminal } from 'react-icons/fa'
import AnimatedHeading from './AnimatedHeading'

const projects = [
  {
    icon: <FaFish />,
    badge: 'ML / Security',
    title: 'Phishing Detection Using Autoencoders & Text Analytics',
    desc: 'Designed and implemented an anomaly-based detection system using autoencoders, achieving 98% accuracy in identifying phishing attempts.',
    tech: ['Python', 'Autoencoders', 'NLP', 'Anomaly Detection'],
  },
  {
    icon: <FaBolt />,
    badge: 'ML / Network',
    title: 'HTTP Flood Attack Detection Using Machine Learning',
    desc: 'Developed a clustering-based detection model that reduced false positives by 20% and improved overall threat identification speed.',
    tech: ['Python', 'Clustering', 'Network Security', 'ML'],
  },
  {
    icon: <FaTerminal />,
    badge: 'Tooling',
    title: 'Lite Script — Cybersecurity Utility Tool',
    desc: 'Built a Python utility simplifying common cybersecurity tasks including cryptography, automation, and ethical hacking simulations.',
    tech: ['Python', 'Cryptography', 'Automation', 'Bash'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">04</span>
          <AnimatedHeading text="Featured Projects" className="section-title" />
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
      <style>{`
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 30px; display: flex; flex-direction: column; position: relative; overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 0.3s, box-shadow 0.4s cubic-bezier(0.32,0.72,0,1), transform 0.4s cubic-bezier(0.32,0.72,0,1);
        }
        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.16), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .project-card:hover::after { opacity: 1; }
        .project-card:hover { border-color: rgba(34,211,238,0.35); box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 55px rgba(0,0,0,0.45), 0 0 30px rgba(34,211,238,0.1); }
        .p-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
        .p-icon {
          width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          background: var(--accent-glow); border-radius: 14px; color: var(--accent); font-size: 1.25rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .badge {
          font-size: 0.68rem; font-family: var(--mono); padding: 4px 11px; background: var(--bg);
          border: 1px solid var(--border); border-radius: 999px; color: var(--text-dim);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .project-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; line-height: 1.4; letter-spacing: -0.2px; }
        .project-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; flex: 1; margin-bottom: 22px; max-width: 42ch; }
        .tech { display: flex; flex-wrap: wrap; gap: 8px; }
        .tech span {
          font-size: 0.72rem; font-family: var(--mono); color: var(--accent);
          background: var(--accent-glow); padding: 5px 11px; border-radius: 999px;
        }
        @media (max-width: 960px) { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

function ProjectCard({ p, i }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotX = useSpring(py, { stiffness: 200, damping: 20 })
  const rotY = useSpring(px, { stiffness: 200, damping: 20 })

  const canTilt = typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
    if (!canTilt) return
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    px.set(relX * 12)
    py.set(relY * -12)
  }

  const handleMouseLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
    >
      <div className="p-header">
        <div className="p-icon">{p.icon}</div>
        <span className="badge">{p.badge}</span>
      </div>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
      <div className="tech">
        {p.tech.map((t) => <span key={t}>{t}</span>)}
      </div>
    </motion.article>
  )
}
