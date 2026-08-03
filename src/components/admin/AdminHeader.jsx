import React, { useEffect, useState } from 'react';
import { User, Bell, Clock } from 'lucide-react';

const AdminHeader = ({ title }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
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
        gap: '1rem'
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
        </div>

        {/* Admin profile detail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
      </div>
    </header>
  );
};

export default AdminHeader;
