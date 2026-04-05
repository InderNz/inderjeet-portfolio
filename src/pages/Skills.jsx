export default function Skills() {
  const sectionLabel = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#b5a990',
    marginBottom: '1.5rem',
    display: 'block',
  }

  const glassTag = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.06em',
    padding: '0.35rem 0.8rem',
    backgroundColor: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(255,255,255,0.85)',
    borderRadius: '9999px',
    color: '#78716c',
    backdropFilter: 'blur(8px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
  }

  const card = {
    padding: '1.75rem',
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.8)',
    borderRadius: '1.25rem',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(0,0,0,0.05)',
  }

  return (
    <div style={{ backgroundColor: '#f0ede6', minHeight: '100vh', paddingTop: '7rem' }}>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>

        <p style={sectionLabel}>Expertise</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 400, color: '#1c1917', marginBottom: '1rem', lineHeight: 1.1 }}>
          Skills & Certifications
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: '#78716c', fontWeight: 300, marginBottom: '4rem', maxWidth: '500px', lineHeight: 1.8 }}>
          A rare combination of senior test leadership, AI literacy, and enterprise scale delivery experience.
        </p>

        {/* AI Focus Banner */}
        <div style={{ ...card, marginBottom: '3rem', borderColor: 'rgba(194,80,10,0.15)', background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,240,230,0.4))' }}>
          <p style={{ ...sectionLabel, color: '#b84a0a', marginBottom: '0.75rem' }}>Current Focus</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 400, color: '#1c1917', marginBottom: '1rem' }}>
            AI Quality Engineering
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#78716c', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.25rem', maxWidth: '600px' }}>
            Actively specialising in testing AI systems — hallucination testing, bias detection, model drift monitoring, and responsible AI governance frameworks.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Hallucination Testing', 'Bias Detection', 'RAG Pipeline Evaluation', 'LLM Observability', 'Adversarial Prompting', 'Model Drift Monitoring', 'PromptFoo', 'LangSmith', 'Evidently AI', 'NIST AI RMF', 'EU AI Act', 'Responsible AI'].map(tag => (
              <span key={tag} style={{ ...glassTag, borderColor: 'rgba(194,80,10,0.2)', color: '#b84a0a' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            {
              icon: '👥',
              title: 'Test Management & Leadership',
              tags: ['SAFe6', 'PRINCE2Agile', 'CSM', 'CSPO', 'CSTM', 'C-Suite Reporting', 'Programme Delivery', 'Risk Management'],
            },
            {
              icon: '⚙️',
              title: 'Test Automation',
              tags: ['Selenium', 'Playwright', 'Postman', 'SoapUI', 'BDD/Cucumber', 'CI/CD', 'QYRUS', 'Azure DevOps'],
            },
            {
              icon: '🔁',
              title: 'Agile & DevOps Quality',
              tags: ['SAFe', 'Scrum', 'Kanban', 'Shift-Left', 'JIRA', 'Sprint Quality Gates', 'Exploratory Testing'],
            },
            {
              icon: '🏛️',
              title: 'Regulatory & Compliance',
              tags: ['APRA Compliance', 'FCA-Aligned Banking', 'Payment Systems Testing', 'Core Banking Validation'],
            },
            {
              icon: '🤖',
              title: 'AI & Automation Tools',
              tags: ['Claude Code', 'n8n', 'Agent Orchestration', 'Prompt Engineering', 'LLM Evaluation'],
            },
            {
              icon: '📊',
              title: 'Test Strategy & Planning',
              tags: ['Test Architecture', 'Defect Management', 'Quality Frameworks', 'KPI & Metrics', 'Test Reporting'],
            },
          ].map((skill, i) => (
            <div key={i} style={card}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>{skill.icon}</span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 400, color: '#1c1917', marginBottom: '1rem' }}>{skill.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skill.tags.map(tag => (
                  <span key={tag} style={glassTag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <p style={sectionLabel}>Certifications</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
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
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '9999px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
            }}>
              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: '#1c1917' }}>{cert.name}</p>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.58rem', color: '#b5a990', letterSpacing: '0.08em', marginTop: '0.15rem' }}>{cert.body}</p>
              </div>
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                flexShrink: 0,
                backgroundColor: cert.status === 'active' ? 'rgba(13,148,136,0.1)' : 'rgba(194,80,10,0.1)',
                color: cert.status === 'active' ? '#0d9488' : '#b84a0a',
                border: `1px solid ${cert.status === 'active' ? 'rgba(13,148,136,0.2)' : 'rgba(194,80,10,0.2)'}`,
              }}>
                {cert.status === 'active' ? 'Active' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}