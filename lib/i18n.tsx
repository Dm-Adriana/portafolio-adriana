'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'es' | 'en';

/** Texto disponible en ambos idiomas */
export type Localized = Record<Lang, string>;

const STORAGE_KEY = 'portfolio-lang';

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      portfolio: 'Portafolio',
      contact: 'Contacto',
      cta: 'Contáctame',
      toggleTheme: 'Cambiar tema',
      toggleMenu: 'Abrir menú',
      toggleLang: 'Cambiar idioma',
    },
    hero: {
      greeting: 'Hola,',
      name: 'Soy Adriana Diaz Mendo',
      roles: ['Desarrolladora Web', 'Analista de Datos', 'Backend Developer'],
      contact: 'Contáctame',
      projects: 'Ver Proyectos',
      photoAlt: 'Adriana Diaz Mendo - Desarrolladora Web',
      chipAI: 'IA & Visión Computacional',
      chipStack: 'Full Stack',
      chipCloud: 'Cloud · ERP Ellucian',
    },
    about: {
      titleA: 'Sobre',
      titleB: 'Mí',
      bio: 'Ingeniera de Software con Inteligencia Artificial, especializada en desarrollo Full Stack, arquitecturas Cloud y migraciones complejas de datos. Como referente técnica (SME) en integraciones ERP y desarrollo de APIs, diseño soluciones end-to-end, desde la base de datos hasta la interfaz de usuario. Me oriento a optimizar procesos y a garantizar la integridad de los datos a gran escala.',
      cardTitle: 'Ingeniera de Software con IA',
      cardLabel: 'Credencial profesional',
      specialty: 'Especialidad',
      specialtyValue: 'IA & Full Stack',
      location: 'Ubicación',
      available: 'Disponible para proyectos',
      years: 'Años Exp.',
      projects: 'Proyectos',
      clients: 'Organizaciones',
      cv: 'Descargar CV',
      photoAlt: 'Adriana Marilu Diaz Mendo - Credencial',
    },
    portfolio: {
      titleA: 'Mi',
      titleB: 'Portafolio',
      tabProjects: 'Proyectos Destacados',
      tabAchievements: 'Logros',
      tabCertificates: 'Certificados',
      impact: 'Impacto',
      technologies: 'Tecnologías',
      viewProject: 'Ver Proyecto',
      offline: 'Plataforma fuera de línea',
      offlineNote: 'El sitio del cliente ya no está activo. Las capturas muestran el trabajo realizado.',
      prevImage: 'Imagen anterior',
      nextImage: 'Siguiente imagen',
      goToImage: 'Ir a imagen',
      image: 'Imagen',
      certificate: 'Certificado',
      issuer: 'Emisor',
      viewCertificate: 'Ver Certificado',
      allCertificatesTitle: '¿Quieres ver más?',
      allCertificatesText: 'Tengo más de 30 certificados y constancias de Cisco, Oracle, Red Hat, Fundación Telefónica, Pronabec y más.',
      allCertificates: 'Ver todos mis certificados',
    },
    contact: {
      title: 'Contáctame',
      intro: 'Estoy abierta a proyectos freelance, colaboraciones tecnológicas y desafíos innovadores. Si tienes una idea o proyecto en mente, conversemos.',
      name: 'Nombre Completo',
      namePlaceholder: 'Tu nombre',
      email: 'Correo Electrónico',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre tu proyecto o consulta...',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      sent: '✓ Enviado',
      thanks: 'Gracias por tu mensaje. Te responderé pronto.',
      errName: 'El nombre debe tener entre 2 y 100 caracteres y solo contener letras.',
      errEmail: 'Por favor, ingresa un email válido.',
      errMessage: 'El mensaje debe tener entre 5 y 1000 caracteres.',
      waIntro: 'Hola, mi nombre es',
      waEmail: 'Mi correo es:',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      locationLabel: 'Ubicación',
    },
    footer: {
      about: 'Sobre',
      aboutText: 'Ingeniera de software apasionada por crear soluciones de impacto digital.',
      links: 'Enlaces',
      services: 'Servicios',
      services1: 'Desarrollo Web',
      services2: 'Backend',
      services3: 'Análisis de Datos',
      rights: 'Todos los derechos reservados.',
      madeBy: 'Diseñado y desarrollado por',
    },
    scrollTop: 'Volver arriba',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
      cta: 'Contact me',
      toggleTheme: 'Toggle theme',
      toggleMenu: 'Open menu',
      toggleLang: 'Change language',
    },
    hero: {
      greeting: 'Hi,',
      name: "I'm Adriana Diaz Mendo",
      roles: ['Web Developer', 'Data Analyst', 'Backend Developer'],
      contact: 'Contact me',
      projects: 'View Projects',
      photoAlt: 'Adriana Diaz Mendo - Web Developer',
      chipAI: 'AI & Computer Vision',
      chipStack: 'Full Stack',
      chipCloud: 'Cloud · Ellucian ERP',
    },
    about: {
      titleA: 'About',
      titleB: 'Me',
      bio: 'Software Engineer with Artificial Intelligence, specialized in Full Stack development, Cloud architectures and complex data migrations. As a technical subject matter expert (SME) in ERP integrations and API development, I design end-to-end solutions, from the database to the user interface. I focus on optimizing processes and ensuring data integrity at scale.',
      cardTitle: 'Software Engineer with AI',
      cardLabel: 'Professional ID',
      specialty: 'Specialty',
      specialtyValue: 'AI & Full Stack',
      location: 'Location',
      available: 'Open to new projects',
      years: 'Years Exp.',
      projects: 'Projects',
      clients: 'Organizations',
      cv: 'Download CV',
      photoAlt: 'Adriana Marilu Diaz Mendo - ID card',
    },
    portfolio: {
      titleA: 'My',
      titleB: 'Portfolio',
      tabProjects: 'Featured Projects',
      tabAchievements: 'Achievements',
      tabCertificates: 'Certificates',
      impact: 'Impact',
      technologies: 'Technologies',
      viewProject: 'View Project',
      offline: 'Platform offline',
      offlineNote: "The client's site is no longer active. The screenshots show the work delivered.",
      prevImage: 'Previous image',
      nextImage: 'Next image',
      goToImage: 'Go to image',
      image: 'Image',
      certificate: 'Certificate',
      issuer: 'Issuer',
      viewCertificate: 'View Certificate',
      allCertificatesTitle: 'Want to see more?',
      allCertificatesText: 'I hold 30+ certificates and records from Cisco, Oracle, Red Hat, Fundación Telefónica, Pronabec and more.',
      allCertificates: 'View all my certificates',
    },
    contact: {
      title: 'Contact Me',
      intro: "I'm open to freelance projects, tech collaborations and innovative challenges. If you have an idea or project in mind, let's talk.",
      name: 'Full Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project or question...',
      send: 'Send Message',
      sending: 'Sending...',
      sent: '✓ Sent',
      thanks: "Thanks for your message. I'll get back to you soon.",
      errName: 'Name must be 2 to 100 characters long and contain only letters.',
      errEmail: 'Please enter a valid email.',
      errMessage: 'Message must be between 5 and 1000 characters.',
      waIntro: 'Hi, my name is',
      waEmail: 'My email is:',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
    },
    footer: {
      about: 'About',
      aboutText: 'Software engineer passionate about building solutions with digital impact.',
      links: 'Links',
      services: 'Services',
      services1: 'Web Development',
      services2: 'Backend',
      services3: 'Data Analysis',
      rights: 'All rights reserved.',
      madeBy: 'Designed and developed by',
    },
    scrollTop: 'Back to top',
  },
};

export type Dictionary = (typeof translations)['es'];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  // Recuperar el idioma guardado o el del navegador
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved === 'es' || saved === 'en') {
      setLangState(saved);
    } else if (!navigator.language.toLowerCase().startsWith('es')) {
      setLangState('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return ctx;
}
