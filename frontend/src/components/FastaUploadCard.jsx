import React, { useRef, useState } from 'react';

export function FastaUploadCard({
  file,
  error,
  isDragging,
  isUploading,
  onFileSelect,
  onClearFile,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = {
    card: {
      border: isDragging ? '1px solid #38bdf8' : '1px solid #334155',
      borderRadius: '16px',
      padding: '20px',
      backgroundColor: '#1e293b',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
      textAlign: 'left',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #334155',
      paddingBottom: '10px',
      marginBottom: '16px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#f8fafc',
      margin: 0,
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    actionBtn: {
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: 0,
      transition: 'color 0.2s',
    },
    dropZone: {
      border: isDragging ? '2px dashed #38bdf8' : '2px dashed #475569',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: isDragging ? '#1e293b' : '#0f172a',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    icon: {
      fontSize: '32px',
      marginBottom: '8px',
    },
    fileInfo: {
      color: '#38bdf8',
      fontWeight: '600',
      marginTop: '8px',
    },
    errorText: {
      color: '#f87171',
      fontSize: '14px',
      marginTop: '8px',
    },
    button: {
      backgroundColor: '#334155',
      color: '#f8fafc',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '12px',
    },
      hiddenInput: {
        display: 'none',
      },
      progressBarContainer: {
        marginTop: '16px',
        width: '100%',
        backgroundColor: '#334155',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '24px',
        position: 'relative'
      },
      progressBarFill: {
        height: '100%',
        backgroundColor: '#4ade80',
        width: '100%',
        animation: 'progress 0.6s ease-out forwards',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '12px',
        boxSizing: 'border-box'
      },
      progressText: {
        color: '#0f172a',
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
      },
      modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '600px',
      width: '90%',
      border: '1px solid #334155',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    samplePre: {
      backgroundColor: '#0f172a',
      color: '#38bdf8',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '13px',
      fontFamily: 'monospace',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      marginTop: '16px',
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <>
    <style>{`
      @keyframes progress {
        0% { width: 0%; }
        100% { width: 100%; }
      }
    `}</style>
    <div style={styles.card} data-testid="fasta-upload-card">
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>Dataset</h2>
        <div style={styles.headerActions}>
          <button
            style={styles.actionBtn}
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', pointerEvents: 'none' }}>
              visibility
            </span>
            View sequences
          </button>

        </div>
      </div>

      <div
        style={styles.dropZone}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".fasta,.fa,.fna,.ffn,.faa,.frn,.txt"
          style={styles.hiddenInput}
          onChange={handleInputChange}
          data-testid="fasta-file-input"
        />
        <div style={styles.icon}>🧬</div>
        <h3 style={{ margin: '8px 0', color: '#f8fafc' }}>
          Drag and drop your FASTA file here
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
          Supports .fasta, .fa extensions or click to browse
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
        <button
          style={{
            ...styles.button,
            marginTop: 0,
            whiteSpace: 'nowrap',
            backgroundColor: file ? '#ef4444' : '#0284c7',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '600'
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (file) {
              onClearFile();
            } else {
              inputRef.current?.click();
            }
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            {file ? 'delete' : 'upload_file'}
          </span>
          {file ? 'Remove file' : 'Upload file'}
        </button>

        <div style={{ flex: 1 }}>
          {isUploading && (
            <div style={{ ...styles.progressBarContainer, marginTop: 0 }}>
              <div style={styles.progressBarFill}></div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f8fafc', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Uploading...</span>
              </div>
            </div>
          )}

          {file && !isUploading && (
            <div style={{ ...styles.progressBarContainer, marginTop: 0 }}>
              <div style={{ ...styles.progressBarFill, animation: 'none', width: '100%' }}></div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>📄 {file.name} ({(file.size / 1024).toFixed(1)} KB) - Complete</span>
              </div>
            </div>
          )}

          {!file && !isUploading && (
            <div style={{ ...styles.progressBarContainer, marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>No file selected</span>
            </div>
          )}
        </div>
      </div>

      {error && !isUploading && <p style={styles.errorText}>❌ {error}</p>}

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, color: '#f8fafc' }}>FASTA Examples</h3>
            <pre style={styles.samplePre}>
              {`>RNA_Sequence_1
GTCTCCCCTAGAGTTCCCTTGACCACTTCACTGGGGACCTTCTCTAATTATAATGACTTC
CTACTGAAGTGTTTGGGGGAACTCCTGGTGCCAT

>RNA_Sequence_2
ATCGCTTCTCGGCCTTTTGGCTAAGATCAAGTGTAGGAACAAATATATTTGAAGTTTTTA
TAACTTTGTTTTTTGAAATTAATGTTTGGTTGTCAGAGATCACAATTTCTTTTCAGTAAT
TTCTAGGAATATTCTCA`}
            </pre>
            <button style={{ ...styles.button, width: '100%' }} onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default FastaUploadCard;