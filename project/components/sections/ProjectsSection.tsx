'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play, X, ChevronLeft, ChevronRight, Star, Calendar, Users, Eye, Code, Sparkles } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Custom hooks for advanced animations
const useScrollReveal = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return elementRef;
};

const use3DTilt = (intensity = 15) => {
  const elementRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = (elementRef.current as HTMLDivElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return {
    elementRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave
  };
};

const useGSAPScrollAnimations = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);


    const ctx = gsap.context(() => {
      // 3D Scroll Reveal Animation
      gsap.utils.toArray<HTMLElement>('.project-card-3d').forEach((card, index) => {
        gsap.fromTo(card, 
          {
            z: -200,
            opacity: 0,
            rotationX: 45,
            rotationY: -15,
            scale: 0.8,
          },
          {
            z: 0,
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              onEnter: () => {
                gsap.to(card.querySelector('.card-glow'), {
                  opacity: 0.6,
                  scale: 1.05,
                  duration: 0.8,
                  ease: "power2.out"
                });
              }
            }
          }
        );

        // Depth-based parallax effect
        gsap.to(card.querySelector('.project-image-3d'), {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Background layer parallax
        gsap.to(card.querySelector('.bg-layer'), {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // Floating background elements
      gsap.to('.float-element', {
        y: 30,
        rotation: 10,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Dynamic lighting effect
      gsap.to('.light-ray', {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};

// Enhanced project data structure
const projects = [
  {
    id: 1,
    title: 'SwiftMedic',
    description: 'Revolutionary ambulance booking platform with real-time GPS tracking, emergency dispatch automation, and integrated healthcare provider network.',
    longDescription: 'SwiftMedic transforms emergency medical services through an intelligent ambulance booking and tracking ecosystem. The platform leverages real-time GPS tracking, automated dispatch algorithms, and Socket.IO for instant communication between patients, drivers, and medical facilities.',
    technologies: ['Node.js', 'Express', 'Next.js', 'Socket.IO', 'MongoDB', 'Google Maps API'],
    image: '/images/SWIFTMEDIC.png',
    images: [
      '/images/SWIFTMEDIC.png',
      '/images/SWIFTMEDIC2.png',
      '/images/SWIFTMEDIC3.png',
      'https://images.pexels.com/photos/260367/pexels-photo-260367.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    demoUrl: null,
    githubUrl: 'https://github.com/UJJWALTHAKUR28/SwiftMedic',
    featured: true,
    category: 'Healthcare',
    year: '2025',
    team: '1 developer',
    status: 'Completed',
    gradient: 'from-red-500/20 to-pink-500/20',
    accent: 'red'
  },
  {
    id: 2,
    title: 'DeployIQ',
    description: 'Enterprise-grade LLM deployment platform enabling one-click deployment of open-source AI models across multi-cloud environments with auto-scaling.',
    longDescription: 'DeployIQ revolutionizes AI model deployment by providing a unified platform for deploying open-source Large Language Models across diverse infrastructure environments.',
    technologies: ['TypeScript', 'JavaScript', 'Docker', 'AWS', 'GCP', 'Azure'],
    image: '/images/DEPLOYIQMAIN.jpeg',
    images: [
      '/images/DEPLOYIQMAIN.jpeg',
      '/images/DEPLOYIQ2.png',
    ],
    demoUrl: null,
    githubUrl: 'https://github.com/UJJWALTHAKUR28/DeployIQ',
    featured: true,
    category: 'DevOps',
    year: '2025',
    team: '3 developers',
    status: 'Beta',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accent: 'blue'
  },
  {
    id: 3,
    title: 'Healthcare Chatbot',
    description: 'AI-powered medical assistant providing intelligent symptom analysis, preliminary diagnosis, and personalized health recommendations using advanced NLP.',
    longDescription: 'The Swift-Medic Healthcare Chatbot represents a breakthrough in accessible medical AI, leveraging advanced AI to provide sophisticated symptom analysis and health guidance.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'Google Gemini AI'],
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    demoUrl: null,
    githubUrl: 'https://github.com/UJJWALTHAKUR28/SWIFT-MEDIC-HEALTHCARE-CHATBOT',
    featured: false,
    category: 'AI/ML',
    year: '2025',
    team: '1 developer',
    status: 'Completed',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accent: 'green'
  }
  ,
  {
    id: 4,
    title: 'HEALTHRISKPREDICTOR',
    description: 'Advanced machine learning health analytics platform utilizing ensemble models for early detection and risk stratification of cancer and cardiovascular diseases.',
    longDescription: 'HealthRiskPredictor employs cutting-edge machine learning algorithms including Random Forest, Support Vector Machines, and Deep Neural Networks to analyze comprehensive health data for early disease prediction. The platform processes over 50 health indicators including genetic markers, lifestyle factors, medical history, and biometric data to generate personalized risk assessments. Features include interactive risk visualization dashboards, trend analysis over time, personalized prevention recommendations, and integration with wearable devices. The system achieves 90%+ accuracy in risk prediction while providing actionable insights for both patients and healthcare providers, enabling proactive healthcare management and early intervention strategies.',
    technologies: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy'],
    image: '/images/healthrisk.png',
    images: [
      '/images/healthrisk.png',
      '/images/healthrisk3.png',
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    demoUrl: 'https://healthriskpredictor.onrender.com', // No demo available
    githubUrl: 'https://github.com/UJJWALTHAKUR28/HEALTHRISKPREDICTOR',
    featured: false,
    category: 'Healthcare',
    year: '2024',
    team: '1 developer',
    duration: '1 month',
    status: 'Live',
    achievements: [
      { icon: '📊', label: 'High Accuracy' },
      { icon: '⚕️', label: 'Health Prediction' },
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accent: 'green'
  },
  {
    id: 5,
    title: 'Infosys Springboard - Content Management System',
    description: 'Enterprise-scale content management platform with AI-powered content generation, advanced workflow automation, and comprehensive analytics for digital learning ecosystems.',
    longDescription: 'Developed during the Infosys Springboard internship, this sophisticated Content Management System revolutionizes digital learning content creation and management. The platform integrates AI-powered content generation using advanced APIs, enabling automated creation of educational materials, assessments, and multimedia content. Features include intelligent content categorization, version control with branching, collaborative editing workflows, advanced user role management, and comprehensive analytics dashboards. The system supports multi-format content delivery, responsive design adaptation, and seamless integration with learning management systems, making it ideal for educational institutions and corporate training programs.',
    technologies: ['Next.js', 'Python', 'AI IMAGE GENERATION APIs', 'MongoDB', 'JWT'],
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    demoUrl: null, // No demo available
    githubUrl: 'https://github.com/UJJWALTHAKUR28/Infosys-Springboard---Content-Management-System',
    featured: false,
    category: 'Web Development',
    year: '2024',
    team: '1 developer',
    duration: '1.5 months',
    status: 'Completed',
    achievements: [
      { icon: '📝', label: 'Content Management' },
      { icon: '🔐', label: 'Role-Based Access' },
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accent: 'green'
  },
  {
    id: 6,
    title: 'BlogSphere',
    description: 'Feature-rich blogging ecosystem with advanced content editing, social engagement tools, SEO optimization, and comprehensive analytics for content creators.',
    longDescription: 'BlogSphere is a comprehensive blogging platform designed for modern content creators, featuring a sophisticated rich text editor with real-time collaboration capabilities, advanced SEO optimization tools, and integrated social media sharing. The platform includes intelligent content categorization, automated tag suggestions, comment moderation with spam detection, and detailed analytics including reader engagement metrics, traffic sources, and content performance insights. Built with scalability in mind, it supports multi-author blogs, content scheduling, newsletter integration, and monetization features including subscription tiers and advertising management. The responsive design ensures optimal reading experiences across all devices.',
    technologies: ['FLASK', 'HTML', 'CSS', 'BCRYPT', 'JWT', 'SQLAlchemy'],
    image: 'https://images.pexels.com/photos/1181362/pexels-photo-1181362.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://images.pexels.com/photos/1181362/pexels-photo-1181362.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    demoUrl: null, // No demo available
    githubUrl: 'https://github.com/UJJWALTHAKUR28/BlogSphere',
    featured: false,
    category: 'Web Development',
    year: '2024',
    team: '1 developer',
    duration: '1 month',
    status: 'Completed',
    achievements: [
      { icon: '📝', label: 'Rich Text Editing' },
      { icon: '👥', label: 'User Authentication' },
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accent: 'green',
  },
];

// 3D Project Card Component
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  demoUrl: string | null;
  githubUrl: string;
  featured: boolean;
  category: string;
  year: string;
  team: string;
  status: string;
  gradient: string;
  accent: string;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard3D = ({ project, index, onViewDetails }: ProjectCard3DProps) => {
  const { elementRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt(12);
  const revealRef = useScrollReveal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={elementRef}
      className="project-card-3d relative group cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Ambient Occlusion Shadow */}
      <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-xl transform translate-y-8 scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Card Glow Effect */}
      <div className={`card-glow absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-3xl blur-md opacity-0 transition-all duration-500`} />
      
      <motion.div
        ref={revealRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-700/70"
      >
        {/* Background Layer for Parallax */}
        <div className="bg-layer absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/50" />
        
        {/* Project Image with 3D Effect */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="project-image-3d w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.1) translateZ(20px)' : 'scale(1) translateZ(0px)'
            }}
          />
          
          {/* Dynamic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Floating Status Indicators */}
          <motion.div
            className="absolute top-4 left-4 flex gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {project.featured && (
              <motion.span
                className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Star size={12} className="animate-pulse" />
                Featured
              </motion.span>
            )}
            <motion.span
              className={`px-3 py-1 bg-${project.accent}-500/20 text-${project.accent}-400 border border-${project.accent}-500/30 rounded-full text-xs font-semibold backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
            >
              {project.status}
            </motion.span>
          </motion.div>

          {/* Interactive Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.button
              onClick={() => onViewDetails(project)}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold flex items-center gap-2 transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.1, rotateZ: 2 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: 'translateZ(30px)' }}
            >
              <Eye size={16} />
              View Project
            </motion.button>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6 relative" style={{ transform: 'translateZ(10px)' }}>
          <div className="flex items-start justify-between mb-4">
            <motion.h3
              className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
              style={{ transform: 'translateZ(5px)' }}
            >
              {project.title}
            </motion.h3>
            <span className="text-xs text-gray-400 font-mono">{project.category}</span>
          </div>

          <motion.p
            className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3"
            style={{ transform: 'translateZ(3px)' }}
          >
            {project.description}
          </motion.p>

          {/* Technology Stack */}
          <div className="flex flex-wrap gap-1 mb-4" style={{ transform: 'translateZ(2px)' }}>
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-gray-800/80 text-gray-300 rounded-md text-xs font-mono border border-gray-700/50"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                transition={{ delay: techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-md text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons with Morphing Effects */}
          <div className="flex gap-2" style={{ transform: 'translateZ(5px)' }}>
            <motion.button
              onClick={() => onViewDetails(project)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={14} />
              Details
            </motion.button>
            
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800/80 text-gray-300 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={14} />
            </motion.a>
          </div>

          {/* Floating Metadata */}
          <motion.div
            className="flex items-center justify-between mt-4 text-xs text-gray-400"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar size={10} />
                {project.year}
              </span>
              <span className="flex items-center gap-1">
                <Users size={10} />
                {project.team}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Modal Component
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  currentImageIndex: number;
  setCurrentImageIndex: (value: number | ((prev: number) => number)) => void;
}

const ProjectModal = ({ project, isOpen, onClose, currentImageIndex, setCurrentImageIndex }: ProjectModalProps) => {
  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev: number) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev: number) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Enhanced Modal Header */}
            <div className="relative">
              <div className="relative h-72 overflow-hidden rounded-t-3xl">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Enhanced Image Navigation */}
                {project.images.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </motion.button>
                    <motion.button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={20} className="text-white" />
                    </motion.button>
                  </>
                )}
              </div>
              
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>

            {/* Enhanced Modal Content */}
            <div className="p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-start justify-between mb-6"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    {project.title}
                    {project.featured && <Sparkles size={24} className="text-yellow-400 animate-pulse" />}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {project.team}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-md">{project.category}</span>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 leading-relaxed mb-8 text-lg"
              >
                {project.longDescription}
              </motion.p>

              {/* Enhanced Technology Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code size={18} />
                  Technologies Used
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-2 bg-gray-800/80 border border-gray-700/50 rounded-lg text-sm font-mono text-gray-300 hover:bg-gray-700/80 transition-all duration-300 text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.05, borderColor: '#3B82F6' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(6, 182, 212, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 text-gray-300 border border-gray-700/50 rounded-full font-semibold hover:bg-gray-700/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, borderColor: '#6B7280' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  View Source
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Portfolio Component
export default function Advanced3DPortfolio() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initialize GSAP animations
  useGSAPScrollAnimations(containerRef);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen py-20 px-4  overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="float-element absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="float-element absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full blur-2xl" />
        <div className="float-element absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl" />
      </div>

      {/* Dynamic Light Rays */}
      <div className="light-ray absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent transform -translate-x-1/2" />
      <div className="light-ray absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-400/20 via-transparent to-transparent" />

      {/* Header Section */}
      <div className="container mx-auto max-w-7xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Immersive showcase of cutting-edge web applications and innovative solutions that push the boundaries of modern development.
          </motion.p>
        </motion.div>
      </div>

      {/* 3D Project Grid */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.25, 0.4, 0.25, 1]
              }}
            >
              <ProjectCard3D
                project={project}
                index={index}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Elements */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronRight size={24} className="text-white transform -rotate-90" />
        </motion.button>
      </motion.div>

      {/* Enhanced Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      {/* Performance Optimization Styles */}
      <style jsx>{`
        .project-card-3d {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        .animate-in {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100px, 0) rotateX(15deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .project-card-3d,
          .float-element,
          .light-ray {
            animation: none !important;
            transition: none !important;
          }
        }
        
        /* Enhanced hover states */
        .project-card-3d:hover .project-image-3d {
          transform: scale(1.05) translateZ(10px);
        }
        
        .project-card-3d:hover .card-glow {
          opacity: 0.8;
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}