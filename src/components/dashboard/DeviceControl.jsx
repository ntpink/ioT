/**
 * FILE: DeviceControl.jsx
 * CÔNG DỤNG: Khung điều khiển thiết bị nằm ở bên phải trang Dashboard.
 * - Hiển thị danh sách thiết bị (Đèn 1, Đèn 2...) kèm icon bóng đèn.
 * - Hiển thị trạng thái: "Bật", "Tắt" và trạng thái chuyển tiếp 0.5s: "Đang bật...", "Đang tắt...".
 * - Tích hợp Toggle để bật/tắt thiết bị và gọi hàm onToggleDevice.
 */
import React from 'react';
import Card from '../common/Card';
import Toggle from '../common/Toggle';
import { Lightbulb, Loader2 } from 'lucide-react';

export const DeviceControl = ({ devices = [], pendingDevices = {}, onToggleDevice }) => {
  return (
    <Card style={{ padding: '22px 24px', flex: 1 }}>
      <h3
        style={{
          margin: '0 0 20px 0',
          fontSize: '15px',
          fontWeight: '700',
          color: '#1e293b',
        }}
      >
        Điều khiển thiết bị
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {devices.map((device) => {
          const pendingState = pendingDevices[device.id]; // 'turning_on' | 'turning_off' | undefined
          const isPending = Boolean(pendingState);

          // Xác định chữ và màu trạng thái
          let statusText = 'Tắt';
          let badgeStyle = {
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            borderColor: '#e2e8f0',
          };

          if (isPending) {
            statusText = pendingState === 'turning_on' ? 'Đang bật...' : 'Đang tắt...';
            badgeStyle = {
              backgroundColor: '#fef3c7',
              color: '#d97706',
              borderColor: '#fde68a',
            };
          } else if (device.status) {
            statusText = 'Bật';
            badgeStyle = {
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              borderColor: '#bbf7d0',
            };
          }

          // Trạng thái hiển thị của icon bóng đèn
          const bulbColor = isPending
            ? '#f59e0b'
            : device.status
            ? '#3b82f6'
            : '#94a3b8';
          const bulbBg = isPending
            ? '#fffbeb'
            : device.status
            ? '#eff6ff'
            : '#f8fafc';

          return (
            <div
              key={device.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                border: '1px solid #edf2f7',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
              }}
            >
              {/* Device Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: bulbBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Lightbulb
                    size={19}
                    color={bulbColor}
                    strokeWidth={2}
                  />
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1e293b',
                  }}
                >
                  {device.name}
                </span>
              </div>

              {/* Status Label & Switch Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: '600',
                    backgroundColor: badgeStyle.backgroundColor,
                    color: badgeStyle.color,
                    border: `1px solid ${badgeStyle.borderColor}`,
                    userSelect: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isPending && <Loader2 size={12} className="spin-icon" />}
                  {statusText}
                </span>

                <Toggle
                  checked={isPending ? pendingState === 'turning_on' : device.status}
                  disabled={isPending}
                  onChange={(newStatus) => onToggleDevice && onToggleDevice(device.id, newStatus)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DeviceControl;

