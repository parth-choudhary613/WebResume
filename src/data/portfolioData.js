// Centralized, factual data for Parth Choudhary's Portfolio
import humflowImg from '../components/assets/humflow.png'
import omnicassionImg from '../components/assets/omnicassion.png'
import vendorImg from '../components/assets/vendorprofile.png'
import agrovisionImg from '../components/assets/portfolio.png'
import avatarImg from '../components/assets/parth_avatar.png'
import monogramImg from '../components/assets/navlogo.png'
import portraitImg from '../components/assets/parth-portrait.png'

export const personalData = {
  name: "Parth Choudhary",
  initials: "PC",
  role: "Frontend Engineer / React Developer",
  location: "Himachal Pradesh, India",
  coordinates: "31.1048° N, 77.1734° E",
  availability: "Available for opportunities",
  statusMessage: "Building interfaces with impact & feeling",
  email: "parthchoudhary4372@gmail.com",
  phone: "+91 8894459562",
  phoneFormatted: "+91 88944 59562",
  whatsappUrl: "https://wa.me/918894459562",
  githubUrl: "https://github.com/parth-choudhary613",
  linkedinUrl: "https://www.linkedin.com/in/parth-choudhary-79b168290/",
  bioShort: "Frontend engineer specializing in React, TypeScript, and modern interface architecture. I build high-performance web systems where engineering rigor meets tactile visual craft.",
  portraitImg,
  avatarImg,
  monogramImg,
}

export const projectsData = [
  {
    id: "humflow",
    index: "01",
    title: "HumFlow",
    subtitle: "Audio Workflow & Ambient Interface Studio",
    year: "2025",
    role: "Frontend Development & Interaction Design",
    featured: true,
    tagline: "A low-latency audio environment synthesizing soundscapes with reactive layout motion.",
    problem: "Most ambient sound applications suffer from audio buffer lag, awkward responsive controls, and high CPU overhead on mobile devices.",
    whatBuilt: "Engineered a tactile ambient audio mixer featuring zero-lag state synchronization, parametric timer modes, custom audio nodes, and responsive gesture choreography.",
    technicalFocus: "Web Audio API node pipelines, reactive state orchestration, Framer Motion layout transitions, zero layout shifts.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Web Audio API"],
    liveUrl: "https://parth-choudhary613.github.io/HumFlow/",
    repoUrl: "https://github.com/parth-choudhary613/HumFlow",
    image: humflowImg,
    badge: "Open Source",
  },
  {
    id: "omnicassion",
    index: "02",
    title: "Omnicassion",
    subtitle: "Commercial Event Vendor Discovery Marketplace",
    year: "2024 — 2025",
    role: "Front-End Developer Intern",
    featured: true,
    tagline: "A high-throughput vendor directory connecting clients with verified wedding and event professionals.",
    problem: "Event marketplaces struggle with slow catalog navigation, bloated media assets, and poor mobile filtering performance across diverse vendor categories.",
    whatBuilt: "Developed the production client-facing vendor directory with real-time multi-facet filtering, modular vendor cards, responsive grid layouts, and backend REST synchronizations.",
    technicalFocus: "REST endpoint integration, responsive grid virtualization, image lazy-loading pipelines, cross-device consistency.",
    stack: ["React", "Next.js", "Tailwind CSS", "REST APIs", "Framer Motion"],
    liveUrl: "https://omnicassion.com/vendors",
    repoUrl: null, // Proprietary production codebase
    image: omnicassionImg,
    badge: "Production Platform",
  },
  {
    id: "vendorprofile",
    index: "03",
    title: "Vendor Profile System",
    subtitle: "Modular Profile & Service Catalog System",
    year: "2024",
    role: "Frontend Systems Engineer",
    featured: true,
    tagline: "A lightweight, modular vendor showcase engine with sub-second page delivery.",
    problem: "Small businesses require personalized, high-converting digital storefronts without the sluggish load times of traditional heavy CMS templates.",
    whatBuilt: "Architected a modular vendor presentation UI with interactive menu drawer navigation, direct vendor communication triggers, and responsive layout primitives.",
    technicalFocus: "Atomic component composition, Cloudflare Workers deployment, accessible modal & drawer states, strict CSS token architecture.",
    stack: ["React", "Tailwind CSS", "Material UI", "Cloudflare Workers", "Framer Motion"],
    liveUrl: "https://vandorprofile.parthchoudhary4372.workers.dev/",
    repoUrl: "https://github.com/parth-choudhary613/vandorProfile",
    image: vendorImg,
    badge: "Edge Architecture",
  },
  {
    id: "agrovision",
    index: "04",
    title: "AgroVision",
    subtitle: "AI Agricultural Diagnostics & Treatment System",
    year: "2024",
    role: "Full-Stack & Frontend Engineering",
    featured: true,
    tagline: "Computer vision crop pathology platform delivering real-time leaf analysis and targeted treatment recommendations.",
    problem: "Farmers in regional areas often lack immediate agronomic diagnostic support when crop blight or fungal infections appear in the field.",
    whatBuilt: "Built an intuitive, resilient photo-upload and diagnosis pipeline with client-side image compression, asynchronous analysis indicators, and actionable pesticide dosage guidance.",
    technicalFocus: "Client-side image processing, asynchronous inference polling, MERN architecture, responsive data display under slow networks.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Vision APIs"],
    liveUrl: "https://agrovision-sand.vercel.app/",
    repoUrl: "https://github.com/parth-choudhary613",
    image: agrovisionImg,
    badge: "AI Interface",
  },
]

export const skillsCategories = [
  {
    category: "Frontend Core",
    index: "01",
    description: "Component architecture, reactive state, and ECMAScript standards.",
    skills: [
      { name: "React 19 / 18", level: "Advanced", note: "Hooks, Fiber, Suspense, Concurrent patterns" },
      { name: "Next.js", level: "Proficient", note: "SSR, Static generation, App Router" },
      { name: "JavaScript (ESNext)", level: "Advanced", note: "Closures, async/await, DOM APIs, event loop" },
      { name: "TypeScript", level: "Proficient", note: "Type safety, generics, interfaces, strict mode" },
      { name: "Redux Toolkit", level: "Proficient", note: "Global state slices, thunks, RTK Query" },
      { name: "HTML5 Semantic Web", level: "Advanced", note: "Accessible markup, microdata, landmarks" },
    ],
  },
  {
    category: "Styling & Interaction",
    index: "02",
    description: "Design systems, typography scales, layout algorithms, and micro-motion.",
    skills: [
      { name: "Tailwind CSS (v3 / v4)", level: "Advanced", note: "JIT, custom theme tokens, container queries" },
      { name: "CSS Architecture", level: "Advanced", note: "Custom properties, CSS Grid, Flexbox, layout containment" },
      { name: "Framer Motion", level: "Proficient", note: "Spring dynamics, exit presence, layout animations" },
      { name: "Responsive Systems", level: "Advanced", note: "Fluid clamp() typography, mobile-first breakpoints" },
      { name: "Material UI / Headless UI", level: "Proficient", note: "Accessible component composition" },
    ],
  },
  {
    category: "Architecture & Tooling",
    index: "03",
    description: "Build pipelines, version control, edge deployments, and runtimes.",
    skills: [
      { name: "Vite", level: "Advanced", note: "Fast HMR, rollup plugins, bundle optimization" },
      { name: "Git & GitHub", level: "Advanced", note: "Branch workflows, PR reviews, CI/CD actions" },
      { name: "REST & API Integration", level: "Advanced", note: "Fetch, Axios, error boundaries, resilient polling" },
      { name: "Node.js & Express", level: "Proficient", note: "REST endpoints, middleware, MERN services" },
      { name: "Three.js / WebGL", level: "Working", note: "Spatial interface geometry, shader basics, R3F" },
      { name: "Cloudflare & Vercel", level: "Proficient", note: "Edge workers, continuous deployment" },
    ],
  },
  {
    category: "Engineering Disciplines",
    index: "04",
    description: "Quality benchmarks, accessibility, and production runtime performance.",
    skills: [
      { name: "Web Performance (CWV)", level: "Core Priority", note: "LCP, FID/INP, CLS reduction, bundle hygiene" },
      { name: "Accessibility (WCAG 2.1)", level: "Core Priority", note: "Keyboard navigation, aria attributes, contrast" },
      { name: "Cross-Browser Testing", level: "Standard", note: "Safari WebKit, Chromium, Firefox parity" },
      { name: "Code Cleanliness", level: "Standard", note: "Semantic naming, modularity, DRY principles" },
    ],
  },
]

export const experienceData = [
  {
    period: "Aug 2024 — Mar 2025",
    role: "Front-End Developer Intern",
    company: "Omnicassions",
    location: "Remote / Hybrid",
    type: "Internship",
    description: "Led frontend development for commercial vendor directory and multi-category event service portals. Partnered closely with backend engineers to integrate REST APIs, establish clean client caching, and implement mobile-first responsive interfaces.",
    highlights: [
      "Engineered high-performance vendor profile catalog with real-time category filtering and dynamic pricing cards.",
      "Collaborated with backend teams to streamline payload sizes and state synchronization, reducing redundant network requests.",
      "Ensured pixel-perfect responsiveness across phone, tablet, and ultra-wide viewport dimensions.",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "REST APIs", "Git"],
  },
  {
    period: "Sept 2023 — Mar 2024",
    role: "Junior Web Developer",
    company: "Excellence Technologies",
    location: "India",
    type: "Full-Time",
    description: "Built and maintained full-stack web applications on the MERN stack. Focused on core frontend rendering performance, query optimization, and reusable component libraries.",
    highlights: [
      "Enhanced overall client application speeds by ~40% through targeted bundle pruning, lazy-loading, and memoization.",
      "Reduced average page load times by approximately 2 seconds by optimizing database queries and client asset waterfalls.",
      "Developed responsive client dashboards adhering to strict accessibility and brand design standards.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JavaScript"],
  },
  {
    period: "Sept 2022 — Mar 2023",
    role: "Web Developer Trainee",
    company: "Government of India",
    location: "India",
    type: "Government Qualification",
    description: "Completed rigorous national Level-5 Qualification in Web Development. Built standards-compliant web components, practiced secure development workflows, and mastered core web specifications.",
    highlights: [
      "Attained certified Level-5 qualification in professional web engineering disciplines.",
      "Built standards-compliant semantic modules adhering to government digital accessibility guidelines.",
      "Contributed to collaborative code repositories with systematic peer reviews and documentation.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Standards"],
  },
]

export const educationData = [
  {
    institution: "Lovely Professional University",
    degree: "Master of Computer Applications (MCA)",
    period: "2024 — 2026 (Pursuing)",
    grade: "Cumulative GPA: 7.85 / 10",
    focus: "Advanced Software Architecture, Cloud Computing, Distributed Systems, Web Engineering",
  },
  {
    institution: "Govt. Degree College",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2020 — 2023",
    grade: "Cumulative GPA: 7.44 / 10",
    focus: "Data Structures, Database Management Systems, Object-Oriented Programming, Web Technologies",
  },
  {
    institution: "Govt. Sen. Sec. School",
    degree: "Senior Secondary (Non-Medical)",
    period: "2020",
    grade: "Cumulative Percentage: 68%",
    focus: "Mathematics, Physics, Chemistry",
  },
]

export const philosophyPrinciples = [
  {
    id: "performance",
    number: "01",
    title: "Performance as Architecture",
    headline: "Interfaces must feel immediate, not merely fast on high-end hardware.",
    body: "Every kilobyte of JavaScript is a tax on user attention. I prioritize lean bundle footprints, effective code-splitting, zero-runtime CSS tokens, and render containment so interfaces stay responsive under real-world network constraints.",
    codeSnippet: `// 01: Render Containment & Memoized Selectors
const CatalogGrid = memo(function CatalogGrid({ items, filter }) {
  const activeItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter]
  );
  
  return (
    <div style={{ contentVisibility: 'auto' }} className="grid grid-cols-12 gap-6">
      {activeItems.map((item) => (
        <VendorCard key={item.id} data={item} priority={item.isHero} />
      ))}
    </div>
  );
});`,
    codeLang: "javascript",
    codeLabel: "CatalogGrid.jsx",
  },
  {
    id: "accessibility",
    number: "02",
    title: "Universal Usability",
    headline: "Accessibility is an engineering baseline, never an afterthought.",
    body: "An interface is only successful when it works seamlessly for everyone. True frontend craftsmanship means keyboard navigation, logical focus rings, semantic landmark hierarchies, and proper ARIA relationships without visual compromise.",
    codeSnippet: `// 02: Accessible Dialog & Focus Trap Hook
export function useKeyboardDismiss(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

// Semantic landmarks with accessible labels
<nav aria-label="Primary navigation" role="navigation">
  <button aria-expanded={isOpen} aria-controls="mobile-menu">Menu</button>
</nav>`,
    codeLang: "javascript",
    codeLabel: "useA11y.js",
  },
  {
    id: "interaction",
    number: "03",
    title: "Restrained Interaction",
    headline: "Movement confirms intention; it does not demand attention.",
    body: "Animation should communicate spatial continuity and tactile confirmation. I favor physics-based springs with short settling times (120ms–250ms), subtle parallax, and respectful reduced-motion fallbacks over distracting visual stunts.",
    codeSnippet: `// 03: Physics Spring with Reduced-Motion Honor
const prefersReduced = useReducedMotion();

const transitionConfig = prefersReduced
  ? { duration: 0 }
  : { type: "spring", stiffness: 420, damping: 32, mass: 0.8 };

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={transitionConfig}
/>`,
    codeLang: "javascript",
    codeLabel: "SpringMotion.jsx",
  },
  {
    id: "modularity",
    number: "04",
    title: "Systemic Modularity",
    headline: "Maintainable codebases outlive short-term design trends.",
    body: "I build interface systems where typography scales, spacing tokens, and color primitives are strictly governed by design tokens. Component boundaries stay isolated, side-effects remain predictable, and props remain minimal.",
    codeSnippet: `// 04: Token-Driven Component Interface
interface SectionLabelProps {
  index: string;
  label: string;
  detail?: string;
  as?: 'h2' | 'h3' | 'span';
}

export function SectionLabel({ index, label, detail, as: Tag = 'h2' }: SectionLabelProps) {
  return (
    <Tag className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-text-secondary">
      <span className="text-accent font-semibold">{index}</span>
      <span className="text-border">/</span>
      <span className="text-text-primary tracking-[0.2em]">{label}</span>
      {detail && <span className="text-text-muted ml-auto hidden sm:inline">{detail}</span>}
    </Tag>
  );
}`,
    codeLang: "typescript",
    codeLabel: "SectionLabel.tsx",
  },
]
