import { motion } from 'framer-motion'
import { FaDesktop, FaUserSecret, FaNetworkWired, FaSearch, FaCode, FaBrain, FaGlobe, FaWifi, FaFingerprint, FaCloud } from 'react-icons/fa'
import AnimatedHeading from './AnimatedHeading'

const categories = [
  { icon: <FaDesktop />, title: 'SIEM & SOC', tags: ['Splunk', 'LogRhythm', 'The Hive', 'Elasticsearch'] },
  { icon: <FaUserSecret />, title: 'Offensive Security', tags: ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark'] },
  { icon: <FaNetworkWired />, title: 'Network Analysis', tags: ['Snort', 'Zeek', 'NetworkMiner', 'Brim'] },
  { icon: <FaSearch />, title: 'Forensics & IR', tags: ['KAPE', 'Digital Forensics', 'Incident Handling'] },
  { icon: <FaCode />, title: 'Programming', tags: ['Python', 'Bash', 'Automation', 'Cryptography'] },
  { icon: <FaBrain />, title: 'Machine Learning', tags: ['Anomaly Detection', 'Clustering', 'Autoencoders'] },
]

const protocols = [
  { icon: <FaGlobe />, label: 'TCP/IP' },
  { icon: <FaWifi />, label: 'Wireless Security' },
  { icon: <FaCloud />, label: 'AWS Cloud' },
  { icon: <FaFingerprint />, label: 'Network Forensics' },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02</span>
          <AnimatedHeading text="Technical Skills" className="section-title" />
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              className="skill-card"
              initial={{ opacity: 0, y: 30, scale: 0.94, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="skill-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <div className="tags">
                {c.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="protocols">
          <h4>Protocols & Platforms</h4>
          <div className="proto-tags">
            {protocols.map((p) => (
              <span key={p.label}>{p.icon} {p.label}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .skill-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 24px; transition: border-color 0.3s, box-shadow 0.3s;
          animation: idleFloat 5s ease-in-out infinite;
        }
        @keyframes idleFloat {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -6px; }
        }
        .skill-card:hover { border-color: rgba(34,211,238,0.4); box-shadow: 0 16px 36px rgba(0,0,0,0.35), 0 0 24px rgba(34,211,238,0.12); }
        .skill-icon {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: var(--accent-glow); border-radius: 10px; color: var(--accent); font-size: 1.1rem; margin-bottom: 16px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .skill-card:hover .skill-icon { transform: scale(1.15) rotate(-6deg); }
        .skill-card h3 { font-size: 1rem; margin-bottom: 14px; font-weight: 600; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tags span {
          font-size: 0.8rem; padding: 5px 12px; background: var(--bg); border: 1px solid var(--border);
          border-radius: 20px; color: var(--text-muted); font-family: var(--mono); transition: 0.2s;
        }
        .tags span:hover { border-color: var(--accent); color: var(--accent); }
        .protocols { text-align: center; }
        .protocols h4 {
          font-size: 0.9rem; color: var(--text-dim); margin-bottom: 16px; font-weight: 500;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .proto-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        .proto-tags span {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
          font-size: 0.9rem; color: var(--text-muted); transition: 0.25s;
        }
        .proto-tags span:hover { border-color: var(--accent); color: var(--accent); }
        .proto-tags svg { color: var(--accent); }
        @media (max-width: 960px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 720px) { .skills-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}