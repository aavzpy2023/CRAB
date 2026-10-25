import React, { useState } from 'react';

// ==========================================
// STYLES (Identical sizing and layout as About & Tutorial)
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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    avatarBadge: {
        position: 'absolute',
        top: '-12px',
        right: '-12px',
        backgroundColor: '#38bdf8',
        color: '#0f172a',
        fontWeight: '800',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        border: '2px solid #1e293b'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '12px'
    },
    cardIcon: {
        color: '#38bdf8',
        fontSize: '26px',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        padding: '8px',
        borderRadius: '8px'
    },
    name: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#f1f5f9',
        margin: '0 0 4px 0'
    },
    role: {
        fontSize: '12px',
        color: '#38bdf8',
        fontWeight: '600',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
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
        alignSelf: 'flex-start',
        marginBottom: '12px'
    },
    emailBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        color: '#38bdf8',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '600',
        padding: '10px 16px',
        borderRadius: '8px',
        width: '100%',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        transition: 'all 0.2s ease',
        wordBreak: 'break-all'
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
    sectionHeading: {
        color: '#f8fafc',
        fontSize: '16px',
        fontWeight: '600',
        marginTop: '16px',
        marginBottom: '8px'
    }
};

// ==========================================
// CONTACT DIRECTORY DATA WITH MODALS
// ==========================================
const CONTACT_DATA = {
    nathaly: {
        id: 'nathaly',
        badge: 'NE',
        icon: 'biotech',
        name: 'Nathaly Elizalde Araya',
        role: 'Original Research',
        snippet: 'PhD Student & Paper Author. Developed the foundational research and biological algorithms powering coding RNA assesment.',
        email: 'nathaly.elizaldea@utem.cl',
        fullContent: (
            <>
            <p>
            <strong>Nathaly Elizalde Araya</strong> is a Doctoral Candidate in Applied Informatics (Health & Environment) at Universidad Tecnológica Metropolitana (UTEM).
            </p>
            <h4 style={styles.sectionHeading}>Scientific Background</h4>
            <p>
            Her original research paper established the scientific bedrock for predicting nucleotide coding potential using machine learning features. She led the biological feature extraction and parameter selection methodologies applied throughout this project.
            </p>
            <h4 style={styles.sectionHeading}>Research Focus</h4>
            <ul>
            <li>Genomic sequence encoding & k-mer composition analysis.</li>
            <li>Comparative biological validation across target organisms.</li>
            <li>Machine Learning evaluation metrics for bioinformatics pipelines.</li>
            </ul>
            </>
        )
    },
    andrey: {
        id: 'andrey',
        badge: 'AV',
        icon: 'terminal',
        name: 'Andrey Vinajera Zamora',
        role: 'Lead Architect & Data Scientist',
        snippet: 'Tech Lead with 15+ years of experience. Expert in Machine Learning, Python architecture (FastAPI), and QA automation.',
        email: 'avinajera2011@gmail.com',
        fullContent: (
            <>
            <p>
            <strong>Andrey Vinajera Zamora</strong> is a Data Scientist and Tech Lead with 15+ years in Operations Research and 5+ years building Machine Learning solutions, ranging from neural networks to Generative AI and LLMs.
            </p>
            <h4 style={styles.sectionHeading}>Technical Architecture & Quality</h4>
            <p>
            Expert in the Python ecosystem (FastAPI, Pandas, Scikit-learn, TensorFlow). Currently leading Quality Assurance (QA) strategies, developing test automation scripts and robust infrastructure (Docker, vector databases) to ensure enterprise-grade software.
            </p>
            <h4 style={styles.sectionHeading}>Scientific & Academic Background</h4>
            <ul>
            <li><strong>Computational epidemiology:</strong> Design and implementation of ML models (Random Forest) for geospatial prediction of disease outbreaks.</li>
            <li><strong>Teaching & research:</strong> Former professor and researcher (UCLV) for over a decade, with multiple peer-reviewed publications and supervision of data science degree projects.</li>
            </ul>
            </>
        )
    },
    raul: {
        id: 'raul',
        badge: 'RA',
        icon: 'account_balance',
        name: 'Dr. Raul Arias Carrasco',
        role: 'Academic Advisor',
        snippet: 'Doctorate Director (UTEM) & Researcher (Univ. Mayor). Senior expert in Machine Learning applications in genomics.',
        email: 'raul.arias@utem.cl',
        fullContent: (
            <>
            <p>
            <strong>Dr. Raul Arias-Carrasco</strong> serves as Project Supervisor and Academic Advisor for the CRAB platform.
            </p>
            <h4 style={styles.sectionHeading}>Current Appointments</h4>
            <p>
            <strong>Director:</strong> Doctorado en Informática Aplicada a Salud y Medio Ambiente, Universidad Tecnológica Metropolitana (UTEM).<br />
            <strong>Researcher:</strong> Universidad Mayor, specializing in integrative bioinformatics and molecular algorithms.
            </p>
            <h4 style={styles.sectionHeading}>Professional Experience</h4>
            <p>
            Dr. Arias-Carrasco brings extensive industry and academic leadership. Formerly a Senior Bioinformatician at uBiome applying AI/ML to health products, and Postdoctoral Researcher at ACCDIS. His oversight ensures scientific rigor and industry readiness.
            </p>
            </>
        )
    }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Contact() {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <main style={styles.container}>
        {/* Semantic Header */}
        <header style={styles.hero}>
        <h1 style={styles.heroH1}>Get in Touch</h1>
        <p style={styles.heroP}>Reach out to our academic and technical team for inquiries and collaborations.</p>
        </header>

        <article>
        {/* Main Wrapper Container */}
        <section style={styles.mainCard} aria-labelledby="directory-title">
        <h2 id="directory-title" style={styles.mainCardTitle}>
        <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>contact_mail</span>
        Project Directory
        </h2>
        <p style={styles.mainCardDesc}>
        For research inquiries, technical support, or academic collaborations, select a team member below to view their detailed profile or contact them directly:
        </p>

        <div style={styles.grid} aria-label="Team Members Directory">
        {Object.values(CONTACT_DATA).map((person) => (
            <article key={person.id} style={styles.innerCard}>
            <div style={styles.avatarBadge}>{person.badge}</div>
            <div>
            <div style={styles.cardHeader}>
            <span className="material-symbols-outlined" style={styles.cardIcon}>
            {person.icon}
            </span>
            <div>
            <h3 style={styles.name}>{person.name}</h3>
            <p style={styles.role}>{person.role}</p>
            </div>
            </div>
            <p style={styles.cardBody}>{person.snippet}</p>
            </div>

            <div>
            <button
            onClick={() => setActiveModal(person.id)}
            style={styles.readMoreBtn}
            aria-label={`View detailed profile for ${person.name}`}
            >
            View profile... <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>

            <a href={`mailto:${person.email}`} style={styles.emailBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
            {person.email}
            </a>
            </div>
            </article>
        ))}
        </div>
        </section>
        </article>

        {/* Floating Modal */}
        {activeModal && CONTACT_DATA[activeModal] && (
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
            {CONTACT_DATA[activeModal].icon}
            </span>
            {CONTACT_DATA[activeModal].name}
            </h3>
            <button onClick={closeModal} style={styles.closeBtn} aria-label="Close modal">
            <span className="material-symbols-outlined">close</span>
            </button>
            </header>

            <div style={styles.modalBody}>
            {CONTACT_DATA[activeModal].fullContent}
            </div>
            </div>
            </div>
        )}
        </main>
    );
}
