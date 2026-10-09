import React from "react";
import { cn } from "./utils";

const fontSizeClasses = {
  sm: "text-5xl sm:text-6xl md:text-7xl",
  md: "text-6xl sm:text-7xl md:text-8xl",
  lg: "text-7xl sm:text-8xl md:text-9xl",
  xl: "text-8xl sm:text-9xl md:text-[10rem]",
  "2xl": "text-9xl sm:text-[10rem] md:text-[11rem]",
  "3xl": "text-[10rem] sm:text-[11rem] md:text-[12rem]",
};


export const Marquee = React.forwardRef(function Marquee(
  {
    className,
    text = "Design sensibility. Engineering discipline.",
    repeat = 4,
    duration = -2,
    fontSize = "lg",
    strokeWidth = "1.5px",
    strokeColor = "#aaa3ba",
    pauseOnHover = false,
    respectReducedMotion = false,
    style,
    ...props
  },
  ref
) {
  const content = String(text ?? "").replace(/\s+/g, " ").trim();
  const copies = Math.max(1, Math.min(12, Math.floor(Number(repeat) || 4)));
  const seconds = Math.max(1, Number(duration) || 20);

  if (!content) return null;

  const textClassName = cn(
    fontSizeClasses[fontSize] || fontSizeClasses.lg,
    "shrink-0 whitespace-nowrap px-5 font-bold leading-tight text-transparent"
  );

  const renderGroup = (key) => (
    <div key={key} aria-hidden="true" className="flex shrink-0 items-center">
      {Array.from({ length: copies }, (_, index) => (
        <span
          key={index}
          className={textClassName}
          style={{ WebkitTextStroke: `${strokeWidth} ${strokeColor}` }}
        >
          {content}
        </span>
      ))}
    </div>
  );

  return (
    <div
      {...props}
      ref={ref}
      className={cn("relative w-full max-w-full overflow-hidden py-10", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        ...style,
      }}
    >
      <span className="sr-only">{content}</span>

      <div
        className={cn(
          "portfolio-marquee-track flex w-max",
          pauseOnHover && "portfolio-marquee-pause-on-hover",
          respectReducedMotion && "portfolio-marquee-respect-reduced-motion"
        )}
        style={{
          animation: `portfolio-marquee-move ${seconds}s linear infinite`,
          willChange: "transform",
        }}
      >
        {renderGroup("first")}
        {renderGroup("second")}
      </div>

      <style>{`
        @keyframes portfolio-marquee-move {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .portfolio-marquee-track.portfolio-marquee-pause-on-hover:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-marquee-track.portfolio-marquee-respect-reduced-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
});

Marquee.displayName = "Marquee";
export default Marquee;
