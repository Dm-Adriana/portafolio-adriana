'use client';

import { Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0a0e27] border-t border-gray-200 dark:border-[#2a3f5f]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Social Links */}
        <div className="flex justify-center items-center gap-8 mb-8">
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

        {/* Footer Content */}
        <div className="border-t border-gray-200 dark:border-[#2a3f5f] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Sobre</h3>
              <p className="text-gray-700 dark:text-[#a0a8c0] text-sm leading-relaxed">
                Desarrolladora web apasionada por crear soluciones innovadoras y de alto impacto en el mundo digital.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#hero" className="text-gray-700 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-700 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors">
                    Sobre Mí
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="text-gray-700 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors">
                    Portafolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-700 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-3">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-700 dark:text-[#a0a8c0]">
                    Desarrollo Web
                  </span>
                </li>
                <li>
                  <span className="text-gray-700 dark:text-[#a0a8c0]">
                    Backend Development
                  </span>
                </li>
                <li>
                  <span className="text-gray-700 dark:text-[#a0a8c0]">
                    Análisis de Datos
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-[#2a3f5f] pt-8 text-center">
            <p className="text-gray-500 dark:text-[#4a5a7a] text-sm">
              © {currentYear} Adriana Diaz Mendo. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 dark:text-[#4a5a7a] text-xs mt-2">
              Diseñado y desarrollado por <span className="text-[#0084ff]">Adriana Diaz Mendo</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
