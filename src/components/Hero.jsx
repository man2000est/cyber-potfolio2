import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaFolderOpen } from 'react-icons/fa'

const roles = [
  'Junior Cybersecurity Analyst',
  'Threat Detection Specialist',
  'SIEM & SOC Enthusiast',
  'Ethical Hacker in Training',
]

export default function Hero() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    const speed = deleting ? 40 : 70
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1))
        setCharIdx(charIdx - 1)
      } else if (deleting && charIdx === 0) {
        setDeleting(false)
        setRoleIdx((roleIdx + 1) % roles.length)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.p
          className="greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          className="name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Mohammad Nabrawi
        </motion.h1>
        <motion.h2
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <span>{text}</span>
          <span className="cursor">|</span>
        </motion.h2>
        <motion.p
          className="location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <FaMapMarkerAlt /> Amman, Jordan
        </motion.p>
        <motion.p
          className="summary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          Junior Cybersecurity Analyst with hands-on experience in SIEM, threat detection,
          incident response, and ethical hacking. Building resilient security operations.
        </motion.p>
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <a href="#contact" className="btn btn-primary">
            <FaPaperPlane /> Get In Touch
          </a>
          <a href="#projects" className="btn btn-outline">
            <FaFolderOpen /> View Projects
          </a>
        </motion.div>
        <motion.div
          className="social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="http://www.linkedin.com/in/mohammed-nabrawi-971784275" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:mmnabrwi@gmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="tel:+962781325424" aria-label="Phone"><FaPhone /></a>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="terminal">
          <div className="term-header">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="term-title">security@nabrawi:~</span>
          </div>
          <div className="term-body">
            <p><span className="prompt">$</span> whoami</p>
            <p className="out">mohammad_nabrawi — junior_cybersecurity_analyst</p>
            <p><span className="prompt">$</span> cat skills.txt</p>
            <p className="out">SIEM • Threat Detection • Incident Response</p>
            <p className="out">Ethical Hacking • Network Forensics • Python</p>
            <p><span className="prompt">$</span> status</p>
            <p className="out success">● Available for opportunities</p>
            <p><span className="prompt">$</span> <span className="blink">_</span></p>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero {
          min-height: 100vh; display: flex; align-items: center; gap: 60px;
          padding: calc(var(--nav-h) + 40px) 24px 60px; max-width: 1100px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .hero-content { flex: 1; max-width: 560px; }
        .greeting { font-family: var(--mono); font-size: 0.95rem; color: var(--accent); margin-bottom: 12px; }
        .name {
          font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.15;
          letter-spacing: -1.5px; margin-bottom: 12px;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .title {
          font-size: 1.35rem; font-weight: 500; color: var(--text-muted); margin-bottom: 16px;
          min-height: 1.6em; font-family: var(--mono);
        }
        .cursor { color: var(--accent); animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .location { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 20px; display: flex; align-items: center; gap: 6px; }
        .location svg { color: var(--accent); }
        .summary { font-size: 1.05rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.7; }
        .cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
        .social { display: flex; gap: 12px; }
        .social a {
          width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
          border-radius: 10px; background: var(--surface); border: 1px solid var(--border);
          color: var(--text-muted); font-size: 1rem; transition: 0.25s;
        }
        .social a:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-glow); transform: translateY(-2px); }
        .hero-visual { flex: 1; display: flex; justify-content: center; }
        .terminal {
          width: 100%; max-width: 420px; background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 0 0 1px rgba(34,211,238,0.05), 0 20px 50px rgba(0,0,0,0.4);
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .term-header {
          display: flex; align-items: center; gap: 8px; padding: 12px 16px;
          background: #0d1321; border-bottom: 1px solid var(--border);
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #f87171; } .dot.yellow { background: #fbbf24; } .dot.green { background: #34d399; }
        .term-title { margin-left: auto; font-family: var(--mono); font-size: 0.75rem; color: var(--text-dim); }
        .term-body { padding: 20px; font-family: var(--mono); font-size: 0.85rem; line-height: 1.8; }
        .prompt { color: var(--accent); margin-right: 8px; }
        .out { color: var(--text-muted); padding-left: 16px; }
        .out.success { color: var(--success); }
        .blink { animation: blink 1s step-end infinite; }
        @media (max-width: 960px) {
          .hero { flex-direction: column; text-align: center; }
          .hero-content { max-width: 100%; }
          .cta, .social { justify-content: center; }
          .location { justify-content: center; }
          .terminal { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .cta { flex-direction: column; }
          .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
