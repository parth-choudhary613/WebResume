import React, { useState, useEffect } from "react";
import {motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const navbarVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const linkVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 200 }
  },
  hover: { 
    scale: 1.05,
    rotateX: 10,
    z: 20,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

const logoVariants = {
  initial: { scale: 0, rotateY: -180 },
  animate: { 
    scale: 1, 
    rotateY: 0,
    transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.3 }
  },
  hover: {
    rotateY: 15,
    rotateX: -10,
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 }
  }
};

const themeToggleVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { type: "spring", stiffness: 200, delay: 0.5 }
  },
  hover: { 
    scale: 1.2,
    rotate: 15,
    transition: { type: "spring", stiffness: 400 }
  },
  tap: { scale: 0.9 }
};

const mobileMenuVariants = {
  initial: { opacity: 0, scale: 0.8, rotateX: -15, y: -20 },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 25,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: 15,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const mobileLinkVariants = {
  initial: { x: -30, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 200 }
  },
  hover: { 
    x: 10,
    scale: 1.05,
    transition: { type: "spring", stiffness: 400 }
  }
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="perspective-1000 fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className={`
          preserve-3d mx-auto max-w-6xl rounded-2xl
          bg-card/70 backdrop-blur-xl
        
          shadow-3d
          transition-all duration-500
          ${scrolled ? "shadow-3d-hover" : ""}
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">

          {/* Desktop Left Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="
                  preserve-3d px-3 py-2 lg:px-4
                  text-nav-link hover:text-nav-link-hover
                  font-medium text-sm lg:text-base
                  rounded-xl
                  hover:bg-secondary/50
                  transition-colors duration-300
                  relative overflow-hidden
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary/50 text-foreground"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="preserve-3d flex-shrink-0 mx-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <a href="#">
              <div className="
                relative w-10 h-10 lg:w-12 lg:h-12
                rounded-xl
                bg-gradient-to-br from-primary to-accent
                flex items-center justify-center
                shadow-lg animate-glow
              ">
                <span className="text-primary-foreground font-display font-bold text-lg lg:text-xl">L</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/50 to-accent/50"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ transform: "translateZ(-10px)" }}
                />
              </div>
            </a>
          </motion.div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className="
                  preserve-3d px-3 py-2 lg:px-4
                  text-nav-link hover:text-nav-link-hover
                  font-medium text-sm lg:text-base
                  rounded-xl
                  hover:bg-secondary/50
                  transition-colors duration-300
                  relative overflow-hidden
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* Theme Toggle - Desktop */}
            <motion.button
              variants={themeToggleVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              className="
                ml-2 lg:ml-4 p-2.5 lg:p-3
                rounded-xl
                bg-secondary/50 hover:bg-secondary
                border border-border
                text-foreground
                transition-colors duration-300
                relative overflow-hidden
              "
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Sun size={18} className="lg:w-5 lg:h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Moon size={18} className="lg:w-5 lg:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Theme Toggle - Mobile */}
          <motion.button
            variants={themeToggleVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleTheme}
            className="
              md:hidden p-2 rounded-xl
              bg-secondary/50 hover:bg-secondary
              border border-border
              text-foreground
              transition-colors duration-300
            "
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun-mobile"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon-mobile"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="
                md:hidden border-t border-border
                bg-card/90 backdrop-blur-xl
                rounded-b-2xl overflow-hidden
              "
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={mobileLinkVariants}
                    whileHover="hover"
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      block px-4 py-3
                      text-nav-link hover:text-nav-link-hover
                      font-medium text-base
                      rounded-xl
                      hover:bg-secondary/50
                      transition-colors duration-300
                      border border-transparent hover:border-border
                    "
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
