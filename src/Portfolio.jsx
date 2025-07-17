import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Mail, Calendar, User, Award, Briefcase, FileText, MapPin, Star, Grid, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const SKILLS = [
  { name: "React.js", icon: <Grid size={20} /> },
  { name: "Python" },
  { name: "C/C++" },
  { name: "HTML/CSS/JS" },
  { name: "Node.js" },
  { name: "MySQL" },
  { name: "WordPress" },
  { name: "REST APIs" },
  { name: "Git" },
  { name: "VS Code" },
  { name: "SAP MM (Basics)" },
  { name: "Teamwork" },
];

const PROJECTS = [
  {
    title: "Student Attendance Management System (SAMS)",
    description: "Fullstack web app for digital attendance management in academic institutions. Secure, role-based logins for admins, faculty, and students. Real-time analytics and reporting.",
    tech: ["React.js", "Flask", "Firebase", "REST API"],
    link: "https://your-featured-project-link.com"
  },
  {
    title: "Aakashdeep Foundation – NGO Website",
    description: "Fully responsive, bilingual website for a non-profit uplifting rural communities in India. Managed content, design, and deployment.",
    tech: ["HTML5", "CSS3", "Netlify"],
    link: "https://aakashdeepfoundation.netlify.app"
  },
  {
    title: "Personal Portfolio Website",
    description: "Modern, interactive portfolio to present my projects, skills, and professional journey. Features animated cover, sidebar navigation, and dynamic project cards.",
    tech: ["React.js", "Tailwind CSS", "Vercel"],
    link: "https://nitindubey-portfolio.vercel.app"
  },
  {
    title: "AI Healthcare Chatbot",
    description: "Chatbot to answer health-related queries using ML and NLTK. Improved user engagement by 30% through interactive responses.",
    tech: ["Python", "NLTK", "ML"],
    link: null
  }
];

const EXPERIENCE = [
  {
    role: "Founder",
    company: "Aakashdeep Foundation (NGO)",
    period: "July 2025–Present",
    details: [
      "Founded and lead a non-profit uplifting rural communities in India.",
      "Organized impactful events and donation drives.",
      "Managed a team of 10+ volunteers and launched pilot projects.",
      "Established the foundation’s digital presence."
    ]
  },
  {
    role: "Web Development Intern",
    company: "Dilwado.com",
    period: "Jun 2025–Present",
    details: [
      "Customized UI, managed plugins, and integrated APIs for e-commerce platform.",
      "Improved site performance and user experience."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "NIAMT College",
    period: "Jun 2025–Present",
    details: [
      "Developed front-end logic and API integration using React and Node.js.",
      "Collaborated with a team to deliver a real-time academic portal."
    ]
  },
  {
    role: "SAP MM Trainee",
    company: "Usha Martin Ltd.",
    period: "1-month training",
    details: [
      "Completed SAP MM basics training and contributed to process documentation."
    ]
  },
  {
    role: "Virtual Job Simulation",
    company: "Accenture",
    period: "Data analytics & visualization (Forage)",
    details: [
      "Analyzed datasets and presented actionable insights using visualization tools."
    ]
  }
];

const EDUCATION = [
  {
    degree: "B.Tech CSE",
    school: "Sarala Birla University",
    year: "2026",
    details: "7.18 CGPA, till 3rd year"
  },
  {
    degree: "12th (Senior Secondary)",
    school: "Sarala Birla Public School, CBSE",
    year: "2022",
    details: "72%"
  },
  {
    degree: "10th (Higher Secondary)",
    school: "Sarala Birla Public School, CBSE",
    year: "2020",
    details: "75%"
  }
];

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavToggle = () => setNavOpen((v) => !v);
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [modalProject, setModalProject] = useState(null);
  const [showCover, setShowCover] = useState(true);
  function handleCoverClose() {
    setShowCover(false);
  }

  // Add state for animated text reveal
  const [coverStep, setCoverStep] = useState(0);
  useEffect(() => {
    if (!showCover) return;
    if (coverStep < 3) {
      const t = setTimeout(() => setCoverStep(coverStep + 1), 350);
      return () => clearTimeout(t);
    }
  }, [coverStep, showCover]);

  // Animated counter hook
  function useCountUp(target, duration = 1200) {
    const [count, setCount] = React.useState(0);
    const ref = useRef();
    useEffect(() => {
      let start = 0;
      const end = target;
      if (start === end) return;
      let startTime = null;
      function animateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          ref.current = requestAnimationFrame(animateCount);
        }
      }
      ref.current = requestAnimationFrame(animateCount);
      return () => cancelAnimationFrame(ref.current);
    }, [target, duration]);
    return count;
  }

  // Animated stats
  const projectsCount = useCountUp(10);
  const yearsCount = useCountUp(3);
  const skillsCount = useCountUp(12);

  // Add at the top of the component
  const greetings = [
    "Good morning",
    "Good afternoon",
    "Good evening",
  ];
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return greetings[0];
    if (hour < 18) return greetings[1];
    return greetings[2];
  }
  const [greeting, setGreeting] = useState(getGreeting());
  useEffect(() => {
    const timer = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for hero title
  const roles = [
    "Full-Stack Developer",
    "Tech Innovator",
    "React.js Enthusiast",
    "Open Source Contributor",
    "Lifelong Learner",
  ];
  const [typeIdx, setTypeIdx] = useState(0);
  const [displayed, setDisplayed] = useState(roles[0].slice(0, 1));
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < roles[typeIdx].length) {
        timeout = setTimeout(() => setDisplayed(roles[typeIdx].slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(roles[typeIdx].slice(0, displayed.length - 1)), 30);
      } else {
        setTypeIdx((typeIdx + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, typeIdx]);

  // Confetti on name click
  function launchConfetti() {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.3 } });
  }

  // Emoji burst on profile hover
  const [showEmojis, setShowEmojis] = useState(false);
  function handlePhotoHover() {
    setShowEmojis(true);
    setTimeout(() => setShowEmojis(false), 1200);
  }

  // In the component, add scroll event to close cover on scroll
  useEffect(() => {
    if (!showCover) return;
    function handleScroll(e) {
      setShowCover(false);
    }
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [showCover]);

  // In the component, add particles initialization
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10131a] via-[#1e2746] to-[#10131a] text-white font-sans flex flex-col items-center">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-[#10131a] via-[#1e2746] to-[#10131a] border-b border-blue-900/40 flex items-center justify-between px-8 shadow-lg backdrop-blur-md transition-all duration-500">
        <span className="text-2xl font-extrabold text-blue-400 font-mono tracking-tight cursor-pointer" onClick={e => handleNavClick(e, 'hero')}>Nitin Kumar Dubey</span>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-lg font-semibold">
          <a href="#about" onClick={e => handleNavClick(e, 'about')} className="hover:text-blue-400 transition">About</a>
          <a href="#skills" onClick={e => handleNavClick(e, 'skills')} className="hover:text-green-400 transition">Skills</a>
          <a href="#projects" onClick={e => handleNavClick(e, 'projects')} className="hover:text-purple-400 transition">Projects</a>
          <a href="#experience" onClick={e => handleNavClick(e, 'experience')} className="hover:text-yellow-400 transition">Experience</a>
          <a href="#contact" onClick={e => handleNavClick(e, 'contact')} className="hover:text-cyan-400 transition">Contact</a>
        </nav>
        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-1 items-center justify-center w-10 h-10 rounded hover:bg-blue-900/30 transition" onClick={handleNavToggle} aria-label="Toggle navigation">
          <span className={`block h-0.5 w-6 bg-blue-400 rounded transition-transform duration-300 ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-blue-400 rounded transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-blue-400 rounded transition-transform duration-300 ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        <div className="flex items-center gap-4 ml-4">
          <a href="mailto:nitinkrdubey.nkd@gmail.com" className="hover:text-blue-400 transition" aria-label="Email"><Mail size={22}/></a>
          <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="GitHub"><Github size={22}/></a>
          <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="LinkedIn"><Linkedin size={22}/></a>
        </div>
        {/* Mobile Nav Drawer */}
        {navOpen && (
          <nav className="fixed top-16 left-0 right-0 bg-[#181c2a] bg-opacity-95 shadow-lg flex flex-col items-center gap-6 py-8 animate-fade-in-down md:hidden">
            <a href="#about" onClick={e => handleNavClick(e, 'about')} className="text-lg font-semibold hover:text-blue-400 transition">About</a>
            <a href="#skills" onClick={e => handleNavClick(e, 'skills')} className="text-lg font-semibold hover:text-green-400 transition">Skills</a>
            <a href="#projects" onClick={e => handleNavClick(e, 'projects')} className="text-lg font-semibold hover:text-purple-400 transition">Projects</a>
            <a href="#experience" onClick={e => handleNavClick(e, 'experience')} className="text-lg font-semibold hover:text-yellow-400 transition">Experience</a>
            <a href="#contact" onClick={e => handleNavClick(e, 'contact')} className="text-lg font-semibold hover:text-cyan-400 transition">Contact</a>
          </nav>
        )}
      </header>
      {/* Cover Page Overlay */}
      {showCover && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-br from-[#10131a] via-[#1e2746] to-[#10131a] text-white transition-opacity duration-700 animate-fade-in-up">
          <div className="backdrop-blur-xl bg-white/10 border border-blue-200/20 shadow-2xl rounded-2xl px-8 py-12 flex flex-col items-center animate-fade-in-up-box" style={{boxShadow: '0 8px 40px 0 rgba(80,160,255,0.18), 0 2px 8px 0 rgba(80,80,160,0.10)'}}>
            <div className="flex flex-col items-center mb-2">
              <span className={`text-4xl md:text-5xl font-extrabold text-center tracking-tight animate-fade-in-up${coverStep > 0 ? '' : ' opacity-0'}`} style={{letterSpacing: '-0.01em', transition: 'opacity 0.3s'}}>Code.</span>
              <span className={`text-4xl md:text-5xl font-extrabold text-center tracking-tight animate-fade-in-up${coverStep > 1 ? '' : ' opacity-0'}`} style={{letterSpacing: '-0.01em', transition: 'opacity 0.3s'}}>Create.</span>
              <span className={`text-4xl md:text-5xl font-extrabold text-center tracking-tight animate-fade-in-up${coverStep > 2 ? '' : ' opacity-0'}`} style={{letterSpacing: '-0.01em', transition: 'opacity 0.3s'}}>Inspire.</span>
            </div>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 mb-4 animate-shimmer"></div>
            <div className="text-lg md:text-xl font-semibold text-blue-100 mb-2 text-center tracking-wide animate-fade-in-up delay-100">Full-Stack Developer & Tech Innovator</div>
          </div>
          <div className="mt-8 animate-bounce text-4xl text-blue-300 cursor-pointer" onClick={handleCoverClose} title="Scroll or tap to enter">↓</div>
          <div className="text-xs text-gray-400 mt-2">Scroll down or tap the arrow to enter</div>
        </div>
      )}
      {/* Hero Section */}
      <section id="hero" className="w-full flex flex-col items-center justify-center min-h-[90vh] pt-24 pb-12 px-4 text-center relative bg-gradient-to-br from-[#10131a] via-[#1e2746] to-[#10131a] overflow-hidden">
        <Particles
          id="tsparticles"
          className={`absolute inset-0 z-0${showCover ? ' pointer-events-none' : ''}`}
          init={particlesInit}
          options={{
            fullScreen: false,
            background: { color: "transparent" },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: ["#60a5fa", "#a78bfa", "#34d399"] },
              links: { enable: true, color: "#fff", distance: 150, opacity: 0.1 },
              move: { enable: true, speed: 1, outModes: { default: "bounce" } },
              number: { value: 40 },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 4 } },
            },
            detectRetina: true,
          }}
        />
        {/* Animated background blobs (kept for extra effect) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 w-96 h-96 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-blob1" />
          <div className="absolute bottom-[-10%] right-1/3 w-80 h-80 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-blob2" />
          <div className="absolute top-1/2 left-[-10%] w-72 h-72 bg-green-400 opacity-20 rounded-full filter blur-3xl animate-blob3" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <img src="/images/profile-photo.jpg" alt="Nitin Kumar Dubey" className="w-56 h-56 rounded-full border-4 border-blue-400 shadow-xl mb-6 animate-fade-in-up object-cover object-center" onMouseEnter={handlePhotoHover} />
            {showEmojis && (
              <div className="absolute inset-0 flex flex-wrap items-center justify-center pointer-events-none animate-fade-in-up">
                <span className="text-3xl animate-bounce mx-1">✨</span>
                <span className="text-3xl animate-bounce mx-1">🚀</span>
                <span className="text-3xl animate-bounce mx-1">💡</span>
                <span className="text-3xl animate-bounce mx-1">🔥</span>
                <span className="text-3xl animate-bounce mx-1">🎉</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up cursor-pointer" onClick={launchConfetti}>Nitin Kumar Dubey</h1>
          <div className="text-lg text-blue-200 mb-2 animate-fade-in-up delay-100">Crafting digital experiences for a better tomorrow.</div>
          <h2 className="text-2xl md:text-3xl text-blue-300 mb-4 font-semibold animate-fade-in-up delay-200">
            <span className="font-mono">{displayed}</span>
            <span className="text-blue-400">|</span>
          </h2>
          <div className="text-lg text-gray-400 mb-2 animate-fade-in-up delay-300">Ranchi, Jharkhand</div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6 animate-fade-in-up delay-400">
            <a href="mailto:nitinkrdubey.nkd@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition text-lg hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"><Mail size={20}/> Get in touch</a>
            <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition text-lg hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"><FileText size={20}/> Download Resume</a>
          </div>
          <div className="mt-8 text-base text-gray-500 animate-bounce">↓ Scroll to explore ↓</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-center items-center gap-12" id="stats">
        <div className="flex flex-col items-center animate-fade-in-up">
          <Grid size={40} className="text-blue-400 mb-2" />
          <span className="text-5xl font-extrabold text-blue-400">{projectsCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Projects</span>
        </div>
        <div className="flex flex-col items-center animate-fade-in-up delay-100">
          <Briefcase size={40} className="text-green-400 mb-2" />
          <span className="text-5xl font-extrabold text-green-400">{yearsCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Years Experience</span>
        </div>
        <div className="flex flex-col items-center animate-fade-in-up delay-200">
          <Star size={40} className="text-purple-400 mb-2" />
          <span className="text-5xl font-extrabold text-purple-400">{skillsCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Skills</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-pro py-12 flex justify-center items-center">
        <div className="card-pro w-full animate-fade-in-up">
          <h3 className="heading-pro text-2xl mb-4">About Me</h3>
          <p className="text-lg text-gray-200 mb-4">Aspiring Data Scientist & Full-Stack Developer. Founded an NGO impacting 100+ students. Delivered real-world solutions in internships and projects. Strong communicator, proactive, and always learning.</p>
        </div>
      </section>
      {/* Skills Section (polished) */}
      <section id="skills" className="section-pro py-12">
        <h3 className="heading-pro text-2xl mb-6 text-green-300">Skills & Tech Stack</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
          {SKILLS.map((skill, idx) => (
            <div key={idx} className="relative animate-fade-in-up">
              <div className="group card-pro inline-flex items-center gap-2 px-4 py-2 text-base text-gray-100 font-semibold shadow hover:bg-blue-900/60 hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0}>
                {skill.icon}{skill.name}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs px-3 py-1 bg-gray-900 text-xs text-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none z-20">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Section Divider */}
      <div className="w-full flex justify-center my-12">
        <div className="h-1 w-40 bg-gradient-to-r from-gray-400 via-blue-400 to-purple-400 rounded-full opacity-70"></div>
      </div>
      {/* Projects Section (upgraded) */}
      <section id="projects" className="section-pro py-12">
        <h3 className="heading-pro text-2xl mb-6 text-purple-300">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="card-pro p-8 flex flex-col gap-2 hover:scale-[1.04] transition-transform animate-fade-in-up cursor-pointer group relative overflow-hidden"
              onClick={() => setModalProject(proj)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') setModalProject(proj); }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-br from-blue-400 via-purple-400 to-green-400 z-0" />
              <div className="relative z-10">
                <div className="text-2xl font-bold text-white mb-1">
                  {proj.link ? <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-300" onClick={e => e.stopPropagation()}>{proj.title}</a> : proj.title}
                </div>
                <div className="text-base text-gray-300 mb-2">{proj.description}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.tech.map((t, i) => <span key={i} className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-200 font-semibold">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal for project details */}
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" onClick={() => setModalProject(null)}>
            <div className="card-pro p-8 max-w-lg w-full relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-400 text-2xl font-bold" onClick={() => setModalProject(null)} aria-label="Close">&times;</button>
              <div className="text-2xl font-bold text-white mb-2">{modalProject.title}</div>
              <div className="text-base text-gray-300 mb-4">{modalProject.description}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {modalProject.tech.map((t, i) => <span key={i} className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-200 font-semibold">{t}</span>)}
              </div>
              {modalProject.link && <a href={modalProject.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">Visit Project</a>}
            </div>
          </div>
        )}
      </section>
      {/* Experience & Education Section (upgraded) */}
      <section id="experience" className="section-pro py-12">
        <h3 className="heading-pro text-2xl mb-6 text-yellow-300">Experience & Education</h3>
        <div className="relative pl-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-1 before:h-full before:bg-gradient-to-b before:from-yellow-400 before:to-blue-400 before:rounded-full">
          {[...EXPERIENCE, ...EDUCATION].map((item, idx) => (
            <div key={idx} className="relative mb-10 animate-fade-in-up">
              <div className="absolute -left-6 top-2 w-6 h-6 rounded-full flex items-center justify-center bg-gray-900 border-2 border-yellow-400 shadow-lg">
                {item.role ? <Briefcase size={18} className="text-yellow-300" /> : <Award size={18} className="text-blue-300" />}
              </div>
              <div className="ml-4 card-pro">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-bold text-lg ${item.role ? 'text-yellow-200' : 'text-blue-200'}`}>{item.role || item.degree}</span>
                  <span className="text-gray-400">@ {item.company || item.school}</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">{item.period || item.year} {item.details && typeof item.details === 'string' && <span className="ml-2">({item.details})</span>}</div>
                {Array.isArray(item.details) ? (
                  <ul className="list-disc ml-6 text-base text-gray-300">
                    {item.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Section Divider */}
      <div className="w-full flex justify-center my-12">
        <div className="h-1 w-40 bg-gradient-to-r from-gray-400 via-blue-400 to-purple-400 rounded-full opacity-70"></div>
      </div>
      {/* Testimonial/Quote Card (upgraded) */}
      <section className="section-pro py-12">
        <div className="card-pro bg-gradient-to-br from-blue-900/60 via-gray-900/80 to-purple-900/60 backdrop-blur-md border-blue-400/30 shadow-2xl p-8 flex flex-col justify-between animate-fade-in-up hover:scale-105 hover:shadow-blue-400/30 transition-transform">
          <div className="flex items-center gap-3 mb-4"><Star size={28} className="text-blue-300"/><h2 className="text-2xl font-bold text-blue-300">Testimonial</h2></div>
          <blockquote className="italic text-lg text-gray-400 max-w-2xl mx-auto font-sans">“Nitin Dubey is a passionate and committed full stack developer with a strong foundation in both frontend and backend technologies. His ability to learn quickly, build modern web apps, and deploy full-stack solutions sets him apart as a promising developer with a bright future.”<br/><span className="block mt-2 text-right text-gray-500">— Mentor, Full Stack Development Journey</span></blockquote>
        </div>
      </section>
      {/* Certifications, Workshops, Interests (upgraded) */}
      <section className="section-pro py-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Certifications Card (wider, glassy, interactive) */}
        <div className="md:col-span-2 card-pro bg-gradient-to-br from-yellow-400/10 via-gray-900/80 to-yellow-900/10 backdrop-blur-md border-yellow-400/30 shadow-lg p-8 flex flex-col justify-between animate-fade-in-up hover:scale-105 hover:shadow-yellow-400/30 transition-transform min-w-[320px]">
          <div className="flex items-center gap-3 mb-4"><Award size={28} className="text-yellow-300"/><h2 className="text-xl font-bold text-yellow-300">Certifications</h2></div>
          <ul className="text-gray-200 text-base mb-4 space-y-2">
            <li>Complete Web Development Course – Udemy (2023)</li>
            <li>Introduction to Data Science – Simplilearn (2023)</li>
            <li>Introduction to Cybersecurity – Simplilearn (2023)</li>
            <li>Introduction to Deep Learning – Simplilearn (2024)</li>
            <li>Data Analytics & Visualization Job Simulation – Forage (Accenture)</li>
          </ul>
        </div>
        {/* Workshops Card (glassy, interactive) */}
        <div className="card-pro bg-gradient-to-br from-pink-400/10 via-gray-900/80 to-pink-900/10 backdrop-blur-md border-pink-400/30 shadow-lg p-8 flex flex-col justify-between animate-fade-in-up hover:scale-105 hover:shadow-pink-400/30 transition-transform">
          <div className="flex items-center gap-3 mb-4"><Calendar size={28} className="text-pink-300"/><h2 className="text-xl font-bold text-pink-300">Workshops & Seminars</h2></div>
          <ul className="text-gray-200 text-base mb-4 space-y-2">
            <li>TechPragati 2k24 – Event Organizing Committee Member</li>
            <li>Cybersecurity Workshop – Organizing Committee Member</li>
          </ul>
        </div>
        {/* Interests Card (glassy, interactive) */}
        <div className="card-pro bg-gradient-to-br from-indigo-400/10 via-gray-900/80 to-indigo-900/10 backdrop-blur-md border-indigo-400/30 shadow-lg p-8 flex flex-col justify-between animate-fade-in-up hover:scale-105 hover:shadow-indigo-400/30 transition-transform">
          <div className="flex items-center gap-3 mb-4"><User size={28} className="text-indigo-300"/><h2 className="text-xl font-bold text-indigo-300">Personal Interests</h2></div>
          <ul className="text-gray-200 text-base mb-4 grid grid-cols-2 gap-2">
            <li>Travelling</li>
            <li>Social Causes</li>
            <li>Volunteering</li>
            <li>Tech Events</li>
            <li>Exploring AI & ML</li>
            <li>Fitness & Gym</li>
          </ul>
        </div>
      </section>
      {/* Footer (polished) */}
      <footer className="w-full text-center text-xs text-gray-500 mt-16 pt-8 border-t border-gray-800 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 shadow-2xl rounded-t-3xl flex flex-col items-center px-0 pb-6">
        <div className="card-pro w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-900/60 via-gray-900/80 to-purple-900/60 backdrop-blur-md border-gray-800 px-6 md:px-10 py-6 flex flex-col md:flex-row gap-6 md:gap-6 justify-between items-center text-base md:text-lg text-gray-200 mb-2 animate-fade-in-up">
          <a href="mailto:nitinkrdubey.nkd@gmail.com" className="flex items-center gap-2 hover:text-cyan-300 transition font-medium" aria-label="Email"><Mail size={20} className="text-cyan-300"/> nitinkrdubey.nkd@gmail.com</a>
          <span className="hidden md:inline text-gray-600">|</span>
          <a href="tel:+919835736553" className="flex items-center gap-2 hover:text-green-300 transition font-medium" aria-label="Phone"><Phone size={20} className="text-green-300"/> +91 9835736553</a>
          <span className="hidden md:inline text-gray-600">|</span>
          <span className="flex items-center gap-2 font-medium"><MapPin size={20} className="text-cyan-200"/> Ranchi, Jharkhand</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-2 animate-fade-in-up delay-100">
          <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition"><Github size={18}/></a>
          <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition"><Linkedin size={18}/></a>
          <a href="https://www.instagram.com/dube_nitn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
        </div>
        <div className="mt-2 text-gray-500 animate-fade-in-up delay-200">&copy; {new Date().getFullYear()} Nitin Dubey. All rights reserved.</div>
      </footer>
    </div>
  );
}