import React, { useState } from 'react';
import { useAnalysisRunner } from './hooks/useAnalysisRunner';
import { useFastaUpload } from './hooks/useFastaUpload';
import { useOrganismSelect } from './hooks/useOrganismSelect';
import { FastaUploadCard } from './components/FastaUploadCard';
import { OrganismCard } from './components/OrganismCard';
import { RunSection } from './components/RunSection';

// Importación de las páginas desacopladas
import About from './pages/About';
import Contact from './pages/Contact';
import Tutorial from './pages/Tutorial';
import Download from './pages/Download';
import Results from './pages/Results';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';



// ==========================================
// ESTILOS DE APP Y NAVEGACIÓN
// ==========================================
const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  container: { padding: '24px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  navbar: { backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '12px 24px' },
  navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  navLinks: { display: 'flex', gap: '24px', alignItems: 'center' },
  navLink: { color: '#f1f5f9', textDecoration: 'none', fontSize: '15px', fontWeight: '500', opacity: 0.8, cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
  navLinkActive: { color: '#38bdf8', textDecoration: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
  footer: { backgroundColor: '#1e293b', borderTop: '1px solid #334155', padding: '16px', marginTop: 'auto', textAlign: 'center' },
  hero: { textAlign: 'center', marginBottom: '24px' },
  heroH1: { fontSize: '32px', fontWeight: '700', color: '#f8fafc', margin: '0 0 8px 0' },
  heroP: { fontSize: '16px', color: '#94a3b8', margin: 0 },
  runButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  resultsCard: { border: '1px solid #0284c7', borderRadius: '12px', padding: '20px', backgroundColor: '#0f172a', marginTop: '20px' },
  errorBox: { color: '#f87171', backgroundColor: '#450a0a', padding: '12px', borderRadius: '8px', marginTop: '12px', fontSize: '14px' },
};

// ==========================================
// NAVBAR & FOOTER
// ==========================================
const Navbar = ({ currentView, setView }) => {
  const navigate = useNavigate();

  const handleNav = (view) => {
    setView(view);
    navigate('/');
  };

  return (
    <header style={styles.navbar}>
    <div style={styles.navContent}>
            <button 
              onClick={() => handleNav('run')} 
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              <img 
                src="/src/assets/logo.ico" 
                alt="CRAB Icon" 
                style={{
                  height: '32px',
                  width: '32px',
                  filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.45))'
                }} 
              />
              <div 
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{
                      fontSize: '22px', fontWeight: '800',
                      background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.02em',
                      lineHeight: 1
                    }}
                  >
                    CRAB
                  </span>
                  <span 
                    style={{
                      fontSize: '10px', fontWeight: '700',
                      color: '#38bdf8',
                      backgroundColor: 'rgba(2, 132, 199, 0.2)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      padding: '1px 6px',
                      borderRadius: '6px',
                      letterSpacing: '0.05em'
                    }}
                  >
                    AI ENGINE
                  </span>
                </div>
                <span 
                  style={{
                    fontSize: '10px', fontWeight: '600',
                    color: '#94a3b8', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '2px'
                  }}
                >
                  Coding RNA Analysis in Bacteria
                </span>
              </div>
            </button>

    {/* Menú reordenado por flujo UX */}
    <nav style={styles.navLinks}>
    <button onClick={() => handleNav('run')} style={currentView === 'run' ? styles.navLinkActive : styles.navLink}>Run</button>
    <button onClick={() => handleNav('tutorial')} style={currentView === 'tutorial' ? styles.navLinkActive : styles.navLink}>Tutorial</button>
    <button onClick={() => handleNav('about')} style={currentView === 'about' ? styles.navLinkActive : styles.navLink}>About</button>
    <button onClick={() => handleNav('download')} style={currentView === 'download' ? styles.navLinkActive : styles.navLink}>Download</button>
    <button onClick={() => handleNav('contact')} style={currentView === 'contact' ? styles.navLinkActive : styles.navLink}>Contact</button>
    </nav>
    </div>
    </header>
  );
};

/* Component imported from ./components/RunSection */

const Footer = () => (
  <footer style={styles.footer}>
  <p style={{ fontSize: '12px', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>
  Copyright © 2026 Laboratory of Integrative Bioinformatics - University of Chile
  </p>
  </footer>
);

// ==========================================
// COMPONENTE PRINCIPAL APP
// ==========================================
function App() {
  // 1. Leemos la última vista guardada en memoria, o usamos 'run' por defecto
  const [currentView, setView] = useState(() => {
    return localStorage.getItem('currentTab') || 'run';
  });

  // 2. Cada vez que cambies de pestaña, la guardamos en la memoria del navegador
  React.useEffect(() => {
    localStorage.setItem('currentTab', currentView);
  }, [currentView]);
  const fastaUpload = useFastaUpload();
  const organismSelect = useOrganismSelect();
  const analysisRunner = useAnalysisRunner();

  const handleRun = () => {
    analysisRunner.executeAnalysis(
      fastaUpload.file,
      organismSelect.selectedOrganism
    );
  };

  return (
    <BrowserRouter>
    <div style={styles.wrapper}>
    <style>{`
      body { margin: 0; padding: 0; background-color: #0f172a; }
      * { box-sizing: border-box; }
      #nprogress .bar { background: #22c55e !important; }
      #nprogress .peg { box-shadow: 0 0 10px #22c55e, 0 0 5px #22c55e !important; }
      .progress-bar { background-color: #22c55e !important; transition: width 0.2s ease !important; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

      <Navbar currentView={currentView} setView={setView} />

      <main style={styles.container}>
      <Routes>
        <Route path="/" element={
          <>
          {currentView === 'run' && (
            <div style={{ width: '100%' }}>
            <section style={styles.hero}>
        <img src="/src/assets/logo.png" alt="CRAB Logo" style={{ maxWidth: '200px', margin: '0 auto 16px auto', display: 'block', borderRadius: '12px' }} />
        </section>

        <FastaUploadCard
        file={fastaUpload.file}
        error={fastaUpload.error}
        isDragging={fastaUpload.isDragging}
        isUploading={fastaUpload.isUploading}
        onFileSelect={fastaUpload.handleFileSelect}
        onClearFile={fastaUpload.clearFile}
        onDragOver={fastaUpload.handleDragOver}
        onDragLeave={fastaUpload.handleDragLeave}
        onDrop={fastaUpload.handleDrop}
        />

        <OrganismCard
        selectedOrganism={organismSelect.selectedOrganism}
        organismOptions={organismSelect.organismOptions}
        onOrganismChange={organismSelect.setSelectedOrganism}
        isLoading={organismSelect.isLoading}
        />

        <RunSection
        isRunning={analysisRunner.isRunning}
        disabled={!fastaUpload.file || Boolean(fastaUpload.error)}
        onClick={handleRun}
        result={analysisRunner.result}
        file={fastaUpload.file}
        />


        </div>
      )}

      {currentView === 'about' && <About />}

      {currentView === 'tutorial' && <Tutorial />}

      {currentView === 'download' && <Download />}

      {currentView === 'contact' && <Contact />}
          </>
        } />
        <Route path="/results" element={<Results />} />
      </Routes>
      </main>

      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
