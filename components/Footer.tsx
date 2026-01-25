'use client';

import { Github, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0a0e27] border-t border-gray-200 dark:border-[#2a3f5f]">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-8">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/adriana-marilu-diaz-mendo-5b4238292/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label="LinkedIn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg border border-gray-200 dark:border-[#2a3f5f] group-hover:bg-[#0084ff] transition">
              <Linkedin className="w-5 h-5 text-[#0084ff] group-hover:text-white transition" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Dm-Adriana"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label="GitHub"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg border border-gray-200 dark:border-[#2a3f5f] group-hover:bg-[#0084ff] transition">
              <Github className="w-5 h-5 text-[#0084ff] group-hover:text-white transition" />
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/51904431167"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label="WhatsApp"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] rounded-lg blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white dark:bg-[#1a1f3a] p-3 rounded-lg border border-gray-200 dark:border-[#2a3f5f] group-hover:bg-[#0084ff] transition">
              <FaWhatsapp className="w-5 h-5 text-[#0084ff] group-hover:text-white transition" />
            </div>
          </a>
        </div>

        {/* Footer Grid */}
        <div className="border-t border-gray-200 dark:border-[#2a3f5f] pt-8">

          {/* mantener 3 columnas */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-6">

            {/* SOBRE */}
            <div className="text-center sm:text-left">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2 text-xs sm:text-sm md:text-lg">
                Sobre
              </h3>
              <p className="text-gray-700 dark:text-[#a0a8c0]
                            text-[11px] sm:text-sm md:text-base
                            leading-snug sm:leading-relaxed
                            text-justify">
                  Ingeniera de software apasionada por 
                  crear soluciones de impacto digital.
              </p>
            </div>

            {/* ENLACES - centrado en pantallas grandes */}
            <div className="text-center sm:text-left md:mx-auto">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2 text-xs sm:text-sm md:text-lg">
                Enlaces
              </h3>
              <ul className="space-y-1 text-[11px] sm:text-sm md:text-base">
                <li>
                  <a href="#hero" className="text-gray-700 dark:text-[#a0a8c0] transition-all duration-300 hover:text-white hover:bg-[#0084ff] px-1 py-0.5 rounded">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-700 dark:text-[#a0a8c0] transition-all duration-300 hover:text-white hover:bg-[#0084ff] px-1 py-0.5 rounded">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="text-gray-700 dark:text-[#a0a8c0] transition-all duration-300 hover:text-white hover:bg-[#0084ff] px-1 py-0.5 rounded">
                    Portafolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-700 dark:text-[#a0a8c0] transition-all duration-300 hover:text-white hover:bg-[#0084ff] px-1 py-0.5 rounded">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* SERVICIOS */}
            <div className="text-center sm:text-left">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2 text-xs sm:text-sm md:text-lg">
                Servicios
              </h3>
              <ul className="space-y-1 text-[11px] sm:text-sm md:text-base">
                <li className="text-gray-700 dark:text-[#a0a8c0]">Desarrollo Web</li>
                <li className="text-gray-700 dark:text-[#a0a8c0]">Backend</li>
                <li className="text-gray-700 dark:text-[#a0a8c0]">Análisis de Datos</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-[#2a3f5f] pt-6 text-center">
            <p className="text-gray-500 dark:text-[#4a5a7a] text-xs sm:text-sm">
              © {currentYear} Adriana Diaz Mendo. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 dark:text-[#4a5a7a] text-[10px] sm:text-xs mt-1">
              Diseñado y desarrollado por <span className="text-[#0084ff]">Adriana Diaz Mendo</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
