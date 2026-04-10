export default function Experience() {

  const pill = (color) => ({
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '0.2rem 0.65rem',
    borderRadius: '9999px',
    backgroundColor: color === 'teal' ? 'var(--teal-bg-xs)' : 'var(--border-sm)',
    color: color === 'teal' ? 'var(--teal)' : 'var(--text-muted)',
    border: `1px solid ${color === 'teal' ? 'var(--teal-bd)' : 'rgba(0,0,0,0.1)'}`,
  })

  const logoCircle = (initials, color = 'var(--accent)') => (
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '10px',
      backgroundColor: 'var(--accent-bg-md)',
      border: '1px solid var(--accent-bg-xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.65rem',
      fontWeight: 600,
      color,
      letterSpacing: '0.05em',
    }}>{initials}</div>
  )

  const smallLogoCircle = (initials) => (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      backgroundColor: 'var(--teal-bg-xs)',
      border: '1px solid var(--teal-bg-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.55rem',
      fontWeight: 600,
      color: 'var(--teal)',
      letterSpacing: '0.03em',
    }}>{initials}</div>
  )

  const metaText = (text) => (
    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'var(--text-meta)', fontWeight: 300 }}>{text}</span>
  )

  const bullet = (items, small = false) => (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.65rem', fontFamily: 'DM Sans, sans-serif', fontSize: small ? '0.8rem' : '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65, fontWeight: 300 }}>
          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>·</span>
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingTop: '7rem' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 3rem' }}>

        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '1.5rem' }}>
          Career History
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.1 }}>
          20+ Years of Delivery
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 300, marginBottom: '3.5rem', lineHeight: 1.8 }}>
          Nearly two decades leading quality engineering across banking, fintech, and enterprise software.
        </p>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* ── Quinnox ── */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {/* Left: line + dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
              {logoCircle('QCS')}
              <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--accent-bg-lg)', marginTop: '6px' }} />
            </div>

            {/* Right: content */}
            <div style={{ flex: 1, paddingBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>Senior Testing Manager</h2>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Quinnox Consultancy Services</p>
                </div>
                <span style={pill('teal')}>18 Years</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.35rem', marginBottom: '0.85rem' }}>
                {metaText('Jun 2006 – Mar 2024')}
                <span style={{ color: 'var(--text-divider)' }}>·</span>
                {metaText('India · Consultancy')}
              </div>

              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
                Nearly two decades leading Quinnox's Testing Practice — shaping QA strategy, building SDET pools, and delivering testing services across banking, fintech, and enterprise verticals.
              </p>
              {bullet([
                'Technical thought leadership and client-facing consultancy for major financial institutions',
                'Built training programmes and maintained a ready pool of SDETs across the organisation',
                'Provided insights for in-house Testing Platform QYRUS — a low/no-code SaaS automation platform',
                'Participated in RFI/RFP processes, PoC demonstrations, and technical documentation',
              ])}

              {/* Client Engagements sub-section */}
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: '1.75rem', marginBottom: '1rem' }}>
                Key Client Engagements
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

                {/* Shawbrook */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '36px', flexShrink: 0 }}>
                    {smallLogoCircle('SB')}
                    <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--teal-bg-sm)', marginTop: '5px' }} />
                  </div>
                  <div style={{ flex: 1, paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>Test Architect / Engagement Manager</h3>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Shawbrook Bank</p>
                      </div>
                      <span style={pill('teal')}>UK · Digital Banking</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.3rem', marginBottom: '0.65rem' }}>
                      {metaText('Jan 2020 – Mar 2024')}
                      <span style={{ color: 'var(--text-divider)' }}>·</span>
                      {metaText('4+ Years')}
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
                      Led Quinnox's testing engagement through Shawbrook's major digital transformation — modernising legacy systems, transitioning to Hybrid Cloud, delivering e-commerce, data science, and automation services.
                    </p>
                    {bullet([
                      'Managed the testing engagement, PMO team and 4 PMs — peak team of 120+ members',
                      'Trusted advisor to C-level stakeholders with strategic direction and executive reporting',
                      'Quinnox appointed as preferred service partner due to consistently high quality of delivery',
                    ], true)}
                  </div>
                </div>

                {/* HAY Bank */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '36px', flexShrink: 0 }}>
                    {smallLogoCircle('HAY')}
                    <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--teal-bg-sm)', marginTop: '5px' }} />
                  </div>
                  <div style={{ flex: 1, paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>Test Manager / Architect</h3>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>HAY Bank</p>
                      </div>
                      <span style={pill('teal')}>AU & UK · Neobank</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.3rem', marginBottom: '0.65rem' }}>
                      {metaText('Oct 2018 – Dec 2019')}
                      <span style={{ color: 'var(--text-divider)' }}>·</span>
                      {metaText('1 Year')}
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
                      Built the test team from scratch for an APRA-regulated Australian neobank. Tested a microservices and API-heavy mobile banking app and backend.
                    </p>
                    {bullet([
                      'Hired and built SDETs and testers — set up Chapters and Squads aligned with product test strategy',
                      'Defined test strategy satisfying both business needs and APRA regulatory requirements',
                      'Full coverage for APRA licence criteria — payment systems and core banking validation',
                    ], true)}
                  </div>
                </div>

                {/* WM Inc. */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '36px', flexShrink: 0 }}>
                    {smallLogoCircle('WM')}
                    <div style={{ width: '2px', flex: 1, backgroundColor: 'transparent', marginTop: '5px' }} />
                  </div>
                  <div style={{ flex: 1, paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>Test Manager / Architect</h3>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Waste Management Inc.</p>
                      </div>
                      <span style={pill('teal')}>Houston · Fortune 500</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.3rem', marginBottom: '0.65rem' }}>
                      {metaText('Feb 2011 – Aug 2017')}
                      <span style={{ color: 'var(--text-divider)' }}>·</span>
                      {metaText('6 Years')}
                    </div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.81rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
                      Built and managed a 38-member test team and 17-member e-commerce development team. Key role in WM-Oakleaf post-merger integration.
                    </p>
                    {bullet([
                      'Built dedicated SDETs and test analysts — set up Agile teams aligned with product strategy',
                      'Identified and mitigated risks, ensured regulatory compliance and industry standards',
                      'Facilitated communication between internal teams and client stakeholders',
                    ], true)}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Earlier Career ── */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
              {logoCircle('EC')}
              <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--accent-bg-lg)', marginTop: '6px' }} />
            </div>
            <div style={{ flex: 1, paddingBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>Test Analyst</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Intel Technologies India Ltd · Netcradle India</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                {metaText('2003 – 2006')}
                <span style={{ color: 'var(--text-divider)' }}>·</span>
                {metaText('India')}
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
                Began career as a Test Analyst — building foundational skills in software testing, defect management, and quality assurance processes across enterprise software environments.
              </p>
            </div>
          </div>

          {/* ── Education ── */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48px', flexShrink: 0 }}>
              {logoCircle('KU', 'var(--teal)')}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>
                Education
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { level: 'Postgraduate', name: 'Master of Software Systems (MSS)', school: 'Kurukshetra University, India' },
                  { level: 'Undergraduate', name: 'Post Graduate Diploma in Computer Applications', school: 'Kurukshetra University, India' },
                ].map((edu, i) => (
                  <div key={i}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>{edu.name}</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.1rem' }}>{edu.school}</p>
                    {metaText(edu.level)}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
