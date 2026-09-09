import React from 'react';

export function OrganismCard({
    selectedOrganism,
    organismOptions,
    onOrganismChange,
    isLoading = false,
}) {
  const styles = {
    card: {
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#1e293b',
      textAlign: 'left',
      margin: '16px 0',
    },
    label: {
      display: 'block',
      color: '#f8fafc',
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '14px',
    },
    select: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      border: '1px solid #475569',
      fontSize: '15px',
      cursor: 'pointer',
      outline: 'none',
    },
    helperText: {
      color: '#94a3b8',
      fontSize: '13px',
      margin: '8px 0 0 0',
    },
  };

  return (
    <div style={styles.card} data-testid="organism-card">
      <label htmlFor="organism-select" style={styles.label}>
        🧠 Models
      </label>
      <select
        id="organism-select"
        value={selectedOrganism}
        onChange={(e) => onOrganismChange(e.target.value)}
        style={styles.select}
        data-testid="organism-select"
      >
        {organismOptions.map((org) => (
          <option key={org} value={org}>
            {org}
          </option>
        ))}
      </select>
      <p style={styles.helperText}>
        Select the ML model file from the models directory.
      </p>
    </div>
  );
}

export default OrganismCard;