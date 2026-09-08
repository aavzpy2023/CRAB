import React, { useState } from 'react';

const btnStyle = {
    padding: '6px 12px',
    backgroundColor: '#0284c7',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
};

const thStyle = { 
    padding: '12px 8px', 
    borderBottom: '2px solid #334155',
    color: '#94a3b8',
    fontWeight: '600'
};

const tdStyle = { 
    padding: '12px 8px', 
    borderBottom: '1px solid #1e293b',
    color: '#f8fafc'
};

const formatId = (id) => {
    if (!id) return 'unknown';
    const lower = id.toLowerCase();
    const type = lower.includes('ncrna') ? 'ncrna' : (lower.includes('cds') ? 'cds' : '');
    const geneMatch = id.match(/gene:(\S+)/);
    if (geneMatch) return `${geneMatch[1]} ${type}`.trim();
    return `${id.split(' ')[0]} ${type}`.trim();
};

const getClassification = (id, fallback) => {
    const lower = (fallback || id || '').toLowerCase();
    if (lower.includes('coding') && !lower.includes('non')) return 'coding_protein';
    if (lower.includes('ncrna') || lower.includes('non')) return 'ncRNA';
    return fallback || 'unknown';
};

/**
 * Pure presentational table for sequence predictions.
 * Strictly consumes state via passed handlers. No internal logic.
 */
export const ResultsTable = ({ data, searchHandlers, paginationHandlers }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const { search, setSearch } = searchHandlers;
    const { currentPage, totalPages, setPage } = paginationHandlers;

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search sequences..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #334155',
                        background: '#1e293b',
                        color: '#f8fafc',
                        width: '250px'
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                        style={{ ...btnStyle, opacity: currentPage === 1 ? 0.5 : 1 }}
                        disabled={currentPage === 1} 
                        onClick={() => setPage(currentPage - 1)}
                    >
                        Prev
                    </button>
                    <span style={{ color: '#94a3b8', fontSize: '14px' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        style={{ ...btnStyle, opacity: currentPage === totalPages ? 0.5 : 1 }}
                        disabled={currentPage === totalPages} 
                        onClick={() => setPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ ...thStyle, width: '33%' }}>Sequence ID</th>
                        <th style={{ ...thStyle, width: '33%' }}>Coding Potential</th>
                        <th style={{ ...thStyle, width: '33%' }}>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td style={tdStyle}>
                                <span 
                                    style={{ color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => setSelectedRow(row)}
                                >
                                    {formatId(row.id)}
                                </span>
                            </td>
                            <td style={tdStyle}>
                                {getClassification(row.id, row.classification || row.prediction)}
                            </td>
                            <td style={tdStyle}>
                                {Number(row.probability || 0).toFixed(4)}
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                                No sequences match your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedRow && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#1e293b', padding: '24px', borderRadius: '8px', maxWidth: '800px', width: '90%', color: '#f8fafc', border: '1px solid #334155' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Sequence Details</h3>
                        <div style={{ marginBottom: '16px', wordBreak: 'break-all', fontFamily: 'monospace', background: '#0f172a', padding: '12px', borderRadius: '4px' }}>
                            <strong style={{ color: '#94a3b8' }}>Full Header:</strong><br />
                            {selectedRow.id}
                        </div>
                        {selectedRow.sequence && (
                            <div style={{ maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace', background: '#0f172a', padding: '12px', borderRadius: '4px', wordBreak: 'break-all', marginBottom: '16px' }}>
                                <strong style={{ color: '#94a3b8' }}>Sequence:</strong><br />
                                {selectedRow.sequence}
                            </div>
                        )}
                        <button onClick={() => setSelectedRow(null)} style={btnStyle}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsTable;