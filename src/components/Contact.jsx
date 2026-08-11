import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const email = 'aaronsamuel0205@gmail.com';
  const phone = '+91 9791056098';
  const phoneRaw = '9791056098';
  const whatsappUrl = 'https://wa.me/919791056098';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="contact__header"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-heading">Let's Connect &amp; Collaborate</h2>
          <p className="section-subheading">
            Whether you have an opportunity, a project idea, or just want to connect — feel free to reach out!
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Left Column: Direct Info Cards */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Email Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <Mail size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">Email Address</span>
                <a href={`mailto:${email}`} className="contact__card-value">
                  {email}
                </a>
              </div>
              <button
                className="contact__copy-btn"
                onClick={() => copyToClipboard(email, 'email')}
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <Phone size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">Phone &amp; WhatsApp</span>
                <div className="contact__phone-row">
                  <a href={`tel:${phoneRaw}`} className="contact__card-value">
                    {phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__wa-badge"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </a>
                </div>
              </div>
              <button
                className="contact__copy-btn"
                onClick={() => copyToClipboard(phoneRaw, 'phone')}
                title="Copy Phone Number"
                aria-label="Copy Phone Number"
              >
                {copiedPhone ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>

            {/* GitHub Profile Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <GithubIcon size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">GitHub Profile</span>
                <a
                  href="https://github.com/Aaron-Samuel05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__card-value contact__card-link"
                >
                  github.com/Aaron-Samuel05
                </a>
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <LinkedinIcon size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">LinkedIn Profile</span>
                <a
                  href="https://www.linkedin.com/in/aaronsamuel05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__card-value contact__card-link"
                >
                  linkedin.com/in/aaronsamuel05
                </a>
              </div>
            </div>

            {/* Instagram Profile Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <InstagramIcon size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">Instagram Profile</span>
                <a
                  href="https://www.instagram.com/aaron_samuel05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__card-value contact__card-link"
                >
                  instagram.com/aaron_samuel05
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact__card card">
              <div className="contact__card-icon">
                <MapPin size={20} />
              </div>
              <div className="contact__card-details">
                <span className="contact__card-label">Location</span>
                <span className="contact__card-value">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="contact__form-container card"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <Sparkles size={32} />
                </div>
                <h3 className="contact__success-title">Message Sent Successfully!</h3>
                <p className="contact__success-desc">
                  Thank you for reaching out, Aaron Ebenezer Samuel will get back to you shortly.
                </p>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Send a Message</h3>

                <div className="form-group">
                  <label htmlFor="contact-name">Your Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Your Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Internship / Project Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact__submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
