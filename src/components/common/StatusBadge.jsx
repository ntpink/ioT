/**
 * FILE: StatusBadge.jsx
 * CÔNG DỤNG: Nhãn hiển thị trạng thái dạng viên thuốc (Pill Badge).
 * - "Success": Nền xanh ngọc nhạt #dcfce7, chữ xanh đậm #16a34a.
 * - "Pending": Nền vàng cam nhạt #fef3c7, chữ vàng cam đậm #d97706.
 * - "Failed": Nền đỏ hồng nhạt #fee2e2, chữ đỏ đậm #dc2626.
 */
import React from 'react';

export const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status?.toLowerCase()) {
      case 'success':
        return {
          backgroundColor: '#dcfce7',
          color: '#16a34a',
        };
      case 'pending':
        return {
          backgroundColor: '#fef3c7',
          color: '#d97706',
        };
      case 'failed':
      default:
        return {
          backgroundColor: '#fee2e2',
          color: '#dc2626',
        };
    }
  };

  const style = getStyle();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 14px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: style.backgroundColor,
        color: style.color,
        letterSpacing: '0.2px',
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
