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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="logo">
          <span className="bracket">&lt;</span>MN<span className="bracket">/&gt;</span>
        </a>

        <ul className="nav-links desktop">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href.slice(1) ? 'active' : ''}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-links mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
          position: fixed; top: 0; left: 0; right: 0; height: var(--nav-h);
          z-index: 1000; transition: background 0.25s, backdrop-filter 0.25s, box-shadow 0.25s;
        }
        .navbar.scrolled {
          background: rgba(10,14,23,0.85); backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 100%;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo {
          font-family: var(--mono); font-size: 1.25rem; font-weight: 600;
        }
        .bracket { color: var(--accent); }
        .nav-links {
          display: flex; gap: 8px; list-style: none;
        }
        .nav-links a {
          font-size: 0.875rem; font-weight: 500; color: var(--text-muted);
          padding: 8px 14px; border-radius: 6px; transition: 0.2s;
        }
        .nav-links a:hover, .nav-links a.active {
          color: var(--accent); background: var(--accent-glow);
        }
        .desktop { display: flex; }
        .mobile { display: none; }
        .menu-btn {
          display: none; background: none; border: none; color: var(--text); cursor: pointer;
        }
        @media (max-width: 720px) {
          .desktop { display: none; }
          .menu-btn { display: block; }
          .mobile {
            display: flex; flex-direction: column; position: absolute;
            top: var(--nav-h); left: 0; right: 0; background: rgba(10,14,23,0.97);
            backdrop-filter: blur(16px); padding: 20px; border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </nav>
  )
}
