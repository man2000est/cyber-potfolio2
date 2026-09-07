import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CursorFX from './components/CursorFX'
import NetworkBackground from './components/NetworkBackground'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    document.title = 'Mohammad Nabrawi | Junior Cybersecurity Analyst'
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <ScrollProgress />
      <CursorFX />
      <NetworkBackground />
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
