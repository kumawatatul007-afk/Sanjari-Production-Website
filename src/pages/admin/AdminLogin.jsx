import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Film, ShieldCheck } from 'lucide-react';
import { loginAdmin } from '../../utils/storage';
import '../../components/admin/Admin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(password);
      setLoading(false);
      if (success) {
        navigate('/admin');
      } else {
        setError('Incorrect Administrative Master Passcode.');
      }
    }, 1200);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #0b1528 0%, #020408 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative'
      }}
    >
      {/* Background Decorative Circles */}
      <div 
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.02)',
          filter: 'blur(100px)',
          top: '10%',
          left: '10%',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(0, 242, 254, 0.02)',
          filter: 'blur(80px)',
          bottom: '10%',
          right: '10%',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="admin-glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          textAlign: 'center',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.05)'
        }}
      >
        {/* Logo Shield */}
        <motion.div
          initial={{ scale: 0.8, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--admin-gold), var(--admin-gold-dark))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
          }}
        >
          <Lock size={28} style={{ color: '#030712' }} />
        </motion.div>

        {/* Title */}
        <h2 className="admin-heading admin-title-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Sanjari Admin
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '2rem', letterSpacing: '0.05em' }}>
          ENTER ACCESS PASSCODE
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <label htmlFor="password">Passcode</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                style={{ width: '100%', paddingRight: '2.8rem' }}
                placeholder="Enter password..."
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  border: 'none',
                  outline: 'none'
                }}
                className="hover-target"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#ff4757', fontSize: '0.78rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'left' }}
            >
              {error}
            </motion.p>
          )}

          {/* Luxury button */}
          <button
            type="submit"
            className="admin-btn admin-btn-gold"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
          >
            {loading ? (
              <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <span>Verify & Enter</span>
                <ShieldCheck size={16} />
              </>
            )}
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.05em' }}>
          AUTHORIZED ACCESS ONLY • DEFAULT PASSCODE: admin123
        </p>
      </motion.div>

      {/* Global CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
