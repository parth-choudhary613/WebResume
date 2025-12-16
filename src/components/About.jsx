import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGraduationCap, FaCode, FaLaptopCode } from "react-icons/fa";

// --- 3D CARD COMPONENT ---
const ThreeDCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Rotate based on mouse position
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 shadow-xl"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white/10 shadow-lg text-center p-6 border border-white/10"
      >
        <FaLaptopCode className="text-6xl text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Full Stack Ready</h3>
        <p className="text-gray-300 text-sm">
          MERN Stack • React • Tailwind • Redux
        </p>
        
        {/* Floating Badge inside 3D Card */}
        <div 
           style={{ transform: "translateZ(50px)" }}
           className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
        >
          MCA Pursuing
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN ABOUT SECTION ---
const About = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT SIDE: TEXT & EDUCATION */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {/* Heading */}
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              About <span className="text-cyan-600 dark:text-cyan-400">Me</span>
            </h2>

            {/* Bio from Resume */}
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              I am a dedicated <strong>Front-End Developer</strong> with hands-on experience in building responsive web applications. 
              With a strong foundation in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">React.js, Tailwind CSS, and JavaScript</span>, 
              I focus on writing maintainable code and optimizing performance to ensure accessible and engaging user interfaces[cite: 6, 7].
            </p>

            {/* Education Timeline */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaGraduationCap className="text-cyan-500" /> Education
              </h3>

              {/* MCA */}
              <div className="relative pl-8 border-l-2 border-cyan-500/30">
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-500"></div>
                <h4 className="text-lg font-bold">Master of Computer Applications (MCA)</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lovely Professional University | <span className="text-cyan-600 dark:text-cyan-400">Expected 2026</span></p>
                <p className="text-sm text-gray-500 mt-1">GPA: 7.85/10 [cite: 31, 32]</p>
              </div>

              {/* BCA */}
              <div className="relative pl-8 border-l-2 border-purple-500/30">
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500"></div>
                <h4 className="text-lg font-bold">Bachelor of Computer Applications (BCA)</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Govt. Degree College Dharamshala | <span className="text-purple-600 dark:text-purple-400">Graduated 2023</span></p>
                <p className="text-sm text-gray-500 mt-1">GPA: 7.44/10 [cite: 35, 36]</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: 3D ELEMENT */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="flex-1 flex justify-center lg:justify-end perspective-1000"
          >
             <ThreeDCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;