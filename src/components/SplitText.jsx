import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "./varients"; // Ensure this path is correct
import Lottie from "lottie-react";
import Coding from "../assets/coding.json";


const Banner = () => {
  return (
    <section
      className="
        min-h-[85vh] lg:min-h-[75vh] 
        flex items-center 
        bg-white text-gray-900 
        dark:bg-black dark:text-gray-100
        overflow-hidden
      "
      id="home"
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-12 gap-y-10">
          
          {/* --- TEXT SECTION --- */}
          <div className="flex-1 text-center lg:text-left font-secondary z-10">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="flex flex-col items-center lg:items-start gap-6"
            >
              {/* Hello World Badge */}
              <motion.div
                variants={fadeIn("down", 0.2)}
                className="
                  inline-flex items-center
                  px-3 py-1 rounded-full
                  border border-cyan-500/30 dark:border-cyan-400/30
                  text-cyan-600 dark:text-cyan-400
                  text-xs sm:text-sm font-mono
                  bg-cyan-500/5 dark:bg-cyan-400/5
                  shadow-[0_0_15px_rgba(34,211,238,0.15)]
                "
              >
                &lt;React in Motion /&gt;
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeIn("down", 0.3)}
                className="leading-none"
              >
                <span
                  className="
                    block text-4xl sm:text-5xl lg:text-7xl font-extrabold
                    bg-gradient-to-r
                    from-cyan-600 via-blue-500 to-purple-600
                    dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500
                    bg-clip-text text-transparent
                    drop-shadow-sm pb-2
                  "
                >
                  Front-end
                </span>

                <span
                  className="
                    block text-4xl sm:text-5xl lg:text-7xl font-extrabold
                    text-gray-900 dark:text-white
                  "
                >
                  Developer
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeIn("down", 0.4)}
                className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400"
              >
                on a mission to make{" "}
                <span
                  className="
                    font-semibold
                    bg-gradient-to-r from-orange-500 to-pink-500
                    dark:from-orange-400 dark:to-pink-500
                    bg-clip-text text-transparent
                    underline underline-offset-4 decoration-2
                  "
                >
                  pixels behave
                </span>
              </motion.p>

              {/* Tech Stack Pills */}
              <motion.div
                variants={fadeIn("down", 0.5)}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-sm"
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                  Armed with:
                </span>

                {["HTML", "CSS", "JS", "React"].map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1 rounded-full font-semibold text-xs sm:text-sm
                      text-white dark:text-black
                      bg-gradient-to-r
                      from-blue-600 to-purple-600
                      dark:from-blue-400 dark:to-purple-500
                      shadow-md
                      hover:scale-105 transition cursor-default
                    "
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeIn("down", 0.6)}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                I turn messy ideas into{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  smooth UIs
                </span>{" "}
                — minus the drama, plus the{" "}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  performance
                </span>.
              </motion.p>

              {/* Animated Role */}
              <motion.div
                variants={fadeIn("down", 0.7)}
                className="
                  flex flex-wrap justify-center lg:justify-start items-center gap-3
                  text-xl sm:text-2xl lg:text-3xl
                  font-semibold
                "
              >
                <span className="text-gray-900 dark:text-gray-100">
                  I am a
                </span>

                <TypeAnimation
                  sequence={[
                    "Tech Enthusiast",
                    2000,
                    "Pixel Perfectionist",
                    2000,
                    "Web Creator",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  className="
                    px-3 py-1 rounded-lg
                    bg-gray-900 text-white
                    dark:bg-gray-100 dark:text-gray-900
                  "
                />
              </motion.div>
            </motion.div>
          </div>

          {/* --- IMAGE / LOTTIE SECTION --- */}
          <motion.div
            variants={fadeIn("up", 0.8)} // Changed to 'up' for better mobile feel
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            className=" flex-1 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
              <Lottie
                animationData={Coding}
                loop
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


export default Banner;