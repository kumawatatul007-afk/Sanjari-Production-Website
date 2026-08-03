import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, ShieldAlert, Award, TrendingUp } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { getServices, saveServices } from '../../utils/storage';
import '../../components/admin/Admin.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    basePrice: '',
    bookingsCount: ''
  });

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleSave = (updatedList) => {
    setServices(updatedList);
    saveServices(updatedList);
  };

  const handleEditClick = (service) => {
    setCurrentService(service);
    setForm({
      name: service.name,
      category: service.category,
      basePrice: service.basePrice.toString(),
      bookingsCount: service.bookingsCount.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = services.map(s => 
      s.id === currentService.id 
        ? { 
            ...s, 
            name: form.name, 
            category: form.category,
            basePrice: parseFloat(form.basePrice) || 0,
            bookingsCount: parseInt(form.bookingsCount) || 0
          }
        : s
    );
    handleSave(updated);
    setIsEditModalOpen(false);
    setCurrentService(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <>
      <AdminHeader title="Services & Catalog Pricing" />

      {/* Overview Warning / Header */}
      <div 
        className="admin-glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderLeft: '4px solid var(--admin-gold)',
          background: 'rgba(212, 175, 55, 0.03)'
        }}
      >
        <ShieldAlert size={24} className="gold-text" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em' }}>CATALOG DISCLOSURE</h4>
          <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
            Adjusting prices here directly updates the baseline figures presented to prospective clients during their Booking session queries. Ensure alignment with Studio Director standards.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="admin-glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Category tag */}
              <span 
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--admin-gold)',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}
              >
                {service.category}
              </span>
              
              <h3 className="admin-heading" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem' }}>
                {service.name}
              </h3>
              
              {/* Base pricing */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {formatCurrency(service.basePrice)}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>/ base cost</span>
              </div>
            </div>

            {/* Performance Indicators */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                background: 'rgba(255,255,255,0.02)', 
                padding: '0.6rem 0.85rem', 
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.03)',
                fontSize: '0.78rem'
              }}
            >
              <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={13} className="gold-text" /> Lifetime shoots:
              </span>
              <span style={{ fontWeight: 700, color: '#ffffff' }}>{service.bookingsCount} Completed</span>
            </div>

            {/* Edit button */}
            <button
              onClick={() => handleEditClick(service)}
              className="admin-btn admin-btn-outline"
              style={{ justifyContent: 'center', width: '100%', gap: '0.5rem', fontSize: '0.78rem' }}
            >
              <Edit2 size={13} />
              <span>Modify Package</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="admin-modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-modal"
            >
              <div className="admin-modal-title">
                <span>Update Service Package</span>
                <button onClick={() => setIsEditModalOpen(false)} className="admin-modal-close"><X size={18} /></button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="name">Service Package Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange} className="admin-form-input" required />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="category">Category Tag</label>
                  <input type="text" id="category" name="category" value={form.category} onChange={handleFormChange} className="admin-form-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="basePrice">Base Price (₹)</label>
                    <input type="number" id="basePrice" name="basePrice" value={form.basePrice} onChange={handleFormChange} className="admin-form-input" required />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="bookingsCount">Shoots Count</label>
                    <input type="number" id="bookingsCount" name="bookingsCount" value={form.bookingsCount} onChange={handleFormChange} className="admin-form-input" required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-outline">Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-gold">
                    <Save size={16} />
                    <span>Apply Price</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminServices;
