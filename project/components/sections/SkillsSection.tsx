'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// GSAP would normally be imported, but for this demo we'll simulate the animations
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 88, icon: '▲' },
      { name: 'GSAP', level: 92, icon: '🎭' },
      { name: 'Tailwind CSS', level: 90, icon: '🎨' },
      { name: 'HTML5', level: 95, icon: '📄' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 87, icon: '🟢' },
      { name: 'Python', level: 82, icon: '🐍' },
      { name: 'Express', level: 85, icon: '🚀' },
      { name: 'PostgreSQL', level: 88, icon: '🐘' },
      { name: 'MongoDB', level: 83, icon: '🍃' },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      { name: 'PyTorch', level: 86, icon: '🔥' },
      { name: 'Google Colab', level: 84, icon: '📊' },
      { name: 'Git', level: 95, icon: '📚' },
      { name: 'Figma', level: 88, icon: '🎨' },
      { name: 'Vibe Coding', level: 100, icon: '✨' },
    ],
  },
];

const FloatingParticle = ({ delay = 0, size = 20, color = 'bg-cyan-400' }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-sm opacity-20 ${color}`}
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillBarProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

const SkillBar = ({ skill, index, isVisible }: SkillBarProps) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = skill.level / 50;
        const counter = setInterval(() => {
          current += increment;
          if (current >= skill.level) {
            setDisplayLevel(skill.level);
            clearInterval(counter);
          } else {
            setDisplayLevel(Math.floor(current));
          }
        }, 30);
      }, index * 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <motion.div
      className="skill-item group"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xl"
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {skill.icon}
          </motion.span>
          <span className="font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
            {skill.name}
          </span>
        </div>
        <motion.span
          className="text-sm text-gray-400 font-mono bg-gray-800 px-2 py-1 rounded"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {displayLevel}%
        </motion.span>
      </div>
      
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${displayLevel}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
        </motion.div>
        
        <motion.div
          className="absolute top-0 right-0 w-2 h-full bg-white rounded-full opacity-80"
          initial={{ x: 0 }}
          animate={{ x: isVisible ? `${-100 + displayLevel}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
        />
      </div>

      {/* Hover tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm pointer-events-none border border-gray-700"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </motion.div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  category: { title: string; icon: string; skills: Skill[] };
  index: number;
  isVisible: boolean;
}

const SkillCategory = ({ category, index, isVisible }: SkillCategoryProps) => {
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setSkillsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <motion.div
      className="skill-category relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <motion.div
        className="glass rounded-2xl p-8 border border-gray-800 backdrop-blur-sm relative overflow-hidden group"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ padding: '2px' }}>
          <div className="w-full h-full bg-gray-900 rounded-2xl" />
        </div>
        
        {/* Glowing orb effect */}
        <motion.div
          className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10">
          <motion.div
            className="text-center mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-4xl mb-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {category.icon}
            </motion.div>
            <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {category.title}
            </h3>
          </motion.div>
          
          <div className="space-y-6 relative">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={skillIndex}
                isVisible={skillsVisible}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function EnhancedSkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden"
      
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            size={Math.random() * 30 + 10}
            color={['bg-cyan-400', 'bg-purple-400', 'bg-pink-400'][i % 3]}
          />
        ))}
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/30" />
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-15">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Skills & Expertise
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A comprehensive overview of my technical capabilities and proficiency levels.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional decorative elements */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-sm font-mono">Continuously Learning & Growing</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}