import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: 'var(--bg-page-alt)', minHeight: '100vh' }}>
        <a href="#main-content" style={{ position: 'absolute', top: '-40px', left: 0, padding: '0.5rem 1rem', backgroundColor: '#b84a0a', color: '#fff', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', zIndex: 9999, borderRadius: '0 0 0.5rem 0', transition: 'top 0.2s' }} onFocus={e => e.currentTarget.style.top = '0'} onBlur={e => e.currentTarget.style.top = '-40px'}>Skip to content</a>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App