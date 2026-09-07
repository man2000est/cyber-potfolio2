import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      let current = 'home'
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="navbar">
      <nav className={`nav-pill ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="logo">
          <span className="bracket">&lt;</span>MN<span className="bracket">/&gt;</span>
        </a>

        <ul className="nav-links desktop">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href.slice(1) ? 'active' : ''}>
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    className="nav-underline"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-links mobile"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; justify-content: center;
          padding-top: 18px;
          pointer-events: none;
        }
        .nav-pill {
          pointer-events: auto;
          display: flex; align-items: center; gap: 6px;
          width: min(94%, 1040px);
          padding: 10px 12px 10px 24px;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: background 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .nav-pill.scrolled {
          background: rgba(10, 14, 23, 0.82);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .logo {
          font-family: var(--mono); font-size: 1.1rem; font-weight: 600;
          margin-right: auto;
        }
        .bracket { color: var(--accent); }
        .nav-links {
          display: flex; gap: 4px; list-style: none;
        }
        .nav-links a {
          position: relative;
          font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
          padding: 9px 14px; border-radius: 999px; transition: 0.25s;
        }
        .nav-underline {
          position: absolute; left: 12px; right: 12px; bottom: 3px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--accent), #7c5cff);
          box-shadow: 0 0 8px rgba(34,211,238,0.6);
        }
        .nav-links a:hover, .nav-links a.active {
          color: var(--accent); background: var(--accent-glow);
        }
        .desktop { display: flex; }
        .mobile { display: none; }
        .menu-btn {
          display: none; background: none; border: none; color: var(--text); cursor: pointer;
          width: 40px; height: 40px; align-items: center; justify-content: center;
          border-radius: 50%; transition: background 0.2s;
        }
        .menu-btn:hover { background: rgba(255,255,255,0.06); }
        @media (max-width: 720px) {
          .navbar { padding-top: 14px; }
          .nav-pill { width: 92%; padding: 8px 8px 8px 18px; }
          .desktop { display: none; }
          .menu-btn { display: flex; }
          .mobile {
            display: flex; flex-direction: column; position: absolute;
            top: calc(100% + 10px); left: 0; right: 0; margin: 0 auto; width: 92%;
            background: rgba(10, 14, 23, 0.94);
            backdrop-filter: blur(20px); padding: 14px;
            border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
          }
          .mobile a { display: block; padding: 12px 14px; border-radius: 10px; }
          .mobile a:hover { background: var(--accent-glow); color: var(--accent); }
        }
      `}</style>
    </div>
  )
}
