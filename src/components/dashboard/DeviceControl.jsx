/**
 * FILE: DeviceControl.jsx
 * CÔNG DỤNG: Khung điều khiển 4 đèn ở Dashboard (Đèn 1, Đèn 2, Đèn 3, Đèn 4).
 * Bố cục: Lưới 2x2 chính xác theo thiết kế ảnh Dashboard.
 */
import React from 'react';
import Card from '../common/Card';
import Toggle from '../common/Toggle';
import { Lightbulb, Loader2 } from 'lucide-react';

export const DeviceControl = ({ devices = [], pendingDevices = {}, onToggleDevice }) => {
  // Lấy trạng thái lưu trữ cuối cùng từ LocalStorage nếu danh sách devices chưa tải xong
  const getFallbackStatus = (id) => {
    try {
      const saved = localStorage.getItem('iot_device_statuses');
      if (saved) {
        const map = JSON.parse(saved);
        if (map && map[id] !== undefined) return Boolean(map[id]);
      }
    } catch {}
    return false;
  };

  // Đảm bảo luôn hiển thị đủ 4 đèn (Đèn 1, Đèn 2, Đèn 3, Đèn 4) kèm trạng thái mới nhất
  const allDevices = [1, 2, 3, 4].map((id) => {
    const existing = devices.find((d) => d.id === id);
    if (existing && existing.status !== undefined) return existing;
    return { id, name: `Đèn ${id}`, status: getFallbackStatus(id), type: 'light' };
  });

  return (
    <div>
      <h3
        style={{
          margin: '0 0 14px 0',
          fontSize: '16px',
          fontWeight: '700',
          color: '#1e293b',
        }}
      >
        Điều khiển đèn
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
        }}
      >
        {allDevices.map((device) => {
          const pendingState = pendingDevices[device.id]; // 'turning_on' | 'turning_off' | undefined
          const isPending = Boolean(pendingState);
          const isChecked = isPending ? pendingState === 'turning_on' : Boolean(device.status);

          let statusText = isChecked ? 'Đang bật' : 'Đang tắt';
          let statusColor = isChecked ? '#3b82f6' : '#94a3b8';

          if (isPending) {
            statusText = pendingState === 'turning_on' ? 'Đang bật...' : 'Đang tắt...';
            statusColor = '#f59e0b';
          }

          const bulbColor = isChecked ? '#3b82f6' : '#94a3b8';
          const bulbBg = isChecked ? '#eff6ff' : '#f8fafc';

          return (
            <Card
              key={device.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              {/* Device Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: bulbBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  {isPending ? (
                    <Loader2 size={18} className="spin-icon" color="#f59e0b" />
                  ) : (
                    <Lightbulb size={19} color={bulbColor} strokeWidth={2} />
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b',
                    }}
                  >
                    {device.name}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: statusColor,
                      marginTop: '2px',
                    }}
                  >
                    {statusText}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <Toggle
                checked={isChecked}
                disabled={isPending}
                onChange={(newStatus) => onToggleDevice && onToggleDevice(device.id, newStatus)}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceControl;
