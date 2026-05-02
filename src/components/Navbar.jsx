import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Current Focus', id: 'current-focus' },
  { label: 'Contact', id: 'contact' },
]

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      style={{
        width: '2.2rem',
        height: '2.2rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)',
        background: 'none',
        border: '1px solid transparent',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
      }}
    >
      {theme === 'dark' ? (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'current-focus', 'contact']
      let current = 'home'
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.5) current = section
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
    padding: isMobile ? '1rem 1.25rem' : '2.50rem 2rem 1.25rem calc(42% - 450px + 3rem)',
  }

  const barStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: isMobile ? '90%' : '100%',
    maxWidth: isMobile ? 'none' : '1052px',
    backgroundColor: 'var(--navbar-bg)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '9999px',
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--navbar-bd)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  }

  const iconBtnStyle = (isActive) => ({
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? 'var(--accent-dark)' : 'var(--accent)',
    textDecoration: 'none',
    flexShrink: 0,
    backgroundColor: isActive ? 'var(--nav-active-bg)' : 'transparent',
    border: isActive ? '1px solid var(--nav-active-bd)' : '1px solid transparent',
    backdropFilter: isActive ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: isActive ? 'blur(12px)' : 'none',
    boxShadow: isActive ? 'inset 0 1px 0 var(--glass-sh-sm), 0 2px 8px var(--accent-bg-lg)' : 'none',
  })

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 55, behavior: 'smooth' })
    } else {
      window.location.assign(`/#${id}`)
    }
  }

  return (
    <nav style={navStyle}>
      <div style={{ width: isMobile ? '90%' : '100%', maxWidth: isMobile ? 'none' : '1052px' }}>
        <div style={barStyle}>

          {/* Home icon */}
          <Link
            to="/"
            aria-label="Home"
            onClick={(e) => { e.preventDefault(); if (pathname === '/') { window.scrollTo({ top: 0, behavior: 'smooth' }) } else { navigate('/') } }}
            style={iconBtnStyle(activeSection === 'home')}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
            </svg>
          </Link>

          {isMobile ? (
            <>
              <div style={{ flex: 1 }} />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'none',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                  padding: 0,
                  color: 'var(--accent)',
                }}
              >
                {menuOpen ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>

              {menuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--navbar-bg)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  borderRadius: '1rem',
                  border: '1px solid var(--navbar-bd)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}>
                  {links.slice(1).map(link => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      aria-current={activeSection === link.id ? 'page' : undefined}
                      onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollToSection(link.id) }}
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        padding: '0.6rem 1rem',
                        borderRadius: '0.5rem',
                        color: activeSection === link.id ? 'var(--accent-dark)' : 'var(--accent)',
                        backgroundColor: activeSection === link.id ? 'var(--nav-active-bg)' : 'transparent',
                        border: activeSection === link.id ? '1px solid var(--nav-active-bd)' : '1px solid transparent',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {links.slice(1).map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(link.id)
                    if (el) {
                      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 55, behavior: 'smooth' })
                    } else {
                      window.location.assign(`/#${link.id}`)
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
                    color: activeSection === link.id ? 'var(--accent-dark)' : 'var(--accent)',
                    backgroundColor: activeSection === link.id ? 'var(--nav-active-bg)' : 'transparent',
                    border: activeSection === link.id ? '1px solid var(--nav-active-bd)' : '1px solid transparent',
                    backdropFilter: activeSection === link.id ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: activeSection === link.id ? 'blur(12px)' : 'none',
                    boxShadow: activeSection === link.id ? 'inset 0 1px 0 var(--glass-sh-sm), 0 2px 8px var(--accent-bg-lg)' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (activeSection !== link.id) { e.currentTarget.style.color = 'var(--accent-dark)'; e.currentTarget.style.backgroundColor = 'var(--nav-hover-bg)' } }}
                  onMouseLeave={e => { if (activeSection !== link.id) { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'transparent' } }}
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
