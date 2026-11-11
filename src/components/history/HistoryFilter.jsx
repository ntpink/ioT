import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import Select from '../common/Select';
import Input from '../common/Input';

export const HistoryFilter = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  const deviceOptions = [
    { value: 'All Devices', label: 'All Devices' },
    { value: 'Đèn 1', label: 'Đèn 1' },
    { value: 'Đèn 2', label: 'Đèn 2' },
    { value: 'Đèn 3', label: 'Đèn 3' },
    { value: 'Đèn 4', label: 'Đèn 4' },
    { value: 'Light 1', label: 'Light 1' },
    { value: 'Light 2', label: 'Light 2' },
  ];

  const actionOptions = [
    { value: 'All Actions', label: 'All Actions' },
    { value: 'Turn ON', label: 'Turn ON' },
    { value: 'Turn OFF', label: 'Turn OFF' },
  ];

  const statusOptions = [
    { value: 'All Status', label: 'All Status' },
    { value: 'Success', label: 'Success' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Failed', label: 'Failed' },
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
      <Select
        label="Device"
        value={filters.device || 'All Devices'}
        options={deviceOptions}
        onChange={(val) => onFilterChange('device', val)}
        style={{ flex: 1, minWidth: '150px' }}
      />

      <Select
        label="Action"
        value={filters.action || 'All Actions'}
        options={actionOptions}
        onChange={(val) => onFilterChange('action', val)}
        style={{ flex: 1, minWidth: '150px' }}
      />

      <Select
        label="Status"
        value={filters.status || 'All Status'}
        options={statusOptions}
        onChange={(val) => onFilterChange('status', val)}
        style={{ flex: 1, minWidth: '150px' }}
      />

      {/* Ô nhập thời gian (Time) */}
      <Input
        label="Time"
        value={filters.time || ''}
        placeholder="Nhập thời gian"
        onChange={(val) => onFilterChange('time', val)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch && onSearch();
          }
        }}
        style={{ flex: 1, minWidth: '150px' }}
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

export default HistoryFilter;
