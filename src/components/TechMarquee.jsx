import React from 'react';
import './Marquee.css';
import { 
  SiReact, 
  SiTailwindcss, 
  SiJavascript, 
  SiHtml5, 
  SiFramer, 
  SiGreensock 
} from 'react-icons/si';

// Define your stack here
const techs = [
  { icon: <SiReact />, color: '#61DAFB' },
  { icon: <SiTailwindcss />, color: '#38B2AC' },
  { icon: <SiJavascript />, color: '#F7DF1E' },
  { icon: <SiHtml5 />, color: '#E34F26' },
  { icon: <SiFramer />, color: '#E902B5' },
  { icon: <SiGreensock />, color: '#88CE02' },
];

const TechMarquee = () => {
  // CRITICAL: We combine the list with itself.
  // [A, B, C] becomes [A, B, C, A, B, C]
  const infiniteTechs = [...techs, ...techs];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {infiniteTechs.map((tech, index) => (
          <div 
            key={index} 
            className="tech-item"
            style={{ 
              // This applies the specific brand color only on hover 
              // (or remove the hover condition to always show color)
              '--hover-color': tech.color 
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = tech.color}
            onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
          >
            {tech.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;