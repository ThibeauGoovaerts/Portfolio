import React from "react";
import HomeIcon from "../../icons/HomeIcon";
import { motion } from "framer-motion";
import { Slide } from "../../animation/Slide";

const Home = ({ home }) => {
  return (
    <section
      id="home"
      className="container2 min-h-screen text-black dark:text-white"
    >
      <div>
        <div className="flex items-center justify-center gap-10 max-lg:flex-col h-[calc(100vh-76px)]">
          <Slide delay={0.1}>
            <div className="max-w-xl">
              <h6 className="text-[22px] max-md:text-[18px] font-medium mb-4">
                👋 Hi, I’ m
              </h6>
              <motion.h1 className="text-5xl max-md:text-[40px] font-medium mb-4">
                {home?.name}
              </motion.h1>
              <p className="font-medium text-[18px] max-md:text-base dark:text-zinc-400 text-zinc-600">
                {home?.subtitle}
              </p>
            </div>
          </Slide>
          <Slide delay={0.3}>
            {/* animation home icon */}
            <HomeIcon />
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default Home;
