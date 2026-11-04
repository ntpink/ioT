import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, BarChart2, Clock, User, Cpu } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Sidebar = () => {
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
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
    </aside>
  );
};

export default Sidebar;

