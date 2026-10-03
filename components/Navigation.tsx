'use client';

import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Logo } from '@/components/Logo';
import { useLanguage, type Lang } from '@/lib/i18n';

function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const options: Lang[] = ['es', 'en'];

  return (
    <div
      role="group"
      aria-label={t.nav.toggleLang}
      className="flex items-center p-0.5 rounded-lg bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none"
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-colors ${
            lang === option
              ? 'bg-gradient-to-r from-[#0084ff] to-[#00b4f0] text-white shadow-sm'
              : 'text-gray-500 dark:text-[#a0a8c0] hover:text-[#0066cc] dark:hover:text-white'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none hover:bg-gray-50 dark:hover:bg-[#2a3f5f] transition-colors"
      aria-label={t.nav.toggleTheme}
    >
      <Sun className="w-5 h-5 text-amber-500 dark:hidden" />
      <Moon className="w-5 h-5 text-yellow-300 hidden dark:block" />
    </button>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: '#hero', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0e27]/90 backdrop-blur-md border-b border-gray-200/80 dark:border-[#2a3f5f]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" aria-label="Adriana Diaz - Inicio">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-[#a0a8c0] hover:text-[#0066cc] dark:hover:text-[#00d4ff] transition-colors font-medium text-sm"
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <a
            href="#contact"
            className="bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#0084ff]/40 transition-all"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#0066cc] dark:text-[#00d4ff] hover:text-[#0084ff] dark:hover:text-white transition-colors"
            aria-label={t.nav.toggleMenu}
            aria-expanded={isOpen}
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
              className="block text-gray-600 dark:text-[#a0a8c0] hover:text-[#0066cc] dark:hover:text-[#00d4ff] transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="block w-full bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] text-white px-6 py-2 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
