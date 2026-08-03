import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Bell, Clock, LogOut, ExternalLink, CalendarDays, Inbox } from 'lucide-react';
import { getBookings, logoutAdmin } from '../../utils/storage';

const AdminHeader = ({ title }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState([]);

  const loadPendingBookings = () => {
    const allBookings = getBookings() || [];
    const pending = allBookings.filter(b => b.status.toLowerCase() === 'pending');
    setPendingBookings(pending);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    
    loadPendingBookings();

    // Listen to updates from other pages
    window.addEventListener('sanjari-bookings-updated', loadPendingBookings);

    // Click outside handler
    const handleClickOutside = (e) => {
      if (!e.target.closest('.notification-container')) {
        setNotificationsOpen(false);
      }
      if (!e.target.closest('.profile-container')) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      clearInterval(timer);
      window.removeEventListener('sanjari-bookings-updated', loadPendingBookings);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <header 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative'
      }}
    >
      <div>
        <h2 className="admin-heading admin-title-gradient" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {title}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '0.2rem' }}>
          Sanjari Production Studio Management Panel
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Date Time display */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.8rem', 
            color: 'rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.03)',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}
        >
          <Clock size={14} className="gold-text" />
          <span>{formatDate(time)} • {formatTime(time)}</span>
        </div>

        {/* Notification Alert Icon */}
        <div 
          className="notification-container"
          style={{ position: 'relative' }}
        >
          <div 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{ 
              position: 'relative',
              cursor: 'pointer',
              padding: '0.5rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-smooth)'
            }}
            className="hover-target"
          >
            <Bell size={16} style={{ color: '#d1d5db' }} />
            {pendingBookings.length > 0 && (
              <span 
                style={{ 
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '6px',
                  height: '6px',
                  background: 'var(--admin-accent-blue)',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px var(--admin-accent-blue)'
                }} 
              />
            )}
          </div>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '320px',
                background: '#060913',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  padding: '1rem', 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  New Notifications
                </span>
                {pendingBookings.length > 0 && (
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', background: 'rgba(0, 242, 254, 0.15)', color: 'var(--admin-accent-blue)', borderRadius: '10px', fontWeight: 700 }}>
                    {pendingBookings.length} Pending
                  </span>
                )}
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {pendingBookings.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Inbox size={24} style={{ opacity: 0.5 }} />
                    <span style={{ fontSize: '0.8rem' }}>No pending bookings to review</span>
                  </div>
                ) : (
                  pendingBookings.map(b => (
                    <div 
                      key={b.id}
                      onClick={() => {
                        navigate('/admin/bookings');
                        setNotificationsOpen(false);
                      }}
                      style={{
                        padding: '0.85rem 1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem'
                      }}
                      className="admin-notification-item"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f3f4f6' }}>{b.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--admin-gold)' }}>{b.service.toUpperCase()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#9ca3af' }}>
                        <span>New booking request</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CalendarDays size={10} />
                          {b.date}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Link 
                to="/admin/bookings" 
                onClick={() => setNotificationsOpen(false)}
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  padding: '0.75rem', 
                  fontSize: '0.75rem', 
                  color: 'var(--admin-gold)', 
                  fontWeight: 700, 
                  background: 'rgba(212, 175, 55, 0.03)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'background 0.2s'
                }}
                className="admin-notification-view-all"
              >
                View All Bookings
              </Link>
            </div>
          )}
        </div>

        {/* Admin profile detail */}
        <div 
          className="profile-container"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div 
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              padding: '0.3rem 0.6rem',
              borderRadius: '20px',
              transition: 'background 0.2s',
              background: profileOpen ? 'rgba(255,255,255,0.05)' : 'transparent'
            }}
            className="hover-target"
          >
            <div 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--admin-gold), var(--admin-gold-dark))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.25)'
              }}
            >
              <User size={18} style={{ color: '#030712' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }} className="mobile-hide">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Director</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--admin-gold)', letterSpacing: '0.05em', fontWeight: 600 }}>Super Admin</span>
            </div>
          </div>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '240px',
                background: '#060913',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
                overflow: 'hidden',
                padding: '0.5rem 0'
              }}
            >
              {/* User Info Header in Dropdown */}
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.25rem' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Director</p>
                <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: '0.1rem 0 0 0' }}>superadmin@sanjari.com</p>
              </div>

              {/* View Site */}
              <a 
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.7rem 1rem',
                  fontSize: '0.82rem',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                className="admin-profile-dropdown-item"
              >
                <ExternalLink size={14} />
                <span>View Live Website</span>
              </a>

              {/* Sign Out */}
              <div 
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.7rem 1rem',
                  fontSize: '0.82rem',
                  color: 'var(--admin-accent-red)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderTop: '1px solid rgba(255,255,255,0.03)',
                  marginTop: '0.25rem'
                }}
                className="admin-profile-dropdown-item logout"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Dropdown Hover Styles */}
      <style>{`
        .admin-notification-item:hover {
          background: rgba(212, 175, 55, 0.05) !important;
        }
        .admin-notification-view-all:hover {
          background: rgba(212, 175, 55, 0.08) !important;
        }
        .admin-profile-dropdown-item {
          text-decoration: none;
        }
        .admin-profile-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          color: #ffffff !important;
        }
        .admin-profile-dropdown-item.logout:hover {
          background: rgba(255, 71, 87, 0.08) !important;
          color: #ff4757 !important;
        }
      `}</style>
    </header>
  );
};

export default AdminHeader;
