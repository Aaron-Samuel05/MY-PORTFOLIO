import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/projects';
import './Projects.css';

function ProjectPreview({ type }) {
  if (type === 'nts') return (
    <div className="project-preview project-preview--nts" aria-hidden="true">
      <div className="preview-grid" />
      <div className="nts-glow" />
      <div className="nts-copy"><span>NTS BLENDERS & DISTILLERS</span><strong>CRAFTED<br/>WITH CHARACTER.</strong><small>Premium spirits / 2026</small></div>
      <div className="nts-bottle"><div className="nts-neck"/><div className="nts-label">NTS</div></div>
      <div className="nts-orbit"/>
      <div className="nts-chip">EXPERIENCE THE BRAND</div>
    </div>
  );

  if (type === 'fitcheck') return (
    <div className="project-preview project-preview--fitcheck" aria-hidden="true">
      <div className="preview-grid" />
      <div className="fit-avatar"><div className="fit-head" /><div className="fit-body" /><div className="fit-leg fit-leg-a" /><div className="fit-leg fit-leg-b" /></div>
      <div className="fit-panel"><span>FITCHECK AI</span><strong>YOUR TRAINING</strong><div className="fit-ring"><b>86</b><small>FIT SCORE</small></div></div>
      <div className="fit-bars"><i/><i/><i/><i/><i/></div>
      <div className="preview-float">+12% THIS WEEK</div>
    </div>
  );

  if (type === 'res-tech') return (
    <div className="project-preview project-preview--res-tech" aria-hidden="true">
      <div className="preview-grid" />
      <div className="res-scan" />
      <div className="res-copy"><span>RES TECHNOLOGIES</span><strong>BUILD. CONNECT.<br/>SCALE.</strong><small>Digital solutions / 2026</small></div>
      <div className="res-network"><b/><b/><b/><b/><b/><em className="line l1"/><em className="line l2"/><em className="line l3"/><em className="line l4"/></div>
      <div className="res-chip">SYSTEM ONLINE <i/></div>
    </div>
  );

  if (type === 'dragcarz') return (
    <div className="project-preview project-preview--dragcarz" aria-hidden="true">
      <div className="preview-grid" />
      <div className="drag-lines" />
      <div className="drag-copy"><span>DRAGCARZ</span><strong>BUILT FOR<br/>SPEED.</strong><small>Performance / Automotive</small></div>
      <div className="drag-car"><div className="car-roof"/><div className="car-body"/><i/><i/></div>
      <div className="drag-chip">LAUNCH SYSTEM <b>●</b></div>
    </div>
  );

  if (type === 'alc') return (
    <div className="project-preview project-preview--alc" aria-hidden="true">
      <div className="preview-grid" />
      <div className="alc-copy"><span>ALC SHOWCASE</span><strong>PRODUCT<br/>IN MOTION.</strong><small>Interactive product experience</small></div>
      <div className="alc-bottle"><div/><i/><i/></div>
      <div className="alc-ring"/>
      <div className="alc-chip">SWIPE TO EXPLORE</div>
    </div>
  );

  if (type === 'femi9' || type === 'femi9-commerce') return (
    <div className={`project-preview project-preview--${type}`} aria-hidden="true">
      <div className="preview-grid" />
      <div className="femi-copy"><span>{type === 'femi9' ? 'FEMI9 3D' : 'FEMI9 STORE'}</span><strong>FASHION<br/>IN MOTION.</strong><small>{type === 'femi9' ? '3D commerce / immersive' : 'Modern fashion storefront'}</small></div>
      <div className="femi-orb"/>
      <div className="femi-card"><b>NEW DROP</b><span>SS26</span></div>
      <div className="femi-chip">EXPLORE COLLECTION →</div>
    </div>
  );

  return (
    <div className="project-preview project-preview--crypto" aria-hidden="true">
      <div className="preview-grid" />
      <div className="crypto-header"><span>MINING NODE 07</span><b>ONLINE</b></div>
      <div className="crypto-rig"><i/><i/><i/><i/><i/><i/></div>
      <div className="crypto-chart"><svg viewBox="0 0 300 100" preserveAspectRatio="none"><polyline points="0,82 35,76 65,78 95,48 125,60 155,38 185,52 215,22 245,40 275,15 300,20" /></svg></div>
      <div className="crypto-readout"><strong>12.84</strong><span>MH/s</span><small>HASHRATE</small></div>
      <div className="crypto-coins"><i>₿</i><i>Ξ</i><i>◈</i></div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const cardIsInView = useInView(cardRef, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={cardRef}
      className={`project-card card${project.liveUrl ? ' project-card--clickable' : ''}`}
      role={project.liveUrl ? 'link' : undefined}
      tabIndex={project.liveUrl ? 0 : undefined}
      onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
      onKeyDown={(event) => {
        if (project.liveUrl && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
        }
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={cardIsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <div className="project-card__preview"><ProjectPreview type={project.type} /></div>
      <div className="project-card__body">
        <div className="project-card__meta"><span className="project-card__category">{project.category}</span></div>
        <h3 className="project-card__title">{project.title}<span className="project-card__subtitle"> — {project.subtitle}</span></h3>
        <p className="project-card__desc">{project.shortDescription}</p>
        <div className="project-card__tech">{project.technologies.map(tech => <span key={tech} className="tech-badge">{tech}</span>)}</div>
        <div className="project-card__actions">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="btn btn-outline btn-sm"><GithubIcon size={14}/>GitHub</a>
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="btn btn-ghost btn-sm"><ExternalLink size={14}/>Live Demo</a> : <span className="btn btn-disabled btn-sm"><ExternalLink size={14}/>Live Demo</span>}
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
        <motion.div className="projects__header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <span className="section-label">Featured Projects</span>
          <h2 className="section-heading">A Few Things I've Built</h2>
          <p className="section-subheading">A selection of projects spanning web applications, business websites, fitness tools, and interactive simulations.</p>
        </motion.div>
        <div className="projects__grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}</div>
      </div>
    </section>
  );
}
