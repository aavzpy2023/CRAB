import React, { useEffect, useRef } from 'react';
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
    Example of results are made available <a href="#" style={{ color: '#38bdf8', textDecoration: 'underline' }}>here</a>.
    </p>
    </section>
    );
};

export default RunSection;
