/**
 * FILE: Button.jsx
 * CÔNG DỤNG: Component nút bấm dùng chung cho toàn bộ dự án.
 * - Hỗ trợ nhiều kiểu nút (variant): primary (xanh đặc), outline (viền xanh), pagination (nút trang)...
 * - Xử lý trạng thái disabled và sự kiện onClick.
 */
import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'outline', 'pagination', 'pagination-active'
  onClick,
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: '#ffffff',
          color: '#3b82f6',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '6px 18px',
          fontSize: '13px',
          fontWeight: '500',
        };
      case 'pagination-active':
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: '1px solid #3b82f6',
          borderRadius: '6px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: '500',
        };
      case 'pagination':
        return {
          backgroundColor: '#ffffff',
          color: '#334155',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: '500',
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.15s ease-in-out',
        outline: 'none',
        ...getVariantStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

