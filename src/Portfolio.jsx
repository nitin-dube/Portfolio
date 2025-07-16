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
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight" style={{fontFamily:'Inter, sans-serif'}} aria-label="Nitin Kumar Dubey">Nitin Kumar Dubey</h1>
              {/* Animated accent line */}
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-full mb-4 animate-accent-line"></div>
              <h2 className="text-xl md:text-3xl font-light text-blue-200 animate-slide-fade-up-slow delay-200 text-center" style={{fontFamily:'Inter, sans-serif'}}>Full-Stack Developer & Tech Innovator</h2>
            </div>
          </div>
          <button onClick={handleEnter} className="mb-16 flex flex-col items-center group focus:outline-none animate-float-arrow cursor-pointer relative z-20" aria-label="Enter Portfolio">
            <svg className="w-10 h-10 text-blue-400 group-hover:text-white transition drop-shadow-lg group-hover:drop-shadow-blue-400/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
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
              <span className="text-sm text-gray-400 font-mono">Full-Stack Developer</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition"><Github size={22} /></a>
              <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-400 hover:text-white transition"><Linkedin size={22} /></a>
              <a href="https://instagram.com/nitinkrdubey" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-400 hover:text-white transition"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
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
          <main className="flex-1 ml-0 md:ml-52 relative z-10 pt-16">
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center" id="about">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight" style={{fontFamily:'Inter, sans-serif'}} aria-label="Nitin Kumar Dubey">Nitin Kumar Dubey</h1>
              <h2 className="text-xl md:text-2xl font-mono text-blue-400 mb-2" aria-label="B.Tech CSE, Sarala Birla University (2026)">B.Tech CSE, Sarala Birla University (2026)</h2>
              <h3 className="text-lg md:text-xl text-green-400 font-mono mb-4" aria-label="Founder, Aakashdeep Foundation (NGO)">Founder, Aakashdeep Foundation (NGO)</h3>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">Aspiring Data Scientist & Full-Stack Developer. Founded an NGO impacting 100+ students. Delivered real-world solutions in internships and projects. Strong communicator, proactive, and always learning.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-2">
                <a
                  href="mailto:nitinkrdubey.nkd@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white font-bold rounded-lg shadow transition text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 aria-label='Get in touch'"
                  aria-label="Get in touch"
                >
                  <ArrowRight size={20}/> Get in touch
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-blue-700 focus:bg-blue-800 text-white font-bold rounded-lg shadow transition text-lg transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 relative group"
                  aria-label="Download my resume (PDF)"
                >
                  <FileText size={20} />
                  Download Resume
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded bg-gray-900 text-xs text-gray-200 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                    Download my resume (PDF)
                  </span>
                </a>
              </div>
            </section>
            <div className="w-full flex justify-center my-8">
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 rounded-full opacity-60"></div>
            </div>
            {/* Dashboard Layout */}
            <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Key Skills Card */}
              <section id="skills" className="bg-gray-900/80 rounded-2xl border border-green-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-green-500/30 hover:scale-[1.025] duration-200">
                <div className="flex items-center gap-3 mb-4"><Grid size={28} className="text-green-300"/><h2 className="text-3xl font-bold text-green-300 font-mono">Key Skills</h2></div>
                <ul className="grid grid-cols-2 gap-2 text-gray-200 text-lg font-mono mb-4">
                  <li><b>API Integration & Backend</b></li>
                  <li><b>React.js</b></li>
                  <li><b>Python, C, C++</b></li>
                  <li><b>HTML, CSS, JavaScript</b></li>
                  <li><b>WordPress, MySQL</b></li>
                  <li><b>REST APIs, Git, VS Code</b></li>
                  <li><b>SAP MM (Basics)</b></li>
                  <li>Problem Solving</li>
                  <li>Time Management</li>
                  <li>Team Collaboration</li>
                </ul>
              </section>
              {/* Education Card */}
              <section id="education" className="bg-gray-900/80 rounded-2xl border border-blue-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-blue-500/30 hover:scale-[1.025] duration-200">
                <div className="flex items-center gap-3 mb-4"><UserCircle size={28} className="text-blue-300"/><h2 className="text-3xl font-bold text-blue-300 font-mono">Education</h2></div>
                <ul className="text-gray-200 text-lg font-mono mb-4 space-y-2">
                  <li><b>B.Tech CSE</b>, Sarala Birla University, 2026 <span className="text-sm text-gray-400">(7.18 CGPA, till 6th Sem)</span></li>
                  <li><b>12th (Senior Secondary)</b>, Sarala Birla Public School, CBSE, 2022 <span className="text-sm text-gray-400">(72%)</span></li>
                  <li><b>10th (Higher Secondary)</b>, Sarala Birla Public School, CBSE, 2020 <span className="text-sm text-gray-400">(75%)</span></li>
                </ul>
              </section>
              {/* Experience Card */}
              <section id="experience" className="bg-gray-900/80 rounded-2xl border border-purple-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-purple-500/30 hover:scale-[1.025] duration-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-4"><Briefcase size={28} className="text-purple-300"/><h2 className="text-3xl font-bold text-purple-300 font-mono">Professional Experience</h2></div>
                <ul className="text-gray-200 text-lg font-mono mb-4 space-y-2">
                  <li><b>Founder</b>, Aakashdeep Foundation (NGO) <span className="text-sm text-gray-400">July 2025–Present</span>
                    <ul className="list-disc ml-6 text-base text-gray-400">
                      <li>Founded and lead a non-profit uplifting rural communities in India through education, health, and environmental initiatives.</li>
                      <li>Organized impactful events and donation drives, benefiting children and local communities.</li>
                      <li>Managed a team of 10+ volunteers and launched pilot projects in key social sectors.</li>
                      <li>Established the foundation’s digital presence to expand outreach and engagement.</li>
                    </ul>
                  </li>
                  <li><b>Web Development Intern</b>, Dilwado.com <span className="text-sm text-gray-400">Jun 2025–Present</span>
                    <ul className="list-disc ml-6 text-base text-gray-400">
                      <li>Customized UI, managed plugins, and integrated APIs for e-commerce platform.</li>
                      <li>Improved site performance and user experience.</li>
                    </ul>
                  </li>
                  <li><b>Web Developer Intern</b>, NIAMT College <span className="text-sm text-gray-400">Jun 2025–Present</span>
                    <ul className="list-disc ml-6 text-base text-gray-400">
                      <li>Developed front-end logic and API integration using React and Node.js.</li>
                      <li>Collaborated with a team to deliver a real-time academic portal.</li>
                    </ul>
                  </li>
                  <li><b>SAP MM Trainee</b>, Usha Martin Ltd. <span className="text-sm text-gray-400">1-month training</span>
                    <ul className="list-disc ml-6 text-base text-gray-400">
                      <li>Completed SAP MM basics training and contributed to process documentation.</li>
                    </ul>
                  </li>
                  <li><b>Virtual Job Simulation</b>, Accenture <span className="text-sm text-gray-400">Data analytics & visualization (Forage)</span>
                    <ul className="list-disc ml-6 text-base text-gray-400">
                      <li>Analyzed datasets and presented actionable insights using visualization tools.</li>
                    </ul>
                  </li>
                </ul>
              </section>
              <div className="w-full flex justify-center my-8 md:col-span-2">
                <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-green-400 to-blue-500 rounded-full opacity-60"></div>
              </div>
              {/* Featured Project Card */}
              <section id="featured-project" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-cyan-500/40 shadow-xl p-8 flex flex-col justify-between transition hover:shadow-cyan-500/40 hover:scale-[1.03] duration-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-4"><Star size={28} className="text-cyan-300"/><h2 className="text-3xl font-bold text-cyan-300 font-mono">Featured Project</h2></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  <a href="https://your-featured-project-link.com" target="_blank" rel="noopener noreferrer" className="hover:underline focus:underline text-cyan-200 transition" aria-label="Student Attendance Management System (SAMS)">Student Attendance Management System (SAMS)</a>
                </h3>
                <div className="text-sm text-cyan-200 font-mono mb-1">NIAMT Internship Project</div>
                <div className="text-sm text-gray-300 font-mono mb-2">React.js • Flask • Firebase • REST API</div>
                <div className="text-gray-300 text-base mb-3">
                  SAMS is a full-stack web app for digital attendance management in academic institutions. It enables secure, role-based logins for admins, faculty, and students, and streamlines attendance marking, tracking, and reporting through a modern dashboard.
                </div>
                <div className="mb-2">
                  <span className="font-bold text-cyan-300">Key Features:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Role-based login (Admin, Faculty, Student)</li>
                    <li>Real-time attendance marking and analytics</li>
                    <li>Automated notifications for low attendance</li>
                    <li>Visual reports and downloadable summaries</li>
                    <li>Firebase authentication & data storage</li>
                  </ul>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-cyan-300">My Contribution:</span>
                  <div className="text-gray-300 text-base mb-1">Project Lead & Full Stack Developer — Led the team, designed system architecture, and ensured seamless integration between frontend (React) and backend (Flask, Firebase). Oversaw Git version control, explained technical flows, and coordinated collaborative development.</div>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Led project as Team Leader, managing both technical and team collaboration</li>
                    <li>Designed system flow and architecture</li>
                    <li>Integrated frontend with backend API endpoints (REST, Firebase)</li>
                    <li>Oversaw Git version control and team contributions</li>
                    <li>Facilitated collaborative development and deployment</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-cyan-300">Impact:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Reduced manual work and improved accuracy</li>
                    <li>Enhanced transparency and accessibility</li>
                  </ul>
                </div>
              </section>
              {/* Featured Project Card for Aakashdeep Foundation */}
              <section id="featured-project-ngo" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-yellow-400/40 shadow-xl p-8 flex flex-col justify-between transition hover:shadow-yellow-400/40 hover:scale-[1.03] duration-200 md:col-span-2 mt-8">
                <div className="flex items-center gap-3 mb-4"><Star size={28} className="text-yellow-300"/><h2 className="text-3xl font-bold text-yellow-300 font-mono">Featured Project</h2></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  <a href="https://your-featured-project-link.com" target="_blank" rel="noopener noreferrer" className="hover:underline focus:underline text-yellow-200 transition" aria-label="Aakashdeep Foundation – NGO Website">Aakashdeep Foundation – NGO Website</a>
                </h3>
                <div className="text-sm text-yellow-200 font-mono mb-1">Social Impact Project</div>
                <div className="text-sm text-gray-300 font-mono mb-2">HTML5 • CSS3 • Netlify • Responsive Web Design</div>
                <div className="text-gray-300 text-base mb-3">
                  Designed and developed a fully responsive, bilingual website for Aakashdeep Foundation, a non-profit dedicated to uplifting rural communities in India through education, health, and environmental initiatives. Managed the project end-to-end, from content structuring and multilingual support to visual design and deployment.
                </div>
                <div className="mb-2">
                  <span className="font-bold text-yellow-300">Key Features:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Programs section for education, health, and environment campaigns</li>
                    <li>Bilingual support (Hindi & English)</li>
                    <li>Impact timeline, growth stats, and community reach</li>
                    <li>Events gallery and real testimonials</li>
                    <li>Contact form and donor guidance</li>
                    <li>Fully responsive design for all devices</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-yellow-300">Impact:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Established the foundation’s first digital presence</li>
                    <li>Improved visibility and public trust</li>
                    <li>Enabled seamless volunteer and donor interaction</li>
                  </ul>
                </div>
              </section>
              {/* Featured Project Card for Personal Portfolio Website */}
              <section id="featured-project-portfolio" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-blue-400/40 shadow-xl p-8 flex flex-col justify-between transition hover:shadow-blue-400/40 hover:scale-[1.03] duration-200 md:col-span-2 mt-8">
                <div className="flex items-center gap-3 mb-4"><Star size={28} className="text-blue-300"/><h2 className="text-3xl font-bold text-blue-300 font-mono">Featured Project</h2></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  <a href="https://your-featured-project-link.com" target="_blank" rel="noopener noreferrer" className="hover:underline focus:underline text-blue-200 transition" aria-label="Personal Portfolio Website">Personal Portfolio Website</a>
                </h3>
                <div className="text-sm text-blue-200 font-mono mb-1">Showcase & Professional Branding</div>
                <div className="text-sm text-gray-300 font-mono mb-2">React.js • Tailwind CSS • Vercel</div>
                <div className="text-gray-300 text-base mb-3">
                  Designed and developed a modern, interactive portfolio to present my projects, skills, and professional journey. The site features a visually engaging cover, sidebar navigation, and dynamic project cards, all optimized for a seamless user experience across devices.
                </div>
                <div className="mb-2">
                  <span className="font-bold text-blue-300">Key Features:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Animated cover page and smooth transitions</li>
                    <li>Sidebar navigation for easy section access</li>
                    <li>Downloadable resume and contact options</li>
                    <li>Interactive, filterable project showcase</li>
                    <li>Fully responsive and mobile-friendly design</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-blue-300">Impact:</span>
                  <ul className="list-disc ml-8 text-base text-gray-200 mt-1">
                    <li>Enhanced my professional presence and personal branding</li>
                    <li>Enabled recruiters and collaborators to easily explore my work</li>
                    <li>Serves as a central hub for my digital portfolio and contact</li>
                  </ul>
                </div>
              </section>
              {/* Projects Card */}
              <section id="other-projects" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-cyan-400/30 shadow-xl p-8 flex flex-col justify-between transition hover:shadow-cyan-400/40 hover:scale-[1.03] duration-200 md:col-span-2 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={28} className="text-cyan-300"/>
                  <h2 className="text-3xl font-bold text-cyan-300 font-mono">Other Projects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Healthcare Chatbot Card */}
                  <div className="bg-gray-900/80 rounded-xl border border-cyan-500/20 shadow-lg p-6 flex flex-col justify-between transition hover:shadow-cyan-500/30 hover:scale-[1.025] duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-cyan-400 font-bold">AI Healthcare Chatbot</span>
                      <span className="text-xs text-gray-400 ml-2">Python, NLTK, ML</span>
                    </div>
                    <ul className="list-disc ml-5 text-base text-gray-300 mb-2">
                      <li>Developed a chatbot to answer health-related queries using ML and NLTK.</li>
                      <li>Improved user engagement by 30% through interactive responses.</li>
                    </ul>
                  </div>
                  {/* Add more project cards here as needed */}
                </div>
              </section>
              {/* Certifications Card */}
              <section id="certifications" className="bg-gray-900/80 rounded-2xl border border-yellow-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-yellow-500/30 hover:scale-[1.025] duration-200">
                <div className="flex items-center gap-3 mb-4"><Award size={28} className="text-yellow-300"/><h2 className="text-3xl font-bold text-yellow-300 font-mono">Certifications</h2></div>
                <ul className="text-gray-200 text-lg font-mono mb-4 space-y-2">
                  <li>Complete Web Development Course – Udemy (2023)</li>
                  <li>Introduction to Data Science – Simplilearn (2023)</li>
                  <li>Introduction to Cybersecurity – Simplilearn (2023)</li>
                  <li>Introduction to Deep Learning – Simplilearn (2024)</li>
                  <li>Data Analytics & Visualization Job Simulation – Forage (Accenture)</li>
                </ul>
              </section>
              {/* Workshops Card */}
              <section id="workshops" className="bg-gray-900/80 rounded-2xl border border-pink-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-pink-500/30 hover:scale-[1.025] duration-200">
                <div className="flex items-center gap-3 mb-4"><Calendar size={28} className="text-pink-300"/><h2 className="text-3xl font-bold text-pink-300 font-mono">Workshops & Seminars</h2></div>
                <ul className="text-gray-200 text-lg font-mono mb-4 space-y-2">
                  <li>TechPragati 2k24 – Event Organizing Committee Member</li>
                  <li>Cybersecurity Workshop – Organizing Committee Member</li>
                </ul>
              </section>
              {/* Interests Card */}
              <section id="interests" className="bg-gray-900/80 rounded-2xl border border-indigo-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-indigo-500/30 hover:scale-[1.025] duration-200">
                <div className="flex items-center gap-3 mb-4"><User size={28} className="text-indigo-300"/><h2 className="text-3xl font-bold text-indigo-300 font-mono">Personal Interests</h2></div>
                <ul className="text-gray-200 text-lg font-mono mb-4 grid grid-cols-2 gap-2">
                  <li>Travelling</li>
                  <li>Social Causes</li>
                  <li>Volunteering</li>
                  <li>Tech Events</li>
                  <li>Exploring AI & ML</li>
                  <li>Fitness & Gym</li>
                </ul>
              </section>
              {/* Testimonial/Quote Card */}
              <section className="bg-gray-900/80 rounded-2xl border border-gray-700 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-gray-500/30 hover:scale-[1.025] duration-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-4"><MessageSquare size={28} className="text-gray-300"/><h2 className="text-3xl font-bold text-gray-300 font-mono">Testimonial</h2></div>
                <blockquote className="italic text-lg text-gray-400 max-w-2xl mx-auto">“Nitin Dubey is a passionate and committed full stack developer with a strong foundation in both frontend and backend technologies. His ability to learn quickly, build modern web apps, and deploy full-stack solutions sets him apart as a promising developer with a bright future.”<br/><span className="block mt-2 text-right text-gray-500">— Mentor, Full Stack Development Journey</span></blockquote>
              </section>
              {/* Contact Card */}
              <section id="contact" className="bg-gray-900/80 rounded-2xl border border-cyan-500/20 shadow-lg p-8 flex flex-col justify-between transition hover:shadow-cyan-500/30 hover:scale-[1.025] duration-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-4"><Mail size={28} className="text-cyan-300"/><h2 className="text-3xl font-bold text-cyan-300 font-mono">Contact</h2></div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-blue-400"><Mail size={32} /></span>
                    <div className="text-lg text-gray-200 mt-2 font-mono">nitinkrdubey.nkd@gmail.com</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-green-400"><Phone size={32} /></span>
                    <div className="text-lg text-gray-200 mt-2 font-mono">+91 9835736553</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-cyan-400"><MapPin size={32} /></span>
                    <div className="text-lg text-gray-200 mt-2 font-mono">Ranchi, Jharkhand</div>
                  </div>
                </div>
              </section>
            </div>
            {/* Footer */}
            <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-gray-800 mt-12 flex flex-col items-center gap-2">
              <div>&copy; {new Date().getFullYear()} Nitin Dubey. All rights reserved.</div>
              <div className="flex gap-4 justify-center">
                <a href="https://github.com/nitin-dube" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition"><Github size={18}/></a>
                <a href="https://www.linkedin.com/in/nitin-kumar-dubey-0052nkd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition"><Linkedin size={18}/></a>
                <a href="https://instagram.com/nitinkrdubey" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}