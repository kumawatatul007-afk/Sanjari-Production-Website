import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C7.69 2 5 4.69 5 8C5 12.5 11 20 11 20C11 20 17 12.5 17 8C17 4.69 14.31 2 11 2Z" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <circle cx="11" cy="8" r="2.5" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    label: 'Studio Location',
    value: 'Jaipur, Rajasthan, India',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M20 6L11 13L2 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email Us',
    value: 'sanjariproduction@gmail.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4.9 2.8C5.2 2.3 5.8 2 6.4 2H8.5C9.1 2 9.6 2.4 9.8 3L10.7 5.8C10.9 6.4 10.7 7 10.2 7.4L8.9 8.4C9.9 10.5 11.5 12.1 13.6 13.1L14.6 11.8C15 11.3 15.6 11.1 16.2 11.3L19 12.2C19.6 12.4 20 12.9 20 13.5V15.6C20 16.2 19.7 16.8 19.2 17.1C18.7 17.4 18.1 17.5 17.5 17.3C8.9 14.7 3.3 8.1 2.7 3.5C2.5 2.9 2.6 2.3 2.9 1.8L4.9 2.8Z" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    label: 'Call Us',
    value: '+91 98765 43210',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M11 6V11L14 14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Working Hours',
    value: 'Mon – Sat: 9:00 AM – 7:00 PM',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.1}s`;
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
        <div className="contact-left">
          <p className="section-tag reveal">Get In Touch</p>
          <h2 className="section-title reveal">
            Let's Create<br />Something <span>Beautiful</span>
          </h2>
          <p className="section-desc reveal">
            Ready to capture your most precious moments? We'd love to hear about your vision
            and bring it to life with our lens.
          </p>

          <div className="contact-info reveal">
            {contactInfo.map(info => (
              <div className="contact-info-item" key={info.label}>
                <div className="contact-info-icon">{info.icon}</div>
                <div>
                  <span className="contact-info-label">{info.label}</span>
                  <span className="contact-info-value">{info.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="contact-social reveal">
            {[
              { name: 'Instagram', href: '#' },
              { name: 'Facebook', href: '#' },
              { name: 'YouTube', href: '#' },
            ].map(s => (
              <a key={s.name} href={s.href} className="social-link" id={`social-${s.name.toLowerCase()}`}>
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-right reveal">
          <div className="contact-form-card">
            <h3 className="form-title">Book a Session</h3>

            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h4>Message Sent!</h4>
                <p>We'll get back to you within 24 hours. Thank you for choosing Sanjari Production!</p>
                <button
                  className="btn-primary"
                  id="contact-reset-btn"
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => setSubmitted(false)}
                >
                  <span>Send Another</span>
                </button>
              </div>
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

                <button
                  type="submit"
                  className="btn-primary submit-btn"
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8L14 2L8 14L7 9L2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
