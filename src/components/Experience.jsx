// src/components/Experience.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGithub, FaBuilding } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Rankers Mind',
    type: 'Full-Time',
    date: 'Jan 2025 – Present',
    stack: 'Node.js, Express, PHP, Next.js, MySQL',
    bullets: [
      'Built 5+ full-stack apps (Laravel + REST), cut dev time 20%.',
      'Auth & RBAC → 25% fewer login issues.',
      'Query optimisation → 20% faster DB.',
    ],
    icon: FaBuilding,
    color: '#0077B5',
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Arka Softwares',
    type: 'Full-Time',
    date: 'Feb 2024 – Dec 2024',
    stack: 'Node.js, Express, TypeScript, Next.js, MongoDB',
    bullets: [
      '3 MERN apps (Next.js) → 25% better UX.',
      'JWT, WebSockets, APIs → 25% reliability up.',
      'MongoDB + Prisma → 20% faster queries.',
    ],
    icon: FaBuilding,
    color: '#06b6d4',
  },
  {
    id: 3,
    role: 'Open-Source Contributor',
    company: 'DevNext (GSSOC 2025)',
    type: 'Open Source',
    date: 'Sept 2025',
    stack: 'MERN + AI',
    bullets: [
      '15 bugs + 3 AI features → 20% efficiency up.',
      'Git workflows & backend opti → 20% speed.',
    ],
    icon: FaGithub,
    color: '#333',
  },
];

export default function Experience() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="experience" className="experience-3d">
      {/* FULL-SECTION BACKGROUND (covers entire viewport) */}

      {/* Content above background */}
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Experience
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="timeline-card rotate-on-hover"
              style={{ '--glow': exp.color }}
            >
              {/* Glow pulse on hover */}
              <div className="glow-pulse" />

              <div className="card-left">
                <div className="icon-circle">
                  <exp.icon />
                </div>
                <div className="line" />
              </div>

              <div className="card-right">
                <div className="card-header">
                  <h3 className="role">{exp.role}</h3>
                  <span className="type">{exp.type}</span>
                </div>
                <p className="company">{exp.company}</p>
                <p className="date">{exp.date}</p>
                <p className="stack">{exp.stack}</p>

                <ul className="bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}