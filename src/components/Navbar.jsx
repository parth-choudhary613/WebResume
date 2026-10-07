import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = (event) => {
      if (event.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="portfolio-navbar">
      <a className="portfolio-navbar__skip" href="#hero-heading" onClick={closeMenu}>
        Skip to content
      </a>

      <div className="portfolio-navbar__inner">
        <a
          className="portfolio-navbar__brand"
          href="#home"
          aria-label="Parth Choudhary, home"
          onClick={closeMenu}
        >
          <span className="portfolio-navbar__monogram" aria-hidden="true">pc.</span>
          <span className="portfolio-navbar__identity">
            <span className="portfolio-navbar__name">Parth Choudhary</span>
            <span className="portfolio-navbar__role">Frontend developer</span>
          </span>
        </a>

        <nav className="portfolio-navbar__desktop" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.name} className="portfolio-navbar__link" href={item.href}>
              {item.name}
              {item.name === "Contact" && <ArrowUpRight size={14} aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <button
          className="portfolio-navbar__toggle"
          type="button"
          ref={menuButton}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="portfolio-mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="portfolio-mobile-navigation"
        className="portfolio-navbar__mobile"
        aria-label="Primary navigation"
        hidden={!open}
      >
        {navItems.map((item) => (
          <a key={item.name} className="portfolio-navbar__link" href={item.href} onClick={closeMenu}>
            {item.name}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}
