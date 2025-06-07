'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, Target, Zap, Users, Code, Globe } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  {
    icon: Trophy,
    title: 'SIH 2024 Grand Finalist',
    description: 'Selected among the top innovators nationwide at Smart India Hackathon 2024 for impactful real-world problem solving.',
    year: '2024',
    category: 'Recognition',
    color: 'from-yellow-400 to-orange-500',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Award,
    title: 'CCET IPD Expo 2024 Winner',
    description: 'Won first place for presenting a cutting-edge innovation at the Institute Project Display Expo.',
    year: '2024',
    category: 'Innovation',
    color: 'from-green-400 to-emerald-500',
    iconColor: 'text-green-400',
  },
  {
    icon: Star,
    title: 'Ideation 2nd Runner-Up',
    description: 'Secured third position in CCET Ideation Challenge for proposing a scalable tech solution with high societal impact.',
    year: '2024',
    category: 'Pitching',
    color: 'from-blue-400 to-cyan-500',
    iconColor: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'FOSS Hackathon Participant',
    description: 'Actively contributed to real-world open-source projects at GRTA FOSS Hackathon, collaborating with global developers.',
    year: '2023',
    category: 'Open Source',
    color: 'from-purple-400 to-pink-500',
    iconColor: 'text-purple-400',
  },
  {
    icon: Zap,
    title: 'Innovation Leader',
    description: 'Led multiple hackathon teams, fostering rapid prototyping and cutting-edge technical execution.',
    year: '2022–2024',
    category: 'Leadership',
    color: 'from-red-400 to-rose-500',
    iconColor: 'text-red-400',
  },
  {
    icon: Users,
    title: 'Technical Head – CCET ACM',
    description: 'As Technical Head of the ACM Student Chapter, spearheaded numerous tech initiatives and mentorship programs.',
    year: '2023–2024',
    category: 'Community',
    color: 'from-indigo-400 to-blue-500',
    iconColor: 'text-indigo-400',
  },
];

const stats = [
  { number: 50, suffix: '+', label: 'Projects Completed', duration: 2 },
  { number: 1000000, suffix: '+', label: 'Users Impacted', duration: 2.5 },
  { number: 98, suffix: '%', label: 'Client Satisfaction', duration: 2.2 },
  { number: 5, suffix: '+', label: 'Years Experience', duration: 1.8 },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      const statsElements = gsap.utils.toArray('.stat-number');
      
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 70%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to({ value: 0 }, {
              value: stat.number,
              duration: stat.duration,
              ease: 'power2.out',
              onUpdate: function() {
                const currentValue = Math.floor(this.targets()[0].value);
                setAnimatedStats(prev => {
                  const newStats = [...prev];
                  newStats[index] = currentValue;
                  return newStats;
                });
              }
            });
          });
        }
      });

      // Achievement cards stagger animation
      gsap.fromTo('.achievement-card',
        { 
          y: 100, 
          opacity: 0,
          rotationX: 45,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 1.5,
            grid: [2, 4],
            from: 'center'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Floating animation for achievement icons
      gsap.to('.achievement-icon', {
        y: '10px',
        rotation: 5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Background elements animation
      gsap.to('.achievement-bg-1', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('.achievement-bg-2', {
        rotation: -360,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      // Parallax effect for background elements
      gsap.to('.achievement-parallax', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number, suffix: string) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M' + suffix;
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K' + suffix;
    }
    return num.toLocaleString() + suffix;
  };

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="achievement-bg-1 achievement-parallax absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl" />
        <div className="achievement-bg-2 achievement-parallax absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-2xl" />
        <div className="achievement-parallax absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 reveal-up"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <AnimatedText 
              key="Achievements"
              text="Achievements"
              className="gradient-text"
              delay={0.2}
            />
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognition that showcase my commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div ref={achievementsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="achievement-card glass rounded-2xl p-6 group hover:glass-strong transition-all duration-500 relative overflow-hidden"
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.02
              }}
              style={{ perspective: '1000px' }}
            >
              {/* Achievement Icon */}
              <div className="achievement-icon mb-6 flex justify-center">
                <div className={`p-4 rounded-full bg-gradient-to-r ${achievement.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm`}>
                  <achievement.icon 
                    size={32} 
                    className={`${achievement.iconColor} group-hover:scale-110 transition-transform duration-300`} 
                  />
                </div>
              </div>

              {/* Achievement Content */}
              <div className="text-center">
                <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                  {achievement.category} • {achievement.year}
                </div>
                <h3 className="text-lg font-display font-semibold mb-3 text-foreground group-hover:text-neon-cyan transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
              
              {/* Subtle glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 reveal-up"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to achieve great things together?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full font-semibold text-black hover:shadow-lg transition-all duration-300"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}