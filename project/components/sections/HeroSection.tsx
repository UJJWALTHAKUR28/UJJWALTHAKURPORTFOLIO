'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ChevronDown, ArrowRight, Download, Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/effects/ParticleBackground';
import AnimatedText from '@/components/ui/AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero animation timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.from(titleRef.current, {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.1
      })
      .from(subtitleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      .from(ctaRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');

      // Enhanced floating animation for scroll indicator
      gsap.to('.scroll-indicator-hero', {
        y: 15,
        duration: 2.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating elements animation
      gsap.to('.floating-element', {
        y: '30px',
        rotation: 10,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Text shimmer effect
      gsap.to('.shimmer-text', {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1,
      });

      // Magnetic effect for CTA buttons
      const buttons = gsap.utils.toArray('.magnetic-button');
      buttons.forEach((button: any) => {
        button.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Enhanced animated background elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 opacity-20">
        <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full blur-3xl animate-pulse" />
        <div className="floating-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="floating-element absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-neon-pink to-neon-green rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          ref={titleRef}
          className="mb-8"
        >

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-display font-bold mb-6">
            <div className="shimmer-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%]">
              <AnimatedText 
              text="HI, I'M " 
              className="text-foreground"
              delay={0.5}
            />
              UJJWAL THAKUR
            </div>

            <br />
            <AnimatedText 
              text="Creative Developer"
              className="text-foreground"
              delay={0.5}
            />
            </h1>

          
            <div className="flex items-center justify-center gap-4 text-lg md:text-xl text-gray-300">
            <span className="font-mono">Full Stack</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-mono">ML Engineer</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="font-mono">Data Scientist</span>
          </div>
        </motion.div>

        <motion.div
          ref={subtitleRef}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Crafting immersive digital experiences through
            <span className="gradient-text font-semibold"> innovative code</span>,
            <br />
            <span className="gradient-text font-semibold">stunning visuals</span>, and 
            <span className="gradient-text font-semibold"> cutting-edge technology</span>.
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>Available for projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span>Remote & On-site</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="magnetic-button group relative px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full font-semibold text-black overflow-hidden transition-all duration-300 shadow-lg hover:shadow-neon-cyan/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple animate-pulse opacity-20" />
          </motion.button>
          
          <motion.a
  href="/UJJWALTHAKURCV.pdf"
  download
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="magnetic-button group px-8 py-4 glass rounded-full font-semibold text-foreground border border-neon-cyan/30 hover:border-neon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10 inline-flex items-center gap-2"
>
  <Download size={20} className="group-hover:animate-bounce" />
  Download Resume
</motion.a>
        </motion.div>

        {/* Enhanced stats section */}
        
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="scroll-indicator-hero absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-muted-foreground hover:text-neon-cyan transition-colors group"
        >
          <span className="text-sm mb-2 font-medium font-mono uppercase tracking-wider">
            Discover More
          </span>
          <div className="relative">
            <ChevronDown size={24} className="group-hover:animate-bounce" />
            <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}