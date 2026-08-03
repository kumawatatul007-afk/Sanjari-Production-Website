import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Image, Inbox, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { getBookings, getGallery } from '../../utils/storage';
import { LuxuryLineChart, LuxuryDonutChart, RadialProgressRing } from '../../components/admin/AdminCharts';
import '../../components/admin/Admin.css';

const AdminOverview = () => {
  const [bookings, setBookings] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
    setGallery(getGallery());

    // Listen to updates from other pages
    const handleBookingsUpdate = () => setBookings(getBookings());
    const handleGalleryUpdate = () => setGallery(getGallery());

    window.addEventListener('sanjari-bookings-updated', handleBookingsUpdate);
    window.addEventListener('sanjari-gallery-updated', handleGalleryUpdate);

    return () => {
      window.removeEventListener('sanjari-bookings-updated', handleBookingsUpdate);
      window.removeEventListener('sanjari-gallery-updated', handleGalleryUpdate);
    };
  }, []);

  // Stats calculations
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status === 'Completed' || b.status === 'Confirmed')
    .reduce((sum, b) => sum + (b.amount || 0), 0);
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const activePhotos = gallery.length;

  // Formatting currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Group bookings by category for Donut chart
  const serviceCounts = bookings.reduce((acc, curr) => {
    const serviceName = curr.service.charAt(0).toUpperCase() + curr.service.slice(1);
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {});

  const serviceColors = {
    Wedding: '#d4af37', // Gold
    Videography: '#00f2fe', // Teal/Blue
    Portrait: '#b388ff', // Purple
    Corporate: '#00e676', // Green
    Fashion: '#ff4757', // Red
    Aerial: '#ff9100' // Orange
  };

  const donutData = Object.keys(serviceCounts).map(cat => ({
    name: cat,
    value: serviceCounts[cat],
    color: serviceColors[cat] || '#8e9eab'
  }));

  // Trend data by month (mock representation based on current state)
  const trendData = [
    { label: 'Mar', value: 4 },
    { label: 'Apr', value: 6 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 8 },
    { label: 'Jul', value: 11 },
    { label: 'Aug', value: totalBookings || 7 }
  ];

  // Cards layout configuration
  const cardData = [
    { 
      label: 'Total Bookings', 
      val: totalBookings, 
      desc: 'All booking inquiries', 
      icon: <Calendar size={22} className="gold-text" />,
      color: 'var(--admin-gold)'
    },
    { 
      label: 'Gross Revenue', 
      val: formatCurrency(totalRevenue), 
      desc: 'Confirmed & completed orders', 
      icon: <DollarSign size={22} style={{ color: '#00e676' }} />,
      color: 'var(--admin-accent-green)'
    },
    { 
      label: 'Pending Reviews', 
      val: pendingCount, 
      desc: 'Requires immediate action', 
      icon: <Inbox size={22} style={{ color: '#ff9100' }} />,
      color: 'var(--admin-accent-orange)'
    },
    { 
      label: 'Portfolio Media', 
      val: activePhotos, 
      desc: 'Active files in landing gallery', 
      icon: <Image size={22} style={{ color: '#00f2fe' }} />,
      color: 'var(--admin-accent-blue)'
    }
  ];

  return (
    <>
      <AdminHeader title="Dashboard Overview" />

      {/* Stats Deck */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cardData.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="admin-glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Corner Decorative glow indicator */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '4px',
                height: '100%',
                backgroundColor: card.color
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {card.label}
              </span>
              <div 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '0.5rem', 
                  borderRadius: '6px', 
                  border: '1px solid rgba(255, 255, 255, 0.05)' 
                }}
              >
                {card.icon}
              </div>
            </div>

            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
              {card.val}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
              {card.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Grid: Charts */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 2fr))',
          gap: '1.5rem',
          marginTop: '0.5rem'
        }}
      >
        {/* Trend Area Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="admin-glass-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="admin-heading" style={{ fontSize: '1rem', color: '#ffffff' }}>Booking Velocity Trend</h3>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Monthly incoming photography/videography requests</p>
            </div>
            <TrendingUp size={18} className="gold-text" />
          </div>
          <LuxuryLineChart data={trendData} height={190} />
        </motion.div>

        {/* Categories Distribution Donut */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="admin-glass-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div>
            <h3 className="admin-heading" style={{ fontSize: '1rem', color: '#ffffff' }}>Category Distribution</h3>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Bookings divided by event shoot category</p>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {donutData.length > 0 ? (
              <LuxuryDonutChart data={donutData} />
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>No data available</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Grid: Progress rings & Recent Bookings */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Goals Progress Deck */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="admin-glass-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div>
            <h3 className="admin-heading" style={{ fontSize: '1rem', color: '#ffffff' }}>Operational Efficiency</h3>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Target goals and conversion percentages</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', padding: '1rem 0' }}>
            <RadialProgressRing percentage={85} label="Conversions" color="var(--admin-accent-blue)" size={100} strokeWidth={8} />
            <RadialProgressRing percentage={72} label="Sales Goal" color="var(--admin-gold)" size={100} strokeWidth={8} />
            <RadialProgressRing percentage={94} label="Client Rating" color="var(--admin-accent-green)" size={100} strokeWidth={8} />
          </div>
        </motion.div>

        {/* Recent booking inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="admin-glass-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="admin-heading" style={{ fontSize: '1rem', color: '#ffffff' }}>Recent Inquiries</h3>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Latest client bookings and messages</p>
            </div>
            <Users size={18} style={{ color: 'var(--admin-accent-blue)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', overflowY: 'auto', maxHeight: '180px' }}>
            {bookings.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.03)'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>
                    {item.service} shoot
                  </span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                  <span 
                    className={`status-pill ${
                      item.status === 'Completed' ? 'status-completed' :
                      item.status === 'Confirmed' ? 'status-confirmed' :
                      item.status === 'Pending' ? 'status-pending' : 'status-cancelled'
                    }`}
                    style={{ fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}
                  >
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminOverview;
