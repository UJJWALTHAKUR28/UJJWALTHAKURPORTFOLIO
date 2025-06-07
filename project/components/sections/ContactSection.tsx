'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/UJJWALTHAKUR28', label: 'GitHub', color: 'from-purple-500 to-pink-500' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ujwal-thakur-97b5a7349', label: 'LinkedIn', color: 'from-blue-500 to-cyan-500' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'ujjwalthakur.008reena@gmail.com', href: 'mailto:ujjwalthakur.008reena@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Ujwal Thakur', href: 'https://www.linkedin.com/in/ujwal-thakur-97b5a7349' },
  { icon: Github, label: 'GitHub', value: '@UJJWALTHAKUR28', href: 'https://github.com/UJJWALTHAKUR28' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles animation
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-800 rounded-full opacity-20';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particlesRef.current.appendChild(particle);
        
        // Animate particle
        const animateParticle = () => {
          particle.animate([
            { transform: 'translateY(0px) scale(0.5)', opacity: 0 },
            { transform: 'translateY(-100px) scale(1)', opacity: 0.6 },
            { transform: 'translateY(-200px) scale(0.5)', opacity: 0 }
          ], {
            duration: 4000 + Math.random() * 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
          });
        };
        
        setTimeout(animateParticle, Math.random() * 2000);
      }
    };

    createParticles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.h2 
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Let's Connect
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Ready to collaborate and create something extraordinary? Let's turn your vision into reality.
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={itemVariants}
                whileHover="hover"
                className="group relative block"
              >
                <motion.div 
                  className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500"
                  variants={cardHoverVariants}
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon size={32} className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{item.value}</p>
                  </div>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h3 
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Follow Me
            </motion.h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="group relative"
                  whileHover={{ scale: 1.2, y: -10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className={`relative p-6 bg-gradient-to-r ${social.color} rounded-2xl shadow-2xl`}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(139, 92, 246, 0.5)',
                        '0 0 40px rgba(139, 92, 246, 0.8)',
                        '0 0 20px rgba(139, 92, 246, 0.5)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5
                    }}
                  >
                    <social.icon size={28} className="text-white relative z-10" />
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="relative p-8 bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Whether you have a groundbreaking idea, need expert consultation, or want to discuss the latest 
                  in technology and innovation, I'm always excited to connect with fellow creators and visionaries.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated corner decorations */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-cyan-400/30"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-purple-400/30"
        animate={{ rotate: [0, -90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
}