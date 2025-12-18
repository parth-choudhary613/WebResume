import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { GraduationCap, School, Award, CalendarClock } from 'lucide-react';

// --- Configuration Data ---
const educationData = [
  {
    id: 1,
    level: "Post Graduation",
    institution: "Lovely Professional University",
    score: "7.86 CGPA",
    status: "Currently Pursuing",
    color: "from-blue-500 to-cyan-500",
    icon: <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
  },
  {
    id: 2,
    level: "Graduation (B.Tech)",
    institution: "Lovely Professional University",
    score: "8.1 CGPA",
    status: "Completed",
    color: "from-purple-500 to-pink-500",
    icon: <School className="w-6 h-6 md:w-8 md:h-8 text-white" />
  },
  {
    id: 3,
    level: "High School",
    institution: "Government Model Senior Secondary",
    score: "85%",
    status: "Completed",
    color: "from-amber-500 to-orange-500",
    icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
  }
];

// --- 3D Card Component ---
const Card3D = ({ data, index }) => {
  const ref = useRef(null);

  // Mouse position logic for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      // CHANGED: 
      // 1. h-auto min-h-[380px] ensures it fits content on mobile without overflow
      // 2. md:h-96 locks it to a nice uniform height on desktop
      className="relative w-full h-auto min-h-[380px] md:h-96  p-6 md:p-8 cursor-pointer group
                 bg-white/80 dark:bg-gray-900/40 
                 backdrop-blur-md 
                 border border-slate-200 dark:border-white/10 
                 shadow-lg dark:shadow-xl
                 transition-colors duration-300 ease-in-out
                 flex flex-col justify-center items-center"
    >
      {/* Floating 3D Elements */}
      <div 
        style={{ transform: "translateZ(75px)" }} 
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none w-full"
      >
        {/* Animated Icon Container */}
        <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-gradient-to-br ${data.color} shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
          {data.icon}
        </div>

        {/* Text Content */}
        {/* CHANGED: Responsive font sizes */}
        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2 tracking-wide transition-colors duration-300 text-center">
          {data.level}
        </h3>
        
        <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 text-center font-medium px-2 md:px-4 mb-4 md:mb-6 leading-relaxed transition-colors duration-300">
          {data.institution}
        </p>

        {/* Score Badge */}
        <div className="bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 px-4 py-1 rounded-full mb-4 transition-colors duration-300">
          <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-gray-400">
            {data.score}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 transition-colors duration-300">
            <CalendarClock size={16} />
            <span className={`uppercase tracking-wider text-[10px] md:text-xs font-semibold ${data.status === 'Currently Pursuing' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {data.status}
            </span>
        </div>
      </div>

      {/* Decorative Gradient Background Glow */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} 
      />
    </motion.div>
  );
};

// --- Main Layout Component ---
export default function EducationSection() {
  return (
    // CHANGED: Adjusted padding for mobile (py-12) vs desktop (md:py-20)
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 md:mb-16 relative z-10 w-full max-w-4xl"
      >
        {/* CHANGED: Fluid typography text-4xl -> text-7xl */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 tracking-tight">
          EDUCATION
        </h2>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Grid Layout */}
      {/* CHANGED: 
          - grid-cols-1 for mobile
          - md:grid-cols-2 for tablets
          - lg:grid-cols-3 for desktop
          - max-w-6xl ensures it doesn't stretch too wide on huge monitors 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl perspective-1000">
        {educationData.map((item, index) => (
          <Card3D key={item.id} data={item} index={index} />
        ))}
      </div>

    </div>
  );
}