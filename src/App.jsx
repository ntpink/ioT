/**
 * FILE: src/App.jsx
 * CÔNG DỤNG: Cấu hình hệ thống định tuyến (React Router) kèm bảo vệ đăng nhập (ProtectedRoute).
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import DataSensor from './pages/DataSensor';
import ActionHistory from './pages/ActionHistory';
import Profile from './pages/Profile';
import Login from './pages/Login';
import authService from './services/authService';
import { ROUTES } from './constants/routes';

// Bắt buộc xác thực: Nếu chưa có Token thì chuyển hướng về /login
const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route công khai: Đăng nhập & Đăng ký */}
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/* Các Route được bảo vệ: Bắt buộc phải có Bearer Token */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.SENSORS} element={<DataSensor />} />
          <Route path={ROUTES.ACTION_HISTORY} element={<ActionHistory />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
