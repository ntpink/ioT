/**
 * FILE: SensorCard.jsx
 * CÔNG DỤNG: Thẻ hiển thị chỉ số của từng cảm biến trên Dashboard:
 * - Nhiệt độ: Icon Thermometer, nền đỏ hồng #fee2e2.
 * - Độ ẩm: Icon Droplets, nền xanh lam #eff6ff.
 * - Ánh sáng: Icon Sun, nền vàng cam #fffbeb.
 * - Nồng độ CO2: Huy hiệu CO2, nền xanh lá #dcfce7.
 */
import React from 'react';
import Card from '../common/Card';
import { Thermometer, Droplets, Sun } from 'lucide-react';

export const SensorCard = ({ type, title, value, unit, subtext }) => {
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
      case 'co2':
      case 'nồng độ co2':
      case 'nồng độ co₂':
        return {
          customIcon: <span style={{ fontWeight: '800', fontSize: '13px', color: '#10b981' }}>CO₂</span>,
          iconColor: '#10b981',
          bgColor: '#dcfce7',
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

  const { icon: Icon, customIcon, iconColor, bgColor } = getConfig();

  return (
    <Card
      style={{
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {/* Icon hình tròn */}
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {customIcon || <Icon size={22} color={iconColor} strokeWidth={2.2} />}
      </div>

      {/* Thông tin cảm biến */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '13px',
            color: '#64748b',
            fontWeight: '400',
            marginBottom: '2px',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1e293b',
            letterSpacing: '-0.3px',
          }}
        >
          {value} {unit}
        </span>
        {subtext && (
          <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            {subtext}
          </span>
        )}
      </div>
    </Card>
  );
};

export default SensorCard;
