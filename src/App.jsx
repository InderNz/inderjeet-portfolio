import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: 'var(--bg-page-alt)', minHeight: '100vh' }}>
        <a href="#main-content" style={{ position: 'absolute', top: '-40px', left: 0, padding: '0.5rem 1rem', backgroundColor: '#b84a0a', color: '#fff', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', zIndex: 9999, borderRadius: '0 0 0.5rem 0', transition: 'top 0.2s' }} onFocus={e => e.currentTarget.style.top = '0'} onBlur={e => e.currentTarget.style.top = '-40px'}>Skip to content</a>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/experience" element={<Navigate to="/#experience" replace />} />
            <Route path="/skills" element={<Navigate to="/#skills" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
