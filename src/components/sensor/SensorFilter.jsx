/**
 * FILE: SensorFilter.jsx
 * CÔNG DỤNG: Thanh bộ lọc cho trang Data Sensor:
 * - Sensor Type: Dropdown Select (All Sensors, Temperature, Humidity, Light).
 * - Value: Ô nhập Input để người dùng gõ giá trị tìm kiếm (vd: 28.5, 65, 720...).
 * - Time: Ô nhập Input để người dùng gõ mốc thời gian tìm kiếm (vd: 10:30, 10:32...).
 * - Nút "Tìm kiếm": Bắt đầu áp dụng lọc.
 * - Nút "Xóa lọc": Hoàn nguyên toàn bộ về mặc định.
 */
import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import Select from '../common/Select';
import Input from '../common/Input';

export const SensorFilter = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  const sensorTypeOptions = [
    { value: 'All Sensors', label: 'All Sensors' },
    { value: 'Temperature', label: 'Temperature' },
    { value: 'Humidity', label: 'Humidity' },
    { value: 'Light', label: 'Light' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* 1. Chọn loại cảm biến */}
      <Select
        label="Sensor Type"
        value={filters.sensorType || 'All Sensors'}
        options={sensorTypeOptions}
        onChange={(val) => onFilterChange('sensorType', val)}
        style={{ flex: 1, minWidth: '160px' }}
      />

      {/* 2. Ô nhập giá trị (Value) */}
      <Input
        label="Value"
        value={filters.value || ''}
        placeholder="Nhập giá trị..."
        onChange={(val) => onFilterChange('value', val)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch && onSearch();
          }
        }}
        style={{ flex: 1, minWidth: '160px' }}
      />

      {/* 3. Ô nhập thời gian (Time) */}
      <Input
        label="Time"
        value={filters.time || ''}
        placeholder="Nhập thời gian..."
        onChange={(val) => onFilterChange('time', val)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch && onSearch();
          }
        }}
        style={{ flex: 1, minWidth: '160px' }}
      />

      {/* Cụm 2 nút Tìm kiếm và Xóa lọc */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onSearch}
          className="custom-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            height: '38px',
            padding: '0 16px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13.5px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          title="Bắt đầu lọc dữ liệu theo điều kiện đã chọn"
        >
          <Search size={15} />
          <span>Tìm kiếm</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="custom-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            height: '38px',
            padding: '0 14px',
            backgroundColor: '#ffffff',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '13.5px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          title="Xóa toàn bộ bộ lọc và hiển thị lại toàn bộ danh sách"
        >
          <RotateCcw size={14} />
          <span>Xóa lọc</span>
        </button>
      </div>
    </div>
  );
};

export default SensorFilter;
