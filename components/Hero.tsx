'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, MessageCircle, Mail, Briefcase } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import Image from 'next/image';

const roles = ['Desarrollador Web', 'Analista de Datos', 'Backend Developer'];

export function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [trailPoints, setTrailPoints] = useState<Array<{x: number; y: number; id: number}>>([]);
  const [isOverButton, setIsOverButton] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const globalX = e.clientX;
      const globalY = e.clientY;
      
      setMouseX(globalX);
      setMouseY(globalY);

      // Detectar si el cursor está sobre un botón o enlace (incluye redes sociales)
      const target = e.target as HTMLElement;
      const isButton = target.closest('button') || target.closest('a');
      setIsOverButton(!!isButton);

      // Agregar punto al historial cada pocos píxeles
      setTrailPoints(prev => {
        const newPoints = [...prev];
        const lastPoint = newPoints[newPoints.length - 1];
        
        // Solo agregar si está lejos del último punto
        if (!lastPoint || Math.hypot(globalX - lastPoint.x, globalY - lastPoint.y) > 10) {
          newPoints.push({
            x: globalX,
            y: globalY,
            id: Date.now() + Math.random()
          });
        }
        
        // Mantener solo los últimos 20 puntos
        return newPoints.slice(-20);
      });
    };

    const handleGlobalMouseEnter = () => {
      setIsHovering(true);
    };

    const handleGlobalMouseLeave = () => {
      setIsHovering(false);
      setTrailPoints([]);
      setIsOverButton(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseenter', handleGlobalMouseEnter);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseenter', handleGlobalMouseEnter);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const delay = 3000;

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentRole.substring(0, displayedText.length - 1)
            : currentRole.substring(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, roleIndex, isDeleting]);

  return (
    <section className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-12 md:py-20 pt-24 md:pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Hola,
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text text-transparent mb-8">
              Soy Adriana Diaz Mendo
            </h2>
          </div>

          {/* Typing Animation */}
          <div className="space-y-2">
            <p className="text-lg lg:text-xl text-gray-600 dark:text-[#a0a8c0] font-medium min-h-8">
              {displayedText}
              <span className="inline-block w-0.5 h-6 ml-1 bg-[#0084ff] animate-pulse" />
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 pt-4">
            <a
              href="https://www.linkedin.com/in/adriana-marilu-diaz-mendo-5b4238292/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="LinkedIn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg group-hover:bg-[#0084ff] transition duration-300 border border-gray-200 dark:border-[#2a3f5f] group-hover:border-[#0084ff]">
                <Linkedin className="w-5 h-5 text-[#0084ff] group-hover:text-white transition duration-300" />
              </div>
            </a>
            <a
              href="https://github.com/Dm-Adriana"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="GitHub"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg group-hover:bg-[#0084ff] transition duration-300 border border-gray-200 dark:border-[#2a3f5f] group-hover:border-[#0084ff]">
                <Github className="w-5 h-5 text-[#0084ff] group-hover:text-white transition duration-300" />
              </div>
            </a>
            <a
              href="https://wa.me/51904431167"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="WhatsApp"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg group-hover:bg-[#0084ff] transition duration-300 border border-gray-200 dark:border-[#2a3f5f] group-hover:border-[#25D366]">
                <FaWhatsapp className="w-5 h-5 text-[#0084ff] group-hover:text-white transition duration-300" />
              </div>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contact"
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] hover:from-[#0066cc] hover:to-[#00b8ff] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#0084ff]/50"
            >
              <Mail className="w-5 h-5" />
              Contáctame
            </a>
            <a
              href="#portfolio"
              className="group relative flex items-center justify-center gap-2 border border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Briefcase className="w-5 h-5" />
              Ver Proyectos
            </a>
          </div>
        </div>

        {/* Right Column - Image with Glow */}
        <div className="flex items-center justify-center">
          <div 
            className="relative group w-96 h-96"
          >
            {/* Worm Light Trail Effect */}
            {isHovering && trailPoints.map((point, index) => {
              const opacity = (index + 1) / trailPoints.length * 0.7;
              const trailSize = isOverButton ? 60 : 120;
              return (
                <div
                  key={point.id}
                  className="fixed rounded-full pointer-events-none"
                  style={{
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    width: `${trailSize}px`,
                    height: `${trailSize}px`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, 
                      rgba(0, 212, 255, ${opacity * 0.5}) 0%,
                      rgba(0, 132, 255, ${opacity * 0.25}) 35%,
                      rgba(0, 212, 255, ${opacity * 0.08}) 65%,
                      transparent 100%)`,
                    zIndex: 5,
                    filter: 'blur(12px)',
                    transition: 'width 150ms ease, height 150ms ease'
                  }}
                />
              );
            })}

            {/* Current Cursor Light */}
            {isHovering && (
              <div 
                className="fixed rounded-full transition-opacity duration-100 pointer-events-none"
                style={{
                  left: `${mouseX}px`,
                  top: `${mouseY}px`,
                  width: `${isOverButton ? 90 : 180}px`,
                  height: `${isOverButton ? 90 : 180}px`,
                  transform: 'translate(-50%, -50%)',
                  background: `radial-gradient(circle, 
                    rgba(0, 212, 255, 0.7) 0%,
                    rgba(0, 132, 255, 0.35) 30%,
                    rgba(0, 212, 255, 0.12) 55%,
                    transparent 100%)`,
                  zIndex: 6,
                  filter: 'blur(18px)',
                  transition: 'width 150ms ease, height 150ms ease'
                }}
              />
            )}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition duration-500 scale-110" />
            
            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] via-[#00d4ff] to-[#0084ff] rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition duration-500" />
                <div className="relative bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-1 rounded-2xl overflow-hidden shadow-2xl">
                  <div 
                    className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden"
                  >
                    <Image
                      src="/adriana.png"
                      alt="Adriana Diaz Mendo - Desarrollador Web"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
