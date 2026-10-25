import React from 'react';

export function RunButton({ isRunning, disabled, onClick }) {
  const styles = {
    button: {
      width: '100%',
      padding: '14px 24px',
      borderRadius: '8px',
      backgroundColor: disabled || isRunning ? '#475569' : '#0284c7',
      color: '#ffffff',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: disabled || isRunning ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease',
      marginTop: '16px',
    },
  };

  return (
    <button
      style={styles.button}
      onClick={onClick}
      disabled={disabled || isRunning}
      data-testid="run-button"
    >
      {isRunning ? '⏳ Running inference...' : '🚀 Run ML analysis'}
    </button>
  );
}

export default RunButton;
