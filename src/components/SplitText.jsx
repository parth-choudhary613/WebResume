import React from "react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "./varients";
import Coding from "./assets/navlogo.png"

const Banner = () => {
  return (
    <motion.section
      className="min-h-[65vh] lg:min-h-[65vh] 
                 bg-white text-gray-900 
                 dark:bg-black dark:text-gray-100"
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-12">
          {/* Text */}
          <div className="flex-1 text-center font-secondary lg:text-left">
 
    <section
  className="
    relative max-w-3xl mx-auto lg:mx-0
    px-4 sm:px-6
    flex flex-col gap-6
  "
>
  {/* Hello World Badge */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="
      inline-flex items-center w-fit
      px-4 py-1 rounded-full
      border border-cyan-500/30 dark:border-cyan-400/30
      text-cyan-600 dark:text-cyan-400
      text-sm font-mono
      bg-cyan-500/5 dark:bg-cyan-400/5
      shadow-[0_0_15px_rgba(34,211,238,0.15)]
    "
  >
    &lt;Hello World /&gt;
  </motion.div>

  {/* Heading */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="leading-tight"
  >
    <span
      className="
        block text-5xl sm:text-6xl lg:text-7xl font-extrabold
        bg-gradient-to-r
        from-cyan-600 via-blue-500 to-purple-600
        dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500
        bg-clip-text text-transparent
        drop-shadow-[0_6px_18px_rgba(56,189,248,0.25)]
      "
    >
      Front-end
    </span>

    <span
      className="
        block text-5xl sm:text-6xl lg:text-7xl font-extrabold
        text-gray-900 dark:text-white
      "
    >
      Developer
    </span>
  </motion.h1>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45 }}
    className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
  >
    on a mission to make{" "}
    <span
      className="
        font-semibold
        bg-gradient-to-r from-orange-500 to-pink-500
        dark:from-orange-400 dark:to-pink-500
        bg-clip-text text-transparent
        underline underline-offset-4
      "
    >
      pixels behave
    </span>
  </motion.p>

  {/* Tech Stack */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="flex flex-wrap items-center gap-3 text-sm"
  >
    <span className="text-gray-500 dark:text-gray-400 font-medium">
      Armed with
    </span>

    {["HTML", "CSS", "JavaScript", "React"].map((tech) => (
      <span
        key={tech}
        className="
          px-3 py-1 rounded-full font-semibold
          text-white dark:text-black
          bg-gradient-to-r
          from-blue-600 to-purple-600
          dark:from-blue-400 dark:to-purple-500
          shadow-md
          hover:scale-105 transition
        "
      >
        {tech}
      </span>
    ))}
  </motion.div>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.75 }}
    className="text-gray-600 dark:text-gray-400 max-w-xl"
  >
    I turn messy ideas into{" "}
    <span className="font-semibold text-gray-900 dark:text-white">
      smooth, responsive UIs
    </span>{" "}
    — minus the drama, plus the{" "}
    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
      performance
    </span>.
  </motion.p>

  {/* Animated Role */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className="
      flex items-center gap-3
      text-2xl sm:text-3xl lg:text-4xl
      font-semibold
    "
  >
    <span className="text-gray-900 dark:text-gray-100">
      I am a
    </span>

    <TypeAnimation
      sequence={[
        "Developer",
        2000,
        "Designer",
        2000,
        "Influencer",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
      className="
        px-4 py-1 rounded-xl
        bg-gray-900 text-white
        dark:bg-gray-100 dark:text-gray-900
      "
    />
  </motion.div>
</section>

          </div>

          {/* Image Placeholder */}
          <motion.div
            variants={fadeIn("down", 0.8)}
            initial=""
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className=" lg:flex flex-1 max-w-[320px] lg:max-w-[482px]"
          >
            {/* Image here */}
            <img src={Coding} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
