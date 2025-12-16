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
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    image: "https://example.com/postgrad-image.jpg" 
  },
  {
    id: 2, // Added dummy data for variety based on the image structure
    level: "Graduation (B.Tech)",
    institution: "Lovely Professional University",
    score: "8.1 CGPA",
    status: "Completed",
    color: "from-purple-500 to-pink-500",
    icon: <School className="w-8 h-8 text-white" />
  },
  {
    id: 3,
    level: "High School",
    institution: "Government Model Senior Secondary",
    score: "85%",
    status: "Completed",
    color: "from-amber-500 to-orange-500",
    icon: <Award className="w-8 h-8 text-white" />
  }
];

// --- 3D Card Component ---
const Card3D = ({ data, index }) => {
  const ref = useRef(null);

  // Mouse position logic for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics for the tilt
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
      transition={{ delay: index * 0.2, duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-full rounded-2xl bg-gray-900/40 backdrop-blur-md border border-white/10 p-6 shadow-xl cursor-pointer group"
    >
      {/* Floating 3D Elements */}
      <div 
        style={{ transform: "translateZ(75px)" }} 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Animated Icon Container */}
        <div className={`mb-6 p-4 rounded-full bg-gradient-to-br ${data.color} shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
          {data.icon}
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{data.level}</h3>
        
        <p className="text-gray-300 text-center font-medium px-4 mb-6 leading-relaxed">
          {data.institution}
        </p>

        {/* Score Badge */}
        <div className="bg-white/10 border border-white/20 px-4 py-1 rounded-full mb-4">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {data.score}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
            <CalendarClock size={16} />
            <span className={`uppercase tracking-wider text-xs font-semibold ${data.status === 'Currently Pursuing' ? 'text-green-400' : 'text-blue-400'}`}>
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
    <div className="min-h-screen bg-gray-950/50 rounded-2xl flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
          EDUCATION
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full perspective-1000">
        {educationData.map((item, index) => (
          <Card3D key={item.id} data={item} index={index} />
        ))}
      </div>

    </div>
  );
}