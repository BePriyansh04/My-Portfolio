// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaRobot, FaShieldAlt } from 'react-icons/fa';
import profilePic from '../assets/profile.jpg';   // your photo

const About = () => {
  const cards = [
    { icon: FaLaptopCode, title: 'Full-Stack Development', desc: 'End-to-end web apps with modern tech & best practices.' },
    { icon: FaRobot, title: 'AI Integration', desc: 'Intelligent, AI-powered features inside web applications.' },
    { icon: FaShieldAlt, title: 'Security & Auth', desc: 'Robust authentication & secure application architecture.' },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2 variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} className="section-title">
          About Me
        </motion.h2>

        <div className="about-grid">
          {/* left - photo */}
          <motion.div variants={item} whileInView="show" viewport={{ once: true }} className="about-photo-wrapper">
            <div className="about-photo">
              <img src={profilePic} alt="Priyansh Burman" />
            </div>
          </motion.div>

          {/* right - story + cards */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="about-content">
            <h3 className="about-subtitle">Who I Am</h3>
            <p className="about-text">
              I am a Full-Stack MERN Developer who builds fully-functional, responsive web applications from start to
              finish. I handle everything from front-end & back-end to database management and deployment. My projects
              often include authentication, authorization and AI integrations—delivering intelligent, secure and seamless
              user experiences.
            </p>

            {/* 3 highlight cards */}
            <div className="about-cards">
              {cards.map((c, idx) => (
                <motion.div key={idx} className="about-card">
                  <div className="card-icon">
                    <c.icon />
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* education */}
            <motion.div className="about-edu">
              <FaGraduationCap className="edu-icon" />
              <div>
                <p className="edu-degree">Bachelor of Computer Applications (BCA)</p>
                <p className="edu-school">Manipal University Jaipur</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;