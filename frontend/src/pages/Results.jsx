import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useFastaExport } from '../hooks/useFastaExport';
import { useTableLogic } from '../hooks/useTableLogic';
import { ResultsTable } from '../components/ResultsTable';

const isCodingRecord = (item) => {
  const cls = (item.classification || item.prediction || '').toLowerCase();
  return cls.includes('coding') && !cls.includes('non');
};

const isNonCodingRecord = (item) => {
  const cls = (item.classification || item.prediction || '').toLowerCase();
  return cls.includes('ncrna') || cls.includes('non');
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || [];
  const validData = data.filter(item => Number(item.probability) > 0);
  const hiddenCount = data.length - validData.length;
  const hasCoding = validData.some(isCodingRecord);
  const hasNonCoding = validData.some(isNonCodingRecord);
  const tableHandlers = useTableLogic(validData);
  const { exportAll, exportCoding, exportNonCoding } = useFastaExport();

  if (!data || data.length === 0) {
    return (
      <div style={{ color: '#f8fafc', padding: '40px', textAlign: 'center', minHeight: '100vh', width: '100%' }}>
        <h2 style={{ marginBottom: '16px' }}>No data available. Please run an analysis.</h2>
        <Link to="/" style={btnStyle}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ color: '#f8fafc', padding: '20px', minHeight: '100vh', width: '100%', alignSelf: 'flex-start' }}>
      <h2 style={{ marginBottom: '16px' }}>📊 Analysis Results</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ ...btnStyle, backgroundColor: '#10b981' }}
        >
          New Analysis
        </button>
        <button 
          onClick={() => exportAll(validData)} 
          style={{ ...btnStyle, ...(validData.length === 0 ? disabledBtnStyle : {}) }}
          disabled={validData.length === 0}
        >
          Export All (ZIP)
        </button>
        <button 
          onClick={() => exportCoding(validData)} 
          style={{ ...btnStyle, ...(!hasCoding ? disabledBtnStyle : {}) }}
          disabled={!hasCoding}
        >
          Export Coding (ZIP)
        </button>
        <button 
          onClick={() => exportNonCoding(validData)} 
          style={{ ...btnStyle, ...(!hasNonCoding ? disabledBtnStyle : {}) }}
          disabled={!hasNonCoding}
        >
          Export Non-Coding (ZIP)
        </button>
      </div>
      {hiddenCount > 0 && (
        <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #f59e0b', padding: '12px', borderRadius: '4px', marginBottom: '16px', color: '#cbd5e1', fontSize: '14px' }}>
          <strong>Note:</strong> {hiddenCount} sequence{hiddenCount !== 1 ? 's' : ''} did not resemble any organism (probability 0) and {hiddenCount !== 1 ? 'were' : 'was'} hidden.
        </div>
      )}
      <ResultsTable 
        data={tableHandlers.paginatedData}
        searchHandlers={{ 
            search: tableHandlers.search, 
            setSearch: tableHandlers.setSearch 
        }}
        paginationHandlers={{ 
            currentPage: tableHandlers.currentPage, 
            totalPages: tableHandlers.totalPages, 
            setPage: tableHandlers.setPage 
        }}
      />
    </div>
  );
}

const btnStyle = {
  padding: '10px 16px', backgroundColor: '#0284c7', color: 'white',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};

const disabledBtnStyle = {
  opacity: 0.4,
  cursor: 'not-allowed',
  backgroundColor: '#475569'
};
