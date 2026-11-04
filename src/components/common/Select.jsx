/**
 * FILE: Select.jsx
 * CÔNG DỤNG: Ô chọn thả xuống (Dropdown filter) chuẩn phong cách Figma.
 * - Hiển thị dạng: "Label: Value ▼" (ví dụ: "Sensor Type: All Sensors ▼").
 * - Cho phép lọc dữ liệu ở bảng cảm biến và bảng lịch sử thao tác.
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  value,
  options = [],
  onChange,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`custom-select-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '8px 14px',
        minWidth: '180px',
        cursor: 'pointer',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
        ...style,
      }}
    >
      <span
        style={{
          fontSize: '13.5px',
          color: '#334155',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          marginRight: 'auto',
          pointerEvents: 'none',
        }}
      >
        {label ? `${label}: ` : ''}
        <span style={{ fontWeight: '400', color: '#475569' }}>{value}</span>
      </span>

      <ChevronDown
        size={16}
        color="#64748b"
        style={{ marginLeft: '10px', flexShrink: 0, pointerEvents: 'none' }}
      />

      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          appearance: 'none',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {label ? `${label}: ${opt.label || opt}` : opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

