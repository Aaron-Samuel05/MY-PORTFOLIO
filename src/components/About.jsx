import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Cpu, Lightbulb, Github, ExternalLink } from 'lucide-react';
import './About.css';

const stats = [
  { value: 'Full-Stack', label: 'Web & App Development', icon: null },
  { value: 'UI/UX', label: 'Design & Prototyping', icon: null },
  { value: '7+', label: 'Featured Projects', icon: null },
  { value: 'Open', label: 'For Client Projects', icon: null },
];

const highlights = [
  {
    icon: Cpu,
    title: 'Tech-Driven',
    desc: 'Passionate about leveraging technology to solve real-world problems through code and innovation.',
  },
  {
    icon: Lightbulb,
    title: 'AI & Data',
    desc: 'Keen interest in Machine Learning, Generative AI and extracting meaningful insights from data.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="about__header" variants={itemVariants}>
            <span className="section-label">About Me</span>
            <h2 className="section-heading">The Person Behind the Code</h2>
            <p className="section-subheading">
              A developer and designer focused on building modern digital experiences with curiosity, intention, and attention to detail.
            </p>
          </motion.div>

          <div className="about__grid">
            <div className="about__left">
              <motion.div className="about__intro" variants={itemVariants}>
                <div className="about__location">
                  <MapPin size={14} />
                  <span>Chennai, India</span>
                </div>
                <p className="about__text">
                  I'm a full-stack web and app developer and UI/UX designer who enjoys turning ideas into polished, practical digital products. I work across frontend, backend, responsive interfaces, and interactive experiences.
                </p>
                <p className="about__text">
                  I enjoy the intersection of intelligent systems and practical applications — and I'm always curious about what comes next.
                </p>
              </motion.div>

              <motion.div className="about__highlights" variants={itemVariants}>
                {highlights.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="about__highlight-item card">
                    <div className="about__highlight-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="about__highlight-title">{title}</h4>
                      <p className="about__highlight-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div className="about__stats" variants={itemVariants}>
              {stats.map(({ value, label }) => (
                <div key={label} className="about__stat card">
                  <span className="about__stat-value">{value}</span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="github-activity" variants={itemVariants}>
            <div className="github-activity__header">
              <div>
                <span className="section-label">Open Source</span>
                <h3 className="github-activity__title">GitHub Activity</h3>
                <p className="github-activity__subtitle">
                  A live view of my coding activity and contributions.
                </p>
              </div>
              <a
                className="github-activity__profile"
                href="https://github.com/Aaron-Samuel05"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Aaron Samuel's GitHub profile"
              >
                <Github size={18} />
                <span>View GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <a
              className="github-activity__graph"
              href="https://github.com/Aaron-Samuel05"
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
            >
              <img
                src="https://github.com/users/Aaron-Samuel05/contributions"
                alt="GitHub contribution activity for Aaron Samuel"
                loading="lazy"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
