'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    el.innerHTML = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = cn(
        'inline-block',
        className // apply the gradient classes to each span
      );
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      el.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      delay,
    });
  }, [text, delay, className]);

  return <span ref={textRef} className="inline-block" />;
}
