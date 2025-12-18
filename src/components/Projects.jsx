import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import { ExternalLink, Github } from 'lucide-react';

// --- Configuration & Data ---
// Replace these URLs with your preferred Lottie JSON files
const ANIMATION_URLS = {
  coding: "https://lottie.host/6166e462-8726-466d-a764-106598c25345/K4j1rM4d9u.json", // Generic Tech
  design: "https://lottie.host/97255106-9051-4e78-9993-4d4367c29672/2F0099.json", // Creative
  rocket: "https://lottie.host/57ac8021-3977-4f68-8a8b-30239616d60c/F4771.json"  // Launch
};

const PROJECTS = [
  {
    id: 1,
    title: "Neon Commerce",
    description: "A full-stack e-commerce platform with real-time inventory and AI recommendations.",
    tags: ["React", "Node.js", "MongoDB"],
    lottie: ANIMATION_URLS.coding,
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "Cyber Portfolio",
    description: "Interactive 3D portfolio featuring WebGL experiments and dark mode aesthetics.",
    tags: ["Three.js", "Tailwind", "Framer"],
    lottie: ANIMATION_URLS.design,
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Task Master AI",
    description: "Productivity app using LLMs to auto-schedule and prioritize your daily workflow.",
    tags: ["Python", "OpenAI", "React"],
    lottie: ANIMATION_URLS.rocket,
    link: "#",
    github: "#"
  },
  // Add more projects here to test responsiveness...
];

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth return-to-center animation
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Main Page Component ---
const ProjectShowcase = () => {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white overflow-hidden relative selection:bg-pink-500 selection:text-white">
      
      {/* Background Gradients for Cyberpunk Ambiance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-700/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              MY PROJECTS
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explore a collection of digital experiments crafted with code and creativity.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TiltCard className="group h-full">
                {/* 3D Content Container */}
                <div 
                  className="relative h-full bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl 
                  group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] group-hover:border-pink-500/50 transition-all duration-300"
                  style={{ transform: "translateZ(20px)" }}
                >
                  
                  {/* Floating Lottie Icon */}
                  <div className="h-40 w-full mb-6 flex items-center justify-center bg-gradient-to-b from-gray-800/50 to-transparent rounded-xl overflow-hidden">
                     {/* Replace 'animationData' with your imported JSON if loading locally */}
                    <div className="w-32 h-32" style={{ transform: "translateZ(50px)" }}>
                        <Lottie 
                            animationData={null} // Use imported JSON here if local
                            path={project.lottie} // Using URL for demo
                            loop={true} 
                        />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 
                      className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {project.title}
                    </h3>
                    
                    <p 
                      className="text-gray-400 text-sm leading-relaxed"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div 
                      className="flex flex-wrap gap-2 pt-2"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div 
                      className="flex gap-4 pt-4 mt-auto"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <a href={project.github} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors text-sm group/btn">
                        <Github size={16} /> Code
                      </a>
                      <a href={project.link} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-medium transition-all shadow-lg shadow-purple-900/20 text-sm">
                        <ExternalLink size={16} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectShowcase;