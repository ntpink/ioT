/**
 * FILE: src/App.jsx
 * CÔNG DỤNG: Cấu hình hệ thống định tuyến (React Router) cho ứng dụng.
 * - Khung MainLayout bao bọc ngoài cùng.
 * - Các Route:
 *   + /dashboard      -> Trang Dashboard
 *   + /sensors        -> Trang Data Sensor
 *   + /action-history -> Trang Action History
 *   + /profile        -> Trang Profile
 *   + /               -> Tự động chuyển hướng về /dashboard
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import DataSensor from './pages/DataSensor';
import ActionHistory from './pages/ActionHistory';
import Profile from './pages/Profile';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
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
