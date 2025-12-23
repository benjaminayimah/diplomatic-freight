'use client'

import { useScroll, motion, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

function TextReveal({ words, textOffset = '0.8' }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [`start ${textOffset}`, 'start 0.3'],
  });

  return (
    <p ref={targetRef} className="flex flex-wrap items-start">
      {words.map((word, i) => {
        if (word.type === 'br') {
          return <motion.span key={`br-${i}`} className="basis-full h-0 mt-8" />;
        }

        const start = i / words.length;
        const end = Math.min(start + 1 / words.length, 1);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

        return (
          <motion.span key={i} className="mr-2" style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default TextReveal;
