import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import './Education.css';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="education__header"
        >
          <span className="section-label">Education</span>
          <h2 className="section-heading">Academic Background</h2>
        </motion.div>

        <motion.div
          className="education__card card"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          {/* Top accent bar */}
          <div className="education__accent-bar" />

          <div className="education__body">
            <div className="education__icon-wrap">
              <GraduationCap size={24} />
            </div>

            <div className="education__content">
              <div className="education__degree-row">
                <h3 className="education__degree">
                  B.Tech in Computer Science &amp; Engineering
                </h3>
                <span className="education__status">In Progress</span>
              </div>

              <div className="education__institution">
                SRM Institute of Science and Technology
              </div>

              <div className="education__meta">
                <div className="education__meta-item">
                  <MapPin size={13} />
                  <span>Ramapuram, Chennai</span>
                </div>
                <div className="education__meta-item">
                  <Calendar size={13} />
                  <span>August 2023 – May 2027 (Expected)</span>
                </div>
                <div className="education__meta-item">
                  <Award size={13} />
                  <span>CGPA: <strong>8.08</strong></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
