import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "./assets/navlogo.png";

const links = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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
        backdrop-blur-xl
        bg-white/10 dark:bg-black/30
        border border-white/20 dark:border-white/10
        text-white
      "
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-[1fr_1fr_auto_1fr_1fr_auto] items-center px-6 py-3">
        <Link to="#home" className="nav-link text-center text-white">
          Home
        </Link>
        <Link to="#about" className="nav-link text-center text-white">
          About
        </Link>

        {/* LOGO */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Company Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <Link to="#projects" className="nav-link text-center text-white">
          Projects
        </Link>
        <Link to="#contact" className="nav-link text-center text-white">
          Contact
        </Link>

        {/* DARK MODE BUTTON */}
        <button
          onClick={() => setDark(!dark)}
          className="
            mx-auto p-2 rounded-lg
            border border-white/30
            hover:bg-white/10
            transition
          "
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden grid grid-cols-[auto_1fr_auto] items-center px-4 py-3">
        {/* MENU */}
        <button
          onClick={() => setOpen(!open)}
          className="justify-self-start text-white"
        >
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
          className="
            justify-self-end p-2 rounded-lg
            border border-white/30
            hover:bg-white/10
            transition
          "
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
            className="md:hidden overflow-hidden border-t border-white/20"
          >
            <div className="flex flex-col gap-4 p-4 text-center">
              {links.map((link) => (
                <Link
                  key={link}
                  to={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-white"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
