import React, { useState } from 'react';

// ==========================================
// STYLES
// ==========================================
const styles = {
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '8px'
  },
  heroH1: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#f8fafc',
    margin: '0 0 8px 0'
  },
  heroP: {
    fontSize: '16px',
    color: '#94a3b8',
    margin: 0
  },
  // Main Wrapper Card (Matches Contact.jsx)
  mainCard: {
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '24px',
    backgroundColor: '#1e293b',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
  },
  mainCardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#f8fafc',
    margin: '0 0 16px 0',
    borderBottom: '1px solid #334155',
    paddingBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  mainCardDesc: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  // Grid and Inner Cards
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    width: '100%'
  },
  innerCard: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },
  cardIcon: {
    color: '#38bdf8',
    fontSize: '20px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#f8fafc',
    margin: 0
  },
  cardBody: {
    fontSize: '13px',
    color: '#94a3b8',
    lineHeight: '1.5',
    marginBottom: '16px',
    flex: 1
  },
  readMoreBtn: {
    background: 'none',
    border: 'none',
    color: '#38bdf8',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    alignSelf: 'flex-start'
  },
  // Modal styles
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: '#1e293b',
    border: '1px solid #38bdf8',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '85vh',
    overflowY: 'auto',
    padding: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #334155',
    paddingBottom: '12px',
    marginBottom: '16px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#f8fafc',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '24px',
    padding: '4px'
  },
  modalBody: {
    color: '#94a3b8',
    fontSize: '15px',
    lineHeight: '1.6'
  },
  modalList: {
    paddingLeft: '20px',
    margin: '12px 0'
  },
  modalListItem: {
    marginBottom: '10px'
  },
  teamRole: {
    color: '#38bdf8',
    fontWeight: '600',
    display: 'block',
    marginTop: '20px',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  teamName: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: '18px',
    margin: '4px 0'
  }
};

// ==========================================
// 4 SEMANTIC BLOCKS DATA
// ==========================================
const BLOCKS_DATA = {
  overview: {
    id: 'overview',
    icon: 'info',
    title: 'Overview & Mission',
    snippet: 'CRAB is a high-performance bioinformatics pipeline for nucleotide coding potential prediction using Machine Learning.',
    fullContent: (
      <>
      <p>
      <strong>CRAB</strong> is a high-performance bioinformatics pipeline
      designed for <strong>nucleotide coding potential prediction</strong> using
      advanced Machine Learning architectures. It enables researchers
      to process FASTA sequences to determine coding or non-coding
      characteristics with industry-leading accuracy.
      </p>
      <h4 style={{ color: '#f8fafc', marginTop: '20px', marginBottom: '8px' }}>Our Mission</h4>
      <p>
      To provide a robust, scalable tool that simplifies massive genomic analysis,
      enabling ML model inference over real-time biological data streams.
      </p>
      </>
    )
  },
  origins: {
    id: 'origins',
    icon: 'science',
    title: 'Scientific Origins',
    snippet: 'Originating from groundbreaking PhD research and developed by a specialized team of bioinformaticians.',
    fullContent: (
      <>
      <p>This application bridges the gap between academic research and applied computational tools, bringing high-end genomics to researchers worldwide.</p>

      <span style={styles.teamRole}>Original Research</span>
      <h4 style={styles.teamName}>Nathaly Elizalde Araya</h4>
      <p style={{ margin: 0 }}>PhD Student. Her foundational paper served as the scientific bedrock for the biological algorithms and assumptions applied within this application.</p>

      <span style={styles.teamRole}>Lead Architect & Developer</span>
      <h4 style={styles.teamName}>Andrey Vinajera Zamora</h4>
      <p style={{ margin: 0 }}>PhD Student. Engineered the high-performance backend, ML inference pipeline, and the decoupled React frontend architecture.</p>

      <span style={styles.teamRole}>Academic Advisor & Supervisor</span>
      <h4 style={styles.teamName}>Dr. Raul Arias-Carrasco</h4>
      <p style={{ margin: 0, marginBottom: '8px' }}>
      <strong>Director:</strong> Doctorado en Informática Aplicada a Salud y Medio Ambiente (UTEM).<br/>
      <strong>Investigador:</strong> Universidad Mayor, focusing on bioinformatics and genomics.
      </p>
      <p style={{ fontSize: '13px' }}>
      Dr. Arias-Carrasco brings extensive industry and academic experience. Formerly a Senior Bioinformatician at uBiome applying ML/AI to wellness products, and Postdoctoral Researcher at Accdis. His expertise ensures the scientific rigor of this platform.
      </p>
      </>
    )
  },
  architecture: {
    id: 'architecture',
    icon: 'account_tree',
    title: 'Technical Architecture',
    snippet: 'Built with Vertical Slice Architecture, XGBoost, a high-speed FastAPI backend, and a modern React 19 interface.',
    fullContent: (
      <ul style={styles.modalList}>
      <li style={styles.modalListItem}>
      <strong>Vertical Slice Architecture:</strong> Designed with hexagonal boundaries to decouple business logic from technical infrastructure.
      </li>
      <li style={styles.modalListItem}>
      <strong>Machine Learning Core:</strong> Optimized with <strong>XGBoost</strong> (via Scikit-Learn) and Joblib persistence for efficient model loading.
      </li>
      <li style={styles.modalListItem}>
      <strong>Bioinformatic Processing:</strong> Powered by <strong>Biopython</strong> for FASTA/FASTQ stream parsing, ensuring industry-standard data handling.
      </li>
      <li style={styles.modalListItem}>
      <strong>High-Speed Backend:</strong> Built with <strong>FastAPI</strong> (Python 3.11+), leveraging dependency injection and asynchronous processing.
      </li>
      <li style={styles.modalListItem}>
      <strong>Modern Interface:</strong> Crafted with <strong>React 19 and Vite</strong>, featuring a dark theme design system.
      </li>
      </ul>
    )
  },
  features: {
    id: 'features',
    icon: 'featured_play_list',
    title: 'Key Features',
    snippet: 'Supports multi-organism analysis, large file handling, Docker orchestration, and military-grade testing.',
    fullContent: (
      <ul style={styles.modalList}>
      <li style={styles.modalListItem}>
      <strong>Multi-Organism Analysis:</strong> Dynamic parameter adjustment based on target species to ensure accurate predictions.
      </li>
      <li style={styles.modalListItem}>
      <strong>Large File Handling:</strong> Multipart upload system transforming raw sequences into structured Data Transfer Objects (DTOs).
      </li>
      <li style={styles.modalListItem}>
      <strong>High Availability Infrastructure:</strong> Full orchestration via <strong>Docker Compose</strong> with an Nginx Reverse Proxy for production environments.
      </li>
      <li style={styles.modalListItem}>
      <strong>Military-Grade Quality:</strong> Comprehensive test suite (Pytest) validating dependency integrity and biometric parser accuracy.
      </li>
      </ul>
    )
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function About() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <main style={styles.container}>
    {/* Header */}
    <header style={styles.hero}>
    <h1 style={styles.heroH1}>About RNA Mining</h1>
    <p style={styles.heroP}>Predicting Neural Coding Potential with High Precision</p>
    </header>

    <article>
    {/* Main Wrapper Container matching Contact page style */}
    <section style={styles.mainCard} aria-labelledby="about-details-title">
    <h2 id="about-details-title" style={styles.mainCardTitle}>
    <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>dashboard</span>
    Project Information
    </h2>
    <p style={styles.mainCardDesc}>
    Explore the core concepts, scientific background, and technical architecture powering our prediction pipeline. Select a module below to learn more.
    </p>

    {/* 4 Semantic Blocks Grid inside the container */}
    <div style={styles.grid} aria-label="About Information Modules">
    {Object.values(BLOCKS_DATA).map((block) => (
      <article key={block.id} style={styles.innerCard}>
      <div>
      <div style={styles.cardHeader}>
      <span className="material-symbols-outlined" style={styles.cardIcon}>
      {block.icon}
      </span>
      <h3 style={styles.cardTitle}>{block.title}</h3>
      </div>
      <p style={styles.cardBody}>{block.snippet}</p>
      </div>
      <button
      onClick={() => setActiveModal(block.id)}
      style={styles.readMoreBtn}
      aria-label={`Read more about ${block.title}`}
      >
      Read more... <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
      </button>
      </article>
    ))}
    </div>
    </section>
    </article>

    {/* Floating Modal */}
    {activeModal && BLOCKS_DATA[activeModal] && (
      <div
      style={styles.overlay}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      >
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
      <header style={styles.modalHeader}>
      <h3 id="modal-title" style={styles.modalTitle}>
      <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>
      {BLOCKS_DATA[activeModal].icon}
      </span>
      {BLOCKS_DATA[activeModal].title}
      </h3>
      <button onClick={closeModal} style={styles.closeBtn} aria-label="Close modal">
      <span className="material-symbols-outlined">close</span>
      </button>
      </header>

      <div style={styles.modalBody}>
      {BLOCKS_DATA[activeModal].fullContent}
      </div>
      </div>
      </div>
    )}
    </main>
  );
}
