import React, { useState } from "react";
import { Terminal, Code, Briefcase, Bike, Dumbbell, Cpu, Zap, Layers, FolderGit2, Car, Moon, Mountain, Music } from 'lucide-react';
import { ExternalLink } from "lucide-react";

const CyberpunkCard = ({ title, icon: Icon, children, className = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="relative h-full bg-black/80 border border-cyan-500/30 p-6 rounded-xl transition-all duration-200 ease-out transform-gpu hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-sm overflow-hidden flex flex-col"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        {/* Cyberpunk Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-cyan-500/20 pb-2">
          <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/50 text-cyan-400 group-hover:animate-pulse">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono tracking-wider uppercase">
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="text-gray-300 font-mono text-sm leading-relaxed relative z-10 flex-grow">
          {children}
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-500" />
      </div>
    </div>
  );
};

const SkillTag = ({ text }) => (
  <span className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 rounded hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors cursor-default">
    {text}
  </span>
);

export default function AboutSection() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 overflow-hidden relative selection:bg-cyan-500/30">
      {/* Background Grid Animation */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glitch Title */}
        <div className="mb-16 text-center relative group">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative inline-block">
            <span className="relative z-10">System_Data</span>
            <span
              className="absolute top-0 left-0 -ml-1 text-cyan-500 opacity-70 animate-pulse z-0"
              style={{ clipPath: "inset(10% 0 60% 0)" }}
            >
              System_Data
            </span>
            <span
              className="absolute top-0 left-0 ml-1 text-purple-500 opacity-70 animate-bounce z-0"
              style={{ clipPath: "inset(40% 0 20% 0)" }}
            >
              System_Data
            </span>
          </h2>
          <p className="mt-4 text-cyan-400/80 font-mono text-sm tracking-[0.3em]">
            PARTH CHOUDHARY // FRONT-END DEVELOPER
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Bio - Spans 8 cols */}
          <div className="md:col-span-8">
            <CyberpunkCard
              title="Profile_Initialization"
              icon={Terminal}
              className="h-full"
            >
              <p className="mb-4">
                [cite_start]
                <span className="text-cyan-400"> const developer = </span>{" "}
                "Front-end specialist focused on writing maintainable code and
                tackling complex layout challenges."; [cite: 8]
              </p>
              <p className="mb-6">
                Experienced in building seamless digital experiences using the
                MERN stack. [cite_start]I prioritize user accessibility and
                performance optimization, recently enhancing application speeds
                by 40%. [cite: 6, 23]
              </p>
              <div className="flex flex-wrap mt-4">
                <SkillTag text="React.js" />
                <SkillTag text="Redux Toolkit" />
                <SkillTag text="Tailwind CSS" />
                <SkillTag text="Material-UI" />
                <SkillTag text="Git/GitHub" />
              </div>
            </CyberpunkCard>
          </div>

          {/* Stat Card - 4 cols */}
          <div className="md:col-span-4">
            <CyberpunkCard title="Current_Status" icon={Zap} className="h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Education</span>
                  <span className="text-purple-400 font-bold">
                    MCA (Pursuing)
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Location</span>
                  <span className="text-purple-400 font-bold text-right">
                    Himachal Pradesh
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span>Contact</span>
                  <span className="text-cyan-400 font-bold text-xs truncate ml-2">
                    +91 8894459562
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span>Status</span>
                  <span className="text-green-400 font-bold animate-pulse">
                    Open to Work
                  </span>
                </div>
              </div>
            </CyberpunkCard>
          </div>

          {/* Work Experience */}
          <div className="md:col-span-6">
            <CyberpunkCard title="Experience_Log" icon={Briefcase}>
              <ul className="space-y-8 relative border-l border-gray-800 ml-2 pl-6 py-2">
                <li className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                  <h4 className="text-white font-bold text-lg">Omnicassions</h4>
                  <p className="text-purple-400 text-xs mb-1">
                    Front-End Developer Intern | Aug '24 - Mar '25
                  </p>
                  <p className="text-gray-400 text-xs">
                    Developed vendor display front-end using React.js &
                    Tailwind. [cite_start]Collaborated with backend teams for
                    seamless data flow. [cite: 16, 17, 18]
                  </p>
                </li>
                <li className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-gray-700 border border-gray-500" />
                  <h4 className="text-white font-bold text-lg">
                    Excellence Technologies
                  </h4>
                  <p className="text-purple-400 text-xs mb-1">
                    Junior Web Developer | Sept '23 - Mar '24
                  </p>
                  <p className="text-gray-400 text-xs">
                    Full-stack MERN development. [cite_start]Enhanced app
                    performance by 40% and reduced load times by 2 seconds via
                    optimized queries. [cite: 21, 22, 23]
                  </p>
                </li>
                <li className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-gray-700 border border-gray-500" />
                  <h4 className="text-white font-bold text-lg">
                    Government of India
                  </h4>
                  <p className="text-purple-400 text-xs mb-1">
                    Web Developer | Sept '22 - Mar '23
                  </p>
                  <p className="text-gray-400 text-xs">
                    Level-5 qualification in web development. [cite_start]Enabling contribution
                    to complex development projects and increased team capabilities. [cite: 21, 22, 23]
                  </p>
                </li>
              </ul>
            </CyberpunkCard>
          </div>

          {/* Education */}
          <div className="md:col-span-6">
            <CyberpunkCard title="Education_Matrix" icon={Layers}>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded border-l-4 border-purple-500">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-bold">
                      Lovely Professional University
                    </h4>
                    <span className="text-xs text-purple-400">2026</span>
                  </div>
                  <p className="text-sm text-cyan-300">
                    Masters of Computer Applications (MCA)
                  </p>
                  [cite_start]
                  <p className="text-xs text-gray-500 mt-1">
                    Cumulative GPA: 7.85/10 [cite: 32]
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded border-l-4 border-gray-600 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-bold">
                      Govt. Degree College
                    </h4>
                    <span className="text-xs text-purple-400">2023</span>
                  </div>
                  <p className="text-sm text-cyan-300">
                    Bachelor of Computer Applications (BCA)
                  </p>
                  [cite_start]
                  <p className="text-xs text-gray-500 mt-1">
                    Cumulative GPA: 7.44/10 [cite: 36]
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded border-l-4 border-gray-600 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-bold">
                      Govt. Sen. Sec. School
                    </h4>
                    <span className="text-xs text-purple-400">2020</span>
                  </div>
                  <p className="text-sm text-cyan-300">
                    Non-Medical Stream
                  </p>
                  [cite_start]
                  <p className="text-xs text-gray-500 mt-1">
                    Cumulative Percentage: 68 [cite: 36]
                  </p>
                </div>
              </div>
            </CyberpunkCard>
          </div>

          {/* Projects Row */}
  

          {/* Hobbies / Personal */}
         {/* Hobbies / Personal - UPDATED */}
          <div className="md:col-span-12">
            <CyberpunkCard title="Offline_Activities" icon={Cpu}>
              {/* Changed grid to 4 columns to fit new items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Car Enthusiast */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded border border-gray-700 hover:border-cyan-500 transition-colors group/hobby">
                  <Car className="w-8 h-8 text-cyan-500 mb-2 group-hover/hobby:translate-x-2 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Car Enthusiast</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Obsessed with cars.
                  </p>
                </div>

                {/* Night Drives */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded border border-gray-700 hover:border-purple-500 transition-colors group/hobby">
                  <Moon className="w-8 h-8 text-purple-500 mb-2 group-hover/hobby:-rotate-12 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Night Drives</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Late night cruiser.
                  </p>
                </div>

                {/* Trekking */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded border border-gray-700 hover:border-green-500 transition-colors group/hobby">
                  <Mountain className="w-8 h-8 text-green-500 mb-2 group-hover/hobby:-translate-y-1 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Trekking</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Exploring the valley and nature trails.
                  </p>
                </div>

                {/* Listening Music */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded border border-gray-700 hover:border-pink-500 transition-colors group/hobby">
                  <Music className="w-8 h-8 text-pink-500 mb-2 group-hover/hobby:scale-110 transition-transform" />
                  <h4 className="font-bold text-white text-sm">Listening Music</h4>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Vibing to 90's bangers.
                  </p>
                </div>

              </div>
            </CyberpunkCard>
          </div>

        </div>
      </div>
    </div>
  );
}
