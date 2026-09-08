import React from 'react';

export function Navbar() {
  const styles = {
    header: {
      backgroundColor: '#1e293b',
      color: '#f8fafc',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #334155',
    },
    title: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 'bold',
    },
    badge: {
      backgroundColor: '#0284c7',
      color: '#ffffff',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
    },
  };

  return (
    <header style={styles.header} data-testid="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/src/assets/logo.ico" alt="CRAB Icon" style={{ height: '24px', marginRight: '8px' }} />
        <h2 style={styles.title}>CRAB</h2>
      </div>
      <span style={styles.badge}>v1.0.0</span>
    </header>
  );
}

export default Navbar;