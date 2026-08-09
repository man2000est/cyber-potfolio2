import { motion } from 'framer-motion'
import { FaShieldAlt, FaCheck } from 'react-icons/fa'

const focuses = [
  'SIEM & SOC Operations',
  'Threat Detection & Analysis',
  'Incident Response',
  'Network Security & Forensics',
  'Ethical Hacking',
  'Cloud Security (AWS)',
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>
              Dedicated Junior Cybersecurity Analyst with a solid foundation in{' '}
              <strong>threat detection</strong>, <strong>incident response</strong>, and{' '}
              <strong>network security</strong>. Hands-on experience with industry SIEM platforms
              including Splunk, LogRhythm, and Elasticsearch.
            </p>
            <p>
              Proven ability to deliver technical training in ethical hacking, digital forensics,
              and cloud computing. Currently advancing expertise through SEC450/GSOC preparation,
              with a drive to contribute to resilient security operations.
            </p>
            <div className="stats">
              <div className="stat"><span className="num">81.4%</span><span className="label">GPA</span></div>
              <div className="stat"><span className="num">7+</span><span className="label">Certifications</span></div>
              <div className="stat"><span className="num">3</span><span className="label">Key Projects</span></div>
            </div>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3><FaShieldAlt /> Focus Areas</h3>
            <ul>
              {focuses.map((f) => (
                <li key={f}><FaCheck /> {f}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
        .about-text p { color: var(--text-muted); margin-bottom: 16px; font-size: 1.05rem; }
        .stats { display: flex; gap: 32px; margin-top: 32px; }
        .stat { display: flex; flex-direction: column; }
        .num { font-size: 1.75rem; font-weight: 700; color: var(--accent); font-family: var(--mono); }
        .label { font-size: 0.85rem; color: var(--text-dim); margin-top: 4px; }
        .about-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px; position: relative; overflow: hidden;
        }
        .about-card h3 { font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .about-card h3 svg { color: var(--accent); }
        .about-card li {
          display: flex; align-items: center; gap: 12px; padding: 10px 0;
          color: var(--text-muted); font-size: 0.95rem; border-bottom: 1px solid var(--border);
        }
        .about-card li:last-child { border-bottom: none; }
        .about-card li svg { color: var(--success); font-size: 0.8rem; flex-shrink: 0; }
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr; }
          .stats { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
