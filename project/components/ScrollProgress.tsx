'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-indicator">
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
    </div>
  );
}