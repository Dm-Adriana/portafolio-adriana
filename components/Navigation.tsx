'use client';

import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: '#hero', label: 'Inicio' },
    { href: '#about', label: 'Sobre Mí' },
    { href: '#portfolio', label: 'Portafolio' },
    { href: '#contact', label: 'Contacto' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f8ff] dark:bg-[#0a0e27]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#2a3f5f]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
<div className="flex items-center gap-2">
  <img
    src="/icon.png"
    alt="Logo Adriana Diaz"
    className="h-10 w-auto object-contain"
  />
</div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="group relative p-2 rounded-lg bg-gray-100 dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] hover:bg-gray-200 dark:hover:bg-[#2a3f5f] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-400 dark:hidden" />
            <Moon className="w-5 h-5 text-gray-400 dark:text-yellow-300 hidden dark:block" />
          </button>

          <a
            href="#contact"
            className="bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all"
          >
            Contáctame
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] hover:bg-gray-200 dark:hover:bg-[#2a3f5f] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-400 dark:hidden" />
            <Moon className="w-5 h-5 text-gray-400 dark:text-yellow-300 hidden dark:block" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#00d4ff] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a1f3a] border-b border-gray-200 dark:border-[#2a3f5f] px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block text-gray-600 dark:text-[#a0a8c0] hover:text-[#0084ff] dark:hover:text-[#00d4ff] transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="block w-full bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white px-6 py-2 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all"
          >
            Contáctame
          </a>
        </div>
      )}
    </nav>
  );
}
