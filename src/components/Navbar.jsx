import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "./assets/navlogo.png";

const links = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-full
        rounded-2xl
        bg-white/70 dark:bg-black/60
        backdrop-blur-xl
        border border-black/1 dark:border-white/1
      "
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-[1fr_1fr_auto_1fr_1fr_auto] items-center px-6 py-3">
        <a href="#home" className="nav-link text-center">Home</a>
        <a href="#about" className="nav-link text-center">About</a>

        {/* LOGO */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <a href="#projects" className="nav-link text-center">Projects</a>
        <a href="#contact" className="nav-link text-center">Contact</a>

        <button
          onClick={() => setDark(!dark)}
          className="mx-auto p-2 rounded-lg border border-black/10 dark:border-white/10"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden grid grid-cols-[auto_1fr_auto] items-center px-4 py-3">
        {/* MENU */}
        <button onClick={() => setOpen(!open)} className="justify-self-start">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* CENTER LOGO */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="justify-self-end p-2 rounded-lg border border-black/10 dark:border-white/10"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-black/10 dark:border-white/10"
          >
            <div className="flex flex-col gap-4 p-4 text-center">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-black/80 dark:text-white/80"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
