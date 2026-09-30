import React, { useState, useEffect, useRef } from 'react';

/* ─── Intersection Observer Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Typing Animation Hook ─── */
function useTyping(words, speed = 100, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(charIdx + 1);
        }
      } else {
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        } else {
          setCharIdx(charIdx - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner">
        <a href="#hero" onClick={(e) => handleNav(e, 'hero')} className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          GV
          <span className="navbar__logo-bracket"> /&gt;</span>
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a
              href="./Guhan Vijayakumar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__resume-btn"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
function Hero() {
  const typedText = useTyping(
    ['Front-End Developer', 'ReactJS Developer', 'Java Developer', 'UI/UX Enthusiast'],
    90,
    1800
  );

  const scrollToAbout = (e) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="hero__particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }} />
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__greeting">Hello, I'm</p>
        <h1 className="hero__name">
          Guhan <span className="hero__name--accent">Vijayakumar</span>
        </h1>
        <p className="hero__role">
          <span className="hero__typed">{typedText}</span>
          <span className="hero__cursor">|</span>
        </p>
        <p className="hero__summary">
          ReactJS &amp; Java Developer skilled in frontend development, CI/CD pipelines, deployments, and modern web technologies.
        </p>
        <div className="hero__cta">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn--primary">
            Get In Touch
          </a>
          <a href="./Guhan Vijayakumar.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <i className="fas fa-download"></i> Resume
          </a>
        </div>
      </div>

      <button className="hero__scroll-indicator" onClick={scrollToAbout} aria-label="Scroll down">
        <div className="hero__mouse">
          <div className="hero__mouse-wheel"></div>
        </div>
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════ */
function About() {
  const [ref, visible] = useReveal();
  return (
    <section className="about" id="about" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">01.</span> About Me
        </h2>
        <div className="about__grid">
          <div className="about__image-wrapper">
            <div className="about__image-border">
              <img src="./assets/Guhan.jpg" alt="Guhan Vijayakumar" className="about__image" />
            </div>
          </div>
          <div className="about__text">
            <p>
              I'm a <strong>Full-Stack Developer</strong> and 2025 B.Tech IT graduate from
              <strong> Anand Institute of Higher Technology</strong> (CGPA: 8.5). Currently working as a
              <strong> Quality Development Engineer at InfuCare RX</strong>, where I develop healthcare
              application features, lead PrimeReact migrations, and manage Azure deployments.
            </p>
            <p>
              I'm passionate about solving complex problems and crafting intuitive, user-friendly solutions.
              With strong problem-solving and leadership abilities, I focus on building efficient, scalable
              applications using modern web technologies.
            </p>
            <p>
              When I'm not coding, you'll find me on the badminton court — I'm a divisional-level runner-up!
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">8.5</span>
                <span className="about__stat-label">CGPA</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">2nd</span>
                <span className="about__stat-label">Dept. Rank</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">3+</span>
                <span className="about__stat-label">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS
   ═══════════════════════════════════════════════════════════ */
const skillsData = [
  { name: 'HTML / CSS', icon: 'fab fa-html5', color: '#e44d26' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
  { name: 'ReactJS', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Java', icon: 'fab fa-java', color: '#f89820' },
  { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#6db33f' },
  { name: 'Microservices', icon: 'fas fa-cubes', color: '#00d4ff' },
  { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900' },
  { name: 'SQL', icon: 'fas fa-database', color: '#336791' },
  { name: 'Figma', icon: 'fab fa-figma', color: '#a259ff' },
  { name: 'RPA (UiPath)', icon: 'fas fa-robot', color: '#fa4616' },
  { name: 'Git / GitHub', icon: 'fab fa-github', color: '#f0f0f0' },
  { name: 'Azure', icon: 'fab fa-microsoft', color: '#0078d4' },
];

function Skills() {
  const [ref, visible] = useReveal();
  return (
    <section className="skills" id="skills" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">02.</span> Skills & Technologies
        </h2>
        <div className="skills__grid">
          {skillsData.map((skill, i) => (
            <div className="skill-card" key={skill.name} style={{ animationDelay: `${i * 0.08}s` }}>
              <i className={skill.icon} style={{ color: skill.color }}></i>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE (Timeline)
   ═══════════════════════════════════════════════════════════ */
const experienceData = [
  {
    title: 'Quality Development Engineer',
    company: 'InfuCare RX',
    period: 'Sep 2025 — Present',
    description:
      'Developed healthcare app features, led PrimeReact migration, built custom UI components, optimized performance, and managed Azure deployments.',
    tags: ['React', 'PrimeReact', 'Azure', 'CI/CD', 'Healthcare'],
    current: true,
  },
  {
    title: 'Front-End Developer (Intern)',
    company: 'VirtuNexa',
    period: 'Jan 2025 — Feb 2025',
    description:
      'Built responsive web applications with ReactJS, JavaScript, HTML, and CSS. Created reusable UI components and ensured cross-browser compatibility.',
    tags: ['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Responsive'],
    current: false,
  },
];

function Experience() {
  const [ref, visible] = useReveal();
  return (
    <section className="experience" id="experience" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">03.</span> Experience
        </h2>
        <div className="experience__timeline">
          {experienceData.map((exp, i) => (
            <div className="timeline-card" key={i}>
              <div className="timeline-card__dot">
                {exp.current && <span className="timeline-card__pulse"></span>}
              </div>
              <div className="timeline-card__content">
                <div className="timeline-card__header">
                  <h3>{exp.title}</h3>
                  <span className="timeline-card__company">@ {exp.company}</span>
                </div>
                <span className="timeline-card__period">{exp.period}</span>
                <p>{exp.description}</p>
                <div className="timeline-card__tags">
                  {exp.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════ */
const projectsData = [
  {
    title: 'Finance Manager',
    description:
      'A Java project utilizing JPA for data persistence and AWS for cloud-based deployment, enabling users to efficiently manage their income and expenses with tracking, categorizing, and analyzing financial transactions.',
    tags: ['Java', 'Spring Boot', 'JPA', 'AWS', 'Microservices'],
    image: './assets/project3.png',
    github: 'https://github.com/Guhanvs/ExpenseManager_MicroServices.git',
    icons: ['fab fa-java', 'fab fa-aws'],
  },
  {
    title: 'Mental Health & Wellness Analyser',
    description:
      'Analyzes stress levels and provides personalized recommendations for stress relief, including curated music playlists, healthy dietary suggestions, and tailored fitness exercises for holistic well-being.',
    tags: ['Python', 'Machine Learning', 'HTML', 'CSS'],
    image: './assets/project2.png',
    github: 'https://github.com/Kathirmv/Wellness-Score-Prediction.git',
    icons: ['fab fa-python', 'fab fa-html5'],
  },
  {
    title: 'E-Mail Auto-Responder',
    description:
      'Automates email responses using UiPath Studio RPA, streamlining communication workflows and reducing manual effort for routine email handling.',
    tags: ['RPA', 'UiPath', 'Automation'],
    image: './assets/project1.png',
    github: 'https://github.com/Guhanvs',
    icons: ['fas fa-robot', 'fas fa-envelope'],
  },
];

function Projects() {
  const [ref, visible] = useReveal();
  return (
    <section className="projects" id="projects" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">04.</span> Projects
        </h2>
        <div className="projects__grid">
          {projectsData.map((proj, i) => (
            <div className="project-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="project-card__image">
                <img src={proj.image} alt={proj.title} />
                <div className="project-card__overlay">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="project-card__body">
                <div className="project-card__icons">
                  {proj.icons.map((icon, j) => (
                    <i className={icon} key={j}></i>
                  ))}
                </div>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="project-card__tags">
                  {proj.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-card__source">
                  View Source <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACHIEVEMENTS
   ═══════════════════════════════════════════════════════════ */
function Achievements() {
  const [ref, visible] = useReveal();
  return (
    <section className="achievements" id="achievements" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">05.</span> Achievements
        </h2>
        <div className="achievements__grid">
          <div className="achievement-card">
            <div className="achievement-card__icon">
              <i className="fas fa-award"></i>
            </div>
            <h3>Certification of Merit</h3>
            <p>
              Graduated with <strong>2nd Overall Rank</strong> in the department. Achieved Semester
              Top Ranks: <strong>1st</strong> (7th Sem), <strong>3rd</strong> (5th Sem), and <strong>2nd</strong> (4th Sem).
            </p>
          </div>
          <div className="achievement-card">
            <div className="achievement-card__icon">
              <i className="fas fa-medal"></i>
            </div>
            <h3>Divisional Badminton Runner-up</h3>
            <p>
              Achieved <strong>Runner-up</strong> position at the divisional-level badminton tournament,
              demonstrating competitive spirit and dedication beyond academics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CERTIFICATES
   ═══════════════════════════════════════════════════════════ */
const certificatesData = [
  {
    title: 'Java Full-Stack Course',
    issuer: 'Ednue Technologies',
    date: 'Jul 2025',
    link: './assets/Guhan Full Stack Development.pdf',
    icon: 'fab fa-java',
  },
  {
    title: 'Python Course',
    issuer: 'Ednue Technologies',
    date: 'Nov 2024',
    link: './assets/Python Ednue.png',
    icon: 'fab fa-python',
  },
  {
    title: 'HTML & CSS Boot Camp',
    issuer: 'LetsUpgrade',
    date: 'Sep 2024',
    link: './assets/html and css.jpg',
    icon: 'fab fa-html5',
  },
  {
    title: 'JavaScript Boot Camp',
    issuer: 'LetsUpgrade',
    date: 'Sep 2024',
    link: './assets/js.jpg',
    icon: 'fab fa-js',
  },
  {
    title: 'RPA Finishing School',
    issuer: 'Infosys',
    date: 'Aug 2024',
    link: './assets/SpringBoard Ideathon.png',
    icon: 'fas fa-robot',
  },
  {
    title: 'TCS iON Career Edge',
    issuer: 'TCS',
    date: 'Aug 2024',
    link: './assets/TCS.png',
    icon: 'fas fa-briefcase',
  },
  {
    title: 'National Technical Hackathon',
    issuer: 'AIHT',
    date: 'May 2025',
    link: './assets/Naukri.png',
    icon: 'fas fa-code',
  },
  {
    title: 'Internship Completion',
    issuer: 'VirtuNexa',
    date: 'Feb 2025',
    link: './assets/Internship Completion certificate.pdf',
    icon: 'fas fa-certificate',
  },
  {
    title: 'Springboard Ideathon',
    issuer: 'Infosys',
    date: 'Aug 2024',
    link: './assets/SpringBoard Ideathon.png',
    icon: 'fas fa-lightbulb',
  },
];

function Certificates() {
  const [ref, visible] = useReveal();
  return (
    <section className="certificates" id="certificates" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">06.</span> Certificates
        </h2>
        <div className="certificates__grid">
          {certificatesData.map((cert, i) => (
            <div className="cert-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="cert-card__icon">
                <i className={cert.icon}></i>
              </div>
              <h3>{cert.title}</h3>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <p className="cert-card__date">{cert.date}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card__link">
                View Certificate <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════ */
function Contact() {
  const [ref, visible] = useReveal();
  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`container reveal-section ${visible ? 'revealed' : ''}`}>
        <h2 className="section-title">
          <span className="section-title__number">07.</span> Get In Touch
        </h2>
        <div className="contact__content">
          <p className="contact__text">
            I'm currently open to new opportunities and collaborations. Whether you have a project idea,
            a question, or just want to say hi — my inbox is always open!
          </p>
          <div className="contact__links">
            <a href="mailto:vsguhan2003@gmail.com" className="contact__link-card">
              <i className="fas fa-envelope"></i>
              <span>vsguhan2003@gmail.com</span>
            </a>
            <a href="tel:+918610177584" className="contact__link-card">
              <i className="fas fa-phone"></i>
              <span>+91 8610177584</span>
            </a>
            <a href="https://www.linkedin.com/in/guhanvs/" target="_blank" rel="noopener noreferrer" className="contact__link-card">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/Guhanvs" target="_blank" rel="noopener noreferrer" className="contact__link-card">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__socials">
          <a href="https://github.com/Guhanvs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/guhanvs/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:vsguhan2003@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p className="footer__text">
          Designed &amp; Built by <strong>Guhan Vijayakumar</strong>
        </p>
        <p className="footer__copyright">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════════════════ */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${show ? 'back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Certificates />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
