// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaLinkedin, FaGithub, FaEnvelope, FaCheck } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const [chars, setChars] = useState(0);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  /* ===== BACKEND SMTP CALL ===== */
  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        reset();
        setChars(0);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
      } else {
        alert(result.error || 'Failed to send');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  /* ===== SOCIALS ===== */
  const socials = [
    { icon: FaEnvelope, label: 'Mail', href: 'mailto:burman.priyansh098@gmail.com', color: '#EA4335' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/priyansh-burman-7a225621b', color: '#0077B5' },
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/BePriyansh04', color: '#fff' },
  ];

  return (
    <section id="contact" className="contact-new">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-card"
        >
          {/* LEFT - headline + 3-D socials */}
          <div className="left">
            <h2 className="title">Let's Connect</h2>
            <p className="subtitle">Ready to bring your ideas to life?</p>
            <p className="desc">
              I'm always excited to work on new projects and collaborate with amazing people. Whether you have a project in mind or just want to chat about tech, feel free to reach out!
            </p>

            <div className="socials">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-ball"
                  style={{ '--glow': s.color }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon />
                  <span>{s.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT - form */}
          <form onSubmit={handleSubmit(onSubmit)} className="right">
            <div className="input-group">
              <input id="name" type="text" placeholder=" " {...register('name', { required: 'Name is required' })} />
              <label>Name *</label>
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="input-group">
              <input id="email" type="email" placeholder=" " {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} />
              <label>Email *</label>
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="input-group">
              <textarea id="message" rows={4} placeholder=" " maxLength={500} {...register('message', { required: 'Message is required' })} onChange={(e) => setChars(e.target.value.length)} />
              <label>Message * (Max 500)</label>
              <div className="counter">{chars}/500</div>
              {errors.message && <p className="error">{errors.message.message}</p>}
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="success-msg"
                >
                  <FaCheck /> Message sent!
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaPaperPlane /> {sent ? <><FaCheck /> Sent</> : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;