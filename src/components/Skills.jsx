// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3, FaJs,
  FaDatabase, FaShieldAlt, FaRobot, FaUserShield, FaCartPlus, FaLaravel,
} from 'react-icons/fa';
import {
  SiExpress, SiMongodb, SiNextdotjs, SiTailwindcss, SiJsonwebtokens, SiFirebase,
} from 'react-icons/si';

const Skills = () => {
  const coreTech = [
    { icon: FaReact, name: 'React / Next', color: '#61dafb' },
    { icon: FaNodeJs, name: 'Node.js', color: '#68a063' },
    { icon: SiExpress, name: 'Express', color: '#fff' },
    { icon: SiMongodb, name: 'MongoDB', color: '#4db33d' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#fff' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06b6d4' },
    { icon: FaPhp, name: 'PHP', color: '#777bb4' },
    { icon: FaLaravel, name: 'Laravel', color: '#ff2d20' },
    { icon: FaHtml5, name: 'HTML5', color: '#e34c26' },
    { icon: FaCss3, name: 'CSS3', color: '#1572b6' },
    { icon: FaJs, name: 'JavaScript', color: '#f7df1e' },
    { icon: SiJsonwebtokens, name: 'JWT', color: '#d63aff' },
  ];

  const services = [
    { icon: FaReact, title: 'Frontend Development', desc: 'Responsive & interactive UIs with React, Next.js, Tailwind.' },
    { icon: FaNodeJs, title: 'Full-Stack Web Dev', desc: 'End-to-end apps with MERN / Next / Laravel.' },
    { icon: FaDatabase, title: 'Backend Development', desc: 'Robust APIs with Node, Express, PHP, Laravel.' },
    { icon: FaDatabase, title: 'Database Management', desc: 'MongoDB, SQL design & optimisation.' },
    { icon: FaShieldAlt, title: 'Auth & Security', desc: 'JWT, OAuth, role-based access control.' },
    { icon: FaRobot, title: 'AI Integration', desc: 'Smart features & AI-powered solutions.' },
    { icon: FaUserShield, title: 'Admin Panels', desc: 'Rich dashboards for content & user control.' },
    { icon: FaCartPlus, title: 'Payment Gateways', desc: 'Stripe, Razorpay, PayPal integrations.' },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <section id="skills" className="skills-side">
      <div className="container">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="skills-grid-side">
          {/* LEFT - Core Technologies */}
          <motion.div variants={item} className="side left">
            <h2 className="side-title">Core Technologies</h2>
            <div className="tech-tiles">
              {coreTech.map((t) => (
                <motion.div key={t.name} className="tech-tile" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <t.icon className="tech-icon" style={{ color: t.color }} />
                  <span className="tech-name">{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - Services Offered */}
          <motion.div variants={item} className="side right">
            <h2 className="side-title">Services Offered</h2>
            <div className="service-cards">
              {services.map((s) => (
                <motion.div key={s.title} className="service-card" whileHover={{ y: -5 }}>
                  <div className="service-icon">
                    <s.icon />
                  </div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;