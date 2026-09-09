import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    runButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(2, 132, 199, 0.3)' }
};

/**
 * Safely zips raw sequence data with backend predictions.
 * @param {string} text Raw FASTA string from file upload
 * @param {object} apiResult Backend DTO containing prediction matrix
 * @returns {Array<{id: string, sequence: string, prediction: string, probability: number}>}
 */
const createUnifiedData = (text, apiResult) => {
    const predictions = apiResult?.predictions || apiResult?.results || [];
    if (predictions.length > 0 && predictions[0].sequence) {
        return predictions.map(p => {
            const cls = p.classification || p.prediction || 'Unknown';
            return {
                id: p.id || p.header,
                sequence: p.sequence,
                prediction: cls,
                classification: cls,
                probability: p.probability ?? 0.0
            };
        });
    }
    const blocks = text.split('>').filter(b => b.trim());
    
    return blocks.map((block, index) => {
        const lines = block.split('\n');
        const id = lines[0].trim();
        const sequence = lines.slice(1).join('').replace(/\s/g, '');
        const cls = predictions[index]?.classification || 'unknown';
        return {
            id,
            sequence,
            prediction: cls,
            classification: cls,
            probability: predictions[index]?.probability || 0.0
        };
    });
};

export const RunSection = ({ isRunning, disabled, onClick, result, file }) => {
    const navigate = useNavigate();
    const wasRunningRef = useRef(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (wasRunningRef.current && !isRunning && result && file) {
            const processAndNavigate = async () => {
                try {
                    let text = '';
                    if (typeof file.text === 'function') {
                        text = await file.text();
                    } else {
                        text = typeof file === 'string' ? file : '';
                    }
                    const unifiedData = createUnifiedData(text, result);
                    navigate('/results', { state: { data: unifiedData } });
                } catch (err) {
                    console.error('Error parsing file before navigation:', err);
                }
            };
            processAndNavigate();
        }
        wasRunningRef.current = isRunning;
    }, [result, file, isRunning, navigate]);

    return (
    <section style={{ textAlign: 'center', marginTop: '16px' }}>
    <button
    style={{
        ...styles.runButton,
        ...(disabled || isRunning ? { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' } : {})
    }}
    onClick={onClick}
    disabled={disabled || isRunning}
    >
    {isRunning ? (
        <>
        <span className="material-symbols-outlined animate-spin">sync</span>
        Running...
        </>
    ) : (
        <>
        <span className="material-symbols-outlined">play_circle</span>
        Run RNAmining
        </>
    )}
    </button>
    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>
      Example of results are made available{' '}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        style={{
          color: '#38bdf8',
          textDecoration: 'underline',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontSize: '13px'
        }}
      >
        here
      </button>
      .
    </p>

    {isModalOpen && (
      <div
        style={{
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
        }}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '750px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            border: '1px solid #334155',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'left'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}
          >
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '18px' }}>
              📊 Example Prediction Results (.fasta)
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Cutoff Threshold: 0.4629
            </span>
          </div>

          {/* Box 1: ncRNA */}
          <div style={{ marginBottom: '16px' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px'
              }}
            >
              <span 
                style={{
                  height: '8px',
                  width: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b'
                }}
              />
              <strong style={{ fontSize: '13px', color: '#cbd5e1' }}>
                ncRNA.fasta (non-coding)
              </strong>
            </div>
            <pre
              style={{
                backgroundColor: '#0f172a',
                color: '#38bdf8',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                maxHeight: '150px',
                border: '1px solid #334155',
                margin: 0
              }}
            >
{`>NGAF01000006.1/2237-1938 prediction=ncRNA prob=0.0658
ACGGAGGGGCGGAAGGCCAAGATCGAAACGGAAGAGAAGGTTCGATCTCCCATCCGCACT
TCCCAGCACGGACGCCAGGCACCCACGCGGAGCGCGCCGCGACAAGGGCAGAAGCGTTGT
GGGCCTGCGAAATTCGAATTCACGTCGGCAATGGCCTCGCACAGGTTGCGGGGATGAACC
GGCGGGGTGCGGATGATCGCCGAGGCCGCAGAACACAACCCGACAAGCACGCTTGGTAAC
CGGGTAGTCCGTGCTAGCGGGCGGTGAGGCCGACGACGGCTACGCCGCCCGCTTCGATGT
`}
            </pre>
          </div>

          {/* Box 2: coding_protein */}
          <div style={{ marginBottom: '20px' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px'
              }}
            >
              <span 
                style={{
                  height: '8px',
                  width: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e'
                }}
              />
              <strong style={{ fontSize: '13px', color: '#cbd5e1' }}>
                coding_protein.fasta (coding)
              </strong>
            </div>
            <pre
              style={{
                backgroundColor: '#0f172a',
                color: '#4ade80',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                maxHeight: '150px',
                border: '1px solid #334155',
                margin: 0
              }}
            >
{`>SMKY01000176.1/1024-430 prediction=coding_protein prob=0.9194
ATGAGGGTGGTGCTGGTGCGGTGCAGAAAGTCGGTGCGGGCGTTTCGGACCTTGCGGCAG
GTGCGGGCGACCTTGTTCTTGGCCTTGCGGCAGTTGGCCGAACCGCGCTGCTTGCGGGCC
ATCCGCCGCTGGTGCCGGGCCAGATTCGTCGCCCTGCGCTCCAGATGGCGGGGGTTGGCA
ATCCGGTCCCCGTCCGAGGTGACCGCGAATTCCTTCACCCCCAGGTCGATGCCGATGGCG
TGCCCAGTGGCCGGCAGCGGGTCAGGGGCGTCGGTGTCGACGGCGAAGGTGACGTACCAG
CGGCCGTCCGCCTCCCGCGACACCACCACCATCGTCGGATTCAACCCGGCCAGATCCACA
TCCTCAAACGACCACACCAGCGCAAGCGGCGCGGTCGTTTTGGCCATCCACAACTCCCCG
CCTTTCATCCGGAACGCCGAGCGAGTGTAATGCGCCGTCTGCCGTCCGGTGCGGGACTTG
AATCTCGGGTGGCGGGCCCGTCCGGCGAAGAAGTTGGCGAATGCGGCGTGCTGGTGCCGC
AGCGTCTGCTGTAACGGAACCGAGGACACCTCCGATAGGAACGCCAACTCCTCGG
`}
            </pre>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#334155',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
    </section>
    );
};

export default RunSection;
