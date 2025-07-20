import React, { useState, useEffect } from "react";
import { Mail, Linkedin, Github, MapPin, Phone, Calendar, User, ArrowRight, Star, FileText, Grid, UserCircle, Briefcase, MessageSquare, Award } from "lucide-react";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [coverVisible, setCoverVisible] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const onScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      let found = 'about';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 100 >= el.offsetTop) found = id;
      }
      setActiveSection(found);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!coverVisible) return;
    const handleScroll = () => {
      if (window.scrollY > 10) setCoverVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [coverVisible]);

  const handleEnter = () => {
    setCoverVisible(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Calculate animation values based on scroll position - Anton style
  const heroSection = scrollY < window.innerHeight;
  const titleScale = heroSection ? Math.max(0.8, 1 - (scrollY / window.innerHeight) * 0.2) : 0.8;
  const titleOpacity = heroSection ? Math.max(0.3, 1 - (scrollY / window.innerHeight) * 0.7) : 0.3;
  const titleTranslateY = heroSection ? scrollY * 0.5 : window.innerHeight * 0.5;

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Cover Page */}
      {coverVisible && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#10131a] via-[#1e2746] to-[#10131a]" style={{ minHeight: '100vh', overflow: 'hidden' }}>
          {/* Animated radial gradient background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(60,120,255,0.18) 0%, rgba(16,19,26,0.95) 100%)',
            animation: 'bg-move 18s linear infinite alternate',
            zIndex: 1
          }}></div>
          {/* Animated geometric shapes */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Floating dots */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-float-dot1"></div>
            <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-green-400/40 rounded-full animate-float-dot2"></div>
            <div className="absolute bottom-1/4 left-1/5 w-2.5 h-2.5 bg-purple-400/40 rounded-full animate-float-dot3"></div>
            {/* Floating line */}
            <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-blue-500/20 rounded-full animate-float-line"></div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full relative z-20">
            {/* Profile Photo */}
            <div className="backdrop-blur-xl bg-white/10 border border-blue-900/30 rounded-2xl px-10 py-12 shadow-2xl animate-slide-fade-up-slow max-w-2xl mx-auto flex flex-col items-center">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight animate-gradient-text" style={{fontFamily:'Inter, sans-serif'}} aria-label="Code Maverick">Code Maverick</h1>
              {/* Animated accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-full mb-4 animate-accent-line"></div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-200 text-center mb-2" style={{fontFamily:'Inter, sans-serif', display: 'inline-block'}}>
                <span className="cover-typewriter">Aspiring Full-Stack Developer</span>
              </h2>
              <p className="text-lg md:text-xl text-blue-100 text-center mb-6 animate-fade-in-up max-w-xl">I build modern, impactful web solutions and love turning ideas into reality. Let’s create something amazing together!</p>
              <button onClick={handleEnter} className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition button-animate text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in-up" aria-label="Enter Portfolio">
                Explore My Work
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Hide main content and sidebar when cover is visible */}
      <div className={coverVisible ? 'opacity-0 pointer-events-none select-none' : 'opacity-100 transition-opacity duration-700'}>
        {/* Main Content and Sidebar only! */}
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans relative overflow-hidden flex">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-gray-950/80 backdrop-blur border-b border-gray-800 flex items-center justify-between px-6 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-blue-400 font-mono">Nitin Dubey</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition"><Github size={22} /></a>
              <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-400 hover:text-white transition"><Linkedin size={22} /></a>
              <a href="mailto:nitinkrdubey.nkd@gmail.com" aria-label="Mail" className="text-cyan-400 hover:text-white transition"><Mail size={22} /></a>
              <a href="https://instagram.com/dube_nitn" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-400 hover:text-white transition"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
            </div>
          </header>
          {/* Hamburger Button */}
          <button
            className="fixed top-4 left-4 z-50 md:hidden bg-gray-900/80 border border-gray-700 rounded p-2 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            style={{ marginTop: '48px' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          {/* Sidebar Overlay (mobile) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 z-50 h-screen w-56 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-r-2 border-blue-800 shadow-2xl flex-col transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 md:flex`}
            style={{ display: sidebarOpen ? 'flex' : undefined, marginTop: '64px', boxShadow: '4px 0 24px 0 rgba(0,0,0,0.7)' }}
            aria-label="Sidebar navigation"
          >
            {/* Close button (mobile) */}
            <button
              className="absolute top-3 right-3 md:hidden bg-gray-900/80 border border-gray-700 rounded p-1 text-white z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="flex items-center flex-col px-6 py-6 border-b border-blue-800">
              <img 
                src="/images/profile-photo.jpg" 
                alt="Nitin Dubey profile" 
                className="w-28 h-28 md:w-44 md:h-44 rounded-full border-4 border-white/80 shadow-lg mb-4 object-cover bg-gray-900/20"
                style={{filter: 'brightness(1.08) contrast(1.08)'}}
                loading="lazy"
              />
              <span className="text-2xl font-extrabold text-blue-400 font-mono tracking-wide">Nitin Dubey</span>
            </div>
            {/* File Explorer (optional, can be removed for more focus) */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="mb-8">
                <div className="text-xs text-gray-500 mb-2 font-mono">EXPLORER</div>
                <ul className="text-sm text-gray-300 font-mono space-y-1">
                  <li className="flex items-center gap-2"><span className="text-green-400">▸</span> src/</li>
                  <li className="ml-3 flex items-center gap-2"><span className="text-blue-400">▸</span> components/</li>
                  <li className="ml-6 flex items-center gap-2"><span className="text-purple-400">●</span> Portfolio.jsx</li>
                  <li className="ml-3 flex items-center gap-2"><span className="text-yellow-400">●</span> index.js</li>
                  <li className="ml-3 flex items-center gap-2"><span className="text-cyan-400">●</span> index.css</li>
                </ul>
              </div>
              {/* Terminal (optional, can be removed for more focus) */}
              <div className="mt-5 mb-8">
                <div className="text-xs text-gray-500 mb-2 font-mono">TERMINAL</div>
                <div className="bg-black/80 border border-gray-800 rounded p-2 text-xs font-mono text-green-400">
                  <div className="mb-1">$ npm start</div>
                  <div className="text-gray-400">[dev-server] running...</div>
                </div>
              </div>
            </div>
            {/* Sidebar Navigation */}
            <nav className="px-2 py-4 border-t-2 border-blue-800" aria-label="Sidebar navigation">
              <ul className="space-y-2 text-base font-mono">
                <li>
                  <a href="#about" tabIndex={0} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-semibold relative focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeSection==='about' ? 'bg-blue-900 text-blue-300 border-l-4 border-blue-400 shadow-lg' : 'text-blue-400 hover:bg-gray-800 hover:border-l-4 hover:border-blue-600'}`} onClick={() => setSidebarOpen(false)} aria-label="About section">
                    <UserCircle size={22}/>
                    <span>About</span>
                    {activeSection==='about' && <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-r"></span>}
                  </a>
                </li>
                <li>
                  <a href="#skills" tabIndex={0} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-semibold relative focus:outline-none focus:ring-2 focus:ring-green-500 ${activeSection==='skills' ? 'bg-green-900 text-green-300 border-l-4 border-green-400 shadow-lg' : 'text-green-400 hover:bg-gray-800 hover:border-l-4 hover:border-green-600'}`} onClick={() => setSidebarOpen(false)} aria-label="Skills section">
                    <Grid size={22}/>
                    <span>Skills</span>
                    {activeSection==='skills' && <span className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r"></span>}
                  </a>
                </li>
                <li>
                  <a href="#projects" tabIndex={0} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-semibold relative focus:outline-none focus:ring-2 focus:ring-purple-500 ${activeSection==='projects' ? 'bg-purple-900 text-purple-300 border-l-4 border-purple-400 shadow-lg' : 'text-purple-400 hover:bg-gray-800 hover:border-l-4 hover:border-purple-600'}`} onClick={() => setSidebarOpen(false)} aria-label="Projects section">
                    <Briefcase size={22}/>
                    <span>Projects</span>
                    {activeSection==='projects' && <span className="absolute left-0 top-0 h-full w-1 bg-purple-400 rounded-r"></span>}
                  </a>
                </li>
                <li>
                  <a href="#contact" tabIndex={0} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-semibold relative focus:outline-none focus:ring-2 focus:ring-cyan-500 ${activeSection==='contact' ? 'bg-cyan-900 text-cyan-300 border-l-4 border-cyan-400 shadow-lg' : 'text-cyan-400 hover:bg-gray-800 hover:border-l-4 hover:border-cyan-600'}`} onClick={() => setSidebarOpen(false)} aria-label="Contact section">
                    <MessageSquare size={22}/>
                    <span>Contact</span>
                    {activeSection==='contact' && <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r"></span>}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          {/* Main Content Dashboard */}
          <main className="ml-0 md:ml-56 px-4 md:px-8 pt-16">
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center" id="about">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight" style={{fontFamily:'Inter, sans-serif'}} aria-label="Nitin Kumar Dubey">Nitin Kumar Dubey</h1>
              <h2 className="text-xl md:text-2xl font-mono text-blue-400 mb-2" aria-label="B.Tech CSE, Sarala Birla University (2026)">Full-Stack Developer | Tech Innovator | Open to Opportunities</h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 animate-fade-in-up">Hi! I’m Nitin, a passionate full-stack developer with a knack for building impactful, user-focused web solutions. I thrive on learning new technologies, collaborating with teams, and turning ideas into reality. Currently, I’m open to exciting opportunities in software development and tech innovation.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-2 animate-fade-in-up">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white font-bold rounded-lg shadow transition text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 button-animate"
                  aria-label="Download my resume (PDF)"
                >
                  <FileText size={20} />
                  Download Resume
                </a>
                <a
                  href="mailto:nitinkrdubey.nkd@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 focus:bg-green-800 text-white font-bold rounded-lg shadow transition text-lg focus:outline-none focus:ring-2 focus:ring-green-400 button-animate"
                  aria-label="Contact Me"
                >
                  <ArrowRight size={20}/>
                  Contact Me
                </a>
              </div>
            </section>
            <div className="w-full flex justify-center my-8">
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 rounded-full opacity-60"></div>
            </div>
            {/* Projects Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-2">Student Attendance Management System (SAMS)</h3>
                  <p className="text-lg font-sans leading-relaxed text-gray-200 mb-4">A full-stack web app for digital attendance management in academic institutions. Built with <span className='font-mono text-blue-300'>React.js</span>, <span className='font-mono text-blue-300'>Flask</span>, and <span className='font-mono text-blue-300'>Firebase</span>.</p>
                  <ul className="list-disc ml-6 text-gray-400 text-base mb-2">
                    <li>Role-based login (Admin, Faculty, Student)</li>
                    <li>Real-time attendance marking and analytics</li>
                    <li>Automated notifications for low attendance</li>
                    <li>Visual reports and downloadable summaries</li>
                    <li>Firebase authentication & data storage</li>
                  </ul>
                  <div className="text-sm text-gray-500">NIAMT Internship Project</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-2">Aakashdeep Foundation – NGO Website</h3>
                  <p className="text-lg font-sans leading-relaxed text-gray-200 mb-4">A newly started social organization website dedicated to empowering rural communities in India through education, health, and environmental initiatives.</p>
                  <ul className="list-disc ml-6 text-gray-400 text-base mb-2">
                    <li>Programs section for education, health, and environment campaigns</li>
                    <li>Bilingual support (Hindi & English)</li>
                    <li>Impact timeline, growth stats, and community reach</li>
                    <li>Events gallery and real testimonials</li>
                    <li>Contact form and donor guidance</li>
                    <li>Fully responsive design for all devices</li>
                  </ul>
                  <a href="https://aakashdeepfoundation.netlify.app/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Visit Website</a>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-2">Portfolio Website</h3>
                  <p className="text-lg font-sans leading-relaxed text-gray-200 mb-4">A modern, interactive portfolio to present my projects, skills, and professional journey. Built with <span className='font-mono text-blue-300'>React.js</span> and <span className='font-mono text-blue-300'>Tailwind CSS</span>.</p>
                  <ul className="list-disc ml-6 text-gray-400 text-base mb-2">
                    <li>Animated cover page and smooth transitions</li>
                    <li>Sidebar navigation for easy section access</li>
                    <li>Downloadable resume and contact options</li>
                    <li>Interactive, filterable project showcase</li>
                    <li>Fully responsive and mobile-friendly design</li>
                  </ul>
                  <a href="/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">View Portfolio</a>
                </div>
              </div>
            </section>
            {/* Skills Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-4 flex items-center gap-2"><span role="img" aria-label="Languages">🖥️</span>Languages</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>Python</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>C</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>C++</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>JavaScript</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>HTML</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-4 flex items-center gap-2"><span role="img" aria-label="Frameworks">⚛️</span>Frameworks & Libraries</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>React.js</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>Tailwind CSS</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>WordPress</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading tracking-tight mb-4 flex items-center gap-2"><span role="img" aria-label="Tools">🛠️</span>Tools & Soft Skills</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>Git</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>VS Code</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>MySQL</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>REST APIs</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>Problem Solving</li>
                    <li className="flex items-center gap-2"><span className="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>Team Collaboration</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Experience Section - Timeline Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Experience</h2>
              </div>
              <ul className="relative border-l-4 border-blue-500 pl-10 space-y-12">
                <li>
                  <div className="absolute -left-6 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2025</div>
                  <div className="font-semibold text-lg">Founder, Aakashdeep Foundation (NGO)</div>
                  <div className="text-gray-400 text-sm mb-1">July 2025–Present</div>
                  <ul className="list-disc ml-6 text-gray-300 text-base">
                    <li>Founded and lead a non-profit uplifting rural communities in India through education, health, and environmental initiatives.</li>
                    <li>Organized impactful events and donation drives, benefiting children and local communities.</li>
                    <li>Managed a team of 10+ volunteers and launched pilot projects in key social sectors.</li>
                    <li>Established the foundation’s digital presence to expand outreach and engagement.</li>
                  </ul>
                </li>
                <li>
                  <div className="absolute -left-6 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2025</div>
                  <div className="font-semibold text-lg">Web Development Intern, Dilwado.com</div>
                  <div className="text-gray-400 text-sm mb-1">Jun 2025–Present</div>
                  <ul className="list-disc ml-6 text-gray-300 text-base">
                    <li>Customized UI, managed plugins, and integrated APIs for e-commerce platform.</li>
                    <li>Improved site performance and user experience.</li>
                  </ul>
                </li>
                <li>
                  <div className="absolute -left-6 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2025</div>
                  <div className="font-semibold text-lg">Web Developer Intern, NIAMT College</div>
                  <div className="text-gray-400 text-sm mb-1">Jun 2025–Present</div>
                  <ul className="list-disc ml-6 text-gray-300 text-base">
                    <li>Developed front-end logic and API integration using React and Node.js.</li>
                    <li>Collaborated with a team to deliver a real-time academic portal.</li>
                  </ul>
                </li>
                <li>
                  <div className="absolute -left-6 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2025</div>
                  <div className="font-semibold text-lg">SAP MM Trainee, Usha Martin Ltd.</div>
                  <div className="text-gray-400 text-sm mb-1">1-month training</div>
                  <ul className="list-disc ml-6 text-gray-300 text-base">
                    <li>Completed SAP MM basics training and contributed to process documentation.</li>
                  </ul>
                </li>
                <li>
                  <div className="absolute -left-6 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2025</div>
                  <div className="font-semibold text-lg">Virtual Job Simulation, Accenture</div>
                  <div className="text-gray-400 text-sm mb-1">Data analytics & visualization (Forage)</div>
                  <ul className="list-disc ml-6 text-gray-300 text-base">
                    <li>Analyzed datasets and presented actionable insights using visualization tools.</li>
                  </ul>
                </li>
              </ul>
            </section>
            {/* Education Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Education</h2>
              </div>
              <ul className="space-y-8">
                <li>
                  <div className="font-semibold text-lg">B.Tech CSE</div>
                  <div className="text-gray-400 text-base">Sarala Birla University, 2026 (7.18 CGPA, till 3rd Year)</div>
                </li>
                <li>
                  <div className="font-semibold text-lg">12th (Senior Secondary)</div>
                  <div className="text-gray-400 text-base">Sarala Birla Public School, CBSE, 2022 (72%)</div>
                </li>
                <li>
                  <div className="font-semibold text-lg">10th (Higher Secondary)</div>
                  <div className="text-gray-400 text-base">Sarala Birla Public School, CBSE, 2020 (75%)</div>
                </li>
              </ul>
            </section>
            {/* Certifications Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Certifications</h2>
              </div>
              <ul className="space-y-4">
                <li>Complete Web Development Course – Udemy (2023)</li>
                <li>Introduction to Data Science – Simplilearn (2023)</li>
                <li>Introduction to Cybersecurity – Simplilearn (2023)</li>
                <li>Introduction to Deep Learning – Simplilearn (2024)</li>
                <li>Data Analytics & Visualization Job Simulation – Forage (Accenture)</li>
              </ul>
            </section>
            {/* Workshops Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Workshops & Seminars</h2>
              </div>
              <ul className="space-y-4">
                <li>TechPragati 2k24 – Event Organizing Committee Member</li>
                <li>Cybersecurity Workshop – Organizing Committee Member</li>
              </ul>
            </section>
            {/* Interests Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Personal Interests</h2>
              </div>
              <ul className="grid grid-cols-2 gap-6">
                <li>Travelling</li>
                <li>Social Causes</li>
                <li>Volunteering</li>
                <li>Tech Events</li>
                <li>Exploring AI & ML</li>
                <li>Fitness & Gym</li>
              </ul>
            </section>
            {/* Testimonial Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Testimonial</h2>
              </div>
              <blockquote className="italic text-lg text-gray-400 max-w-2xl mx-auto">“Nitin Dubey is a passionate and committed full stack developer with a strong foundation in both frontend and backend technologies. His ability to learn quickly, build modern web apps, and deploy full-stack solutions sets him apart as a promising developer with a bright future.”<br/><span className="block mt-2 text-right text-gray-500">— Mentor, Full Stack Development Journey</span></blockquote>
            </section>
            {/* Contact Section - Advanced Layout */}
            <section className="mb-20 bg-white/5 rounded-xl py-14 px-8">
              <div className="flex items-center mb-8">
                <div className="w-2 min-h-[2.5rem] h-full bg-blue-500 rounded mr-4 flex-shrink-0"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-wider mb-0 flex items-center">Contact</h2>
              </div>
              <div className="mb-6 text-lg text-gray-200">Thank you for reviewing my portfolio. I welcome professional opportunities and am happy to connect with recruiters and collaborators. Please feel free to reach out via the contact details below.</div>
              <ul className="space-y-3 mb-6">
                <li><span className="font-semibold">📧 Email:</span> nitinkrdubey.nkd@gmail.com</li>
                <li><span className="font-semibold">📞 Phone:</span> +91 9835736553</li>
                <li><span className="font-semibold">📍 Location:</span> Ranchi, Jharkhand, India</li>
              </ul>
              <div className="flex gap-8 justify-start mt-2">
                <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-blue-400 hover:text-white transition"><Github size={32}/></a>
                <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-400 hover:text-white transition"><Linkedin size={32}/></a>
                <a href="https://instagram.com/dube_nitn" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-blue-400 hover:text-white transition"><svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
              </div>
            </section>
            {/* Footer */}
            <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-gray-800 mt-12 flex flex-col items-center gap-2">
              <div>&copy; {new Date().getFullYear()} Nitin Dubey. All rights reserved.</div>
              <div className="flex gap-4 justify-center">
                <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition"><Github size={18}/></a>
                <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition"><Linkedin size={18}/></a>
                <a href="mailto:nitinkrdubey.nkd@gmail.com" aria-label="Mail" className="hover:text-white transition"><Mail size={18}/></a>
                <a href="https://instagram.com/dube_nitn" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}