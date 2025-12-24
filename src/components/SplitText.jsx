import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "./varients";
import Lottie from "lottie-react";
import Coding from "../assets/coding.json";
import MarqueeText from "./Marqueetext";

const Banner = () => {
  return (
    <section
      className="
        min-h-screen 
        flex flex-col justify-center 
        pt-36 md:pt-44 lg:pt-40  
        bg-slate-950 text-white
        overflow-hidden
        relative
      "
      id="home"
    >
      {/* FIX: Background Marquee 
        - Responsive font size: text-5xl on mobile -> text-9xl on desktop
        - Adjusted top position: top-32 on mobile to clear the navbar area
      */}
      <div className="absolute top-32 md:top-40 lg:top-20 w-full z-0 opacity-10 pointer-events-none select-none">
        <MarqueeText
          texts={["PARTH CHOUDHARY | FRONT-END DEVELOPER |"]}
          className="custom-scroll-text text-5xl md:text-7xl lg:text-9xl font-bold uppercase"
        />
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-72 h-72 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 md:w-96 md:h-96 bg-cyan-600/20 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-12 gap-y-10">
          
          {/* --- LEFT: TEXT SECTION --- */}
          <div className="flex-1 text-center lg:text-left font-secondary">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="flex flex-col items-center lg:items-start gap-6"
            >
              {/* Badge */}
              <motion.div
                variants={fadeIn("down", 0.2)}
                className="
                  inline-flex items-center
                  px-4 py-1.5 rounded-full
                  border border-cyan-400/30
                  text-cyan-400
                  text-xs sm:text-sm font-mono font-bold
                  bg-cyan-500/10
                  shadow-[0_0_20px_rgba(34,211,238,0.2)]
                  backdrop-blur-sm
                "
              >
                &lt;React in Motion /&gt;
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeIn("down", 0.3)}
                className="leading-none"
              >
                <span
                  className="
                    block text-4xl sm:text-6xl lg:text-7xl font-extrabold
                    bg-gradient-to-r
                    from-cyan-400 via-blue-500 to-purple-500
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]
                    pb-2
                  "
                >
                  Front-end
                </span>
                <span className="block text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white">
                  Developer
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeIn("down", 0.4)}
                className="text-base sm:text-lg lg:text-xl text-slate-400"
              >
                on a mission to make{" "}
                <span className="font-semibold text-pink-500 underline underline-offset-4 decoration-pink-500/30">
                  pixels behave
                </span>
              </motion.p>

              {/* Stack Pills */}
              <motion.div
                variants={fadeIn("down", 0.5)}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-sm"
              >
                <span className="text-slate-500 font-medium font-mono">[ Stack ]:</span>
                {["HTML", "CSS", "JS", "React"].map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1 md:px-4 md:py-1 rounded-full font-bold text-xs sm:text-sm
                      text-black bg-gradient-to-r from-blue-400 to-purple-400
                      hover:scale-105 transition shadow-lg cursor-default
                    "
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeIn("down", 0.1)}
                className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                I turn messy ideas into <span className="text-white font-bold">smooth UIs</span> — minus the drama, plus the <span className="text-cyan-400 font-bold">performance</span>.
              </motion.p>

              {/* Type Animation Role */}
              <motion.div
                variants={fadeIn("down", 0.7)}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-lg sm:text-2xl lg:text-3xl font-semibold mt-2"
              >
                <span className="text-white">I am a</span>
                <TypeAnimation
                  sequence={[
                    "Tech Enthusiast", 2000,
                    "Pixel Perfectionist", 2000,
                    "Web Creator", 2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  className="text-cyan-400 font-mono"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* --- RIGHT: IMAGE SECTION --- */}
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="flex-1 hidden sm:flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
              <Lottie
                animationData={Coding}
                loop
                className="w-full h-auto drop-shadow-[0_0_50px_rgba(6,182,212,0.15)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;