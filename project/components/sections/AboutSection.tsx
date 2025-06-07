'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Rocket, Heart } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and performant code that stands the test of time.',
  },
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Blending aesthetics with functionality to create visually stunning user experiences.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge technologies and creative problem-solving.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Bringing genuine enthusiasm and dedication to every project and collaboration.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.fromTo(contentRef.current, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
      });

      // Features animation
      gsap.fromTo('.feature-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            end: 'bottom center',
          },
        }
      );

      // Floating background elements
      gsap.to('.floating-blob', {
        y: '20px',
        rotation: 10,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-blob absolute top-20 left-10 w-32 h-32 bg-neon-purple rounded-full blur-xl" />
        <div className="floating-blob absolute bottom-20 right-10 w-48 h-48 bg-neon-cyan rounded-full blur-2xl" />
        <div className="floating-blob absolute top-1/2 left-1/3 w-24 h-24 bg-neon-pink rounded-full blur-lg" />
      </div>

      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className='gradient-text'>About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            I'm a creative technologist and full-stack developer with a strong passion for building immersive, user-centric digital experiences. With a foundation in both system-level engineering and high-fidelity UI/UX, I specialize in combining performance with creativity—delivering work that’s technically sound, visually compelling, and designed to scale.
            

          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            My journey in tech started from curiosity and self-learning, evolving into a deep understanding of modern web technologies, machine learning, and systems design. I've worked across a broad range of technologies—from Next.js, React, Framer Motion, GSAP on the frontend to FastAPI, Django, Flask,Express on the backend. I also have strong experience integrating AI/LLM workflows, building modular RAG pipelines, and optimizing real-time systems.

What sets me apart is my ability to bridge art and engineering—bringing design systems to life with motion, responsiveness, and storytelling, while maintaining clean architecture and performance optimization under the hood
          </motion.p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card glass rounded-2xl p-8 text-center group hover:glass-strong transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 group-hover:from-neon-cyan/30 group-hover:to-neon-purple/30 transition-all duration-300">
                  <feature.icon size={32} className="text-neon-cyan group-hover:text-neon-purple transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}