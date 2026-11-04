/**
 * FILE: ProfileAvatar.jsx
 * CÔNG DỤNG: Thẻ hiển thị ảnh đại diện (Avatar) trên trang Profile.
 * - Khung tròn màu xám ở giữa chứa icon người (User) hoặc ảnh đại diện cố định (avatarUrl).
 * - Phía dưới có dòng chữ nhãn "Ảnh đại diện".
 */
import React from 'react';
import Card from '../common/Card';
import { User } from 'lucide-react';

export const ProfileAvatar = ({ avatarUrl }) => {
  return (
    <Card
      style={{
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Vòng tròn đại diện */}
      <div
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          backgroundColor: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <User size={46} color="#94a3b8" strokeWidth={1.5} />
        )}
      </div>

      <span
        style={{
          marginTop: '12px',
          fontSize: '13.5px',
          color: '#64748b',
          fontWeight: '400',
        }}
      >
        Ảnh đại diện
      </span>
    </Card>
  );
};

export default ProfileAvatar;
