'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverableEnter = () => setIsHovering(true);
    const handleHoverableLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects for interactive elements
    const hoverables = document.querySelectorAll('button, a, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverableEnter);
      el.addEventListener('mouseleave', handleHoverableLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverableEnter);
        el.removeEventListener('mouseleave', handleHoverableLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null; // Hide cursor on mobile
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border-2 border-neon-cyan"
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgb(236, 72, 153)' : 'rgb(0, 255, 255)',
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-neon-cyan rounded-full"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          backgroundColor: isHovering ? 'rgb(236, 72, 153)' : 'rgb(0, 255, 255)',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}