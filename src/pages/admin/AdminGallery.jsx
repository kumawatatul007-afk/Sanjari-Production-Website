import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Check, Save, Image as ImageIcon, Filter } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { getGallery, saveGallery } from '../../utils/storage';
import '../../components/admin/Admin.css';

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [filterCat, setFilterCat] = useState('All');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // Form fields
  const [form, setForm] = useState({
    title: '',
    cat: 'Wedding',
    aspect: 'square',
    img: '',
    color1: '#1a1a2e',
    color2: '#d4af37'
  });

  useEffect(() => {
    setGallery(getGallery());
  }, []);

  const handleSave = (updatedList) => {
    setGallery(updatedList);
    saveGallery(updatedList);
  };

  // Add Item Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: form.title,
      cat: form.cat,
      aspect: form.aspect,
      img: form.img || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
      colors: [form.color1, form.color2]
    };
    const updated = [newItem, ...gallery];
    handleSave(updated);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit Click Trigger
  const handleEditClick = (item) => {
    setCurrentItem(item);
    setForm({
      title: item.title,
      cat: item.cat,
      aspect: item.aspect,
      img: item.img,
      color1: item.colors?.[0] || '#1a1a2e',
      color2: item.colors?.[1] || '#d4af37'
    });
    setIsEditModalOpen(true);
  };

  // Edit Item Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = gallery.map(item => 
      item.id === currentItem.id 
        ? { 
            ...item, 
            title: form.title,
            cat: form.cat,
            aspect: form.aspect,
            img: form.img,
            colors: [form.color1, form.color2]
          }
        : item
    );
    handleSave(updated);
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete Item
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this portfolio photo?')) {
      const updated = gallery.filter(item => item.id !== id);
      handleSave(updated);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      cat: 'Wedding',
      aspect: 'square',
      img: '',
      color1: '#1a1a2e',
      color2: '#d4af37'
    });
    setCurrentItem(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Filter items
  const filteredGallery = filterCat === 'All' 
    ? gallery 
    : gallery.filter(item => item.cat === filterCat);

  const categories = ['All', 'Wedding', 'Portrait', 'Cinematic', 'Corporate', 'Fashion'];

  return (
    <>
      <AdminHeader title="Portfolio Gallery Manager" />

      {/* Categories Toolbar */}
      <div 
        className="admin-glass-panel"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Filter size={15} className="gold-text" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', marginRight: '0.5rem' }}>Categories:</span>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={`admin-btn ${filterCat === c ? 'admin-btn-gold' : 'admin-btn-outline'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.72rem', borderRadius: '20px' }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => { resetForm(); setIsAddModalOpen(true); }}
          className="admin-btn admin-btn-purple"
        >
          <Plus size={16} />
          <span>Add Media</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginTop: '0.5rem'
        }}
      >
        {filteredGallery.length > 0 ? (
          filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="admin-glass-panel"
              style={{
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative'
              }}
            >
              {/* Media Card Preview */}
              <div 
                style={{
                  width: '100%',
                  height: '160px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: `linear-gradient(135deg, ${item.colors?.[0] || '#1a1a2e'} 0%, ${item.colors?.[1] || '#d4af37'} 100%)`
                }}
              >
                {item.img && (
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {/* Category Pill overlay */}
                <span 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(2, 4, 8, 0.8)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--admin-gold)'
                  }}
                >
                  {item.cat}
                </span>
                
                {/* Layout Type Pill overlay */}
                <span 
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(2, 4, 8, 0.8)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff'
                  }}
                >
                  {item.aspect}
                </span>
              </div>

              {/* Title & Actions */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </h4>
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)', 
                  paddingTop: '0.75rem',
                  marginTop: 'auto' 
                }}
              >
                <button
                  onClick={() => handleEditClick(item)}
                  className="admin-btn admin-btn-outline"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}
                >
                  <Edit2 size={12} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="admin-btn admin-btn-outline"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.4rem 0.75rem', fontSize: '0.7rem', borderColor: 'rgba(255, 71, 87, 0.2)', color: '#ff4757' }}
                >
                  <Trash2 size={12} />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', color: '#6b7280' }} className="admin-glass-panel">
            <ImageIcon size={40} style={{ color: '#374151', marginBottom: '1rem' }} />
            <p>No gallery images uploaded in this category yet.</p>
          </div>
        )}
      </div>

      {/* Add Media Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="admin-modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-modal"
            >
              <div className="admin-modal-title">
                <span>Add Portfolio Media</span>
                <button onClick={() => setIsAddModalOpen(false)} className="admin-modal-close"><X size={18} /></button>
              </div>

              <form onSubmit={handleAddSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="title">Media Title *</label>
                  <input type="text" id="title" name="title" value={form.title} onChange={handleFormChange} className="admin-form-input" required placeholder="E.g., Sunrise Nuptials" />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="img">Image URL *</label>
                  <input type="url" id="img" name="img" value={form.img} onChange={handleFormChange} className="admin-form-input" required placeholder="https://images.unsplash.com/..." />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="cat">Media Category</label>
                    <select id="cat" name="cat" value={form.cat} onChange={handleFormChange} className="admin-form-select">
                      <option value="Wedding">Wedding</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Cinematic">Cinematic</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="aspect">Layout Aspect Ratio</label>
                    <select id="aspect" name="aspect" value={form.aspect} onChange={handleFormChange} className="admin-form-select">
                      <option value="square">Square (Grid block)</option>
                      <option value="wide">Wide (Panoramic strip)</option>
                      <option value="tall">Tall (Portrait banner)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="color1">Fallback Gradient Start</label>
                    <input type="color" id="color1" name="color1" value={form.color1} onChange={handleFormChange} style={{ height: '42px', padding: '2px', cursor: 'pointer' }} className="admin-form-input" />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="color2">Fallback Gradient End</label>
                    <input type="color" id="color2" name="color2" value={form.color2} onChange={handleFormChange} style={{ height: '42px', padding: '2px', cursor: 'pointer' }} className="admin-form-input" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="admin-btn admin-btn-outline">Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-green">
                    <Check size={16} />
                    <span>Upload Media</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Media Modal */}
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
                <span>Edit Media Settings</span>
                <button onClick={() => setIsEditModalOpen(false)} className="admin-modal-close"><X size={18} /></button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="title">Media Title</label>
                  <input type="text" id="title" name="title" value={form.title} onChange={handleFormChange} className="admin-form-input" required />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="img">Image URL</label>
                  <input type="url" id="img" name="img" value={form.img} onChange={handleFormChange} className="admin-form-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="cat">Media Category</label>
                    <select id="cat" name="cat" value={form.cat} onChange={handleFormChange} className="admin-form-select">
                      <option value="Wedding">Wedding</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Cinematic">Cinematic</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="aspect">Layout Aspect Ratio</label>
                    <select id="aspect" name="aspect" value={form.aspect} onChange={handleFormChange} className="admin-form-select">
                      <option value="square">Square (Grid block)</option>
                      <option value="wide">Wide (Panoramic strip)</option>
                      <option value="tall">Tall (Portrait banner)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="color1">Fallback Gradient Start</label>
                    <input type="color" id="color1" name="color1" value={form.color1} onChange={handleFormChange} style={{ height: '42px', padding: '2px', cursor: 'pointer' }} className="admin-form-input" />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="color2">Fallback Gradient End</label>
                    <input type="color" id="color2" name="color2" value={form.color2} onChange={handleFormChange} style={{ height: '42px', padding: '2px', cursor: 'pointer' }} className="admin-form-input" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="admin-btn admin-btn-outline">Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-blue">
                    <Save size={16} />
                    <span>Apply Changes</span>
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

export default AdminGallery;
