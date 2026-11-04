/**
 * FILE: ProfileInfo.jsx
 * CÔNG DỤNG: Thẻ hiển thị thông tin sinh viên trên trang Profile.
 * - Căn chỉnh 2 dòng thông tin đối xứng hai bên:
 *   + Họ tên -> in hoa họ và tên (fullName)
 *   + Mã Sinh Viên -> in hoa mã sinh viên (studentId)
 */
import React from 'react';
import Card from '../common/Card';

export const ProfileInfo = ({ fullName = 'HỌ VÀ TÊN', studentId = 'MÃ SINH VIÊN' }) => {
  return (
    <Card style={{ padding: '24px 32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Row 1: Họ tên */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '14px', color: '#334155', fontWeight: '400' }}>
            Họ tên
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#1e293b',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}
          >
            {fullName}
          </span>
        </div>

        {/* Row 2: Mã Sinh Viên */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '14px', color: '#334155', fontWeight: '400' }}>
            Mã Sinh Viên
          </span>
          <span
            style={{
              fontSize: '14px',
              color: '#1e293b',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}
          >
            {studentId}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfo;

