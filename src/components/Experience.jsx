import { motion } from 'framer-motion'
import { FaBuilding } from 'react-icons/fa'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="timeline">
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="marker" />
            <div className="content">
              <div className="header">
                <h3>Technical Support Specialist</h3>
                <span className="date">Jun 2025 – Present</span>
              </div>
              <p className="company"><FaBuilding /> Hittien College</p>
              <ul>
                <li>Maintained and troubleshot PC hardware and network infrastructure (switches and routers) across the organization, reducing downtime.</li>
                <li>Administered and prepared technical certification exams for staff.</li>
                <li>Resolved hardware and software issues via remote and on-site support, ensuring minimal disruption to operations.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before {
          content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px;
          background: linear-gradient(to bottom, var(--accent), var(--border));
        }
        .timeline-item { position: relative; margin-bottom: 40px; }
        .marker {
          position: absolute; left: -32px; top: 6px; width: 16px; height: 16px; border-radius: 50%;
          background: var(--bg); border: 3px solid var(--accent);
          box-shadow: 0 0 12px rgba(34,211,238,0.4);
        }
        .content {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px; transition: border-color 0.25s;
        }
        .content:hover { border-color: rgba(34,211,238,0.3); }
        .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
        .header h3 { font-size: 1.15rem; font-weight: 600; }
        .date {
          font-family: var(--mono); font-size: 0.8rem; color: var(--accent);
          background: var(--accent-glow); padding: 4px 12px; border-radius: 20px; white-space: nowrap;
        }
        .company { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px; display: flex; align-items: center; gap: 6px; }
        .company svg { color: var(--text-dim); }
        .content li {
          position: relative; padding-left: 18px; margin-bottom: 10px;
          color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;
        }
        .content li::before { content: '▹'; position: absolute; left: 0; color: var(--accent); }
      `}</style>
    </section>
  )
}
