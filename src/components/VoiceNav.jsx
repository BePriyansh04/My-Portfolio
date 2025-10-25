// src/components/VoiceNav.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function VoiceNav() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');

  const commands = {
    'open projects': () => {
      scrollTo('projects');
      speak('Opening projects');
    },
    'view my work': () => {
      scrollTo('projects');
      speak('Opening projects');
    },
    'download cv': () => {
      downloadCV();
      speak('Downloading CV');
    },
    'open contact': () => {
      scrollTo('contact');
      speak('Taking you to contact');
    },
    'open home': () => {
      scrollTo('home');
      speak('Going home');
    },
    'open about': () => {
      scrollTo('about');
      speak('Opening about');
    },
    'open skills': () => {
      scrollTo('skills');
      speak('Showing skills');
    },
    'open experience': () => {
      scrollTo('experience');
      speak('Opening experience');
    },
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Priyansh_Burman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 1;
    speechSynthesis.speak(utter);
    setReply(text);
    setTimeout(() => setReply(''), 2000);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice not supported');
      return;
    }
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript.toLowerCase();
      setTranscript(said);
      if (commands[said]) commands[said]();
    };
    rec.onend = () => setListening(false);
    rec.start();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="voice-fixed-3d"
    >
      <div className="voice-header">
        <FaMicrophone /> Voice Nav
      </div>

      <div className="voice-controls">
        <button
          onClick={startListening}
          className={`voice-btn ${listening ? 'listening' : ''}`}
          aria-label="Start voice"
        >
          {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>

        <AnimatePresence>
          {(transcript || reply) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="voice-text"
            >
              {transcript || reply}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}