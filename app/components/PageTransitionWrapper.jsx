'use client'

import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 120, filter: "blur(10px)", rotateY: 5 },
  enter:   { opacity: 1, x: 0,   filter: "blur(0px)",  rotateY: 0 },
  exit:    { opacity: 0, x: -120, filter: "blur(10px)", rotateY: -5 },
};

const pageTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};


export default function PageTransitionWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : ""}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
