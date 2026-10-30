import React, { useState } from 'react';

// ==========================================
// STYLES (Identical sizing and layout as About/Contact)
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
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    stepBadge: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        backgroundColor: '#38bdf8',
        color: '#0f172a',
        fontWeight: 'bold',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
    codeBlock: {
        backgroundColor: '#0f172a',
        color: '#4ade80',
        padding: '10px 14px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        border: '1px solid #334155',
        margin: '12px 0',
        display: 'inline-block'
    },
    modalList: {
        paddingLeft: '20px',
        margin: '12px 0'
    },
    modalListItem: {
        marginBottom: '10px'
    }
};

// ==========================================
// TUTORIAL STEPS DATA
// ==========================================
const TUTORIAL_DATA = {
    step1: {
        id: 'step1',
        step: 1,
        icon: 'terminal',
        title: 'Setup & Installation',
        snippet: 'Deploy the application using Docker Compose to ensure high availability and easy setup.',
        fullContent: (
            <>
            <p>The application is orchestrated using Docker Compose to ensure high availability and seamless deployment.</p>
            <h4 style={{ color: '#f8fafc', margin: '16px 0 8px 0' }}>Launch the System</h4>
            <p>Open a terminal in the root directory of the project and execute the following command to build and start the backend (FastAPI), frontend (React), and reverse proxy (Nginx) containers:</p>
            <div style={styles.codeBlock}>docker compose up -d</div>
            <h4 style={{ color: '#f8fafc', margin: '16px 0 8px 0' }}>Access the Platform</h4>
            <p>Once the services are running, open your web browser and navigate to:</p>
            <div style={styles.codeBlock}>http://localhost</div>
            </>
        )
    },
    step2: {
        id: 'step2',
        step: 2,
        icon: 'upload_file',
        title: 'Data Upload (Dataset)',
        snippet: 'Load your sequences using the FastaUploadCard. The system performs strict biometric validation.',
        fullContent: (
            <>
            <p>The first section of the interface is the <strong>FastaUploadCard</strong>, where you will load your sequences.</p>
            <ul style={styles.modalList}>
            <li style={styles.modalListItem}>
            <strong>Supported Formats:</strong> The system accepts files with <code>.fasta</code>, <code>.fa</code>, <code>.fna</code>, <code>.ffn</code>, <code>.faa</code>, and <code>.frn</code> extensions.
            </li>
            <li style={styles.modalListItem}>
            <strong>Upload Methods:</strong> You can directly drag and drop the file into the dotted zone or click it to browse your file explorer.
            </li>
            <li style={styles.modalListItem}>
            <strong>Biometric Validation:</strong> The system performs strict validation to ensure sequences only contain valid characters (A, C, G, T, U) and automatically removes whitespaces.
            </li>
            <li style={styles.modalListItem}>
            <strong>View Examples:</strong> If you need to confirm the format, click "View sequences" to open a modal with standard RNA sequence examples.
            </li>
            </ul>
            </>
        )
    },
    step3: {
        id: 'step3',
        step: 3,
        icon: 'biotech',
        title: 'Model Configuration',
        snippet: 'Select the target species to apply specific prediction parameters for higher accuracy.',
        fullContent: (
            <>
            <p>Different organisms require specific prediction parameters to achieve maximum accuracy.</p>
            <ul style={styles.modalList}>
            <li style={styles.modalListItem}>
            <strong>Species Selection:</strong> In the "Organisms" card, use the dropdown menu to choose your target species (e.g., <em>Homo sapiens</em> or <em>Arabidopsis thaliana</em>).
            </li>
            <li style={styles.modalListItem}>
            <strong>Dynamic Loading:</strong> The list of available models automatically synchronizes with the backend via an API request (<code>/api/v1/models</code>), ensuring you always see the most up-to-date models installed on the server.
            </li>
            </ul>
            </>
        )
    },
    step4: {
        id: 'step4',
        step: 4,
        icon: 'play_circle',
        title: 'Execution & Analysis',
        snippet: 'Run the ML analysis powered by XGBoost and our high-speed FastAPI backend.',
        fullContent: (
            <>
            <p>Once the file is loaded and the organism is selected, the execution button will be enabled.</p>
            <ul style={styles.modalList}>
            <li style={styles.modalListItem}>
            <strong>Start Inference:</strong> Click the <strong>"Run evaluation"</strong> button.
            </li>
            <li style={styles.modalListItem}>
            <strong>Processing:</strong> The frontend securely transmits the data to the FastAPI backend, where the XGBoost engine (via Scikit-Learn) rapidly processes the sequences.
            </li>
            </ul>
            </>
        )
    },
    step5: {
        id: 'step5',
        step: 5,
        icon: 'analytics',
        title: 'Result Interpretation',
        snippet: 'Analyze the structured results containing predictions and confidence probabilities.',
        fullContent: (
            <>
            <p>The results will appear in a Results Card right below the execution button. The system returns a structured object containing the following data for each sequence:</p>
            <ul style={styles.modalList}>
            <li style={styles.modalListItem}>
            <strong>Header:</strong> The original FASTA sequence identifier.
            </li>
            <li style={styles.modalListItem}>
            <strong>Prediction:</strong> <br/>
            <code>1</code>: Identified as a coding sequence.<br/>
            <code>0</code>: Identified as a non-coding sequence.
            </li>
            <li style={styles.modalListItem}>
            <strong>Probability:</strong> The model's probability that the sequence is ncRNA, between 0 and 1. Values above the cutoff (<code>0.5466</code>) are classified as ncRNA (e.g., <code>0.9850</code> is a 98.5% probability of ncRNA).
            </li>
            </ul>
            </>
        )
    },
    step6: {
        id: 'step6',
        step: 6,
        icon: 'build',
        title: 'Maintenance & Support',
        snippet: 'Learn how to stop services safely and run military-grade system audits.',
        fullContent: (
            <>
            <p>System administrators and developers can manage the platform using the following tools:</p>
            <h4 style={{ color: '#f8fafc', margin: '16px 0 8px 0' }}>System Cleanup</h4>
            <p>To safely stop all services and clean up the containers, use the command:</p>
            <div style={styles.codeBlock}>make down</div>
            <h4 style={{ color: '#f8fafc', margin: '16px 0 8px 0' }}>Security & Audit</h4>
            <p>Developers can verify system integrity by running military-grade tests with pytest using the following command:</p>
            <div style={styles.codeBlock}>make audit</div>
            </>
        )
    }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Tutorial() {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <main style={styles.container}>
        {/* Semantic Header */}
        <header style={styles.hero}>
        <h1 style={styles.heroH1}>Platform Tutorial</h1>
        <p style={styles.heroP}>Step-by-step guide to predicting nucleotide coding potential.</p>
        </header>

        <article>
        {/* Main Wrapper Container */}
        <section style={styles.mainCard} aria-labelledby="tutorial-details-title">
        <h2 id="tutorial-details-title" style={styles.mainCardTitle}>
        <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>menu_book</span>
        User Guide
        </h2>
        <p style={styles.mainCardDesc}>
        This tutorial will guide you through the CRAB platform, a high-performance system designed to predict whether a nucleotide sequence is coding or non-coding using optimized Machine Learning models.
        </p>

        {/* Grid of Steps */}
        <div style={styles.grid} aria-label="Tutorial Steps">
        {Object.values(TUTORIAL_DATA).map((block) => (
            <article key={block.id} style={styles.innerCard}>
            <div style={styles.stepBadge}>{block.step}</div>
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
            aria-label={`Read more about step ${block.step}: ${block.title}`}
            >
            Read details... <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </button>
            </article>
        ))}
        </div>
        </section>
        </article>

        {/* Floating Modal */}
        {activeModal && TUTORIAL_DATA[activeModal] && (
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
            {TUTORIAL_DATA[activeModal].icon}
            </span>
            Step {TUTORIAL_DATA[activeModal].step}: {TUTORIAL_DATA[activeModal].title}
            </h3>
            <button onClick={closeModal} style={styles.closeBtn} aria-label="Close modal">
            <span className="material-symbols-outlined">close</span>
            </button>
            </header>

            <div style={styles.modalBody}>
            {TUTORIAL_DATA[activeModal].fullContent}
            </div>
            </div>
            </div>
        )}
        </main>
    );
}
