import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomerCRM from './pages/admin/AdminCustomerCRM';
import AdminReports from './pages/admin/AdminReports';
import AdminHeroSettings from './pages/admin/AdminHeroSettings';
import AdminPopupManager from './pages/admin/AdminPopupManager';

export default function App() {
  return (
    <Routes>
      {/* 1. Main Website Route */}
      <Route path="/" element={<HomePage />} />

      {/* 2. Admin Portal Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="customers" element={<AdminCustomerCRM />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="hero-settings" element={<AdminHeroSettings />} />
        <Route path="popups" element={<AdminPopupManager />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
