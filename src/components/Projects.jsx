import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/projects';
import './Projects.css';

/* ── Ping Pong Visual Preview ─────────────────── */
function PingPongPreview() {
  return (
    <div className="project-preview project-preview--pingpong" aria-hidden="true">
      <div className="pp-court">
        <div className="pp-net" />
        <div className="pp-score">
          <span>07</span>
          <span className="pp-score-sep">:</span>
          <span>05</span>
        </div>
        <div className="pp-paddle pp-paddle--left" />
        <div className="pp-paddle pp-paddle--right" />
        <div className="pp-ball" />
      </div>
      <div className="pp-label">Ping Pong — Live Gameplay</div>
    </div>
  );
}

/* ── Flexify Visual Preview ───────────────────── */
function FlexifyPreview() {
  const bars = [65, 80, 45, 90, 55, 70, 85];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="project-preview project-preview--flexify" aria-hidden="true">
      <div className="fx-header">
        <span className="fx-app-name">Flexify</span>
        <span className="fx-badge">Active</span>
      </div>
      <div className="fx-stats">
        <div className="fx-stat">
          <span className="fx-stat-num">5</span>
          <span className="fx-stat-label">Workouts</span>
        </div>
        <div className="fx-stat">
          <span className="fx-stat-num">12k</span>
          <span className="fx-stat-label">Calories</span>
        </div>
        <div className="fx-stat">
          <span className="fx-stat-num">3h</span>
          <span className="fx-stat-label">Active</span>
        </div>
      </div>
      <div className="fx-chart">
        {bars.map((h, i) => (
          <div key={i} className="fx-bar-wrap">
            <div className="fx-bar" style={{ height: `${h}%` }} />
            <span className="fx-day">{days[i]}</span>
          </div>
        ))}
      </div>
      <div className="fx-exercises">
        {['Push-ups', 'Squats', 'Deadlift'].map(ex => (
          <div key={ex} className="fx-exercise-pill">{ex}</div>
        ))}
      </div>
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
      {/* Visual Preview */}
      <div className="project-card__preview">
        {project.type === 'pingpong' ? <PingPongPreview /> : <FlexifyPreview />}
      </div>

      {/* Card Body */}
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

        {/* Tech Stack */}
        <div className="project-card__tech">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-card__actions">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          ) : (
            <button
              className="btn btn-disabled btn-sm"
              disabled
              title="GitHub link coming soon"
              aria-label="GitHub link coming soon"
            >
              <GithubIcon size={14} />
              GitHub
            </button>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : (
            <button
              className="btn btn-disabled btn-sm"
              disabled
              title="Live demo coming soon"
              aria-label="Live demo coming soon"
            >
              <ExternalLink size={14} />
              Live Demo
            </button>
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
            Selected projects that demonstrate my interest in building real, functional software.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.p
          className="projects__note"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          GitHub and live demo links will be added as projects are published.
        </motion.p>
      </div>
    </section>
  );
}
