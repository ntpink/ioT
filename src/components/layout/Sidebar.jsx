import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, BarChart2, Clock, User, Cpu, LogOut } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import authService from '../../services/authService';

export const Sidebar = () => {
  const currentUser = authService.getCurrentUser();

  const menuItems = [
    {
      title: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: LayoutGrid,
    },
    {
      title: 'Data Sensor',
      path: ROUTES.SENSORS,
      icon: BarChart2,
    },
    {
      title: 'Action History',
      path: ROUTES.ACTION_HISTORY,
      icon: Clock,
    },
    {
      title: 'Profile',
      path: ROUTES.PROFILE,
      icon: User,
    },
  ];

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        backgroundColor: '#1c2536',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo / Brand Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          paddingLeft: '8px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#3b82f6',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
          }}
        >
          <Cpu size={22} color="#ffffff" />
        </div>
        <span
          style={{
            fontSize: '17px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.2px',
          }}
        >
          IoT Control
        </span>
      </div>

      {/* Navigation Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                backgroundColor: isActive ? '#3b82f6' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                transition: 'all 0.15s ease',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={19} color={isActive ? '#ffffff' : '#94a3b8'} />
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section & Logout Button */}
      <div
        style={{
          borderTop: '1px solid #334155',
          paddingTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '6px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px',
              color: '#ffffff',
            }}
          >
            {currentUser?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {currentUser?.fullName || currentUser?.username || 'Nguyễn Thanh Bình'}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              @{currentUser?.username || 'binh'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => authService.logout()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: '#27354a',
            border: 'none',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          <LogOut size={16} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
