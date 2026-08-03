import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../../utils/storage';
import AdminSidebar from '../../components/admin/AdminSidebar';
import '../../components/admin/Admin.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const authenticated = isAdminAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate('/admin/login');
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    return null; // Prevents flashing content while redirecting
  }

  return (
    <div className="admin-dashboard-container">
      {/* Admin Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Panel Content */}
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
