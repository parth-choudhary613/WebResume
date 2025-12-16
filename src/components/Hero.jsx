// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import MarqueeText from "./Marqueetext";
import SplitText from "./SplitText";
export default function Hero() {
  return (
    <section className="playfair pt-30">
      <MarqueeText
        texts={["PARTH CHOUDHARY | FRONT-END DEVELOPER |"]}
        className="custom-scroll-text"
      />

      <SplitText />
    </section>
  );
}
