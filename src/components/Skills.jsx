import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Globe, Database, Brain, Users,
  Smartphone, Sparkles, Zap, Puzzle, RefreshCw, Telescope
} from 'lucide-react';
import { skillCategories, interests, softTraits } from '../data/skills';
import './Skills.css';

const iconMap = {
  Code2, Globe, Database, Brain, Users,
  Smartphone, Sparkles, Zap, Puzzle, RefreshCw, Telescope,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('technical');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="skills__header"
        >
          <span className="section-label">Skills &amp; Interests</span>
          <h2 className="section-heading">Technical Proficiency &amp; Passion</h2>
          <p className="section-subheading">
            Technologies I build with, soft skills that drive my workflow, and core areas of interest.
          </p>

          {/* Sub-tabs */}
          <div className="skills__tabs">
            <button
              className={`skills__tab ${activeTab === 'technical' ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveTab('technical')}
            >
              Technical Skills
            </button>
            <button
              className={`skills__tab ${activeTab === 'soft' ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveTab('soft')}
            >
              Soft Skills &amp; Traits
            </button>
            <button
              className={`skills__tab ${activeTab === 'interests' ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveTab('interests')}
            >
              Interests &amp; Focus
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Technical Skills */}
        {activeTab === 'technical' && (
          <div className="skills__grid">
            {skillCategories.map((cat, catIdx) => {
              const Icon = iconMap[cat.icon] || Code2;
              return (
                <motion.div
                  key={cat.id}
                  className="skills__category card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                >
                  <div className="skills__category-header">
                    <div className="skills__category-icon">
                      <Icon size={16} />
                    </div>
                    <h3 className="skills__category-label">{cat.label}</h3>
                  </div>
                  <div className="skills__pills">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Soft Skills */}
        {activeTab === 'soft' && (
          <div className="skills__grid skills__grid--traits">
            {softTraits.map((trait, idx) => {
              const Icon = iconMap[trait.icon] || Users;
              return (
                <motion.div
                  key={trait.title}
                  className="skills__trait-card card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="skills__trait-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="skills__trait-title">{trait.title}</h3>
                  <p className="skills__trait-desc">{trait.description}</p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Interests */}
        {activeTab === 'interests' && (
          <div className="skills__grid skills__grid--interests">
            {interests.map((item, idx) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={item.label}
                  className="skills__interest-card card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="skills__interest-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="skills__interest-title">{item.label}</h3>
                    <p className="skills__interest-desc">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
