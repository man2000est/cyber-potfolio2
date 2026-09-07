import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap, FaCertificate, FaLock, FaUnlock } from 'react-icons/fa'
import Magnetic from './Magnetic'
import AnimatedHeading from './AnimatedHeading'

const certs = [
  { name: 'Certified Ethical Hacker (CEH)', issuer: 'The Hope International Academy' },
  { name: 'SEC450 / GSOC Prep', issuer: 'Netriders Academy' },
  { name: 'Foundation Level Threat Intelligence Analyst', issuer: 'arcX' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'Incident Handling Process', issuer: 'Hack The Box' },
  { name: 'NDG Linux Unhatched', issuer: 'Cisco Networking Academy' },
  { name: 'Professional Development for Tech Roles', issuer: 'Correlation One' },
]

const REQUIRED_CLICKS = 5

export default function Education() {
  const [clicks, setClicks] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  const handleDecryptClick = () => {
    if (unlocked) return
    const next = clicks + 1
    setClicks(next)
    if (next >= REQUIRED_CLICKS) {
      setTimeout(() => setUnlocked(true), 300)
    }
  }

  const remaining = REQUIRED_CLICKS - clicks

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">05</span>
          <AnimatedHeading text="Education & Certifications" className="section-title" />
          <div className="section-line" />
        </div>

        <div className="edu-wrapper">
          <div className={`edu-content ${unlocked ? 'unlocked' : 'locked'}`}>
            <div className="edu-grid">
              <motion.div
                className="edu-card"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="edu-icon"><FaGraduationCap /></div>
                <h3>B.Sc. in Cybersecurity</h3>
                <p className="school">Tafila Technical University, Jordan</p>
                <p className="meta">Oct 2024 • GPA: 81.4%</p>
              </motion.div>

              <motion.div
                className="certs-card"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3><FaCertificate /> Certifications</h3>
                <ul>
                  {certs.map((c) => (
                    <li key={c.name}>
                      <span className="cert-name">{c.name}</span>
                      <span className="cert-issuer">{c.issuer}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {!unlocked && (
              <motion.div
                className="lock-overlay"
                onClick={handleDecryptClick}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <div className="lock-box">
                  <Magnetic strength={0.4}>
                    <div className="lock-icon">
                      {clicks >= REQUIRED_CLICKS ? <FaUnlock /> : <FaLock />}
                    </div>
                  </Magnetic>
                  <h3>Content Encrypted</h3>
                  <p className="lock-sub">
                    {remaining > 0
                      ? `Click ${remaining} more time${remaining > 1 ? 's' : ''} to decrypt`
                      : 'Decrypting...'}
                  </p>

                  <div className="progress-dots">
                    {Array.from({ length: REQUIRED_CLICKS }).map((_, i) => (
                      <span
                        key={i}
                        className={`dot ${i < clicks ? 'filled' : ''}`}
                      />
                    ))}
                  </div>

                  <p className="hint">Click anywhere on this panel</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .edu-wrapper {
          position: relative;
          min-height: 420px;
        }

        .edu-content {
          transition: filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease;
        }

        .edu-content.locked {
          filter: blur(10px);
          opacity: 0.35;
          pointer-events: none;
          user-select: none;
          transform: scale(0.98);
        }

        .edu-content.unlocked {
          filter: blur(0);
          opacity: 1;
          transform: scale(1);
        }

        .lock-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 14, 23, 0.55);
          backdrop-filter: blur(4px);
          border-radius: var(--radius);
          cursor: pointer;
          z-index: 10;
          border: 1px solid rgba(34, 211, 238, 0.15);
        }

        .lock-box {
          text-align: center;
          padding: 40px 32px;
          max-width: 340px;
        }

        .lock-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-glow);
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: 50%;
          color: var(--accent);
          font-size: 1.8rem;
          transition: transform 0.2s;
        }

        .lock-overlay:active .lock-icon {
          transform: scale(0.92);
        }

        .lock-box h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .lock-sub {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
          font-family: var(--mono);
        }

        .progress-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .progress-dots .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--border);
          border: 1px solid var(--border);
          transition: all 0.25s;
        }

        .progress-dots .dot.filled {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }

        .hint {
          font-size: 0.8rem;
          color: var(--text-dim);
          font-family: var(--mono);
        }

        .edu-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; }
        .edu-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 32px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .edu-icon {
          width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;
          background: var(--accent-glow); border-radius: 16px; color: var(--accent); font-size: 1.5rem; margin-bottom: 20px;
        }
        .edu-card h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .school { color: var(--text-muted); margin-bottom: 8px; }
        .meta { font-family: var(--mono); font-size: 0.85rem; color: var(--accent); }
        .certs-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 28px 32px;
        }
        .certs-card h3 { font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .certs-card h3 svg { color: var(--accent); }
        .certs-card li {
          display: flex; justify-content: space-between; align-items: baseline; gap: 16px;
          padding: 12px 0; border-bottom: 1px solid var(--border); flex-wrap: wrap;
        }
        .certs-card li:last-child { border-bottom: none; }
        .cert-name { font-weight: 500; font-size: 0.95rem; }
        .cert-issuer { font-size: 0.8rem; color: var(--text-dim); font-family: var(--mono); }

        @media (max-width: 960px) {
          .edu-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}