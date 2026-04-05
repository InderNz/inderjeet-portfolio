import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Current Focus', id: 'current-focus' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'current-focus', 'contact']
      let current = 'home'

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2.50rem 2rem 1.25rem calc(42% - 450px + 3rem)',
  }

  const barStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1052px',
    backgroundColor: 'rgba(225,210,195,0.88)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '9999px',
    padding: '0.5rem 0.75rem',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  }

  return (
    <nav style={navStyle}>
      <div style={barStyle}>

        {/* Home icon */}
        <Link to="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{
          width: '2.2rem',
          height: '2.2rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: activeSection === 'home' ? '#7c3008' : '#b84a0a',
          textDecoration: 'none',
          flexShrink: 0,
          backgroundColor: activeSection === 'home' ? 'rgba(255,255,255,0.35)' : 'transparent',
          border: activeSection === 'home' ? '1px solid rgba(194,80,10,0.25)' : '1px solid transparent',
          backdropFilter: activeSection === 'home' ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: activeSection === 'home' ? 'blur(12px)' : 'none',
          boxShadow: activeSection === 'home' ? 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(194,80,10,0.15)' : 'none',
        }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
          </svg>
        </Link>

        {/* Nav links — evenly distributed */}
        {links.slice(1).map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(link.id)
              if (el) {
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 55, behavior: 'smooth' })
              } else {
                window.location.href = `/#${link.id}`
              }
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.5rem 0',
              borderRadius: '9999px',
              color: activeSection === link.id ? '#7c3008' : '#b84a0a',
              backgroundColor: activeSection === link.id ? 'rgba(255,255,255,0.35)' : 'transparent',
              border: activeSection === link.id ? '1px solid rgba(194,80,10,0.25)' : '1px solid transparent',
              backdropFilter: activeSection === link.id ? 'blur(12px)' : 'none',
              WebkitBackdropFilter: activeSection === link.id ? 'blur(12px)' : 'none',
              boxShadow: activeSection === link.id ? 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(194,80,10,0.15)' : 'none',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (activeSection !== link.id) { e.currentTarget.style.color = '#7c3008'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)' } }}
            onMouseLeave={e => { if (activeSection !== link.id) { e.currentTarget.style.color = '#b84a0a'; e.currentTarget.style.backgroundColor = 'transparent' } }}
          >
            {link.label}
          </a>
        ))}


      </div>
    </nav>
  )
}