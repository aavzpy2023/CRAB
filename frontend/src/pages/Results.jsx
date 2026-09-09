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

export default function Results({ onReset }) {
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
      <div style={{ color: '#f8fafc', padding: '40px', textAlign: 'center', width: '100%', flex: 1 }}>
        <h2 style={{ marginBottom: '16px' }}>No data available. Please run an analysis.</h2>
        <Link to="/" style={btnStyle}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ color: '#f8fafc', padding: '16px 0', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div 
          style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '10px',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}
        >
          <span className="material-symbols-outlined" style={{ color: '#38bdf8', fontSize: '22px' }}>
            analytics
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#f8fafc' }}>
          Analysis Results
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => {
            if (typeof onReset === 'function') onReset();
            navigate('/');
          }} 
          style={{ ...btnStyle, backgroundColor: '#10b981' }}
        >
          New Analysis
        </button>
        <button 
          onClick={() => exportAll(validData)} 
          style={{ ...btnStyle, ...(validData.length === 0 ? disabledBtnStyle : {}) }}
          disabled={validData.length === 0}
        >
          Download All (ZIP)
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
