import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="footer"
>
  <div className="footer-content">
    <p className="footer-text">
      © {currentYear} Priyansh Burman. Built with{' '}
      <FaHeart className="footer-heart" /> and MERN Stack
    </p>
    <p className="footer-subtext">
      Full Stack MERN Developer | AI Integration Specialist
    </p>
  </div>
</motion.footer>
  );
};

export default Footer;