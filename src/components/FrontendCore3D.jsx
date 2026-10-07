import React, { useEffect, useRef } from "react";

export default function FrontendCore3D() {
  const cardRef = useRef(null);
  const target = useRef({ x: 0, y: 0, scale: 1 });
  const current = useRef({ x: 0, y: 0, scale: 1 });
  const frameRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      // Smaller = smoother / floatier
      // Larger = faster / snappier
      const smoothness = 0.08;

      current.current.x +=
        (target.current.x - current.current.x) * smoothness;

      current.current.y +=
        (target.current.y - current.current.y) * smoothness;

      current.current.scale +=
        (target.current.scale - current.current.scale) * smoothness;

      if (cardRef.current) {
        cardRef.current.style.transform = `
          rotateX(${current.current.x}deg)
          rotateY(${current.current.y}deg)
          scale3d(
            ${current.current.scale},
            ${current.current.scale},
            ${current.current.scale}
          )
        `;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    target.current = {
      x: (0.5 - y) * 10,
      y: (x - 0.5) * 12,
      scale: 1.035,
    };
  };

  const handleMouseLeave = () => {
    target.current = {
      x: 0,
      y: 0,
      scale: 1,
    };
  };

  return (
    <div
      className="
        relative
        w-full
        h-[600px]
        sm:h-[440px]
        lg:h-[600px]
        flex
        items-center
        justify-center
      "
      style={{
        perspective: "1200px",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          group
          relative
          h-full
          w-full
          flex
          items-center
          justify-center
          motion-reduce:transform-none
        "
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform:
            "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {/* Glow */}
        <div
          className="
            absolute
            w-[65%]
            h-[65%]
            rounded-full
            bg-blue-500/20
            blur-[70px]
            transition-[background-color,opacity]
            duration-700
            ease-out
            group-hover:bg-blue-500/30
          "
          style={{
            transform: "translateZ(-50px)",
          }}
        />

        {/* Portrait */}
        <img
          src="/assets/developer-portrait.png"
          alt="Developer portrait"
          draggable="false"
          className="
            relative
            z-10
            max-h-full
            max-w-full
            object-contain
            drop-shadow-[0_25px_35px_rgba(0,80,255,0.20)]
            transition-[filter]
            duration-700
            ease-out
            group-hover:drop-shadow-[0_30px_45px_rgba(0,110,255,0.32)]
            select-none
            pointer-events-none
          "
          style={{
            transform: "translateZ(35px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </div>
    </div>
  );
}