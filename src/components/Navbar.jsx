import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Box, Hexagon, Zap, Terminal } from "lucide-react";
import Logo from "./assets/navlogo.png";

// Define links with associated "3D" tech icons
const navItems = [
  { name: "Home", icon: Box, href: "#home" },
  { name: "About", icon: Hexagon, href: "#about" },
  { name: "Projects", icon: Terminal, href: "#projects" },
  { name: "Contact", icon: Zap, href: "#contact" },
];

// --- Sub-Component: Cyberpunk Link with Glitch & 3D Spin ---
const CyberLink = ({ item, onClick }) => {
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
      className="relative group flex items-center gap-2 px-3 py-2 font-mono uppercase tracking-widest text-sm overflow-hidden"
    >
      {/* The rotating "3D" Icon */}
      <motion.div
        variants={{
          initial: { rotateY: 0, color: "#94a3b8" }, // slate-400
          hover: { rotateY: 360, color: "#00f2ff" }, // cyan neon
        }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </motion.div>

      {/* Glitch Text Effect */}
      <div className="relative">
        <span className="relative z-10 text-slate-300 group-hover:text-white transition-colors">
          {item.name}
        </span>
        {/* Glitch Layers */}
        <motion.span
          variants={{ hover: { opacity: 1, x: [-2, 2, -1, 0], y: [1, -1, 0] } }}
          className="absolute inset-0 text-[#00f2ff] opacity-0 z-0 mix-blend-screen select-none"
          aria-hidden="true"
        >
          {item.name}
        </motion.span>
        <motion.span
          variants={{ hover: { opacity: 1, x: [2, -2, 1, 0], y: [-1, 1, 0] } }}
          className="absolute inset-0 text-[#ff00ff] opacity-0 z-0 mix-blend-screen select-none"
          aria-hidden="true"
        >
          {item.name}
        </motion.span>
      </div>

      {/* Scanning underline effect */}
      <motion.div
        variants={{ hover: { translateX: ["-100%", "100%"] } }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-0 group-hover:opacity-100"
      />
    </motion.a>
  );
};

// --- Sub-Component: Reactor Core Theme Toggle ---
const ReactorToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative group flex items-center justify-center p-2 rounded-md overflow-hidden"
    >
      {/* Reactor Core container styling */}
      <div
        className={`absolute inset-0 border-2 transition-all duration-500 ${
          dark
            ? "border-[#ff00ff] shadow-[0_0_15px_#ff00ff50]"
            : "border-[#00f2ff] shadow-[0_0_15px_#00f2ff50]"
        } bg-black/50 backdrop-blur-md clip-path-octagon`}
      />
      
      {/* Animated spinning icon */}
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-10"
      >
        {dark ? (
          <Moon size={20} className="text-[#ff00ff] fill-[#ff00ff]/20" />
        ) : (
          <Sun size={20} className="text-[#00f2ff] fill-[#00f2ff]/20" />
        )}
      </motion.div>

      {/* Internal energy pulse */}
      <div className={`absolute inset-1 rounded-full opacity-30 animate-pulse ${dark ? 'bg-[#ff00ff]' : 'bg-[#00f2ff]'}`}></div>
    </button>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          w-[95%] xl:w-[1200px] max-w-full
          rounded-xl overflow-hidden
          backdrop-blur-xl bg-[#050a14]/80 
          border-y-[1px] border-[#00f2ff]/30
          shadow-[0_5px_20px_rgba(0,242,255,0.1)]
        "
      >
        {/* Moving Scanline Texture Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#00f2ff_3px)] animate-scanline z-0"></div>
        
        {/* Decorative corner glows */}
        <div className="absolute top-0 left-0 w-20 h-[1px] bg-gradient-to-r from-[#00f2ff] to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-gradient-to-l from-[#ff00ff] to-transparent"></div>


        <div className="relative z-10 flex items-center justify-between px-6 py-3">
          
          {/* === DESKTOP LEFT LINKS === */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.slice(0, 2).map((item) => (
              <CyberLink key={item.name} item={item} />
            ))}
          </div>

          {/* === MOBILE MENU TOGGLE === */}
           <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-[#00f2ff] p-1 border border-[#00f2ff]/30 rounded hover:bg-[#00f2ff]/10 transition">
                <AnimatePresence mode="wait">
                    {open ? <X key="x" size={24} /> : <Menu key="menu" size={24} />}
                </AnimatePresence>
            </button>
           </div>


          {/* === CENTER LOGO WITH GLOW === */}
          <div className="flex justify-center relative group">
            <div className="absolute -inset-2 bg-[#00f2ff]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={Logo}
              alt="Company Logo"
              className="h-16 w-auto object-contain relative z-10 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            />
          </div>


          {/* === DESKTOP RIGHT LINKS & TOGGLE === */}
          <div className="hidden md:flex items-center gap-6">
             <div className="flex items-center gap-2">
              {navItems.slice(2, 4).map((item) => (
                <CyberLink key={item.name} item={item} />
              ))}
             </div>
            {/* Reactor Core Dark Mode Toggle */}
            <ReactorToggle dark={dark} setDark={setDark} />
          </div>

           {/* === MOBILE TOGGLE (Right side) === */}
           <div className="md:hidden">
             <ReactorToggle dark={dark} setDark={setDark} />
           </div>

        </div>

        {/* ================= MOBILE MENU DROPDOWN ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden relative border-t border-[#00f2ff]/20 overflow-hidden"
            >
              {/* Grid Background for Mobile Menu */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#050a14_1px,transparent_1px),linear-gradient(to_bottom,#050a14_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/5 to-transparent"></div>
              </div>
              
              <div className="relative z-10 flex flex-col p-6 gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                     <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-lg border border-slate-800 bg-black/40 text-slate-300 hover:text-[#00f2ff] hover:border-[#00f2ff]/50 transition-all group font-mono tracking-wider uppercase"
                    >
                        <item.icon size={20} className="text-slate-500 group-hover:text-[#00f2ff] group-hover:animate-spin-slow" />
                        {item.name}
                     </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Required CSS for specific Cyberpunk effects */}
      <style jsx="true">{`
        /* Creates an octagonal shape for the toggle button */
        .clip-path-octagon {
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }
        /* Moving scanline background animation */
        @keyframes scanline {
            0% { background-position: 0 0; }
            100% { background-position: 0 100px; }
        }
        .animate-scanline {
            animation: scanline 4s linear infinite;
        }
        /* Slow spin for mobile menu icons */
        .animate-spin-slow {
             animation: spin 3s linear infinite;
        }
      `}</style>
    </>
  );
}