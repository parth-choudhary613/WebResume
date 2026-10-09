import React, { useState } from "react"

import { Marquee } from "./marquee.jsx"
import { MarqueeDemo } from "./demo"
import {
  Sliders,
  Type,
  Sun,
  Moon,
  Copy,
  Check,
  Code2,
  Layers,
  Sparkles,
  FolderTree,
  Terminal,
  RotateCw,
} from "lucide-react"

function ShowcaseContent() {
  
  

  // Playground state
  const [customText, setCustomText] = useState(
    "Design sensibility. Engineering discipline."
  )
  const [fontSize, setFontSize] = useState("lg")
  const [duration, setDuration] = useState(20)
  const [strokeWidth, setStrokeWidth] = useState("1.5px")
  const [repeat, setRepeat] = useState(4)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")

  const presets = [
    {
      title: "Editorial Design",
      text: "Design sensibility. Engineering discipline.",
      fontSize: "lg",
      duration: 22,
      strokeWidth: "1.5px",
    },
    {
      title: "Hyperkinetic Tech",
      text: "DISTRIBUTED SYSTEMS · REACTIVE COMPUTE",
      fontSize: "xl",
      duration: 14,
      strokeWidth: "2px",
    },
    {
      title: "Minimalist Monospace",
      text: "PURE FUNCTION · ZERO DEPENDENCY CLUTTER",
      fontSize: "md",
      duration: 25,
      strokeWidth: "1px",
    },
    {
      title: "Monumental Display",
      text: "ARCHITECTURAL PROPORTION",
      fontSize: "2xl",
      duration: 30,
      strokeWidth: "2.5px",
    },
  ]

  const applyPreset = (preset) => {
    setCustomText(preset.text)
    setFontSize(preset.fontSize)
    setDuration(preset.duration)
    setStrokeWidth(preset.strokeWidth)
  }

  const copyUsageCode = () => {
    const code = `import { Marquee } from "./Text/marquee";

export default function Example() {
  return (
    <Marquee
      text="${customText}"
      fontSize="${fontSize}"
      duration={${duration}}
      repeat={${repeat}}
      strokeWidth="${strokeWidth}"
    />
  );
}`
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-border/70 bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-base shadow-sm">
              M
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-foreground">
                Marquee UI (JSX)
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                JavaScript/JSX Component · shadcn/ui Structure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/50 text-xs font-medium">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "preview"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Interactive
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "code"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                JSX Code
              </button>
              <button
                onClick={() => setActiveTab("docs")}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === "docs"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Setup Guide
              </button>
            </div>

      
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Component Showcase Stage */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-xs shadow-xs">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>JSX Live Render Canvas</span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                fontSize="{fontSize}" · stroke="{strokeWidth}" · duration={duration}s
              </span>
            </div>
            <button
              onClick={() => applyPreset(presets[0])}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3 h-3" />
              Reset defaults
            </button>
          </div>

          {/* Rendered Live Marquee */}
          <div className="py-12 bg-gradient-to-b from-transparent via-muted/10 to-transparent overflow-hidden">
            <Marquee
              text={customText}
              fontSize={fontSize}
              duration={duration}
              strokeWidth={strokeWidth}
              repeat={repeat}
            />
          </div>

          <div className="px-6 py-3 border-t border-border/40 bg-muted/10 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Pure JavaScript / JSX Component with Framer Motion
            </span>
            <span className="font-mono text-[11px]">WebkitTextStroke active</span>
          </div>
        </section>

        {/* Tab 1: Interactive Playground & Presets */}
        {activeTab === "preview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Controller Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-sm">Component Parameters (JSX)</h2>
                  </div>
                  <span className="text-xs text-muted-foreground">Interactive Playground</span>
                </div>

                {/* Input Text */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center justify-between">
                    <span>Display Text</span>
                    <span className="text-muted-foreground text-[11px]">{customText.length} characters</span>
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter typography text..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>

                {/* Font Size Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center justify-between">
                    <span>Font Size Scale</span>
                    <span className="text-muted-foreground text-[11px] font-mono">{fontSize}</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {["sm", "md", "lg", "xl", "2xl", "3xl"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                          fontSize === size
                            ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                            : "bg-background hover:bg-muted/70 text-foreground border-border"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  {/* Stroke Width */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Stroke Width</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{strokeWidth}</span>
                    </label>
                    <select
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-hidden focus:border-primary"
                    >
                      <option value="0.5px">0.5px (Hairline)</option>
                      <option value="1px">1.0px (Subtle)</option>
                      <option value="1.5px">1.5px (Standard)</option>
                      <option value="2px">2.0px (Bold)</option>
                      <option value="3px">3.0px (Heavy)</option>
                    </select>
                  </div>

                  {/* Duration / Speed */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Cycle Speed</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{duration}s</span>
                    </label>
                    <input
                      type="range"
                      min={6}
                      max={40}
                      step={1}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Fast (6s)</span>
                      <span>Slow (40s)</span>
                    </div>
                  </div>

                  {/* Repetitions */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Loop Copies</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{repeat} repeats</span>
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      step={1}
                      value={repeat}
                      onChange={(e) => setRepeat(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>2 copies</span>
                      <span>8 copies</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Default Demo Showcase */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm">Default Specimen: MarqueeDemo</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">from "./Text/demo.jsx"</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The specimen rendered from <code className="text-foreground font-mono bg-muted px-1.5 py-0.5 rounded">src/components/Text/demo.jsx</code>:
                </p>
                <div className="rounded-lg border border-border/80 bg-background/50 overflow-hidden py-4">
                  <MarqueeDemo />
                </div>
              </div>
            </div>

            {/* Presets & Info Sidebar */}
            <div className="space-y-6">
              {/* Presets */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Typography Presets</h3>
                </div>
                <div className="space-y-2.5">
                  {presets.map((p) => (
                    <button
                      key={p.title}
                      onClick={() => applyPreset(p)}
                      className="w-full text-left p-3 rounded-lg border border-border/70 hover:border-primary/50 hover:bg-muted/40 transition-all text-xs group"
                    >
                      <div className="flex items-center justify-between font-medium text-foreground group-hover:text-primary transition-colors">
                        <span>{p.title}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {p.fontSize} · {p.duration}s
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1 mt-1 text-[11px]">
                        "{p.text}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4 shadow-xs">
                <h3 className="font-semibold text-sm">JavaScript/JSX Specifications</h3>
                <dl className="text-xs space-y-2.5 text-muted-foreground divide-y divide-border/40">
                  <div className="flex justify-between pt-2">
                    <dt className="text-foreground">Component Path</dt>
                    <dd className="font-mono text-primary text-[11px]">src/components/Text/marquee.jsx</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="text-foreground">Demo Path</dt>
                    <dd className="font-mono text-primary text-[11px]">src/components/Text/demo.jsx</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="text-foreground">Utility Path</dt>
                    <dd className="font-mono text-primary text-[11px]">src/components/Text/utils.js</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="text-foreground">Format</dt>
                    <dd className="font-mono text-[11px]">Standard React JSX</dd>
                  </div>
                  <div className="flex justify-between pt-2">
                    <dt className="text-foreground">Theme</dt>
                    <dd className="font-mono text-[11px]">Fixed dark outline</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Code Viewer */}
        {activeTab === "code" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">JSX Usage Snippet</h3>
                </div>
                <button
                  onClick={copyUsageCode}
                  className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? "Copied" : "Copy JSX Snippet"}
                </button>
              </div>

              <div className="bg-muted/40 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-border/60">
                <pre className="text-foreground/90 leading-relaxed">
{`import { Marquee } from "./Text/marquee"

export function Banner() {
  return (
    <Marquee
      text="${customText}"
      fontSize="${fontSize}"
      duration={${duration}}
      repeat={${repeat}}
      strokeWidth="${strokeWidth}"
    />
  )
}`}
                </pre>
              </div>
            </div>

            {/* Marquee Component source preview in JSX */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-foreground font-semibold">
                  src/components/Text/marquee.jsx
                </span>
                <span className="text-xs text-muted-foreground font-mono">React JSX</span>
              </div>
              <div className="bg-muted/40 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-border/60 max-h-96">
                <pre className="text-muted-foreground leading-relaxed">
{`import { Marquee } from "./Text/marquee";

export default function AboutMarquee() {
  return (
    <Marquee
      text="Design sensibility. Engineering discipline."
      fontSize="lg"
      duration={20}
      repeat={4}
      strokeWidth="1.5px"
    />
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Setup Guide */}
        {activeTab === "docs" && (
          <div className="space-y-8">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <FolderTree className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-base">
                  JSX Project Structure & /components/ui
                </h3>
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                <p>
                  In a JavaScript / JSX project using shadcn conventions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="p-4 rounded-lg border border-border bg-background space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <code className="text-primary font-mono text-xs">/components/ui/</code> (.jsx)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Contains primitive JSX components (<code className="text-foreground">marquee.jsx</code>, <code className="text-foreground">demo.jsx</code>). All shadcn components are installed directly into this directory.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-background space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <code className="text-primary font-mono text-xs">/lib/</code> (.js)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Houses shared JavaScript utilities such as <code className="text-foreground">utils.js</code> with the <code className="text-foreground">cn()</code> helper function.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <Terminal className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-base">
                  Using This Component in React + Vite
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-muted-foreground">
                  Copy the Text folder into src/components, then start your Vite server:
                </p>
                <pre className="p-3 bg-muted/40 rounded-lg font-mono text-[11px] border border-border/60 overflow-x-auto">
# In your existing React + Vite project
# No extra runtime packages needed for the marquee
npm run dev
                </pre>
                <p className="text-muted-foreground">
                  In <code className="text-foreground font-mono bg-muted px-1 py-0.5 rounded">components.json</code>, set <code className="text-foreground font-mono bg-muted px-1 py-0.5 rounded">"tsx": false</code>:
                </p>
                <pre className="p-3 bg-muted/40 rounded-lg font-mono text-[11px] border border-border/60 overflow-x-auto">
{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Optional: full interactive playground, with all configuration controls.
export function MarqueePlayground() {
  return <ShowcaseContent />;
}

// Default export: the marquee itself, suitable for your About section.
export default function Text() {
  return <MarqueeDemo />;
}
