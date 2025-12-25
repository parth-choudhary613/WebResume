import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp, Zap, Hexagon, Code, Heart } from 'lucide-react';

const CyberFooter = () => {
  const [time, setTime] = useState(new Date());

  // Update time every second for the live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format time as HH:MM:SS UTC
  const timeString = time.toISOString().split('T')[1].split('.')[0] + " UTC";

  return (
    <footer className="relative bg-[#020202] text-slate-400 font-mono overflow-hidden pt-20 pb-5 border-t border-slate-900">
      
      {/* --- DECORATIVE TOP BORDER WITH GLOW --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_10px_#06b6d4]" />
      <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-32 h-1 bg-cyan-500 blur-[2px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: BRANDING & STATUS */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Hexagon className="text-cyan-500 animate-pulse" size={24} strokeWidth={2.5} />
              <span className="text-2xl font-black tracking-tighter">DEV_PORTFOLIO</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Constructing digital experiences in the void. Open for collaborations on planetary and orbital scales.
            </p>
            
            {/* Live System Status Box */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/30 border border-green-900 rounded text-[10px] text-green-500 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              System Operational
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-pink-500" />
              NAVIGATION
            </h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <span className="w-0 h-[1px] bg-cyan-400 group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: TECH STACK (Visuals) */}
          <div className="md:col-span-1">
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500" />
              STACK_MATRIX
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'Tailwind'].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-slate-900 border border-slate-800 text-xs hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMN 4: ACTIONS & SOCIALS */}
          <div className="md:col-span-1 flex flex-col items-start md:items-end gap-6">
             <button 
                onClick={scrollToTop}
                className="group relative px-6 py-3 bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <div className="flex items-center gap-2 relative z-10 text-xs font-bold uppercase tracking-widest text-cyan-500 group-hover:text-cyan-400">
                  <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                  Return to Top
                </div>
             </button>

             <div className="flex gap-4">
               {[Github, Linkedin, Twitter].map((Icon, i) => (
                 <a key={i} href="/" className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded transition-all">
                   <Icon size={20} />
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR: TICKER & COPYRIGHT --- */}
      <div className="border-t border-slate-900 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 uppercase tracking-wider">
          
          <div className="flex items-center gap-4">
             <span>© 2024 DEV_NAME. ALL RIGHTS RESERVED.</span>
             <span className="hidden md:inline text-slate-800">|</span>
             <div className="hidden md:flex items-center gap-1 text-slate-500">
               <Zap size={10} />
               <span>POWERED BY REACT</span>
             </div>
          </div>

          {/* Live Clock */}
          <div className="font-mono text-cyan-900 bg-cyan-950/10 px-2 py-0.5 rounded border border-cyan-900/20">
            TIME_SYNC: {timeString}
          </div>
        </div>

        {/* SCROLLING TERMINAL TICKER */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 overflow-hidden flex">
             {/* Uses a CSS animation defined below */}
             <div className="animate-ticker flex whitespace-nowrap min-w-full">
                {Array(10).fill(" // INIT_SEQUENCE_COMPLETE // STANDBY FOR INPUT // CONNECTION_SECURE // ").map((text, i) => (
                  <span key={i} className="text-[10px] text-slate-800 font-bold px-4">{text}</span>
                ))}
             </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default CyberFooter;