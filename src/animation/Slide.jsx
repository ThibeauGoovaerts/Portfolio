import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

// animation component with the framer-motion package
export const Slide = ({ children, className, delay }) => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("stop");
    }
  }, [isInview, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        start: { opacity: 0, y: 50 },
        stop: { opacity: 1, y: 0 },
      }}
      initial="start"
      animate={controls}
      transition={{
        ease: "linear",
        delay: delay,
        duration: 0.4,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
