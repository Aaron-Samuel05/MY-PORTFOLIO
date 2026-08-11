import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Cpu, Lightbulb } from 'lucide-react';
import './About.css';

const stats = [
  { value: 'B.Tech CSE', label: 'Computer Science & Engineering', icon: GraduationCap },
  { value: '8.08', label: 'Current CGPA', icon: null },
  { value: '2027', label: 'Expected Graduation', icon: null },
  { value: '2+', label: 'Featured Projects', icon: null },
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
          {/* Header */}
          <motion.div className="about__header" variants={itemVariants}>
            <span className="section-label">About Me</span>
            <h2 className="section-heading">The Person Behind the Code</h2>
            <p className="section-subheading">
              A Computer Science &amp; Engineering student at SRM Institute of Science and Technology, Chennai — building things with curiosity and intention.
            </p>
          </motion.div>

          <div className="about__grid">
            {/* Left: Text + highlights */}
            <div className="about__left">
              <motion.div className="about__intro" variants={itemVariants}>
                <div className="about__location">
                  <MapPin size={14} />
                  <span>Chennai, India</span>
                </div>
                <p className="about__text">
                  I'm a Computer Science and Engineering student passionate about leveraging technology to solve real-world problems. My focus spans Python, SQL, Machine Learning and Generative AI, with a strong interest in extracting meaningful insights from data to drive informed decision-making.
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

            {/* Right: Stats */}
            <motion.div className="about__stats" variants={itemVariants}>
              {stats.map(({ value, label }) => (
                <div key={label} className="about__stat card">
                  <span className="about__stat-value">{value}</span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
