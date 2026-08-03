import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Image, Briefcase, LogOut, ArrowLeft } from 'lucide-react';
import { logoutAdmin } from '../../utils/storage';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: <LayoutDashboard size={18} className="sidebar-icon" />, end: true },
    { label: 'Bookings', path: '/admin/bookings', icon: <CalendarDays size={18} className="sidebar-icon" />, end: false },
    { label: 'Gallery', path: '/admin/gallery', icon: <Image size={18} className="sidebar-icon" />, end: false },
    { label: 'Services', path: '/admin/services', icon: <Briefcase size={18} className="sidebar-icon" />, end: false },
  ];

  return (
    <aside className="admin-sidebar">
      {/* Header */}
      <div className="admin-sidebar-header">
        <img 
          src="/images/sanjari_logo.jpg" 
          alt="Sanjari Production Logo" 
          className="admin-sidebar-logo" 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200'; }}
        />
        <div className="admin-sidebar-title-box">
          <h1 className="admin-sidebar-title">Sanjari</h1>
          <span className="admin-sidebar-subtitle">Admin Suite</span>
        </div>
      </div>

      {/* Menu Links */}
      <ul className="admin-sidebar-menu">
        {menuItems.map(item => (
          <li key={item.label} className="admin-sidebar-item">
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        
        {/* Back to Web Link */}
        <li className="admin-sidebar-item" style={{ marginTop: 'auto' }}>
          <a
            href="/"
            className="admin-sidebar-link"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '1.25rem' }}
          >
            <ArrowLeft size={18} className="sidebar-icon" />
            <span>Main Website</span>
          </a>
        </li>
      </ul>

      {/* Logout Footer */}
      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
