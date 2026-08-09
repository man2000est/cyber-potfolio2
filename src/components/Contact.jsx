import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedinIn, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

const methods = [
  { icon: <FaEnvelope />, label: 'Email', value: 'mmnabrwi@gmail.com', href: 'mailto:mmnabrwi@gmail.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+962 78 132 5424', href: 'tel:+962781325424' },
  { icon: <FaLinkedinIn />, label: 'LinkedIn', value: 'mohammed-nabrawi', href: 'http://www.linkedin.com/in/mohammed-nabrawi-971784275' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Amman, Jordan', href: null },
]

export default function Contact() {
  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">06</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
        </div>
        <div className="contact-wrap">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="intro">
              I'm currently open to junior cybersecurity roles, SOC analyst positions,
              and opportunities to grow in threat detection and incident response.
              Let's connect.
            </p>
            <div className="methods">
              {methods.map((m) => {
                const Tag = m.href ? 'a' : 'div'
                return (
                  <Tag
                    key={m.label}
                    href={m.href || undefined}
                    target={m.href?.startsWith('http') ? '_blank' : undefined}
                    rel={m.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="method"
                  >
                    <div className="m-icon">{m.icon}</div>
                    <div>
                      <span className="m-label">{m.label}</span>
                      <span className="m-value">{m.value}</span>
                    </div>
                  </Tag>
                )
              })}
            </div>
          </motion.div>
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3>Ready to secure the future?</h3>
            <p>Whether it's a full-time role, internship, or collaboration — I'd love to hear from you.</p>
            <a href="mailto:mmnabrwi@gmail.com" className="btn btn-primary btn-large">
              <FaPaperPlane /> Send Email
            </a>
          </motion.div>
        </div>
      </div>
      <style>{`
        .contact-wrap { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: start; }
        .intro { color: var(--text-muted); font-size: 1.05rem; margin-bottom: 32px; line-height: 1.7; }
        .methods { display: flex; flex-direction: column; gap: 12px; }
        .method {
          display: flex; align-items: center; gap: 16px; padding: 16px 20px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 8px; transition: 0.25s;
        }
        .method:hover { border-color: rgba(34,211,238,0.3); background: var(--surface-hover); }
        .m-icon {
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: var(--accent-glow); border-radius: 10px; color: var(--accent); font-size: 1rem; flex-shrink: 0;
        }
        .m-label { display: block; font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .m-value { font-size: 0.95rem; font-weight: 500; }
        .cta-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 40px 32px; text-align: center;
        }
        .cta-card h3 { font-size: 1.3rem; margin-bottom: 12px; }
        .cta-card p { color: var(--text-muted); margin-bottom: 28px; font-size: 0.95rem; }
        @media (max-width: 960px) { .contact-wrap { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
