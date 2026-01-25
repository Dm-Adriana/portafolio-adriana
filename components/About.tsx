'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';

export function About() {
  const [clipRotation, setClipRotation] = useState(0);
  const [photoY, setPhotoY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotate((prev) => {
        const next = prev + 1.5;
        return next > 15 ? -15 : next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    setClipRotation(x);
  };

  const handleMouseLeave = () => {
    setClipRotation(0);
    setPhotoY(0);
  };

  return (
    <section className="min-h-screen bg-[#f8f6ff] dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Sobre <span className="bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text text-transparent">Mí</span>
        </h2>

        <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Photo Section with ID Card Animation */}
            <div
              className="flex items-center justify-center cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setPhotoY(photoY === 0 ? 20 : 0)}
            >
              <div className="relative w-full max-w-sm">
                {/* Clip/Clothespin */}
                <div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 transition-transform duration-300"
                  style={{
                    transform: `translateX(-50%) rotateZ(${clipRotation !== 0 ? clipRotation : autoRotate}deg)`,
                  }}
                >
                  <div className="w-16 h-8 bg-gradient-to-b from-[#4a5a7a] to-[#2a3f5f] rounded-full shadow-lg relative">
                    <div className="absolute inset-1 bg-gradient-to-b from-[#5a6a8a] to-[#3a4f5f] rounded-full" />
                  </div>
                </div>

                {/* ID Card */}
                <div
                  className="transition-transform duration-500 ease-out transform-gpu"
                  style={{
                    transform: `translateY(${photoY}px)`,
                  }}
                >
                  <div className="bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-1 rounded-lg shadow-2xl">
                    <div className="bg-white dark:bg-[#0a0e27] p-6 rounded-lg">
                      <div className="w-full h-64 bg-gray-200 dark:bg-[#1a1f3a] rounded-md flex items-center justify-center text-white text-center overflow-hidden relative">
                        <Image
                          src="/foto-perfil.png"
                          alt="Adriana Marilu Diaz Mendo - Credencial"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4 space-y-2 text-gray-900 dark:text-white text-sm">
                        <p className="font-semibold">Adriana Marilu Diaz Mendo</p>
                        <p className="text-gray-600 dark:text-[#a0a8c0] text-xs tracking-wide">Ingeniera de Software con Inteligencia Artificial</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-gray-700 dark:text-[#a0a8c0] leading-relaxed text-base lg:text-lg mb-6 text-justify">
                  Ingeniera de Software especializada en Inteligencia Artificial, 
                  con 3 años de experiencia en el desarrollo de aplicaciones web, 
                  móviles y de escritorio. Diseño soluciones inteligentes, escalables 
                  y centradas en el usuario, integrando IA, cloud e interfaces interactivas 
                  para optimizar procesos y generar valor real para los negocios.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-1 rounded-lg">
                  <div className="bg-white dark:bg-[#1a1f3a] p-4 rounded-md text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text">
                      2+
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-[#a0a8c0] mt-1">
                      Años Exp.
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-1 rounded-lg">
                  <div className="bg-white dark:bg-[#1a1f3a] p-4 rounded-md text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text">
                      3+
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-[#a0a8c0] mt-1">
                      Proyectos
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-1 rounded-lg">
                  <div className="bg-white dark:bg-[#1a1f3a] p-4 rounded-md text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text">
                      3+
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-[#a0a8c0] mt-1">
                      Clientes
                    </div>
                  </div>
                </div>
              </div>

              {/* Download CV Button */}
              <button 
                onClick={() => window.open('https://drive.google.com/file/d/19iTkld6PH0-18LrEVclaqX5XIMKMg98o/view?usp=sharing', '_blank')}
                className="group relative w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] hover:from-[#0066cc] hover:to-[#00b8ff] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#0084ff]/50"
              >
                <Download className="w-5 h-5" />
                Descargar CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
