/**
 * FILE: SensorCard.jsx
 * CÔNG DỤNG: Thẻ hiển thị chỉ số của từng cảm biến trên Dashboard.
 * - Tự động đổi icon và màu nền tròn theo loại:
 *   + Nhiệt độ: Icon Thermometer, nền đỏ hồng #fee2e2.
 *   + Độ ẩm: Icon Droplets, nền xanh lam #eff6ff.
 *   + Ánh sáng: Icon Sun, nền vàng cam #fffbeb.
 * - Hiển thị giá trị to nổi bật (ví dụ: 28.5 °C).
 */
import React from 'react';
import Card from '../common/Card';
import { Thermometer, Droplets, Sun } from 'lucide-react';

export const SensorCard = ({ type, title, value, unit }) => {
  // Cấu hình icon và màu sắc tương ứng theo loại cảm biến
  const getConfig = () => {
    switch (type?.toLowerCase()) {
      case 'temperature':
      case 'nhiệt độ':
        return {
          icon: Thermometer,
          iconColor: '#ef4444',
          bgColor: '#fee2e2',
        };
      case 'humidity':
      case 'độ ẩm':
        return {
          icon: Droplets,
          iconColor: '#3b82f6',
          bgColor: '#eff6ff',
        };
      case 'light':
      case 'ánh sáng':
      default:
        return {
          icon: Sun,
          iconColor: '#f59e0b',
          bgColor: '#fffbeb',
        };
    }
  };

  const { icon: Icon, iconColor, bgColor } = getConfig();

  return (
    <Card
      style={{
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flex: 1,
      }}
    >
      {/* Icon hình tròn */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={24} color={iconColor} strokeWidth={2.2} />
      </div>

      {/* Thông tin cảm biến */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '13.5px',
            color: '#64748b',
            fontWeight: '400',
            marginBottom: '4px',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            letterSpacing: '-0.3px',
          }}
        >
          {value} {unit}
        </span>
      </div>
    </Card>
  );
};

export default SensorCard;

