import React from "react";
import { Marquee } from "./marquee";

export function MarqueeDemo() {
  return (
    <div className="w-full overflow-hidden">
      <Marquee
        text="Design sensibility. Engineering discipline."
        duration={20}
        repeat={4}
        fontSize="lg"
        strokeWidth="1.5px"
      />
    </div>
  );
}

export default MarqueeDemo;
