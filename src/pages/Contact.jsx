export default function Contact() {
  const glassCard = {
    padding: '2rem',
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.8)',
    borderRadius: '1.25rem',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(0,0,0,0.05)',
  }

  const label = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#b5a990',
    marginBottom: '1.5rem',
    display: 'block',
  }

  const contactLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'inderjeet-singh-24485b32',
      href: 'https://www.linkedin.com/in/inderjeet-singh-24485b32/',
      description: 'Connect with me professionally',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: 'Email',
      value: 'nz.inderjeet@gmail.com',
      href: 'mailto:nz.inderjeet@gmail.com',
      description: 'Send me a direct message',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      label: 'Website',
      value: 'inderjeetsingh.nz',
      href: 'https://inderjeetsingh.nz',
      description: 'You are already here',
    },
  ]

  return (
    <div style={{ backgroundColor: '#f0ede6', minHeight: '100vh', paddingTop: '7rem' }}>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>

        <p style={label}>Get in Touch</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 400, color: '#1c1917', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Let's work<br /><em>together.</em>
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: '#78716c', fontWeight: 300, lineHeight: 1.85, marginBottom: '4rem', maxWidth: '520px' }}>
          Open to QA leadership, AI quality engineering, and test management roles in New Zealand.
          If you're building something that needs to be done right, I'd love to hear from you.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Left — Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contactLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  ...glassCard,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(0,0,0,0.05)'}
              >
                <div style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(194,80,10,0.08)',
                  border: '1px solid rgba(194,80,10,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b84a0a',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b5a990', marginBottom: '0.2rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#1c1917', marginBottom: '0.15rem' }}>
                    {item.value}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#a09880', fontWeight: 300 }}>
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Right — Availability + what I'm looking for */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div style={{ ...glassCard, borderColor: 'rgba(13,148,136,0.15)', background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(220,248,244,0.3))' }}>
              <p style={{ ...label, color: '#0d9488', marginBottom: '0.75rem' }}>Availability</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0d9488', display: 'inline-block', boxShadow: '0 0 0 3px rgba(13,148,136,0.2)' }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#1c1917' }}>
                  Available now · Palmerston North, NZ
                </span>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: '#78716c', lineHeight: 1.75, fontWeight: 300 }}>
                Open to permanent and contract roles. Happy to relocate within NZ or work remotely.
              </p>
            </div>

            <div style={glassCard}>
              <p style={{ ...label, marginBottom: '0.75rem' }}>What I'm Looking For</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'QA Leadership / Test Manager roles',
                  'AI Quality Engineering positions',
                  'Head of Quality / QA Director',
                  'NZ fintech, healthtech, or government digital',
                  'Remote-first teams across APAC',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#b84a0a', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', marginTop: '0.15rem', flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: '#78716c', fontWeight: 300, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...glassCard, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontStyle: 'italic', color: '#44403c', lineHeight: 1.6, marginBottom: '1rem' }}>
                "Quality is not an act — it is a habit built into every team, every process, every release."
              </p>
              <a
                href="https://www.linkedin.com/in/inderjeet-singh-24485b32/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  backgroundColor: 'rgba(194,80,10,0.1)',
                  border: '1px solid rgba(194,80,10,0.2)',
                  borderRadius: '9999px',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#b84a0a',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                View LinkedIn Profile →
              </a>
            </div>

          </div>
        </div>

      </section>
    </div>
  )
}
