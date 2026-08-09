export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Designed & built by <strong>Mohammad Nabrawi</strong></p>
        <p className="note">Junior Cybersecurity Analyst • Amman, Jordan</p>
      </div>
      <style>{`
        .footer {
          padding: 40px 0; border-top: 1px solid var(--border); text-align: center;
          position: relative; z-index: 1;
        }
        .footer p { color: var(--text-dim); font-size: 0.9rem; }
        .footer strong { color: var(--text-muted); }
        .note { margin-top: 6px; font-size: 0.8rem !important; }
      `}</style>
    </footer>
  )
}
