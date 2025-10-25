// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaRobot, FaChevronDown } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens, SiFirebase } from 'react-icons/si';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'OneCart',
      sub: 'AI-Integrated E-Commerce Platform',
      emoji: '🛍️👕',
      icon: FaShoppingCart,
      overview: 'OneCart is a complete fashion & lifestyle shopping platform that combines AI-powered voice navigation, real-time order management, and secure checkout—all in one seamless interface.',
      features: [
        'AI Voice Navigation – hands-free shopping',
        'Google & Custom Authentication (JWT + Firebase)',
        'Full Cart & Order Lifecycle Management',
        'Multiple Payment Gateways (Razorpay, COD, Cards)',
        'Role-based Admin Dashboard for Products & Orders',
        'Real-time Inventory & Low-stock Alerts',
        'Wishlist, Coupons, Reviews & Ratings',
        'Responsive Mobile-First UI (Tailwind)',
        'Automated Invoicing & Email Notifications',
        'Deployment on Render + MongoDB Atlas',
      ],
      tech: [
        { icon: SiReact, name: 'React (Vite)', color: '#61dafb' },
        { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06b6d4' },
        { icon: SiNodedotjs, name: 'Node.js', color: '#68a063' },
        { icon: SiExpress, name: 'Express.js', color: '#fff' },
        { icon: SiMongodb, name: 'MongoDB', color: '#4db33d' },
        { icon: SiJsonwebtokens, name: 'JWT', color: '#d63aff' },
        { icon: SiFirebase, name: 'Firebase Admin', color: '#ffa000' },
      ],
    },
    {
      id: 2,
      title: 'AI Virtual Assistant',
      sub: 'Voice-Controlled Task Automation',
      emoji: '🎙️🤖',
      icon: FaRobot,
      overview: 'An AI-powered Virtual Assistant using MERN + Google Gemini API. Executes voice commands—opens sites, plays videos, gives dynamic replies—completely hands-free.',
      features: [
        'Continuous Voice Recognition (Web Speech API)',
        'Natural-Language Understanding via Gemini API',
        'Open Popular Sites (YouTube, Instagram, LinkedIn)',
        'Play YouTube Videos by Voice Query',
        'Real-time Dynamic Responses & Suggestions',
        'Wake-word Activation & Command History',
        'Light/Dark Theme with System Preference',
        'Fully Responsive Mobile Interface',
        'Deployment on Render + MongoDB Atlas',
      ],
      tech: [
        { icon: SiReact, name: 'React', color: '#61dafb' },
        { icon: SiNodedotjs, name: 'Node.js', color: '#68a063' },
        { icon: SiExpress, name: 'Express', color: '#fff' },
        { icon: SiMongodb, name: 'MongoDB', color: '#4db33d' },
      ],
    },
  ];

  const [open, setOpen] = useState(projects[0].id); // start first expanded

  return (
    <section id="projects" className="projects-sec">
      <div className="container">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-title">
          Projects
        </motion.h2>

        <div className="projects-stack">
          {projects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 90 }}
              className="project-accordion"
            >
              {/* header bar */}
              <div className="accordion-header" onClick={() => setOpen(open === p.id ? null : p.id)}>
                <div className="header-left">
                  <span className="emoji">{p.emoji}</span>
                  <p.icon className="icon" />
                  <div>
                    <h3 className="title">{p.title}</h3>
                    <p className="sub">{p.sub}</p>
                  </div>
                </div>
                <motion.div animate={{ rotate: open === p.id ? 180 : 0 }} className="chevron">
                  <FaChevronDown />
                </motion.div>
              </div>

              {/* expandable panel */}
              <AnimatePresence>
                {open === p.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="accordion-content"
                  >
                    <p className="overview">{p.overview}</p>

                    <h4 className="features-title">Key Features</h4>
                    <ul className="features-list">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>

                    <h4 className="tech-title">Tech Stack</h4>
                    <div className="tech-pills">
                      {p.tech.map((t) => (
                        <span key={t.name} className="pill" style={{ '--c': t.color }}>
                          <t.icon />
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;