import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, X, Check, Save } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { getBookings, saveBookings } from '../../utils/storage';
import '../../components/admin/Admin.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  
  // Form fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'wedding',
    date: '',
    status: 'Pending',
    amount: '',
    message: ''
  });

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleSave = (updatedList) => {
    setBookings(updatedList);
    saveBookings(updatedList);
  };

  // Add form submission
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      ...form,
      id: Date.now(),
      amount: form.amount ? parseFloat(form.amount) : 0
    };
    const updated = [newBooking, ...bookings];
    handleSave(updated);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Edit action trigger
  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setForm({
      name: booking.name,
      email: booking.email,
      service: booking.service,
      date: booking.date,
      status: booking.status,
      amount: booking.amount.toString(),
      message: booking.message || ''
    });
    setIsEditModalOpen(true);
  };

  // Edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = bookings.map(b => 
      b.id === currentBooking.id 
        ? { ...b, ...form, amount: form.amount ? parseFloat(form.amount) : 0 }
        : b
    );
    handleSave(updated);
    setIsEditModalOpen(false);
    resetForm();
  };

  // Delete booking
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this booking?')) {
      const updated = bookings.filter(b => b.id !== id);
      handleSave(updated);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      service: 'wedding',
      date: '',
      status: 'Pending',
      amount: '',
      message: ''
    });
    setCurrentBooking(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Searching and Filtering
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      (booking.message && booking.message.toLowerCase().includes(search.toLowerCase()));

    const matchesService = filterService === 'all' || booking.service === filterService;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <>
      <AdminHeader title="Bookings & Inquiries" />

      {/* Filter and search bar */}
      <div 
        className="admin-glass-panel"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search clients, emails, keyphrases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-form-input"
            style={{ width: '100%', paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select 
            value={filterService} 
            onChange={(e) => setFilterService(e.target.value)}
            className="admin-form-select"
            style={{ minWidth: '150px' }}
          >
            <option value="all">All Services</option>
            <option value="wedding">Wedding</option>
            <option value="videography">Videography</option>
            <option value="portrait">Portrait</option>
            <option value="corporate">Corporate</option>
            <option value="fashion">Fashion</option>
            <option value="aerial">Aerial</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-form-select"
            style={{ minWidth: '150px' }}
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Add Manual Booking Button */}
          <button 
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="admin-btn admin-btn-gold"
          >
            <Plus size={16} />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* Main Table Panel */}
      <div className="admin-glass-panel" style={{ padding: '0px', overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Details</th>
                <th>Required Service</th>
                <th>Booking Date</th>
                <th>Package Price</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700, color: '#ffffff' }}>{item.name}</span>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{item.email}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {item.service}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem' }}>{item.date}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--admin-gold)' }}>
                        {formatCurrency(item.amount)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${
                        item.status === 'Completed' ? 'status-completed' :
                        item.status === 'Confirmed' ? 'status-confirmed' :
                        item.status === 'Pending' ? 'status-pending' : 'status-cancelled'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="admin-btn admin-btn-outline" 
                          style={{ padding: '0.4rem', borderRadius: '4px' }}
                          title="Edit Booking"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(item.id)}
                          className="admin-btn admin-btn-outline" 
                          style={{ padding: '0.4rem', borderRadius: '4px', borderColor: 'rgba(255, 71, 87, 0.2)', color: '#ff4757' }}
                          title="Delete Booking"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    No bookings found matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
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
                <span>Add Custom Booking</span>
                <button onClick={() => setIsAddModalOpen(false)} className="admin-modal-close"><X size={18} /></button>
              </div>

              <form onSubmit={handleAddSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="name">Client Full Name *</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange} className="admin-form-input" required placeholder="Aarav Sharma" />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleFormChange} className="admin-form-input" required placeholder="name@domain.com" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="service">Service Category</label>
                    <select id="service" name="service" value={form.service} onChange={handleFormChange} className="admin-form-select">
                      <option value="wedding">Wedding</option>
                      <option value="videography">Videography</option>
                      <option value="portrait">Portrait</option>
                      <option value="corporate">Corporate</option>
                      <option value="fashion">Fashion</option>
                      <option value="aerial">Aerial</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="date">Booking Date</label>
                    <input type="date" id="date" name="date" value={form.date} onChange={handleFormChange} className="admin-form-input" required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={form.status} onChange={handleFormChange} className="admin-form-select">
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="amount">Package Cost (₹)</label>
                    <input type="number" id="amount" name="amount" value={form.amount} onChange={handleFormChange} className="admin-form-input" placeholder="85000" required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="message">Booking Notes / Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleFormChange} className="admin-form-textarea" rows={3} placeholder="Additional specifications, drone shoots, schedule timings..." />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="admin-btn admin-btn-outline">Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-green">
                    <Check size={16} />
                    <span>Save Order</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Booking Modal */}
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
                <span>Edit Client Details</span>
                <button onClick={() => setIsEditModalOpen(false)} className="admin-modal-close"><X size={18} /></button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="name">Client Full Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleFormChange} className="admin-form-input" required />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleFormChange} className="admin-form-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="service">Service Category</label>
                    <select id="service" name="service" value={form.service} onChange={handleFormChange} className="admin-form-select">
                      <option value="wedding">Wedding</option>
                      <option value="videography">Videography</option>
                      <option value="portrait">Portrait</option>
                      <option value="corporate">Corporate</option>
                      <option value="fashion">Fashion</option>
                      <option value="aerial">Aerial</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="date">Booking Date</label>
                    <input type="date" id="date" name="date" value={form.date} onChange={handleFormChange} className="admin-form-input" required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={form.status} onChange={handleFormChange} className="admin-form-select">
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="amount">Package Cost (₹)</label>
                    <input type="number" id="amount" name="amount" value={form.amount} onChange={handleFormChange} className="admin-form-input" required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="message">Booking Notes / Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleFormChange} className="admin-form-textarea" rows={3} />
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

export default AdminBookings;
