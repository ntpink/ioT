/**
 * FILE: Card.jsx
 * CÔNG DỤNG: Khung thẻ bao ngoài màu trắng dùng chung cho toàn bộ giao diện.
 * - Bo góc chuẩn 16px, viền xám mờ #e2e8f0, đổ bóng nhẹ theo thiết kế Figma.
 * - Dùng để bọc các bảng, biểu đồ, thẻ cảm biến, hồ sơ...
 */
import React from 'react';

export const Card = ({ children, className = '', style = {}, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`custom-card ${className}`}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;

