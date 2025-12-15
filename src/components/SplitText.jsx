import React from "react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "./varients";
import ShinyText from "./ShinyText";

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
            <ShinyText 
  text="Just some shiny text!" 
  disabled={false} 
  speed={3} 
  className='custom-class' 
/>
            <motion.p
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="m-8 max-w-lg mx-auto lg:mx-0
                         text-gray-900 dark:text-gray-100"
            >
              <b>
                Front-end developer on a mission to make pixels behave. Armed
                with HTML, CSS, JavaScript, and React, I turn messy ideas into
                smooth, responsive UIs—minus the drama, plus the performance.
              </b>
                 <b>
                Front-end developer on a mission to make pixels behave. Armed
                with HTML, CSS, JavaScript, and React, I turn messy ideas into
                smooth, responsive UIs—minus the drama, plus the performance.
              </b>
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 text-[36px] lg:text-[60px] 
                         font-secondary font-semibold uppercase leading-[1]"
            >
              <span className="mr-4 text-gray-900 dark:text-gray-100">
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
                wrapper="span"
                repeat={Infinity}
                className="px-3 py-1 text-white bg-gray-900
                           rounded-xl dark:bg-gray-100 
                           dark:text-gray-900
                           "
              />
            </motion.div>
          </div>

          {/* Image Placeholder */}
          <motion.div
            variants={fadeIn("down", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px]"
          >
            {/* Image here */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
