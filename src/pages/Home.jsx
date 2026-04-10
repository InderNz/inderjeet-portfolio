import { useState, useEffect } from 'react'
import InderjeetPic from '../assets/Inderjeet.jpeg'

const SkillIcons = {
  management: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
  ),
  automation: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  agile: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
  ),
  regulatory: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
  ),
  ai: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>
  ),
  strategy: (
    <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
  ),
}

export default function Home() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }


  const glassCard = {
    padding: '1.25rem',
    backgroundColor: 'var(--glass-bg)',
    border: '1px solid var(--glass-bd)',
    borderRadius: '1rem',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: 'inset 0 1px 0 var(--glass-sh), 0 1px 3px var(--border-sm)',
  }

  const glassTag = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.06em',
    padding: '0.35rem 0.8rem',
    backgroundColor: 'var(--glass-bg-tag)',
    border: '1px solid var(--glass-bd-tag)',
    borderRadius: '9999px',
    color: 'var(--text-body)',
    backdropFilter: 'blur(8px)',
    boxShadow: 'inset 0 1px 0 var(--glass-sh)',
  }

  const sectionLabel = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.75rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '1rem',
    display: 'block',
    fontWeight: 600,
  }

  const pill = (color) => {
    const isTeal = color === 'teal'
    return {
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.55rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '0.2rem 0.65rem',
      borderRadius: '9999px',
      backgroundColor: isTeal ? 'var(--teal-bg-xs)' : 'var(--border-sm)',
      color: isTeal ? 'var(--teal)' : 'var(--text-muted)',
      border: isTeal ? '1px solid var(--teal-bd)' : '1px solid rgba(0,0,0,0.1)',
    }
  }


  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingTop: isMobile ? '5rem' : '7rem', overflowX: 'hidden' }}>

      {/* HERO */}
      <section id="home" style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '2rem 1.25rem 2rem' : '0 3rem 3rem', minHeight: '100vh', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', gap: '2rem' }}>

          {/* Left — all content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '2.5rem',
              fontWeight: 600,
            }}>
              AI Quality Engineering Leader
            </p>

            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: isMobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(3.5rem, 8vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: 'var(--text-primary)',
              marginBottom: '3rem',
              letterSpacing: '-0.02em',
            }}>
              Inderjeet<br />Singh
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1rem',
              color: 'var(--text-body-alt)',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: '560px',
              marginBottom: '2rem',
            }}>
              I am energised by two things: building, leading and developing great testing teams, and helping organisations ship software they can trust — especially as AI systems become central to how products work.
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: 'auto' }}>
              <div style={{
                width: '104px',
                height: '104px',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.12), 2px 4px 16px rgba(0,0,0,0.1)',
                transform: 'perspective(600px) rotateY(-8deg) rotateX(2deg)',
                border: '2px solid var(--glass-sh)',
              }}>
                <img
                  src={InderjeetPic}
                  alt="Inderjeet Singh"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                lineHeight: 1.8,
              }}>
                Senior Test Manager / Test Architect<br />AI QA Specialist
              </p>
            </div>
          </div>

          {/* Right — Stats quadrant + Know Me */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-end', height: isMobile ? 'auto' : '100%', marginTop: isMobile ? '2rem' : '0' }}>

            {/* Stats quadrant */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', width: '100%', paddingTop: isMobile ? '0' : 'calc(5rem + 5px)', alignItems: 'stretch' }}>
              {[
                { icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'QA LEADERSHIP',    value: '20+', unit: 'Years',              sub: 'Quinnox · Shawbrook · HAY Bank · Intel · Netcradle' },
                { icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>, label: 'DEFECT REDUCTION', value: '37%', unit: 'Less leakage',       sub: 'Shift-left across domains' },
                { icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>, label: 'PEAK TEAM',        value: '120+', unit: 'Members led',       sub: 'Built and lead small and big teams' },
                { icon: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>, label: 'CERTIFICATIONS',   value: '6',   unit: 'Active + in progress', sub: 'SAFe · PRINCE2 · ISTQB' },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: isMobile ? '0.85rem' : '1.5rem',
                  backgroundColor: 'var(--glass-bg-sm)',
                  border: '1px solid var(--glass-bd)',
                  borderRadius: '1rem',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: 'inset 0 1px 0 var(--glass-sh), 0 1px 3px var(--border-xs)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'inset 0 1px 0 var(--glass-sh), 0 4px 16px var(--border-md)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'inset 0 1px 0 var(--glass-sh), 0 1px 3px var(--border-xs)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      width: '1.4rem', height: '1.4rem', borderRadius: '0.35rem',
                      backgroundColor: 'var(--glass-sh-sm)', border: '1px solid var(--border-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      color: 'var(--accent)',
                    }}>
                      {stat.icon}
                    </span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>{stat.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? '1.8rem' : '1.4rem', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 250 }}>{stat.unit}</span>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-body)', fontWeight: 400, lineHeight: 1.4 }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Know Me */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Where to start
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                {[
                  {
                    label: 'My background',
                    to: '#about',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 15C2 13.4087 2.63214 11.8826 3.75736 10.7574C4.88258 9.63214 6.4087 9 8 9C9.59129 9 11.1174 9.63214 12.2426 10.7574C13.3679 11.8826 14 13.4087 14 15" stroke="currentColor" strokeWidth="1.5"/></svg>,
                  },
                  {
                    label: 'My work history',
                    to: '#experience',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><line x1="4" y1="4.75" x2="9" y2="4.75" stroke="currentColor" strokeWidth="1.5"/><line x1="4" y1="7.75" x2="12" y2="7.75" stroke="currentColor" strokeWidth="1.5"/><line x1="4" y1="10.75" x2="12" y2="10.75" stroke="currentColor" strokeWidth="1.5"/></svg>,
                  },
                  {
                    label: 'Skills & certifications',
                    to: '#skills',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 3C3 1.89543 3.89543 1 5 1H11C12.1046 1 13 1.89543 13 3V14.0397C13 14.4442 12.5447 14.6813 12.2133 14.4493L8.28673 11.7007C8.11457 11.5802 7.88543 11.5802 7.71327 11.7007L3.78673 14.4493C3.45534 14.6813 3 14.4442 3 14.0397V3Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
                  },
                  {
                    label: 'Explore my current focus',
                    to: '#current-focus',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2C8 2 4 5 4 9a4 4 0 008 0c0-4-4-7-4-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                  },
                  {
                    label: 'Get in touch',
                    to: '#contact',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5"/></svg>,
                  },
                ].map((item, i) => (
                  <a key={i} href={item.to}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.to) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-link)' }}
                  >
                    <span style={{
                      width: '1.4rem', height: '1.4rem', borderRadius: '0.35rem',
                      backgroundColor: 'var(--glass-sh-sm)', border: '1px solid var(--border-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      color: 'var(--accent)',
                    }}>
                      {item.icon}
                    </span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 400 }}>
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-section)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '3rem 1.25rem' : '3.5rem 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '6rem', alignItems: 'start' }}>
            <div>
              <span style={sectionLabel}>About Me</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '2rem' }}>
                Building Quality <br /><em>Culture</em>, that<br />scales.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {[
                  'I am a hands-on Senior Quality Engineering Leader with 20+ years of experience building and leading high-performance testing organisations across fintech, banking, and enterprise software.',
                  'My career spans UK digital banking transformation at Shawbrook Bank, regulatory grade testing for HAY Bank — an APRA regulated Australian neobank and nearly two decades of specialisation at Quinnox.',
                  'Now based in New Zealand, I am focused on AI Quality Engineering — helping organisations test AI systems with the same rigour we apply to traditional software.',
                  'I work at the intersection of people leadership, technical depth, and AI literacy. I do not just manage test teams, I build quality cultures that scale. For me Quality is a strategy, not just a checklist. ',
                ].map((p, i) => (
                  <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.85, fontWeight: 400 }}>{p}</p>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: isMobile ? '0' : '4rem', alignItems: 'stretch' }}>
              {[
                {
                  icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
                  title: 'Strategic Test Leadership',
                  desc: 'Built and led 120+ person QA organisations. Defined test strategy at programme and portfolio level with C-suite visibility.',
                },
                {
                  icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>,
                  title: 'AI-Augmented Testing',
                  desc: 'Hands-on with Claude, n8n, and agent orchestration. Specialising in AI system testing — hallucination, bias, and model reliability.',
                },
                {
                  icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>,
                  title: 'Fintech & Regulatory Expertise',
                  desc: 'Deep experience in regulated financial environments — APRA compliance, UK FCA-aligned digital banking, and payment platform testing.',
                },
                {
                  icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                  title: 'Palmerston North-based, NZ Ready',
                  desc: 'Relocated to New Zealand in 2024. Targeting NZ fintech, healthtech, and government digital roles.',
                },
              ].map((card, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', ...glassCard }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem', flexShrink: 0,
                      backgroundColor: 'var(--accent-icon-bg)', border: '1px solid var(--accent-icon-bd)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{card.title}</h3>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-body)', lineHeight: 1.7, fontWeight: 400 }}>{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '3rem 1.25rem' : '3.5rem 3rem' }}>
          <span style={sectionLabel}>Career History</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            20+ Years of Delivery
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 400, marginBottom: '3.5rem', lineHeight: 1.8 }}>
            18 years leading quality engineering across banking, fintech, and enterprise software in a consulting environment with earlier career experience bringing total industry experience to 20+ years.
          </p>

          {/* Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* ── Quinnox ── */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {/* Logo + vertical line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'var(--accent-bg-md)', border: '1px solid var(--accent-bg-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em', flexShrink: 0 }}>QCS</div>
                <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, var(--accent-bg-xl), var(--accent-bg-sm))', marginTop: '6px' }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, paddingBottom: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.15rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Senior Testing Manager</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Quinnox Consultancy Services</p>
                  </div>
                  <span style={pill('teal')}>18 YEARS</span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-meta)', fontWeight: 400, marginBottom: '0.65rem' }}>Jun 2006 – Mar 2024 · India · Global IT Services</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.75, fontWeight: 400, marginBottom: '1.5rem' }}>
                  18 years contributing to Quinnox's Testing Practice — responsible for contributing to the practice, leading technical delivery of testing services, participating in business development, and ensuring successful execution of projects across banking, fintech, Retail and Manufactoring and other enterprise verticals.
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {[
                    'Provided technical thought leadership and client-facing consultancy to shape QA strategy for major institutions undergoing digital transformation',
                    'Contributed to and enhanced Quinnox Quality Engineering capabilities — evaluated new tools and frameworks',
                    'Built training programmes and ensured a ready pool of SDETs across the organisation',
                    'Provided insights and early adoption for in-house Testing Platform QYRUS — a low/no-code SaaS automation platform',
                    'Participated in RFI/RFP processes, prepared technical documentation and conducted PoC demonstrations',
                    'Collaborated with sales teams to identify client testing needs, develop solutions and provide technical insights for sales strategies',
                  ].map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.79rem', color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 400 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>{pt}
                    </li>
                  ))}
                </ul>

                {/* Client engagements label */}
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1rem' }}>Key Client Engagements</p>

                {/* Nested timeline */}
                {[
                  {
                    initials: 'SB', name: 'Shawbrook Bank', role: 'Test Architect / Engagement Manager',
                    period: 'Jan 2020 – Mar 2024 · 4+ yrs · UK · Digital Banking',
                    desc: "Shawbrook Bank is a UK retail and commercial bank offering loans to small and medium-sized businesses. Quinnox played a key role in their digital transformation — developing innovative banking services, modernising legacy systems, and transitioning to Hybrid Cloud architecture. Services included e-commerce development, data science, automation and manual testing, and cloud infrastructure support.",
                    points: ['Directly managed the testing engagement, PMO team and 4 PMs — at peak the team consisted of 120+ members across multiple work-streams', 'Acted as trusted advisor to C-level stakeholders, providing strategic direction and regular executive reporting', 'Oversaw test planning, execution and delivery — coordinating timelines, resources, budgets and project milestones', 'Developed and implemented engagement strategies aligned with Shawbrook goals — identified opportunities for service improvements', 'Managed contractual aspects of the engagement, ensured compliance with terms and negotiated renewals as needed', 'Quinnox appointed as preferred service partner to Shawbrook due to consistently high quality of delivery'],
                    last: false,
                  },
                  {
                    initials: 'HAY', name: 'HAY Bank', role: 'Test Manager / Architect',
                    period: 'Oct 2018 – Dec 2019 · 1 yr · UK & Australia · Neobank',
                    desc: 'HAY Bank is an Australian fintech startup developing cutting-edge digital infrastructure to offer a mobile-first money solution. Quinnox was engaged as an independent product testing vendor. Built and led the test team to test a microservices and API-heavy mobile app and backend application. QYRUS was used as the testing platform.',
                    points: ['Hired and built a team of dedicated SDETs and testers — set up Chapters and Squads aligned with overall product test strategy', 'Created a detailed test strategy to satisfy testing needs as well as Australian regulatory requirements', 'Defined and ensured test strategy satisfied APRA licence granting authorisation criteria — including payment systems testing and core banking platform validation', 'Managed testing across microservices integrations, APIs, database and mobile frontend using QYRUS'],
                    last: false,
                  },
                  {
                    initials: 'WM', name: 'Waste Management Inc.', role: 'Test Manager / Architect',
                    period: 'Feb 2011 – Aug 2017 · 6 yrs · Houston, USA · Fortune 500',
                    desc: 'Waste Management Inc. is a Fortune 500 company specialising in waste collection and recycling. Quinnox was hired to develop, test, manage and support various applications including e-commerce platforms, OCS, Acorn, MAS and Payroll Systems. Built and managed a 38-member test team and 17-member e-commerce development team. Played a key role in the WM-Oakleaf post-merger integration.',
                    points: ['Hired and built a team of dedicated SDETs and test analysts — set up Agile teams aligned with overall product strategy', 'Identified and mitigated potential risks, monitored and resolved project issues promptly', 'Facilitated effective communication between internal teams and client stakeholders — conducted regular project status meetings', 'Led and mentored team, fostering a collaborative and productive environment with necessary resources and training', 'Played a key role in WM-Oakleaf post-merger integration'],
                    last: true,
                  },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--teal-bg-xs)', border: '1px solid var(--teal-bg-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', fontWeight: 700, color: 'var(--teal)' }}>{c.initials}</div>
                      {!c.last && <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--teal-bg-sm)', marginTop: '5px' }} />}
                    </div>
                    <div style={{ flex: 1, paddingBottom: c.last ? '0' : '1.5rem' }}>
                      <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.05rem' }}>{c.role}</h4>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{c.name}</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'var(--text-meta)', fontWeight: 400, marginBottom: '0.6rem' }}>{c.period}</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: 'var(--text-body)', lineHeight: 1.7, fontWeight: 400, marginBottom: '0.5rem' }}>{c.desc}</p>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {c.points.map((pt, j) => (
                          <li key={j} style={{ display: 'flex', gap: '0.6rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.79rem', color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 400 }}>
                            <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>{pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Earlier Career ── */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'var(--accent-bg-md)', border: '1px solid var(--accent-bg-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', fontWeight: 700, color: 'var(--accent)' }}>EC</div>
                <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, var(--accent-bg-lg), transparent)', marginTop: '6px' }} />
              </div>
              <div style={{ flex: 1, paddingBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.05rem' }}>Earlier Career — Test Analyst</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Intel Technologies India Ltd · Netcradle India</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-meta)', fontWeight: 400, marginBottom: '0.65rem' }}>2003 – 2006 · India</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.75, fontWeight: 400 }}>
                  Began career as a Test Analyst at Intel Technologies India Ltd and Netcradle India — building foundational skills in software testing, defect management, and quality assurance processes. These earlier roles, combined with 18 years at Quinnox, bring total industry experience to 20+ years.
                </p>
              </div>
            </div>

          </div>

          {/* Education */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-xs2)' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Education</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {[
                { name: 'Master of Software Systems (MSS)', body: 'Kurukshetra University, India', level: 'Postgraduate' },
                { name: 'Post Graduate Diploma in Computer Applications', body: 'Kurukshetra University, India', level: 'Undergraduate' },
              ].map((edu, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.55rem 1rem', backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-bd)', borderRadius: '9999px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 var(--glass-sh)' }}>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-primary)' }}>{edu.name}</p>
                    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', color: 'var(--text-faint)', letterSpacing: '0.08em', marginTop: '0.1rem' }}>{edu.body}</p>
                  </div>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '9999px', flexShrink: 0, backgroundColor: 'var(--teal-bg-xs)', color: 'var(--teal)', border: '1px solid var(--teal-bd)' }}>
                    {edu.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-section)', minHeight: '100vh', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '3rem 1.25rem' : '3.5rem 3rem' }}>
          <span style={sectionLabel}>Expertise</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1.75rem', lineHeight: 1.1 }}>
            Skills & Certifications
          </h2>

          {/* Skills — Two-column table layout */}
          <div style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-bd)', borderRadius: '1rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', overflow: 'hidden', marginBottom: '2.5rem' }}>
            {[
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                title: 'Test Management & Leadership',
                bullets: [
                  'Programme & Portfolio Test Delivery',
                  'Stakeholder Engagement — C-Level, Business and Vendors',
                  'Cross-functional Leadership across Business, Dev and Ops',
                  'Risk, Issue & Dependency Management',
                  'Delivery Assurance, Stage Gates & Go-Live Readiness',
                  'Building, mentoring and scaling high-performance QA teams',
                  'Test estimation, resource planning and capacity management',
                ],
              },
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
                title: 'Test Strategy & Planning',
                bullets: [
                  'Enterprise test strategy design — functional, non-functional and compliance',
                  'Test architecture — framework selection, tooling, environments and data strategy',
                  'Defect management — lifecycle, triage, root cause analysis and prevention',
                  'Quality frameworks — defining standards, processes and governance',
                  'KPI & metrics — defect leakage, test coverage, cycle time, shift-left impact',
                  'Test reporting to C-suite — executive dashboards and risk-based status reports',
                  'Vendor and third-party test management',
                ],
              },
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                title: 'Test Automation',
                bullets: [
                  'Selenium WebDriver — UI automation across web applications',
                  'Playwright — modern end-to-end test automation including MCP integration',
                  'Postman & SoapUI — REST and SOAP API testing',
                  'BDD with Cucumber and SpecFlow — behaviour-driven development',
                  'CI/CD pipeline integration — automated test triggering on code commits',
                  'QYRUS — low/no-code SaaS automation platform',
                  'Test framework design and automation strategy',
                ],
              },
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                title: 'AI & Automation Tools',
                bullets: [
                  'Claude Code — agentic AI coding and test generation',
                  'n8n — workflow automation and agent orchestration',
                  'PromptFoo — LLM output testing and hallucination detection',
                  'LangSmith — LLM observability and evaluation platform',
                  'Evidently AI — model drift and data quality monitoring',
                  'AI-assisted test case generation and defect prediction',
                  'Prompt engineering for reliable and consistent AI outputs',
                ],
              },
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
                title: 'Agile & DevOps Quality',
                bullets: [
                  'SAFe6 Agilist — Scaled Agile Framework for enterprise delivery',
                  'Scrum and Kanban — sprint-based and flow-based delivery',
                  'PRINCE2 Agile — hybrid project and agile delivery',
                  'Shift-left testing — embedding quality early in the development lifecycle',
                  'JIRA and Azure DevOps — backlog management, test tracking, reporting',
                  'Quality gates and Definition of Done enforcement',
                  'Continuous testing integration within DevOps pipelines',
                ],
              },
              {
                icon: <svg width="20" height="20" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>,
                title: 'Regulatory & Compliance',
                bullets: [
                  'APRA compliance — Australian Prudential Regulation Authority standards',
                  'FCA-aligned digital banking testing — UK Financial Conduct Authority',
                  'Payment systems testing — end-to-end payment flow validation',
                  'Core banking platform validation — neobank and traditional bank systems',
                  'Regulatory test strategy design for licence granting criteria',
                  'Audit trail and evidence management for compliance reporting',
                ],
              },
            ].map((row, i, arr) => (
              <div key={i} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', padding: '1.1rem 1.75rem', borderBottom: i < arr.length - 1 ? '1px solid var(--border-sm)' : 'none' }}>
                {/* Left column */}
                <div style={{ width: isMobile ? '100%' : '220px', flexShrink: 0, paddingRight: isMobile ? '0' : '2rem', marginBottom: isMobile ? '0.75rem' : '0' }}>
                  <span style={{ display: 'inline-block', marginBottom: '0.3rem' }}>{row.icon}</span>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>{row.title}</p>
                </div>
                {/* Right column */}
                <ul style={{ flex: 1, listStyle: 'none', padding: 0, margin: 0, width: isMobile ? '100%' : 'auto' }}>
                  {row.bullets.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.2rem', flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'var(--text-body)', fontWeight: 400, lineHeight: 1.5 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications — full width, 2-column pill grid */}
          <span style={sectionLabel}>Certifications</span>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.4rem' }}>
            {[
              { name: 'SAFe 6 Agilist', body: 'Scaled Agile', status: 'active' },
              { name: 'PRINCE2 Agile Practitioner', body: 'AXELOS', status: 'active' },
              { name: 'Certified Scrum Master (CSM)', body: 'Scrum Alliance', status: 'active' },
              { name: 'Certified Scrum Product Owner (CSPO)', body: 'Scrum Alliance', status: 'active' },
              { name: 'Certified Software Test Manager (CSTM)', body: 'ASTQB', status: 'active' },
              { name: 'ISTQB CTFL v4.0', body: 'Foundation Level', status: 'progress' },
              { name: 'ISTQB CT-AI', body: 'AI Testing Specialist', status: 'progress' },
              { name: 'Azure AI-900', body: 'Microsoft', status: 'progress' },
            ].map((cert, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', padding: '0.5rem 1rem', backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-bd)', borderRadius: '9999px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 var(--glass-sh)' }}>
                <div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>{cert.name}</p>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>{cert.body}</p>
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '9999px', flexShrink: 0, backgroundColor: cert.status === 'active' ? 'var(--teal-bg-xs)' : 'var(--accent-bg-sm)', color: cert.status === 'active' ? 'var(--teal)' : 'var(--accent)', border: cert.status === 'active' ? '1px solid var(--teal-bd)' : '1px solid var(--accent-bg-xl)' }}>
                  {cert.status === 'active' ? 'Active' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SPECIALISATION */}
      <section id="current-focus" style={{ borderTop: '1px solid var(--border)', boxSizing: 'border-box', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '3rem 1.25rem' : '6rem 3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <span style={sectionLabel}>Current Focus</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : '2.6rem', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0' }}>
              Specialising in AI Quality Engineering
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', color: 'var(--text-body-alt)', lineHeight: 1.85, fontWeight: 400, maxWidth: '700px' }}>
              As AI systems become central to how products work, the need for experienced testers who understand probabilistic outputs, model drift, and responsible AI governance has never been greater. That is the lane I am building in.
            </p>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('#skills') }} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 400 }}>
              See my skills →
            </a>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'Hallucination Testing', 'Bias Detection', 'RAG Pipeline Evaluation',
                'LLM Observability', 'Adversarial Prompting', 'Model Drift Monitoring',
                'Responsible AI Frameworks', 'Agent Orchestration',
                'PromptFoo', 'LangSmith', 'Evidently AI', 'NIST AI RMF',
              ].map(tag => (
                <span key={tag} style={{ ...glassTag, fontSize: '0.72rem', padding: '0.45rem 1rem' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '3rem 1.25rem 4rem' : '3.5rem 3rem 8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '6rem', alignItems: 'start' }}>
            <div>
              <span style={sectionLabel}>Get in Touch</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.4rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Let's work<br />together.
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.85, fontWeight: 400, marginBottom: '2.5rem', maxWidth: '380px' }}>
                I am actively seeking senior QA, Test Management, or AI Quality Engineering roles in Palmerston North and across New Zealand.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { label: 'Email', value: 'nz.inderjeet@gmail.com', href: 'mailto:nz.inderjeet@gmail.com', icon: '✉️' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/inderjeet-singh-24485b32', href: 'https://www.linkedin.com/in/inderjeet-singh-24485b32/', icon: '💼' },
                  { label: 'Location', value: 'Palmerston North, New Zealand', href: null, icon: '📍' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1.1rem', backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-bd)', borderRadius: '9999px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'inset 0 1px 0 var(--glass-sh)' }}>
                    <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.1rem' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'var(--text-primary)', textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'var(--text-primary)' }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: isMobile ? '0' : '4rem' }}>
              <span style={sectionLabel}>What I'm looking for</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {[
                  { title: 'Senior QA / Test Manager', desc: 'Leading quality engineering teams at programme or portfolio level.' },
                  { title: 'Head of Quality', desc: 'Building QA capability and culture from the ground up.' },
                  { title: 'AI Quality Engineering Lead', desc: 'Specialising in testing AI systems — LLMs, agents, and probabilistic outputs.' },
                  { title: 'QA Consultant / Advisor', desc: 'Strategic testing advice for NZ companies integrating AI into their products.' },
                ].map((role, i) => (
                  <div key={i} style={glassCard}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{role.title}</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'var(--text-body)', fontWeight: 400, lineHeight: 1.6 }}>{role.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--accent-bg-xs)', border: '1px solid var(--accent-bg-lg)', borderRadius: '1rem' }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem' }}>Availability</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: 'var(--text-body)', fontWeight: 400, lineHeight: 1.7 }}>
                  Available for immediate start. Open to permanent, contract, and consulting roles across New Zealand including remote positions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: isMobile ? '2rem 1.25rem' : '2rem 3rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
          © 2025 Inderjeet Singh · Palmerston North, New Zealand · AI Quality Engineering
        </p>
      </footer>

    </div>
  )
}