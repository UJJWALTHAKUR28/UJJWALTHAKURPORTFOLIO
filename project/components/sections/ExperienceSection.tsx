'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Calendar, MapPin, ExternalLink, Briefcase, TrendingUp, Award, Zap, Star, Code, Database } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const experiences = [
  {
    id: 1,
    title: 'Python Developer Intern',
    company: 'Infosys Springboard',
    location: 'Remote',
    period: 'March, 2024 - June, 2024',
    duration: '3 months',
    type: 'Internship',
    description:
      'Engineered a full-stack AI-powered CMS platform integrating Strapi with a custom Python backend for real-time image generation. Developed secure API endpoints for AI model inference, integrated WebSockets for live image previews, and deployed a modular, scalable CMS for content creators and designers.',
    achievements: [
      'Developed an end-to-end CMS application using Strapi with dynamic schema support',
      'Integrated AI image generation APIs (e.g., Stable Diffusion) with real-time feedback using WebSockets',
      'Built scalable Python microservices for asynchronous image generation and job queueing',
      'Implemented role-based access controls and media asset pipelines within the CMS',
      'Automated deployment with CI/CD and containerized services using Docker and GitHub Actions',
      'Optimized backend communication to reduce image generation latency by 55%',
      'Designed intuitive admin and client dashboards with usage analytics and preview generation'
    ],
    technologies: [
      'Strapi',
      'Next.js',
      'Python',
      'FastAPI',
      'Stable Diffusion API',
      'WebSockets',
      'MongoDB',
    ],
    highlights: [
    
      { metric: '1.2K+', label: 'Images Generated', icon: Star },
      { metric: '3x', label: 'Faster API Response', icon: TrendingUp },
      { metric: 'Realtime', label: 'WebSocket Previews', icon: Code }
    ],
    companyLogo: '🚀',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20'
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated particles background
      const particles = gsap.utils.toArray('.particle');
      particles.forEach((particle: any, i) => {
        gsap.set(particle, {
          x: gsap.utils.random(-100, window.innerWidth + 100),
          y: gsap.utils.random(-100, window.innerHeight + 100),
          scale: gsap.utils.random(0.1, 0.3),
          opacity: gsap.utils.random(0.1, 0.3),
        });

        gsap.to(particle, {
          x: `+=${gsap.utils.random(-200, 200)}`,
          y: `+=${gsap.utils.random(-200, 200)}`,
          rotation: 360,
          duration: gsap.utils.random(10, 20),
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      // Enhanced header animation with staggered reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.from('.header-element', {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        transformOrigin: 'center bottom'
      })
      .from('.header-line', {
        scaleX: 0,
        duration: 1,
        ease: 'power2.inOut'
      }, '-=0.5')
      .from('.header-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3');

      // Advanced timeline path animation with morphing effect
      const path = timelineRef.current?.querySelector('.timeline-path') as SVGPathElement;
      if (path) {
        const pathLength = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // Morphing timeline animation
        const timelineTl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(path, {
                filter: `hue-rotate(${progress * 360}deg) brightness(${1 + progress * 0.5})`,
                duration: 0.1
              });
            }
          },
        });

        timelineTl.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'none',
        })
        .to(path, {
          strokeWidth: 4,
          duration: 0.5,
          ease: 'power2.inOut'
        }, 0.2);
      }

      // Ultra-enhanced experience cards with 3D transforms
      gsap.fromTo('.experience-card',
        { 
          x: -200, 
          opacity: 0,
          rotationY: -60,
          rotationX: 15,
          scale: 0.7,
          z: -100
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          duration: 1.8,
          stagger: {
            amount: 0.6,
            from: 'start'
          },
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
        }
      );

      // Animated timeline dots with pulsing rings
      gsap.fromTo('.timeline-dot',
        { 
          scale: 0, 
          opacity: 0,
          rotation: 270
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          onComplete: () => {
            // Add pulsing rings after dots appear
            gsap.to('.timeline-dot::after', {
              scale: 1.5,
              opacity: 0,
              duration: 2,
              repeat: -1,
              ease: 'power2.out',
              stagger: 0.5
            });
          }
        }
      );

      // Advanced company logo animations
      gsap.to('.company-logo', {
        y: '20px',
        rotation: 15,
        scale: 1.05,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      });

      // Rotating background elements with different speeds
      gsap.to('.experience-bg-1', {
        rotation: 360,
        scale: 1.1,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('.experience-bg-2', {
        rotation: -360,
        scale: 0.9,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('.experience-bg-3', {
        rotation: 180,
        scale: 1.05,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      // Multi-layer parallax effect
      gsap.to('.experience-parallax-1', {
        yPercent: -50,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.experience-parallax-2', {
        yPercent: -30,
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Enhanced card hover animations with magnetic effect
      const cards = gsap.utils.toArray('.experience-card');
      cards.forEach((card: any) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', (e) => {
          gsap.to(card, {
            x: 20,
            y: -10,
            scale: 1.03,
            rotationY: 5,
            z: 50,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Animate card children
          gsap.to(card.querySelectorAll('.card-highlight'), {
            scale: 1.1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.2)'
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(card.querySelectorAll('.card-highlight'), {
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
          });
        });

        // Magnetic effect
        cardElement.addEventListener('mousemove', (e) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(card, {
            x: x * 0.05,
            y: y * 0.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Animated achievement points with typewriter effect
      gsap.utils.toArray('.achievement-item').forEach((item: any, index) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });

      // Technology tags with wave animation
      gsap.utils.toArray('.tech-tag').forEach((tag: any, index) => {
        gsap.fromTo(tag,
          { y: 20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: tag,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.05
          }
        );
      });

      // Stats counter animation
      gsap.utils.toArray('.stat-number').forEach((stat: any) => {
        const finalValue = stat.textContent;
        const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: numValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            onUpdate: function() {
              if (finalValue.includes('+')) {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
              } else if (finalValue.includes('M+')) {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + 'M+';
              } else {
                stat.textContent = Math.ceil(this.targets()[0].textContent);
              }
            }
          }
        );
      });

      // Highlight boxes with morphing animation
      gsap.utils.toArray('.highlight-box').forEach((box: any, index) => {
        gsap.fromTo(box,
          { 
            scale: 0,
            rotation: 180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
              trigger: box,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });

      // Floating animation for icons
      gsap.utils.toArray('.floating-icon').forEach((icon: any, index) => {
        gsap.to(icon, {
          y: '10px',
          rotation: 5,
          duration: 2 + index * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
      });

      // Section reveal animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Enhanced background with particles */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            />
          ))}
        </div>

        {/* Enhanced background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="experience-bg-1 experience-parallax-1 absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-500 rounded-full blur-3xl" />
          <div className="experience-bg-2 experience-parallax-2 absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 rounded-full blur-2xl" />
          <div className="experience-bg-3 experience-parallax-1 absolute top-1/2 right-1/3 w-40 h-40 bg-gradient-to-r from-pink-400 via-rose-500 to-orange-500 rounded-full blur-xl" />
          <div className="experience-parallax-2 absolute bottom-1/4 right-1/2 w-32 h-32 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full blur-lg" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="header-element">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <AnimatedText 
                text="Experience Journey"
                className="gradient-text"
              />
            </h2>
          </div>
          <div className="header-line w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto rounded-full mb-8" />
          <div className="header-description">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional evolution through innovative companies and transformative challenges.
            </p>
          </div>
        </motion.div>

        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Ultra-Enhanced Timeline SVG */}
          <svg
            className="absolute left-8 top-0 h-full w-4 z-10"
            viewBox="0 0 16 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(0, 255, 255)" />
                <stop offset="20%" stopColor="rgb(147, 51, 234)" />
                <stop offset="40%" stopColor="rgb(236, 72, 153)" />
                <stop offset="60%" stopColor="rgb(34, 197, 94)" />
                <stop offset="80%" stopColor="rgb(251, 146, 60)" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" />
              </linearGradient>
              <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="timeline-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgb(0, 255, 255)" floodOpacity="0.3"/>
              </filter>
            </defs>
            <path
              className="timeline-path"
              d="M8,0 Q12,100 8,200 Q4,300 8,400 Q12,500 8,600 Q4,700 8,800 Q12,900 8,1000"
              stroke="url(#timeline-gradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#timeline-glow)"
            />
          </svg>

          {/* Experience Cards */}
          <div ref={cardsRef} className="space-y-24">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Ultra-Enhanced Timeline dot */}
                <div className={`timeline-dot absolute left-5 w-8 h-8 bg-gradient-to-r ${exp.color} rounded-full z-20 border-4 border-background shadow-2xl`}>
                  <div className={`absolute inset-1 bg-gradient-to-r ${exp.color} rounded-full`}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" />
                  </div>
                  <div className={`absolute -inset-2 bg-gradient-to-r ${exp.color} rounded-full opacity-20 animate-pulse`} />
                </div>
                
                <motion.div
                  className={`experience-card ml-24 glass-ultra rounded-3xl p-10 hover:glass-strong transition-all duration-700 ${exp.gradient} backdrop-blur-xl border border-white/20`}
                  style={{ 
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Floating background elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-orange-500/10 rounded-full blur-lg animate-pulse delay-1000" />

                  {/* Enhanced Card Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex items-start gap-6 mb-6 lg:mb-0">
                      <div className={`company-logo text-5xl p-4 bg-gradient-to-r ${exp.color} bg-opacity-20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl`}>
                        {exp.companyLogo}
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
                          {exp.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-muted-foreground mb-3">
                          <span className="font-bold text-neon-cyan text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {exp.company}
                          </span>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={18} className="text-neon-purple" />
                            <span>{exp.location}</span>
                          </div>
                          <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full text-sm font-mono border border-emerald-500/30 text-emerald-400">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end bg-gradient-to-r from-slate-800/30 to-slate-700/30 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar size={18} className="text-neon-cyan" />
                        <span className="font-mono text-sm">{exp.period}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Duration: <span className="text-neon-purple font-semibold">{exp.duration}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg font-light">
                    {exp.description}
                  </p>

                  {/* Enhanced Key Highlights */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {exp.highlights.map((highlight, idx) => {
                      const IconComponent = highlight.icon;
                      return (
                        <div key={idx} className="highlight-box card-highlight text-center glass-strong rounded-2xl p-6 group hover:scale-105 transition-all duration-300 border border-white/10">
                          <div className="floating-icon mb-3">
                            <IconComponent className="w-6 h-6 mx-auto text-neon-cyan" />
                          </div>
                          <div className={`text-3xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-2 tracking-tight`}>
                            {highlight.metric}
                          </div>
                          <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {highlight.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Achievements */}
                  <div className="mb-8">
                    <h4 className="font-bold text-foreground mb-6 flex items-center gap-3 text-xl">
                      <Award size={22} className="text-neon-cyan" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-4">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li 
                          key={idx} 
                          className="achievement-item flex items-start gap-4 text-muted-foreground group p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                          whileHover={{ x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg`} />
                          <span className="group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Technologies */}
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, techIdx) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="tech-tag px-4 py-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl text-sm font-mono text-foreground hover:bg-neon-cyan/20 transition-all duration-300 cursor-default border border-white/10 backdrop-blur-sm shadow-lg"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${exp.color} opacity-0 hover:opacity-15 transition-opacity duration-500 pointer-events-none`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${exp.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra-Enhanced Career Summary */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          <div className="glass-ultra rounded-3xl p-12 max-w-6xl mx-auto shadow-2xl border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50">
            {/* Floating decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
            
            <h3 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-12 tracking-tight">
              Carrer Stats & Specializations
            </h3>

            {/* Enhanced Career Stats with animations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mb-12">
              <div className="stat-container group">
                <div className="stat-number text-5xl font-extrabold text-neon-cyan leading-tight transition-all duration-300 group-hover:scale-110">10</div>
                <div className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">Research-Level ML & AI Projects</div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="stat-container group">
                <div className="stat-number text-5xl font-extrabold text-neon-purple leading-tight transition-all duration-300 group-hover:scale-110">7+</div>
                <div className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">Full-Stack Systems & Tools Engineered</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-100" />
              </div>
              <div className="stat-container group">
                <div className="stat-number text-5xl font-extrabold text-neon-pink leading-tight transition-all duration-300 group-hover:scale-110">10+</div>
                <div className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">Tech Domains Mastered</div>
                <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-200" />
              </div>
            </div>

            {/* Enhanced Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="specialization-card p-6 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-2xl border border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-neon-cyan floating-icon" />
                  <strong className="text-lg text-foreground">Core Specializations</strong>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  LLMs,Next.js, Prompt Enginnering , C/C++, ML,WebApps, GANs, Python Backend Development
                </p>
              </div>
              <div className="specialization-card p-6 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-2xl border border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-neon-purple floating-icon" />
                  <strong className="text-lg text-foreground">Notable Achievements</strong>
                </div>
                 <p className="text-m text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  SIH 2024 Finalist. India's Largest Hackathon
                </p>
                <p className="text-m text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  GSoC 2025 Contributor Participant and more
                </p>
              </div>
            </div>

            {/* Enhanced Certifications Section */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-neon-cyan floating-icon" />
                <h4 className="text-2xl font-bold text-white">Certifications & Advanced Learning</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Google Data Analytics Professional Certificate', provider: 'Coursera', icon: Database },
                  { name: 'Google NLP with Google Cloud', provider: 'Coursera', icon: Code },
                  { name: 'Linear Algebra for Machine Learning', provider: 'Coursera', icon: TrendingUp },
                  { name: 'Google Machine Learning Specialization', provider: 'Coursera', icon: Zap }
                ].map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <div 
                      key={index} 
                      className="certification-card p-5 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-xl border border-white/10 backdrop-blur-sm group hover:scale-105 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 text-neon-cyan floating-icon" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground mb-1 group-hover:text-neon-cyan transition-colors duration-300">
                            {cert.name}
                          </h5>
                          <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {cert.provider}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Skills Cloud */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="text-xl font-bold text-center mb-8 text-foreground">Technology Expertise Cloud</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Python', 'JavaScript', 'React', 'Node.js', 'FastAPI', 'MongoDB', 
                  'PostgreSQL', 'C++', 'C', 'Next.js', 'Prompt Enginnering', 'TensorFlow',
                  'PyTorch', 'LangChain', 'Gemini', 'Vibe Coding', 'WebSockets',
                   'MySQL', 'Git/GitHub', 'Machine Learning', 'Deep Learning', 'Data Analytics'
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className="skill-tag px-4 py-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-full text-sm font-mono text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 cursor-default border border-white/10 backdrop-blur-sm hover:scale-110 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      fontSize: `${0.75 + Math.random() * 0.25}rem`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
          </div>
        </motion.div>

      </div>

      {/* Enhanced floating action elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-neon-cyan rounded-full animate-ping opacity-30" />
      <div className="absolute bottom-40 left-16 w-3 h-3 bg-neon-purple rounded-full animate-ping opacity-20 delay-1000" />
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-neon-pink rounded-full animate-ping opacity-25 delay-2000" />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-neon-cyan to-transparent rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}