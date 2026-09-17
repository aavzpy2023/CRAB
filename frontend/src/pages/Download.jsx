import React from 'react';

const DOWNLOAD_ASSETS = {
    standalone: "/standalone.zip",
    samples: "/samples.zip"
};

// ==========================================
// STYLES (Identical sizing and layout as other pages)
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
        justifyContent: 'flex-start',
        position: 'relative'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '12px'
    },
    cardIcon: {
        color: '#38bdf8',
        fontSize: '28px',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        padding: '8px',
        borderRadius: '8px'
    },
    name: {
        fontSize: '18px',
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
        fontSize: '14px',
        color: '#94a3b8',
        lineHeight: '1.5',
        marginBottom: '20px',
        flex: 1
    },
    codeBlock: {
        backgroundColor: '#020617',
        color: '#4ade80',
        padding: '12px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '13px',
        border: '1px solid #1e293b',
        marginBottom: '20px',
        overflowX: 'auto'
    },
    actionBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: '#38bdf8',
        color: '#0f172a',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '700',
        padding: '12px 16px',
        borderRadius: '8px',
        width: '100%',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: 'auto'
    },
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        color: '#38bdf8',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '600',
        padding: '12px 16px',
        borderRadius: '8px',
        width: '100%',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginTop: 'auto'
    }
};

export default function Download() {
    return (
        <main style={styles.container}>
        <header style={styles.hero}>
        <h1 style={styles.heroH1}>Downloads & Resources</h1>
        <p style={styles.heroP}>Access the source code, pre-trained models, and sample datasets.</p>
        </header>

        <article>
        <section style={styles.mainCard}>
        <h2 style={styles.mainCardTitle}>
        <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>cloud_download</span>
        Repository & Local Deployment
        </h2>
        <p style={styles.mainCardDesc}>
        RNAmining is fully open-source. For massive dataset processing or integration into your own HPC pipelines, we recommend downloading and running the platform locally.
        </p>

        <div style={styles.grid}>
        {/* GitHub Repository Card */}
        <article style={styles.innerCard}>
        <div style={styles.cardHeader}>
        <span className="material-symbols-outlined" style={styles.cardIcon}>code</span>
        <div>
        <h3 style={styles.name}>Standalone CLI</h3>
        <p style={styles.role}>Offline Script Execution</p>
        </div>
        </div>
        <p style={styles.cardBody}>
        Run the standalone Python CLI script for offline FASTA inference locally on your own machine without relying on the web platform.
        </p>

        {/* CLI Download Link */}

        <a
        href={DOWNLOAD_ASSETS.standalone}
        download="standalone.zip"
        rel="noopener noreferrer"
        style={styles.actionBtn}
        >
        <span className="material-symbols-outlined">download</span>
        Download CLI
        </a>
        </article>

        {/* Test Datasets Card */}
        <article style={styles.innerCard}>
        <div style={styles.cardHeader}>
        <span className="material-symbols-outlined" style={styles.cardIcon}>dataset</span>
        <div>
        <h3 style={styles.name}>Sample Datasets</h3>
        <p style={styles.role}>.fasta Files</p>
        </div>
        </div>
        <p style={styles.cardBody}>
        Want to test the web platform immediately? Download these small standard <code>.fasta</code> datasets containing mixed coding and non-coding RNA sequences.
        </p>

        <ul style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.8', marginBottom: '20px', paddingLeft: '20px' }}>
        <li><strong>sample_human.fasta</strong> (10 sequences)</li>
        <li><strong>sample_mouse.fasta</strong> (10 sequences)</li>
        </ul>

        {/* Botón visual que los usuarios pueden usar para descargar los archivos de prueba en el futuro */}
        <a
        href={DOWNLOAD_ASSETS.samples}
        download="samples.zip"
        style={styles.secondaryBtn}
        >
        <span className="material-symbols-outlined">download</span>
        Download Sample Data
        </a>
        </article>

        </div>
        </section>
        </article>
        </main>
    );
}
