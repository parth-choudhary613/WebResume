// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import TechMarquee from "./TechMarquee";
import SplitText from "./SplitText";

export default function Hero() {
  return (
    <section>
      <SplitText />
    <TechMarquee/>
      
    </section>
  );
}
