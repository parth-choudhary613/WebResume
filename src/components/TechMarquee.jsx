import React from 'react';
import './Marquee.css';

// Import specific icons
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiWix, SiGreensock, SiFramer, SiMui, SiGithub } from "react-icons/si";

const techIcons = [
  { icon: <FaHtml5 />, color: "#E34F26" },          // HTML
  { icon: <FaCss3Alt />, color: "#1572B6" },        // CSS
  { icon: <FaJs />, color: "#F7DF1E" },             // JS
  { icon: <FaReact />, color: "#61DAFB" },          // React
  { icon: <SiTailwindcss />, color: "#38B2AC" },    // Tailwind
  { icon: <FaGithub />, color: "#ffffff" },         // GitHub
  { icon: <SiGithub />, color: "#6e5494" },         // GitHub Desktop (Using alt color)
  { icon: <SiWix />, color: "#000000" },            // Wix Studio (Usually black/white)
  { icon: <SiGreensock />, color: "#88CE02" },      // GSAP
  { icon: <SiFramer />, color: "#0055FF" },         // Framer Motion
  { icon: <FaBootstrap />, color: "#7952B3" },      // Bootstrap
  { icon: <SiMui />, color: "#007FFF" },            // Material UI
];

const IconMarquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {/* Render list twice for the infinite loop.
           We use 'item' (original) and 'duplicate' to create unique keys.
        */}
        {[...techIcons, ...techIcons].map((item, index) => (
          <div key={index} className="marquee-item">
            <span 
              className="icon-wrapper" 
              style={{ color: item.color }} // Apply brand color dynamically
            >
              {item.icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconMarquee;