import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';

import { ScrollReveal, SplitText } from './ScrollReveal';
import './Contact.css';

const contactInfo = [
  {
    icon: <MapPin size={22} className="gold-text" />,
    label: 'Studio Location',
    value: 'Jaipur, Rajasthan, India',
  },
  {
    icon: <Mail size={22} className="gold-text" />,
    label: 'Email Us',
    value: 'sanjariproduction@gmail.com',
  },
  {
    icon: <Phone size={22} className="gold-text" />,
    label: 'Call Us',
    value: '+91 98765 43210',
  },
  {
    icon: <Clock size={22} className="gold-text" />,
    label: 'Working Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm({ name: '', email: '', service: '', message: '' });
    }, 1800);
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        {/* Left */}
        <ScrollReveal 
          className="contact-left"
          variant="slideRight"
        >
          <p className="section-tag">Get In Touch</p>
          <h2 className="section-title">
            <SplitText text="Let's Create" />
            <br />
            <SplitText text="Something" /> <span><SplitText text="Beautiful" /></span>
          </h2>
          <p className="section-desc">
            Ready to capture your most precious moments? We'd love to hear about your vision
            and bring it to life with our lens.
          </p>

          <div className="contact-info">
            {contactInfo.map((info, i) => (
              <ScrollReveal 
                className="contact-info-item" 
                key={info.label}
                variant="slideUp"
                delay={0.1 * i}
              >
                <div className="contact-info-icon">{info.icon}</div>
                <div>
                  <span className="contact-info-label">{info.label}</span>
                  <span className="contact-info-value">{info.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Social Links */}
          <div className="contact-social">
            {[
              { name: 'Instagram', href: '#' },
              { name: 'Facebook', href: '#' },
              { name: 'YouTube', href: '#' },
            ].map(s => (
              <a key={s.name} href={s.href} className="social-link hover-target" id={`social-${s.name.toLowerCase()}`}>
                {s.name}
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Right: Form */}
        <ScrollReveal 
          className="contact-right"
          variant="slideLeft"
        >
          <div className="contact-form-card">
            <h3 className="form-title">Book a Session</h3>

            {submitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon"><CheckCircle size={40} className="gold-text" /></div>
                <h4>Message Sent!</h4>
                <p>We'll get back to you within 24 hours. Thank you for choosing Sanjari Production!</p>
                <button
                  className="btn-primary hover-target"
                  id="contact-reset-btn"
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => setSubmitted(false)}
                >
                  <span>Send Another</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="videography">Cinematic Videography</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="fashion">Fashion & Editorial</option>
                    <option value="aerial">Aerial Drone Shots</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event, date, location..."
                    rows={5}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary submit-btn hover-target"
                  id="contact-submit-btn"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span className="spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;

