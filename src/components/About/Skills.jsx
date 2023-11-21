import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Skills = ({ skill }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const percentsOffset = (skill?.percentage - 100) * (0 / 100);

  const transition = {
    duration: 1.5,
    delay: 0.2,
    ease: "easeInOut",
  };

  const variants = {
    enter: {
      opacity: 0.6,
      x: -0,
    },
    animate: {
      opacity: 1,
      x: [-585 * skill?.percentage / 100, percentsOffset],
      transition,
    },
  };

  return (
    <div ref={ref} className="mt-5 flex flex-col gap-6 max-sm:gap-4">
      <div>
        <span className="text-sm font-medium text-black dark:text-white">
          {skill?.name}
        </span>
        <div className="relative mb-5">
          <div className="rounded-full border border-[#27b173c5] overflow-hidden mt-2">
            <motion.div
              variants={variants}
              initial="enter"
              animate={isInView ? "animate" : "enter"}
              exit="enter"
              className="flex h-5 items-center justify-center rounded-full bg-[#27b173c5] text-xs leading-none"
              style={{ width: `${skill?.percentage}%` }}
            >
              <span className="p-1 text-white">{skill?.percentage}%</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
