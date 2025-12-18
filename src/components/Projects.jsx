import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import { ExternalLink, Github, Terminal, Cpu, Wifi } from 'lucide-react';

// --- Assets & Data ---
// Using Lottie URLs (Replace with your JSON imports for production)
const ANIMATION_URLS = {
  ai: "https://lottie.host/6166e462-8726-466d-a764-106598c25345/K4j1rM4d9u.json",
  art: "https://lottie.host/97255106-9051-4e78-9993-4d4367c29672/2F0099.json",
  dev: "https://lottie.host/57ac8021-3977-4f68-8a8b-30239616d60c/F4771.json"
};

const PROJECTS = [
  {
    id: "01",
    title: "NEON_COMMERCE",
    category: "Full Stack System",
    description: "Real-time inventory tracking system with AI-driven visual search capabilities.",
    stats: { performance: "98%", uptime: "99.9%", year: "2024" },
    tags: ["React", "Three.js", "Node"],
    lottie: ANIMATION_URLS.ai,
    link: "#",
    github: "#"
  },
  {
    id: "02",
    title: "VOID_TASKER",
    category: "Productivity AI",
    description: "A dark-mode productivity suite that auto-prioritizes tasks using LLMs.",
    stats: { performance: "94%", uptime: "100%", year: "2023" },
    tags: ["Python", "FastAPI", "OpenAI"],
    lottie: ANIMATION_URLS.dev,
    link: "#",
    github: "#"
  },
  {
    id: "03",
    title: "SYNTH_FOLIO",
    category: "WebGL Experience",
    description: "Interactive 3D portfolio featuring physics-based gravity controls.",
    stats: { performance: "100%", uptime: "99.0%", year: "2024" },
    tags: ["WebGL", "GLSL", "React"],
    lottie: ANIMATION_URLS.art,
    link: "#",
    github: "#"
  }
];

// --- Sub-Components ---

// 1. The CRT Scanline Overlay
const CRTOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
    {/* Scanlines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
    {/* Vignette */}
    <div className="absolute inset-0 bg-radial-gradient-vignette opacity-60" />
  </div>
);

// 2. The Holographic Viewer (Right Side)
const HoloViewer = ({ activeProject }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  return (
    <div className="h-full flex items-center justify-center p-4 lg:p-10 perspective-2000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-2xl aspect-[4/3] bg-black/40 border border-violet-500/30 backdrop-blur-xl rounded-xl shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden group"
      >
        {/* Hologram Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
        
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full p-8 flex flex-col relative z-10"
          >
            {/* Project Header in Holo */}
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-violet-300 uppercase tracking-tighter">
                  {activeProject.title}
                </h2>
                <span className="text-pink-500 font-mono text-sm tracking-widest mt-1 block">
                  // {activeProject.category}
                </span>
              </div>
              <div className="hidden md:block">
                 <Lottie animationData={null} path={activeProject.lottie} loop={true} className="w-20 h-20 opacity-80" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-violet-500/50 pl-4">
                  {activeProject.description}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 font-mono text-xs text-gray-400">
                  <div className="bg-white/5 p-2 rounded">
                    <div className="text-violet-400">PERF</div>
                    <div>{activeProject.stats.performance}</div>
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <div className="text-violet-400">UPTIME</div>
                    <div>{activeProject.stats.uptime}</div>
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <div className="text-violet-400">BUILD</div>
                    <div>{activeProject.stats.year}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {activeProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-violet-900/40 border border-violet-500/30 rounded text-violet-200 text-xs font-mono uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>

              {/* Visualizer Area (Mobile hidden, Desktop shown) */}
              <div className="flex-1 hidden md:flex items-center justify-center bg-black/20 rounded-lg border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-pink-500/10 animate-pulse" />
                 <Lottie animationData={null} path={activeProject.lottie} loop={true} className="w-48 h-48 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" />
              </div>
            </div>

            {/* Footer / Links */}
            <div className="mt-auto pt-6 flex gap-4">
              <a href={activeProject.link} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                <ExternalLink size={18} /> INITIATE_DEMO
              </a>
              <a href={activeProject.github} className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-sm font-mono transition-all">
                <Github size={18} /> SRC_CODE
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- Main Layout ---
const ProjectDashboard = () => {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find(p => p.id === activeId);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500 selection:text-white overflow-hidden relative">
      <CRTOverlay />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-violet-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-900/10 rounded-full blur-[150px]" />
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden">
        
        {/* Left Sidebar: Data Terminal */}
        <div className="w-full lg:w-1/3 lg:border-r border-white/10 p-6 lg:p-12 flex flex-col bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="mb-12">
            <h1 className="text-2xl font-bold tracking-widest flex items-center gap-3 text-white">
              <Terminal className="text-pink-500" />
              CYBER_DECK <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400">v2.0</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-mono">Select a file to decode data...</p>
          </div>

          <div className="space-y-4 flex-grow">
            {PROJECTS.map((project) => (
              <motion.button
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onMouseEnter={() => setActiveId(project.id)} // Unique: Switch on hover
                whileHover={{ x: 10, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                className={`w-full text-left p-4 rounded border transition-all duration-300 group relative overflow-hidden ${
                  activeId === project.id 
                    ? "border-pink-500 bg-pink-500/5 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                    : "border-white/5 hover:border-violet-400/50"
                }`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <span className={`font-mono text-xs block mb-1 ${activeId === project.id ? "text-pink-400" : "text-gray-500"}`}>
                      ID_{project.id}
                    </span>
                    <h3 className={`text-xl font-bold uppercase ${activeId === project.id ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {project.title}
                    </h3>
                  </div>
                  {activeId === project.id && (
                    <motion.div layoutId="active-glow" className="text-pink-500">
                      <Wifi className="animate-pulse" size={20} />
                    </motion.div>
                  )}
                </div>
                
                {/* Loading Bar Decoration */}
                {activeId === project.id && (
                   <motion.div 
                     layoutId="loading-bar"
                     className="absolute bottom-0 left-0 h-1 bg-pink-500" 
                     initial={{ width: 0 }} 
                     animate={{ width: "100%" }} 
                   />
                )}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-gray-500">
             <Cpu size={14} /> SYSTEM OPTIMAL
             <span className="ml-auto">LATENCY: 12ms</span>
          </div>
        </div>

        {/* Right Area: Holographic Viewer */}
        <div className="w-full lg:w-2/3 h-full relative bg-grid-white/[0.02]">
            <HoloViewer activeProject={activeProject} />
        </div>

      </div>
    </div>
  );
};

export default ProjectDashboard;