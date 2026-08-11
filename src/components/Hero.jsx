import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';
import './Hero.css';

const terminalLines = [
  { prefix: '$ ', text: 'whoami', delay: 0.6 },
  { prefix: '> ', text: 'Computer Science Student', delay: 1.1, highlight: true },
  { prefix: '> ', text: 'Developer', delay: 1.6, highlight: true },
  { prefix: '> ', text: 'Problem Solver', delay: 2.1, highlight: true },
  { prefix: '> ', text: 'Tech Enthusiast', delay: 2.6, highlight: true },
  { prefix: '$ ', text: '▋', delay: 3.1, cursor: true },
];

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000);
    });
  }, []);

  return (
    <div className="terminal-card" aria-label="Terminal preview">
      <div className="terminal-card__header">
        <span className="terminal-dot terminal-dot--red" />
        <span className="terminal-dot terminal-dot--yellow" />
        <span className="terminal-dot terminal-dot--green" />
        <span className="terminal-card__title">aaron@portfolio:~</span>
      </div>
      <div className="terminal-card__body">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`terminal-line ${line.highlight ? 'terminal-line--highlight' : ''} ${line.cursor ? 'terminal-line--cursor' : ''}`}
          >
            <span className="terminal-prefix">{line.prefix}</span>
            <span className={line.cursor ? 'terminal-cursor' : ''}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero section">
      <div className="container hero__inner">
        {/* Left: Content */}
        <div className="hero__content">
          {/* Status badge */}
          <motion.div
            className="hero__status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="status-dot" />
            <span>Open to opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Aaron Samuel.</span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            className="hero__subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Computer Science Engineer&nbsp;•&nbsp;Developer&nbsp;•&nbsp;Tech Enthusiast
          </motion.p>

          {/* Body */}
          <motion.p
            className="hero__body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Building practical digital experiences with code, curiosity and a passion for technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <button className="btn btn-primary" onClick={scrollToWork}>
              View My Work
              <ChevronRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={scrollToContact}>
              Contact Me
            </button>
            <a
              href="https://github.com/Aaron-Samuel05"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aaronsamuel05"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/aaron_samuel05/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="Instagram Profile"
            >
              <InstagramIcon size={16} />
              Instagram
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="hero__scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <ArrowDown size={14} />
            <span>Scroll to explore</span>
          </motion.div>
        </div>

        {/* Right: Terminal Visual */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          <TerminalCard />

          {/* Floating info chips */}
          <motion.div
            className="hero__chip hero__chip--location"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span>📍</span>
            <span>Chennai, India</span>
          </motion.div>

          <motion.div
            className="hero__chip hero__chip--stack"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span>⚡</span>
            <span>Python · Java · ML</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
