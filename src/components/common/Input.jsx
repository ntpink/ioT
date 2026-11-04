/**
 * FILE: Input.jsx
 * CÔNG DỤNG: Ô nhập dữ liệu (Input) dùng cho tìm kiếm và bộ lọc.
 * - Hỗ trợ nhãn (label) phía trước (ví dụ: "Value: ", "Time: ").
 * - Giao diện đồng bộ với Select.jsx: nền trắng bo góc 10px, viền xám #e2e8f0.
 */
import React from 'react';

export const Input = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  type = 'text',
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div
      className={`custom-input-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '8px 14px',
        minWidth: '180px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '13.5px',
            color: '#334155',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            marginRight: '6px',
            userSelect: 'none',
          }}
        >
          {label}:
        </span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder || (label ? `Nhập ${label.toLowerCase()}...` : '')}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: '13.5px',
          color: '#1e293b',
          width: '100%',
          padding: 0,
        }}
        {...props}
      />
    </div>
  );
};

export default Input;

