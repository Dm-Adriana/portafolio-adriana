'use client';

import { useState } from 'react';
import { ExternalLink, Award, FileText, Globe, ChevronLeft, ChevronRight, CloudOff, FolderOpen } from 'lucide-react';
import Image from 'next/image';
import { useLanguage, type Localized } from '@/lib/i18n';

type TabType = 'projects' | 'achievements' | 'certificates';

interface Project {
  id: number;
  name: Localized;
  description: Localized;
  longDescription?: Localized;
  images: string[];
  /** 'contain' muestra la captura completa sin recortes */
  fit?: 'cover' | 'contain';
  /** Carrusel más alto, para capturas verticales (app móvil) */
  tall?: boolean;
  benefits: Localized;
  tools: string[];
  link?: string;
  /** El sitio ya no está publicado (p. ej. el cliente dejó de pagar la suscripción) */
  offline?: boolean;
}

interface Achievement {
  id: number;
  title: Localized;
  description: Localized;
  date: Localized;
}

interface Certificate {
  id: number;
  name: Localized;
  issuer: string;
  date: string;
  link?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    name: { es: 'Plataforma Web Inmobiliaria', en: 'Real Estate Web Platform' },
    description: {
      es: 'Plataforma corporativa para captación de leads y visualización de propiedades.',
      en: 'Corporate platform for lead generation and property showcasing.',
    },
    longDescription: {
      es: 'Plataforma web corporativa orientada a la captación de leads, visualización de proyectos y propiedades inmobiliarias, con filtros dinámicos, formularios inteligentes y contacto directo vía WhatsApp. Incluye panel administrativo integrado.',
      en: 'Corporate website focused on lead generation and showcasing real estate projects and properties, with dynamic filters, smart forms and direct WhatsApp contact. Includes an integrated admin panel.',
    },
    images: ['/project1/pagina1.png', '/project1/pagina2.png', '/project1/pagina3.png', '/project1/pagina4.png', '/project1/pagina5.png', '/project1/pagina6.png'],
    benefits: {
      es: 'Incremento de 45% en la captación de clientes calificados y automatización del flujo comercial.',
      en: '45% increase in qualified lead capture and automation of the sales workflow.',
    },
    tools: ['JavaScript', 'Tailwind CSS', 'PHP', 'HTML', 'AJAX', 'MVC', 'MySQL'],
    offline: true,
  },
  {
    id: 2,
    name: { es: 'Dashboard Administrativo', en: 'Admin Dashboard' },
    description: {
      es: 'Panel de administración con métricas en tiempo real y reportes exportables.',
      en: 'Admin panel with real-time metrics and exportable reports.',
    },
    longDescription: {
      es: 'Panel de administración interno para gestión centralizada de proyectos, propiedades, categorías y contactos, con métricas visuales, búsqueda global, registro de actividades y exportación de reportes en Excel.',
      en: 'Internal admin panel for centralized management of projects, properties, categories and contacts, with visual metrics, global search, activity logs and Excel report exports.',
    },
    images: ['/project2/Panel1.png', '/project2/Panel2.png', '/project2/Panel3.png', '/project2/Panel4.png', '/project2/Panel5.png', '/project2/Panel6.png'],
    benefits: {
      es: 'Reducción de 60% en tiempos operativos y control centralizado de información.',
      en: '60% reduction in operational time and centralized control of information.',
    },
    tools: ['PHP', 'JavaScript', 'MVC', 'MySQL', 'Chart.js'],
  },
  {
    id: 3,
    name: { es: 'App Móvil de Inversiones', en: 'Investment Mobile App' },
    description: {
      es: 'Aplicación móvil con autenticación por roles y gestión financiera en tiempo real.',
      en: 'Mobile app with role-based authentication and real-time financial management.',
    },
    longDescription: {
      es: 'Aplicación móvil con autenticación por roles (gerencia, asesores e inversionistas) que permite seguimiento de clientes, control de inversiones, generación de contratos en PDF y análisis financiero en tiempo real.',
      en: 'Mobile app with role-based authentication (management, advisors and investors) for client tracking, investment control, PDF contract generation and real-time financial analysis.',
    },
    images: ['/project3/app1.jpeg', '/project3/app2.jpeg', '/project3/app3.jpeg', '/project3/app4.jpeg', '/project3/app5.jpeg', '/project3/app6.jpeg'],
    fit: 'contain',
    tall: true,
    benefits: {
      es: 'Mejora en gestión de campo y acceso inmediato a información financiera para toma de decisiones.',
      en: 'Better field management and instant access to financial information for decision making.',
    },
    tools: ['JavaScript', 'Capacitor', 'Node.js', 'Android Studio', 'JSON'],
  },
  {
    id: 4,
    name: { es: 'Heritage Damage Detector', en: 'Heritage Damage Detector' },
    description: {
      es: 'Inteligencia artificial que detecta daños en edificios patrimoniales a partir de fotos de dron.',
      en: 'Artificial intelligence that detects damage in heritage buildings from drone photos.',
    },
    longDescription: {
      es: 'Sistema de visión computacional basado en Deep Learning (YOLOv8) que analiza fotografías aéreas de muros de sillar del Santuario de San Agustín (Arequipa), identifica grietas, humedad y desprendimientos, y calcula el área afectada (cm² y m²) y la gravedad de cada daño. Dataset propio de 2 339 imágenes de dron, modelo YOLOv8m-seg que mejoró el F1 de 0.12 a 0.40 y pipeline de teselado sobre fotos de 5280×3956 px. Incluye una aplicación web, una de escritorio y un historial de inspecciones en la nube. Proyecto de tesis para la UCSM (2026).',
      en: 'Deep Learning (YOLOv8) computer vision system that analyzes aerial photos of sillar stone walls at the San Agustín Sanctuary (Arequipa), identifies cracks, moisture and spalling, and computes the affected area (cm² and m²) and severity of each damage. Custom dataset of 2,339 drone images, a YOLOv8m-seg model that improved F1 from 0.12 to 0.40, and a tiling pipeline for 5280×3956 px photos. Includes a web app, a desktop app and a cloud inspection history. Thesis project for UCSM (2026).',
    },
    images: [
      '/project4/web_1_inicio.webp',
      '/project4/web_2_resultado.webp',
      '/project4/escritorio_2_resultado.webp',
      '/project4/escritorio_3_cuadro_de_mandos.webp',
      '/project4/val_batch0_pred.webp',
      '/project4/val_batch0_labels.webp',
      '/project4/results.webp',
      '/project4/labels.webp',
    ],
    fit: 'contain',
    benefits: {
      es: 'Inspecciones más rápidas y objetivas del patrimonio arquitectónico: cada foto se analiza en segundos, los daños se priorizan por gravedad y la conservación se planifica con datos medibles.',
      en: 'Faster, more objective inspections of architectural heritage: each photo is analyzed in seconds, damage is prioritized by severity and conservation is planned with measurable data.',
    },
    tools: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Deep Learning', 'Visión Computacional', 'Roboflow', 'Streamlit', 'CustomTkinter', 'Supabase'],
  },
  {
    id: 5,
    name: {
      es: 'Bienestar Universitario – Tablero de Ajustes Razonables',
      en: 'Student Wellbeing – Reasonable Accommodations Dashboard',
    },
    description: {
      es: 'Extensión para Ellucian Experience que permite a los docentes de la Universidad Señor de Sipán identificar a sus estudiantes con discapacidad y aplicar los ajustes razonables que les corresponden.',
      en: 'Ellucian Experience extension that lets Universidad Señor de Sipán faculty identify their students with disabilities and apply the reasonable accommodations they are entitled to.',
    },
    longDescription: {
      es: 'Tarjeta y página integradas al portal institucional (Ellucian Experience) y conectadas en tiempo real con Banner. El docente ve, agrupados por curso y NRC, los estudiantes con discapacidad registrada en sus secciones, con el tipo de discapacidad identificado por color e ícono. Cada estudiante tiene una ficha con sus datos académicos, la vigencia de sus ajustes razonables y sus datos de contacto. Incluye reporte en Excel, paginación y diseño responsivo alineado a la identidad institucional. Los datos se consultan mediante APIs propias construidas en Banner API Designer y publicadas en Ethos Integration, con seguridad por sesión: cada docente solo accede a los estudiantes de sus propios cursos, conforme a la Ley N.° 29733 de Protección de Datos Personales.',
      en: 'A card and page integrated into the institutional portal (Ellucian Experience) and connected in real time to Banner. Faculty see, grouped by course and CRN, the students with a registered disability in their sections, with the disability type identified by color and icon. Each student has a profile with academic data, the validity period of their accommodations and contact details. Includes an Excel report, pagination and a responsive design aligned with the institutional identity. Data is retrieved through custom APIs built in Banner API Designer and published on Ethos Integration, with session-based security: each instructor can only access students in their own courses, in compliance with Peru\'s Personal Data Protection Law No. 29733.',
    },
    images: [
      '/project5/1-home.webp',
      '/project5/2-tarjeta.webp',
      '/project5/3-directorio.webp',
      '/project5/4-ficha.webp',
      '/project5/5-datos.webp',
    ],
    fit: 'contain',
    benefits: {
      es: 'Los docentes identifican de inmediato a los estudiantes que requieren ajustes razonables, sin consultas manuales a Bienestar Universitario. Así se cierra la brecha (GAP) de capacidad institucional y se fortalece la atención inclusiva en el aula.',
      en: 'Faculty instantly identify the students who need reasonable accommodations, with no manual requests to Student Wellbeing. This closes the institutional capability gap and strengthens inclusive teaching in the classroom.',
    },
    tools: ['React', 'JavaScript', 'Ellucian Experience SDK', 'Ellucian Ethos Integration', 'Banner API Designer', 'REST APIs', 'Banner (Oracle)', 'UI/UX Design', 'CSS responsivo', 'Webpack', 'Git / GitHub'],
  },
];

const achievementsData: Achievement[] = [
  {
    id: 4,
    title: {
      es: 'Migración de datos legacy a Ellucian Banner – Universidad Señor de Sipán',
      en: 'Legacy Data Migration to Ellucian Banner – Universidad Señor de Sipán',
    },
    description: {
      es: 'Trasladé más de 1.7 millones de registros del sistema legacy a Oracle Banner (T-SQL), reduciendo los tiempos de carga en 90%, y homologué más de 120 000 catálogos académicos con algoritmos de fuzzy matching en Python.',
      en: 'Migrated 1.7M+ records from the legacy system to Oracle Banner (T-SQL), cutting load times by 90%, and standardized 120,000+ academic catalogs using fuzzy matching algorithms in Python.',
    },
    date: { es: 'Febrero - Octubre 2026', en: 'February - October 2026' },
  },
  {
    id: 5,
    title: {
      es: 'Referente técnica (SME) en el ecosistema Ellucian',
      en: 'Technical Subject Matter Expert (SME) in the Ellucian ecosystem',
    },
    description: {
      es: 'Referente en integraciones ERP: APIs REST y componentes React para Ellucian Experience vía Ethos y Data Connect, matriz de accesos con restricciones de datos (FGAC/VPD) y pruebas end-to-end en TEST/PROD para un despliegue seguro.',
      en: 'Go-to expert for ERP integrations: REST APIs and React components for Ellucian Experience via Ethos and Data Connect, an access matrix with data restrictions (FGAC/VPD) and end-to-end testing in TEST/PROD for a safe rollout.',
    },
    date: { es: '2026', en: '2026' },
  },
  {
    id: 6,
    title: {
      es: 'Modelo de IA para patrimonio – Tesis UCSM',
      en: 'AI Model for Heritage – UCSM Thesis',
    },
    description: {
      es: 'Entrené un modelo YOLOv8m-seg con más de 2 300 imágenes de dron que mejoró el F1 de 0.12 a 0.40 y redujo los falsos positivos de 16 a 6 de cada 30 imágenes sin daño.',
      en: 'Trained a YOLOv8m-seg model on 2,300+ drone images that improved F1 from 0.12 to 0.40 and reduced false positives from 16 to 6 out of every 30 undamaged images.',
    },
    date: { es: 'Mayo - Septiembre 2026', en: 'May - September 2026' },
  },
  {
    id: 7,
    title: {
      es: 'Bootcamp de Liderazgo "Transforma tu futuro" – Pronabec',
      en: '"Transforma tu futuro" Leadership Bootcamp – Pronabec',
    },
    description: {
      es: 'Seleccionada para el bootcamp de liderazgo del Programa Nacional de Becas (16 horas).',
      en: 'Selected for the leadership bootcamp of Peru\'s National Scholarship Program (16 hours).',
    },
    date: { es: 'Abril 2025', en: 'April 2025' },
  },
  {
    id: 1,
    title: { es: 'Mentora de Practicante – Empresa Inmobiliaria', en: 'Intern Mentor – Real Estate Company' },
    description: {
      es: 'Acompañamiento y orientación técnica a un practicante en su proceso de aprendizaje y adaptación profesional.',
      en: 'Technical guidance and support for an intern throughout their learning and professional onboarding.',
    },
    date: { es: 'Febrero - Diciembre 2025', en: 'February - December 2025' },
  },
  {
    id: 2,
    title: { es: 'Reconocimiento Académico – Fundación Telefónica del Perú', en: 'Academic Recognition – Fundación Telefónica del Perú' },
    description: {
      es: 'Culminación destacada de 24 cursos en programas de formación tecnológica.',
      en: 'Outstanding completion of 24 courses in technology training programs.',
    },
    date: { es: '2024', en: '2024' },
  },
  {
    id: 3,
    title: { es: 'Beca 18 – Pronabec', en: 'Beca 18 Scholarship – Pronabec' },
    description: {
      es: 'Beneficiaria de la Beca 18 por mérito académico a nivel nacional.',
      en: 'Awarded the national Beca 18 scholarship for academic merit.',
    },
    date: { es: '2023', en: '2023' },
  },
];

const certificatesData: Certificate[] = [
  {
    id: 1,
    name: { es: 'Digital safety and security awareness', en: 'Digital safety and security awareness' },
    issuer: 'Cisco',
    date: '2025',
    link: 'https://drive.google.com/file/d/1RHf6FxsfB-wDr6uqcxDy01DaZ2Gua-Dc/view?usp=sharing',
  },
  {
    id: 2,
    name: { es: 'IA y herramientas digitales', en: 'AI and digital tools' },
    issuer: 'DECYGO',
    date: '2025',
    link: 'https://drive.google.com/file/d/1qwhPHeuDJWanOBes4902D1xG-j7xpKWi/view?usp=sharing',
  },
  {
    id: 3,
    name: { es: 'Fundamentos de UX', en: 'UX Fundamentals' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/1LJ8A3lY57htRqaKf0ubQ0UqEhrhrBNmp/view?usp=sharing',
  },
  {
    id: 4,
    name: { es: 'Principios Básicos de Big Data', en: 'Big Data Fundamentals' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/1VEqNRsbFeZ8T7Zdxo5zBt63Jcj_Te1oo/view?usp=sharing',
  },
  {
    id: 5,
    name: { es: 'Programación con JavaScript', en: 'JavaScript Programming' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/1KXxXOrInPsi-ph0jVYNH5nAHMspo6Ief/view?usp=sharing',
  },
  {
    id: 6,
    name: { es: 'Introducción a Power BI', en: 'Introduction to Power BI' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/136hkBYTIzbROLkhMp6zDUDVLEftduGjS/view?usp=sharing',
  },
  {
    id: 7,
    name: { es: 'Design Thinking', en: 'Design Thinking' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/1NSH9oT3aVi-a9dNrB-18NJPXdXgZiJHh/view?usp=sharing',
  },
  {
    id: 8,
    name: { es: 'Marketing Digital', en: 'Digital Marketing' },
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/14AYLktfthXEeBX_Q9AInqqFmmv2Hfn7J/view?usp=sharing',
  },
  {
    id: 9,
    name: { es: 'Introduction to Cybersecurity', en: 'Introduction to Cybersecurity' },
    issuer: 'Cisco Networking Academy',
    date: '2023',
    link: 'https://drive.google.com/file/d/1U7Ko-Dt9uXySF9c_TisUZhdI74xCcTyD/view?usp=sharing',
  },
  {
    id: 10,
    name: { es: 'Introduction to IoT', en: 'Introduction to IoT' },
    issuer: 'Cisco Networking Academy',
    date: '2023',
    link: 'https://drive.google.com/file/d/19neK2Ku5ObOgLcMZr5muZdJD8T1naYlU/view?usp=sharing',
  },
  {
    id: 11,
    name: { es: 'Java Fundamentals', en: 'Java Fundamentals' },
    issuer: 'Oracle',
    date: '2023',
    link: 'https://drive.google.com/file/d/19emla-qdv927vfNLEw9mNUoSGx0fpJdl/view?usp=sharing',
  },
  {
    id: 12,
    name: { es: 'Red Hat System Administration I (RH124)', en: 'Red Hat System Administration I (RH124)' },
    issuer: 'Red Hat',
    date: '2023',
    link: 'https://drive.google.com/file/d/1_vsLDnfGNZtspfxJ6VQmZFQzYPbXykR7/view?usp=sharing',
  },
];

const ALL_CERTIFICATES_URL = 'https://drive.google.com/drive/folders/1dFsoMZkKiW060BdebRm8HjaHymrNVub7?usp=sharing';

export function PortfolioTabs() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projectImageIndex, setProjectImageIndex] = useState<Record<number, number>>({});
  const [touchStart, setTouchStart] = useState<Record<number, number>>({});

  const getImageIndex = (projectId: number) => {
    return projectImageIndex[projectId] || 0;
  };

  const handleTouchStart = (projectId: number, e: React.TouchEvent) => {
    setTouchStart((prev) => ({
      ...prev,
      [projectId]: e.touches[0].clientX,
    }));
  };

  const handleTouchEnd = (projectId: number, totalImages: number, e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchStartValue = touchStart[projectId] || 0;
    const diff = touchStartValue - touchEnd;
    
    // Si el swipe es hacia la izquierda (diff > 50), ir a la siguiente imagen
    if (diff > 50) {
      nextImage(projectId, totalImages);
    }
    // Si el swipe es hacia la derecha (diff < -50), ir a la imagen anterior
    else if (diff < -50) {
      prevImage(projectId, totalImages);
    }
  };

  const nextImage = (projectId: number, totalImages: number) => {
    setProjectImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectId: number, totalImages: number) => {
    setProjectImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const goToImage = (projectId: number, index: number) => {
    setProjectImageIndex((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {t.portfolio.titleA} <span className="text-gradient">{t.portfolio.titleB}</span>
        </h2>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/30 dark:shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-slate-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none hover:border-[#0084ff] hover:text-[#0066cc] dark:hover:text-white'
            }`}
          >
            {t.portfolio.tabProjects}
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/30 dark:shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-slate-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none hover:border-[#0084ff] hover:text-[#0066cc] dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            {t.portfolio.tabAchievements}
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/30 dark:shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-slate-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none hover:border-[#0084ff] hover:text-[#0066cc] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            {t.portfolio.tabCertificates}
          </button>
        </div>

        {/* Tab Content - Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((project) => {
              const currentImageIndex = getImageIndex(project.id);
              const totalImages = project.images.length;

              return (
                <div
                  key={project.id}
                  className="group bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-xl overflow-hidden shadow-sm dark:shadow-none flex flex-col hover:border-[#0084ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#0084ff]/20"
                >
                  {/* Carrusel: todas las imágenes quedan montadas y se alternan por opacidad, así el
                      cambio es instantáneo (antes se cambiaba el src y había que esperar la descarga) */}
                  <div
                    className={`relative w-full bg-gradient-to-br from-[#0084ff]/10 to-[#00d4ff]/10 dark:from-[#0084ff]/20 dark:to-[#00d4ff]/20 overflow-hidden ${
                      project.tall ? 'h-96' : 'h-64'
                    } ${totalImages > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    onTouchStart={(e) => handleTouchStart(project.id, e)}
                    onTouchEnd={(e) => handleTouchEnd(project.id, totalImages, e)}
                  >
                    {project.images.map((src, index) => (
                      <Image
                        key={src}
                        src={src}
                        alt={`${project.name[lang]} - ${t.portfolio.image} ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        loading="eager"
                        aria-hidden={index !== currentImageIndex}
                        className={`${project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        priority={project.id === 1 && index === 0}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/35 dark:from-[#0a0e27]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image Navigation */}
                    {totalImages > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={() => prevImage(project.id, totalImages)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          aria-label={t.portfolio.prevImage}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={() => nextImage(project.id, totalImages)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          aria-label={t.portfolio.nextImage}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-3 right-3 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {currentImageIndex + 1} / {totalImages}
                        </div>

                        {/* Image Indicators/Dots */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToImage(project.id, index)}
                              className={`transition-all duration-300 rounded-full ${
                                index === currentImageIndex
                                  ? 'w-3 h-3 bg-[#00d4ff]'
                                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                              }`}
                              aria-label={`${t.portfolio.goToImage} ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0066cc] dark:group-hover:text-[#00d4ff] transition-colors">
                      {project.name[lang]}
                    </h3>
                    <p className="text-slate-600 dark:text-[#a0a8c0] text-sm mb-4 text-justify">
                      {project.description[lang]}
                    </p>

                    {project.longDescription && (
                      <p className="text-slate-600 dark:text-[#a0a8c0] text-xs mb-4 text-justify">
                        {project.longDescription[lang]}
                      </p>
                    )}

                    {/* Benefits */}
                    <div className="mb-4 p-3 bg-[#f4f8ff] dark:bg-[#0a0e27] rounded-lg border border-[#d9e7fb] dark:border-[#2a3f5f]">
                      <p className="text-xs font-semibold text-[#0066cc] dark:text-[#0084ff] mb-1">✨ {t.portfolio.impact}:</p>
                      <p className="text-sm text-gray-900 dark:text-[#e0e6f7]">
                        {project.benefits[lang]}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-600 dark:text-[#a0a8c0] mb-2">{t.portfolio.technologies}:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 bg-[#eaf3ff] dark:bg-gradient-to-r dark:from-[#0084ff]/20 dark:to-[#00d4ff]/20 text-[#0057b8] dark:text-[#00d4ff] text-xs font-medium rounded-full border border-[#b9d6fb] dark:border-[#0084ff]/50 hover:border-[#0084ff] dark:hover:border-[#00d4ff] transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    {(project.link || project.offline) && (
                      <div className="mt-auto flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2a3f5f]">
                        {project.link && !project.offline && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 flex-1 justify-center px-4 py-2 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all duration-300"
                          >
                            <Globe className="w-4 h-4" />
                            {t.portfolio.viewProject}
                          </a>
                        )}
                        {project.offline && (
                          <div className="flex items-start gap-3 flex-1 px-4 py-3 rounded-lg bg-slate-50 dark:bg-[#0a0e27] border border-dashed border-slate-300 dark:border-[#2a3f5f]">
                            <CloudOff className="w-4 h-4 mt-0.5 shrink-0 text-slate-500 dark:text-[#7c86a6]" />
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-[#e0e6f7]">{t.portfolio.offline}</p>
                              <p className="text-xs text-slate-500 dark:text-[#a0a8c0]">{t.portfolio.offlineNote}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content - Achievements */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementsData.map((achievement) => (
              <div
                key={achievement.id}
                className="group bg-gradient-to-br from-white to-[#f6f9ff] shadow-sm dark:shadow-none dark:from-[#1a1f3a] dark:to-[#0a0e27] border border-gray-200 dark:border-[#2a3f5f] rounded-xl p-6 hover:border-[#00d4ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/20 relative overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff]/5 to-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white font-bold text-lg">
                      ★
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0066cc] dark:group-hover:text-[#00d4ff] transition-colors">
                      {achievement.title[lang]}
                    </h3>
                    <p className="text-gray-700 dark:text-[#a0a8c0] text-sm mb-3 leading-relaxed">
                      {achievement.description[lang]}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#0084ff]" />
                      <p className="text-xs text-[#0066cc] dark:text-[#0084ff] font-semibold">
                        {achievement.date[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content - Certificates */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesData.map((certificate) => (
              <div
                key={certificate.id}
                className="group bg-gradient-to-br from-[#0084ff]/5 dark:from-[#0084ff]/10 via-white dark:via-[#1a1f3a] to-[#00d4ff]/5 dark:to-[#00d4ff]/10 border border-gray-200 dark:border-[#0084ff]/30 rounded-xl overflow-hidden hover:border-[#0084ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#0084ff]/30"
              >
                {/* Certificate Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-[#0084ff]/20 to-[#00d4ff]/20 border-b border-gray-200 dark:border-[#0084ff]/20">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-[#a0a8c0]">{t.portfolio.certificate}</p>
                      <p className="text-xs font-semibold text-[#0066cc] dark:text-[#00d4ff]">{certificate.date}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0066cc] dark:group-hover:text-[#00d4ff] transition-colors">
                    {certificate.name[lang]}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-[#a0a8c0]">{t.portfolio.issuer}</p>
                      <p className="text-sm font-semibold text-[#0066cc] dark:text-[#00d4ff]">
                        {certificate.issuer}
                      </p>
                    </div>
                    {certificate.link && (
                      <div className="pt-3 border-t border-gray-200 dark:border-[#2a3f5f]">
                        <a
                          href={certificate.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all duration-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {t.portfolio.viewCertificate}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <a
              href={ALL_CERTIFICATES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center gap-3 p-6 rounded-xl border-2 border-dashed border-[#0084ff]/40 bg-[#f4f8ff] dark:bg-[#0084ff]/5 hover:border-[#0084ff] hover:bg-[#eaf3ff] dark:hover:bg-[#0084ff]/10 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/30 transition-transform duration-300 group-hover:scale-110">
                <FolderOpen className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-gray-900 dark:text-white">{t.portfolio.allCertificatesTitle}</p>
              <p className="text-sm text-slate-600 dark:text-[#a0a8c0]">{t.portfolio.allCertificatesText}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066cc] dark:text-[#00d4ff]">
                {t.portfolio.allCertificates}
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
