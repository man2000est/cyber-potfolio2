import { motion } from 'framer-motion'
import { FaFish, FaBolt, FaTerminal } from 'react-icons/fa'

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
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
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
          ))}
        </div>
      </div>
      <style>{`
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .project-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px; display: flex; flex-direction: column; position: relative; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .project-card:hover { border-color: rgba(34,211,238,0.3); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .project-card:hover::before { opacity: 1; }
        .p-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .p-icon {
          width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          background: var(--accent-glow); border-radius: 12px; color: var(--accent); font-size: 1.25rem;
        }
        .badge {
          font-size: 0.7rem; font-family: var(--mono); padding: 4px 10px; background: var(--bg);
          border: 1px solid var(--border); border-radius: 20px; color: var(--text-dim);
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .project-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 12px; line-height: 1.4; }
        .project-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.65; flex: 1; margin-bottom: 20px; }
        .tech { display: flex; flex-wrap: wrap; gap: 8px; }
        .tech span {
          font-size: 0.75rem; font-family: var(--mono); color: var(--accent);
          background: var(--accent-glow); padding: 4px 10px; border-radius: 4px;
        }
        @media (max-width: 960px) { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
