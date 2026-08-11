import { ArrowUp, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              Aaron Ebenezer Samuel
            </a>
            <p className="footer__tagline">
              B.Tech Computer Science &amp; Engineering Student at SRM Institute of Science &amp; Technology.
            </p>
          </div>

          <div className="footer__links">
            <a href="#about" className="footer__link">About</a>
            <a href="#skills" className="footer__link">Skills</a>
            <a href="#projects" className="footer__link">Projects</a>
            <a href="#education" className="footer__link">Education</a>
            <a href="#contact" className="footer__link">Contact</a>
          </div>

          <div className="footer__socials">
            <a
              href="https://github.com/Aaron-Samuel05"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/aaronsamuel05"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/aaron_samuel05/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="mailto:aaronsamuel0205@gmail.com"
              className="footer__social-btn"
              aria-label="Email Address"
              title="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Aaron Ebenezer Samuel. All rights reserved.
          </p>

          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
