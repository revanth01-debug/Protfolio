import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef } from "react";

import profile from "./assets/profile.png";

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [aboutFocus, setAboutFocus] = useState(false);
  const aboutRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name || "Visitor"}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:radharapurevanth10@gmail.com?subject=${subject}&body=${body}`;
  };

  const projects = [
    {
      title: "Civic Issues Reporting",
      description: "Smart platform for rural issue reporting and complaint management system.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      textColor: "text-green-400",
      cardBorder: "border border-green-500",
      cardShadow: "hover:shadow-[0_0_40px_green]",
      tech: ["HTML", "CSS", "JavaScript"],
      details: ["Citizens can report local area problems easily.", "Tracks complaints like drainage, roads and water leakage.", "Modern responsive UI with admin management system."],
      demoLink: "/projects/civictrack/index.html",
    },
    {
      title: "Black Friday Sales Prediction",
      description: "Machine learning model for predicting Black Friday sales trends and consumer behavior patterns.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      textColor: "text-orange-400",
      cardBorder: "border border-orange-500",
      cardShadow: "hover:shadow-[0_0_40px_orange]",
      tech: ["Python", "Machine Learning", "Data Analysis"],
      details: ["Predictive ML model for Black Friday sales forecasting.", "Data analysis and visualization of consumer buying patterns.", "Real-time predictions with model accuracy metrics and insights."],
      demoLink: "/projects/black_friday/index.html",
    },
    {
      title: "Hotel Management System",
      description: "Hotel booking and management platform with reservation, billing, and customer management features.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      textColor: "text-yellow-400",
      cardBorder: "border border-yellow-500",
      cardShadow: "hover:shadow-[0_0_40px_yellow]",
      tech: ["Java", "MySQL", "Spring"],
      details: ["Room reservation and billing flows with secure guest management.", "Dashboard for hotel staff to manage bookings and payments.", "Includes customer details, invoices, and room availability."],
      demoLink: "/projects/hotel_management/login.html",
    },
    {
      title: "Face Attendance",
      description: "Face recognition attendance system with automated verification, logging, and student reports.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      textColor: "text-purple-400",
      cardBorder: "border border-purple-500",
      cardShadow: "hover:shadow-[0_0_40px_purple]",
      tech: ["Python", "OpenCV", "Machine Learning"],
      details: ["Realtime facial recognition for classroom attendance.", "Auto-generated reports with timestamp and student info.", "Python desktop project hosted as a local project landing page."],
      demoLink: "/projects/face_attendance/index.html",
    },
    {
      title: "NLP-Based Chatbot",
      description: "Intelligent chatbot built using Natural Language Processing to understand queries and respond intelligently.",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      textColor: "text-indigo-400",
      cardBorder: "border border-indigo-500",
      cardShadow: "hover:shadow-[0_0_40px_indigo]",
      tech: ["Python", "NLP", "Streamlit", "NLTK"],
      details: ["Interactive NLP-based chatbot with intent recognition.", "Predefined dataset for training with real-time responses.", "Web-based UI using Streamlit with auto-refresh functionality."],
      demoLink: "/projects/nlp_chatbot/index.html",
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio site with premium UI, smooth animations, and modern interaction design.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      textColor: "text-pink-400",
      cardBorder: "border border-pink-500",
      cardShadow: "hover:shadow-[0_0_40px_pink]",
      tech: ["React", "Tailwind", "CSS"],
      details: ["Modern responsive portfolio with smooth animations.", "Interactive project cards and fast mobile-friendly layout.", "Built with React, Tailwind CSS, and custom design touches."],
      demoLink: "/",
    },
  ];

  const certificates = [
    { title: "Convolve 4.0 – Pan-IIT AI/ML Hackathon", issuer: "IIT Guwahati & Unstop", date: "2025", details: "Participated in the national-level AI/ML Hackathon organized by IIT Guwahati.", cover: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/IIT_CONVOLVE 4.0.png" },
    { title: "A Pan-IIT AI/ML Hackathon Certificate", issuer: "IIT Guwahati & Unstop", date: "2025", details: "Awarded for participation in the Pan-IIT AI/ML hackathon.", cover: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/A Pan-IIT AIML Hackathon.png" },
    { title: "Deloitte Technology Job Simulation", issuer: "Deloitte Forage", date: "2025", details: "Completed practical tasks in Coding and Development.", cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/DELOITTE.TECHNOLOGY.jpeg" },
    { title: "TATA GenAI Powered Data Analytics Job Simulation", issuer: "TATA Group & Forage", date: "2026", details: "Completed AI-powered Data Analytics simulation.", cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/TATA_GENAI.png" },
    { title: "Coursera Full Stack App Development", issuer: "Coursera", date: "2025", details: "Completed the Coursera Full Stack App Development specialization.", cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/COURSERA_FULLSTACK.jpeg" },
    { title: "Future Interns Full Stack Development Internship", issuer: "Future Interns", date: "2026", details: "Selected for Full Stack Web Development Internship Fellowship Program.", cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", file: "/Certificates/FUTURENINTERN.png" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white snap-y snap-mandatory">

      {/* NAVBAR */}
      <nav className="flex justify-end items-center px-10 py-6 fixed w-full top-0 bg-[#050816]/80 backdrop-blur-md z-50">
        <ul className="flex gap-8 text-lg">
          <li><a href="#home" className="nav-link glow-on-click">Home</a></li>
          <li><a href="#about" className="nav-link glow-on-click">About</a></li>
          <li><a href="#tools" className="nav-link glow-on-click">Tools</a></li>
          <li><a href="#skills" className="nav-link glow-on-click">Skills</a></li>
          <li><a href="#projects" className="nav-link glow-on-click">Projects</a></li>
          <li><a href="#certificates" className="nav-link glow-on-click">Certificates</a></li>
          <li><a href="#contact" className="nav-link glow-on-click">Contact</a></li>
          <li><a href="/resume/REVANTH.RESUME.1.pdf" target="_blank" rel="noopener noreferrer" className="nav-link glow-on-click">Resume</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen snap-start flex flex-col lg:flex-row items-center justify-center gap-20 px-10 pt-28">
        <div className="relative flex flex-col items-center w-full lg:w-auto">
          <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-30 rounded-full"></div>
          <img src={profile} alt="profile" className="w-[300px] h-[300px] rounded-full border-4 border-cyan-400 object-cover relative z-10 transition duration-700 ease-out transform hover:scale-105" />
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/revanth01-debug" target="_blank" rel="noopener noreferrer" className="icon-glow inline-flex items-center justify-center rounded-full bg-white/5 border border-cyan-400/20 p-4 text-4xl transition duration-300 hover:bg-cyan-500/15 hover:scale-110"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/radharapu-revanth/" target="_blank" rel="noopener noreferrer" className="icon-glow inline-flex items-center justify-center rounded-full bg-white/5 border border-cyan-400/20 p-4 text-4xl transition duration-300 hover:bg-cyan-500/15 hover:scale-110"><FaLinkedin /></a>
          </div>
        </div>
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold glow-on-click">Hello, I'm</h2>
            <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-400">Revanth</h1>
            <h3 className="text-3xl md:text-4xl text-purple-400">Full Stack Developer</h3>
          </div>
          <p className="text-gray-300 text-lg leading-9">Passionate about turning thoughtful ideas into polished digital experiences. I build responsive websites with smooth interactions, modern layouts, and strong attention to detail.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#about" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-cyan-400">About Me</a>
            <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:border-cyan-400 hover:bg-white/10">See Projects</a>
            <a href="#certificates" className="inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-purple-400">View Credentials</a>
            <a href="/resume/REVANTH.RESUME.1.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/5 border border-cyan-500/20 px-8 py-4 text-base font-semibold text-cyan-300 transition duration-300 hover:bg-cyan-500/10">Download Resume</a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-cyan-500/20 bg-transparent px-8 py-4 text-base font-semibold text-cyan-300 transition duration-300 hover:bg-cyan-500/10">Contact Me</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-aos="fade-up" className="min-h-screen snap-start flex flex-col justify-center px-10 py-20">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-3">About</p>
            <h1 className="text-5xl md:text-6xl font-bold text-cyan-400">Who Am I?</h1>
            <p className="mt-6 text-gray-300 text-base md:text-lg leading-8">I'm a creative Full Stack Developer who turns ideas into polished web products. My focus is responsive design, delightful animations, and user-friendly interfaces powered by modern tools.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-500/15 bg-[#0b1321]/95 p-10 shadow-[0_0_80px_rgba(8,27,55,0.35)]">
              <h2 className="text-2xl font-semibold text-white mb-4">What I build</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><span className="mt-1 text-cyan-400">•</span> Seamless responsive websites and web apps.</li>
                <li className="flex gap-3"><span className="mt-1 text-cyan-400">•</span> Intuitive dashboards, user flows and interactions.</li>
                <li className="flex gap-3"><span className="mt-1 text-cyan-400">•</span> Clean, maintainable code with modern frameworks.</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-purple-500/15 bg-[#0b1321]/95 p-10 shadow-[0_0_80px_rgba(55,0,70,0.25)]">
              <h2 className="text-2xl font-semibold text-white mb-4">How I work</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3"><span className="mt-1 text-purple-400">•</span> Fast prototyping with polished visuals.</li>
                <li className="flex gap-3"><span className="mt-1 text-purple-400">•</span> Design systems that scale across devices.</li>
                <li className="flex gap-3"><span className="mt-1 text-purple-400">•</span> Real-world projects built for usability.</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#tools" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-cyan-400">View Tools</a>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" data-aos="fade-up" className="min-h-screen snap-start flex flex-col justify-center px-10 py-20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-3">Tools</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Tools I use every day</h1>
            <p className="mt-6 text-gray-400 text-base md:text-lg leading-8">The stack I rely on for UI, logic and design workflows across my projects.</p>
          </div>
          <div className="grid gap-8 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-500/10 bg-[#0b1220]/80 p-8 shadow-[0_0_60px_rgba(56,189,248,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">💻</span>
                <div><h3 className="text-2xl font-semibold text-white">Programming Languages</h3><p className="text-gray-400">Core development tools</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[{label:'HTML',icon:'🟧'},{label:'CSS',icon:'🟦'},{label:'JavaScript',icon:'🟨'},{label:'Node.js',icon:'🟩'},{label:'Python',icon:'🐍'},{label:'MySQL',icon:'🐬'}].map((s) => {
                  const selected = selectedSkill === s.label;
                  return (
                    <div key={s.label} role="button" onClick={() => setSelectedSkill(selected ? null : s.label)} className={`rounded-3xl border p-4 text-center transition duration-300 ${selected ? 'bg-cyan-500/10 border-cyan-400/40' : 'border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-white/10'}`}>
                      <div className={`text-2xl mb-3 ${selected ? 'text-cyan-300' : 'text-gray-300'}`}>{s.icon}</div>
                      <div className={`text-sm ${selected ? 'text-cyan-100 font-semibold' : 'text-gray-300'}`}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-[2rem] border border-purple-500/10 bg-[#0f1228]/80 p-8 shadow-[0_0_60px_rgba(168,85,247,0.12)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎨</span>
                <div><h3 className="text-2xl font-semibold text-white">Graphic Design</h3><p className="text-gray-400">Visual design tools</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{label:'Illustrator',icon:'Ai'},{label:'Photoshop',icon:'Ps'},{label:'Canva',icon:'C'},{label:'Figma',icon:'F'}].map((s) => {
                  const selected = selectedSkill === s.label;
                  return (
                    <div key={s.label} role="button" onClick={() => setSelectedSkill(selected ? null : s.label)} className={`rounded-3xl border p-4 text-center transition duration-300 ${selected ? 'bg-purple-500/10 border-purple-400/40' : 'border-white/10 bg-white/5 hover:border-purple-400/30 hover:bg-white/10'}`}>
                      <div className={`text-3xl font-bold mb-3 ${selected ? 'text-rose-300' : 'text-gray-300'}`}>{s.icon}</div>
                      <div className={`text-sm ${selected ? 'text-rose-100 font-semibold' : 'text-gray-300'}`}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#skills" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-cyan-400">See Skill Sets</a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" data-aos="fade-up" className="min-h-screen snap-start flex flex-col justify-center px-10 py-20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-3">Skills</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Development & Design</h1>
            <p className="mt-6 text-gray-400 text-base md:text-lg leading-8">A balanced toolkit covering styling, development, and frameworks for modern web applications.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-cyan-500/10 bg-[#111827] p-10"><p className="text-sm uppercase tracking-[0.35em] text-cyan-400 mb-4">Style</p><h3 className="text-3xl font-semibold text-white mb-4">Design systems & branding</h3><p className="text-gray-300 leading-7">Creating consistent visual direction with clean layouts, readable typography, and polished UI components.</p></div>
            <div className="rounded-[2rem] border border-purple-500/10 bg-[#111827] p-10"><p className="text-sm uppercase tracking-[0.35em] text-purple-400 mb-4">Development</p><h3 className="text-3xl font-semibold text-white mb-4">Frontend & backend flow</h3><p className="text-gray-300 leading-7">Building responsive interactions, reusable components, and app logic that feels fast and natural.</p></div>
            <div className="rounded-[2rem] border border-cyan-500/10 bg-[#111827] p-10"><p className="text-sm uppercase tracking-[0.35em] text-cyan-400 mb-4">Frameworks</p><h3 className="text-3xl font-semibold text-white mb-4">React & modern tools</h3><p className="text-gray-300 leading-7">Using React, Vite, and CSS utilities to ship polished apps with fast load times and great developer experience.</p></div>
            <div className="rounded-[2rem] border border-purple-500/10 bg-[#111827] p-10"><p className="text-sm uppercase tracking-[0.35em] text-purple-400 mb-4">Workflow</p><h3 className="text-3xl font-semibold text-white mb-4">Tools & collaboration</h3><p className="text-gray-300 leading-7">Designing, prototyping, and deploying projects with the right toolset for quality and speed.</p></div>
          </div>
          <div className="flex justify-center">
            <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-purple-400">Explore Projects</a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" data-aos="fade-up" className="min-h-screen snap-start px-10 py-20">
        <h1 className="text-6xl font-bold text-center text-cyan-400 mb-4">My Projects</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
          {projects.map((project) => (
            <div key={project.title} onClick={() => setSelectedProject(project)} role="button" className={`cursor-pointer bg-[#111827] rounded-3xl overflow-hidden ${project.cardBorder} ${project.cardShadow} duration-500 hover:scale-105 hover:-translate-y-1`}>
              <img src={project.image} alt={project.title} className="h-60 w-full object-cover" />
              <div className="p-8">
                <h2 className={`text-3xl font-bold mb-4 ${project.textColor}`}>{project.title}</h2>
                <p className="text-gray-300 leading-8">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{project.tech.map((tech) => (<span key={tech} className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">{tech}</span>))}</div>
                <div className="mt-8"><a href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-400">View Demo</a></div>
              </div>
            </div>
          ))}
        </div>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10 cursor-pointer" onClick={() => setSelectedProject(null)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Escape' && setSelectedProject(null)}>
            <div className="relative max-w-3xl w-full overflow-hidden rounded-[2rem] bg-[#0f172a] border border-cyan-500/30 p-8 shadow-[0_0_80px_rgba(14,116,144,0.4)]" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setSelectedProject(null)} className="absolute right-6 top-6 z-50 rounded-full bg-white/15 px-4 py-3 text-2xl text-white transition duration-300 hover:bg-white/30 hover:scale-105">✕</button>
              <img src={selectedProject.image} alt={selectedProject.title} className="h-72 w-full object-cover rounded-3xl" />
              <div className="mt-8">
                <h2 className="text-5xl font-extrabold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-300 text-lg leading-8 mb-6">{selectedProject.description}</p>
                <div className="space-y-3">{selectedProject.details?.map((item, index) => (<p key={index} className="text-gray-300 leading-8">• {item}</p>))}</div>
                <div className="mt-6 flex flex-wrap gap-3">{selectedProject.tech.map((tech) => (<span key={tech} className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">{tech}</span>))}</div>
                {selectedProject.demoLink && (<div className="mt-8"><a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-400">View Demo</a></div>)}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" data-aos="fade-up" className="min-h-screen snap-start px-10 py-20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-3">Certificates</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Professional Credentials</h1>
            <p className="mt-6 text-gray-400 text-base md:text-lg leading-8">Completed certifications that reinforce my skills in development, design, and project delivery.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {certificates.map((cert) => (
              <div key={cert.title} className="rounded-[2rem] border border-white/10 bg-[#111827]/90 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
                {cert.cover ? (
                  <img src={cert.cover} alt={`${cert.title} cover`} className="h-48 w-full object-cover" />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-white/5 text-gray-300">Preview unavailable</div>
                )}
                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-400 mb-4">{cert.issuer}</p>
                  <h2 className="text-2xl font-semibold text-white mb-3">{cert.title}</h2>
                  <p className="text-gray-400 mb-6">Issued {cert.date}</p>
                  <a href={cert.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-400">Open Certificate</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-aos="fade-up" className="min-h-screen snap-start flex flex-col justify-center px-10 py-20">
        <div className="max-w-6xl mx-auto space-y-12 w-full">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400 mb-3">Contact</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white">Get In Touch</h1>
            <p className="mt-6 text-gray-400 text-base md:text-lg leading-8 max-w-xl mx-auto">Have a project in mind or just want to say hi? Fill the form below and I'll get back to you as soon as possible.</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <a href="mailto:radharapurevanth10@gmail.com" className="flex items-center gap-5 rounded-[2rem] border border-cyan-500/20 bg-[#0b1321]/90 p-7 transition duration-300 hover:border-cyan-400/40 hover:-translate-y-1 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-2xl"><FaEnvelope /></div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Email</p>
                  <p className="text-white font-semibold text-lg">radharapurevanth10@gmail.com</p>
                  <p className="text-cyan-400 text-sm mt-1">Click to send an email →</p>
                </div>
              </a>
              <a href="tel:+919494036256" className="flex items-center gap-5 rounded-[2rem] border border-purple-500/20 bg-[#0b1321]/90 p-7 transition duration-300 hover:border-purple-400/40 hover:-translate-y-1 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-2xl"><FaPhone /></div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Phone</p>
                  <p className="text-white font-semibold text-lg">+91 94940 36256</p>
                  <p className="text-purple-400 text-sm mt-1">Click to call →</p>
                </div>
              </a>
              <div className="flex items-center gap-5 rounded-[2rem] border border-white/10 bg-[#0b1321]/90 p-7">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/15 text-gray-400 text-2xl"><FaMapMarkerAlt /></div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Location</p>
                  <p className="text-white font-semibold text-lg">Hyderabad, Telangana</p>
                  <p className="text-gray-400 text-sm mt-1">India 🇮🇳</p>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/revanth01-debug" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-gray-300 transition duration-300 hover:border-cyan-400/30 hover:text-cyan-400 font-semibold"><FaGithub className="text-xl" /> GitHub</a>
                <a href="https://www.linkedin.com/in/radharapu-revanth/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-gray-300 transition duration-300 hover:border-cyan-400/30 hover:text-cyan-400 font-semibold"><FaLinkedin className="text-xl" /> LinkedIn</a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1321]/90 p-10 shadow-[0_0_80px_rgba(8,27,55,0.4)]">
              <h2 className="text-2xl font-semibold text-white mb-8">Send a Message</h2>
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-4xl">✓</div>
                  <h3 className="text-2xl font-semibold text-cyan-400">Message Sent!</h3>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setFormStatus(null)} className="mt-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-gray-300 hover:border-cyan-400/30 transition duration-300">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleFormChange} placeholder="John Doe" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleFormChange} placeholder="john@example.com" className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea name="message" required rows={5} value={formData.message} onChange={handleFormChange} placeholder="Tell me about your project or just say hello..." className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-400/50 transition duration-300 resize-none" />
                  </div>
                  <button type="submit" disabled={formStatus === "sending"} className="w-full rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-black transition duration-300 hover:bg-cyan-400 disabled:opacity-60 flex items-center justify-center gap-2">
                    {formStatus === "sending" ? (<><span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>Sending...</>) : "Send Message"}
                  </button>
                  {formStatus === "error" && <p className="text-center text-sm text-amber-400">Backend unavailable — your default mail app has been opened instead.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-gray-700">
        <h1 className="text-2xl font-bold text-cyan-400">Radharapu Revanth</h1>
        <div className="flex justify-center gap-6 mt-4">
          <a href="mailto:radharapurevanth10@gmail.com" className="text-gray-400 hover:text-cyan-400 transition duration-300 flex items-center gap-2 text-sm"><FaEnvelope /> radharapurevanth10@gmail.com</a>
          <a href="tel:+919494036256" className="text-gray-400 hover:text-purple-400 transition duration-300 flex items-center gap-2 text-sm"><FaPhone /> +91 94940 36256</a>
        </div>
        <p className="text-gray-400 mt-4">© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;