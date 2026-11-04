import React from 'react';

export const Toggle = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        width: '46px',
        height: '26px',
        borderRadius: '9999px',
        backgroundColor: checked ? '#3b82f6' : '#cbd5e1',
        border: 'none',
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        padding: '2px',
        transition: 'background-color 0.2s ease, opacity 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        outline: 'none',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          display: 'block',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
          transform: checked ? 'translateX(20px)' : 'translateX(2px)',
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </button>
  );
};

export default Toggle;

