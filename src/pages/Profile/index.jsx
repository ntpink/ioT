import React, { useState, useEffect } from 'react';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ProjectResources from '../../components/profile/ProjectResources';
import profileService from '../../services/profileService';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        setProfile(res);
      } catch (error) {
        console.error('Lỗi khi tải thông tin hồ sơ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: '700',
            color: '#1e293b',
          }}
        >
          Profile
        </h1>

        {/* Trạng thái hệ thống */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13.5px',
            color: '#64748b',
          }}
        >
          <span>Hệ thống trực tuyến</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block',
            }}
          />
        </div>
      </div>

      {/* Card 1: Ảnh đại diện */}
      <ProfileAvatar avatarUrl={profile?.avatarUrl} />

      {/* Card 2: Thông tin cá nhân */}
      <ProfileInfo
        fullName={profile?.fullName || 'HỌ VÀ TÊN'}
        studentId={profile?.studentId || 'MÃ SINH VIÊN'}
      />

      {/* Card 3: Tài nguyên dự án */}
      <ProjectResources resources={profile?.resources || []} />
    </div>
  );
};

export default Profile;
