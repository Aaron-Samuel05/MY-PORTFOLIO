import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/projects';
import './Projects.css';

function ProjectPreview({ type }) {
  const configs = {
    fitcheck: {
      className: 'project-preview--fitcheck',
      eyebrow: 'FITCHECK',
      title: 'TRAIN SMART',
      stat: '74%',
      label: 'WEEKLY PROGRESS',
      pills: ['WORKOUT', 'PROGRESS', 'GOALS'],
    },
    'res-tech': {
      className: 'project-preview--res-tech',
      eyebrow: 'RES TECHNOLOGIES',
      title: 'TECH SOLUTIONS',
      stat: '24/7',
      label: 'DIGITAL SUPPORT',
      pills: ['WEB', 'SOFTWARE', 'SOLUTIONS'],
    },
    crypto: {
      className: 'project-preview--crypto',
      eyebrow: 'CRYPTO MINING',
      title: 'MINING SIMULATOR',
      stat: '12.8 MH/s',
      label: 'SIMULATED HASHRATE',
      pills: ['MINER', 'WALLET', 'UPGRADE'],
    },
  };
  const item = configs[type] || configs.fitcheck;

  return (
    <div className={`project-preview ${item.className}`} aria-hidden="true">
      <div className="preview-grid" />
      <div className="preview-content">
        <span className="preview-eyebrow">{item.eyebrow}</span>
        <strong className="preview-title">{item.title}</strong>
        <div className="preview-stat-row">
          <span className="preview-stat">{item.stat}</span>
          <span className="preview-label">{item.label}</span>
        </div>
        <div className="preview-pills">
          {item.pills.map(pill => <span key={pill}>{pill}</span>)}
        </div>
      </div>
      <div className="preview-orb" />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const cardIsInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      className="project-card card"
      initial={{ opacity: 0, y: 32 }}
      animate={cardIsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="project-card__preview">
        <ProjectPreview type={project.type} />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__category">{project.category}</span>
        </div>

        <h3 className="project-card__title">
          {project.title}
          {project.subtitle && (
            <span className="project-card__subtitle"> — {project.subtitle}</span>
          )}
        </h3>

        <p className="project-card__desc">{project.shortDescription}</p>

        <div className="project-card__tech">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-card__actions">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <GithubIcon size={14} />
            GitHub
          </a>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : (
            <span className="btn btn-disabled btn-sm" aria-disabled="true">
              <ExternalLink size={14} />
              Live Demo
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="projects__header"
        >
          <span className="section-label">Featured Projects</span>
          <h2 className="section-heading">A Few Things I've Built</h2>
          <p className="section-subheading">
            A selection of projects spanning web applications, business websites, fitness tools, and interactive simulations.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
