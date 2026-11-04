/**
 * FILE: MainLayout.jsx
 * CÔNG DỤNG: Bộ khung sườn (Layout) chung cho cả 4 trang ứng dụng.
 * - Cột bên trái: Ghim cố định Sidebar (thanh menu).
 * - Vùng bên phải: Chứa <Outlet /> - nơi hiển thị nội dung từng trang khi chuyển route.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export const MainLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Vùng nội dung chính */}
      <main
        style={{
          flex: 1,
          padding: '28px 36px',
          overflowY: 'auto',
          boxSizing: 'border-box',
          minWidth: 0,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

