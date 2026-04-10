export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingTop: '7rem' }}>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 600 }}>
              About Me
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '2rem' }}>
              Quality is a<br /><em>strategy</em>, not<br />a checklist.
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'I am a Senior Quality Engineering Leader with 18 years of experience building and leading high-performance testing organisations across fintech, banking, and enterprise software.',
                'My career spans UK digital banking transformation at Shawbrook Bank, regulatory-grade testing for HAY Bank — an APRA-regulated Australian neobank — and nearly two decades of deep specialisation at Quinnox.',
                'Now based in New Zealand, I am focused on the next frontier: AI Quality Engineering — helping organisations test AI systems with the same rigour we apply to traditional software.',
                'I work at the intersection of people leadership, technical depth, and AI literacy. I do not just manage test teams — I build quality cultures that scale.',
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 300 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '6rem' }}>
            {[
              {
                icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
                title: 'Strategic Test Leadership',
                desc: 'Built and led 120+ person QA organisations. Defined test strategy at programme and portfolio level with C-suite visibility.',
              },
              {
                icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>,
                title: 'AI-Augmented Testing',
                desc: 'Hands-on with Claude, n8n, and agent orchestration. Actively specialising in AI system testing — hallucination, bias, and model reliability.',
              },
              {
                icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>,
                title: 'Fintech & Regulatory Expertise',
                desc: 'Deep experience in regulated financial environments — APRA compliance, UK FCA-aligned digital banking, and payment platform testing.',
              },
              {
                icon: <svg width="18" height="18" fill="none" stroke="#b84a0a" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                title: 'Palmerston North-based, NZ Ready',
                desc: 'Relocated to New Zealand in 2024. Actively building local networks and targeting NZ fintech, healthtech, and government digital roles.',
              },
            ].map((card, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-bd)',
                borderRadius: '1rem',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: 'inset 0 1px 0 var(--glass-sh), 0 1px 3px var(--border-sm)',
              }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '0.6rem', flexShrink: 0,
                  backgroundColor: 'var(--accent-icon-bg)', border: '1px solid var(--accent-icon-bd)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{card.title}</h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
