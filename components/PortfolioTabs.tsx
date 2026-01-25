'use client';

import { useState } from 'react';
import { ExternalLink, Award, FileText, Github, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type TabType = 'projects' | 'achievements' | 'certificates';

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  images: string[];
  benefits: string;
  tools: string[];
  link?: string;
  github?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    name: 'Plataforma Web Inmobiliaria',
    description: 'Plataforma corporativa para captación de leads y visualización de propiedades.',
    longDescription: 'Plataforma web corporativa orientada a la captación de leads, visualización de proyectos y propiedades inmobiliarias, con filtros dinámicos, formularios inteligentes y contacto directo vía WhatsApp. Incluye panel administrativo integrado.',
    images: ['/project1/pagina1.png', '/project1/pagina2.png', '/project1/pagina3.png', '/project1/pagina4.png', '/project1/pagina5.png', '/project1/pagina6.png'],
    benefits: 'Incremento de 45% en la captación de clientes calificados y automatización del flujo comercial.',
    tools: ['JavaScript', 'Tailwind CSS', 'PHP', 'HTML', 'AJAX', 'MVC', 'MySQL'],
    link: 'https://tyfinmobiliaria.com/',
    github: 'https://github.com/adriana/proyecto1',
  },
  {
    id: 2,
    name: 'Dashboard Administrativo',
    description: 'Panel de administración con métricas en tiempo real y reportes exportables.',
    longDescription: 'Panel de administración interno para gestión centralizada de proyectos, propiedades, categorías y contactos, con métricas visuales, búsqueda global, registro de actividades y exportación de reportes en Excel.',
    images: ['/project2/Panel1.png', '/project2/Panel2.png', '/project2/Panel3.png', '/project2/Panel4.png', '/project2/Panel5.png', '/project2/Panel6.png'],
    benefits: 'Reducción de 60% en tiempos operativos y control centralizado de información.',
    tools: ['PHP', 'JavaScript', 'MVC', 'MySQL', 'Chart.js'],
    github: 'https://github.com/adriana/proyecto2',
  },
  {
    id: 3,
    name: 'App Móvil de Inversiones',
    description: 'Aplicación móvil con autenticación por roles y gestión financiera en tiempo real.',
    longDescription: 'Aplicación móvil con autenticación por roles (gerencia, asesores e inversionistas) que permite seguimiento de clientes, control de inversiones, generación de contratos en PDF y análisis financiero en tiempo real.',
    images: ['/project3/app1.jpeg', '/project3/app2.jpeg', '/project3/app3.jpeg', '/project3/app4.jpeg', '/project3/app5.jpeg', '/project3/app6.jpeg'],
    benefits: 'Mejora en gestión de campo y acceso inmediato a información financiera para toma de decisiones.',
    tools: ['JavaScript', 'Capacitor', 'Node.js', 'Android Studio', 'JSON'],
    github: 'https://github.com/adriana/proyecto3',
  },
];

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: 'Mentora de Practicante – Empresa Inmobiliaria',
    description: 'Acompañamiento y orientación técnica a un practicante en su proceso de aprendizaje y adaptación profesional.',
    date: 'Febrero - Diciembre 2025',
  },
  {
    id: 2,
    title: 'Reconocimiento Académico – Fundación Telefónica del Perú',
    description: 'Culminación destacada de 24 cursos en programas de formación tecnológica',
    date: '2024',
  },
  {
    id: 3,
    title: 'Beca 18 – Pronabec',
    description: 'Beneficiaria de la Beca 18 por mérito académico a nivel nacional.',
    date: '2023',
  },
];

const certificatesData: Certificate[] = [
  {
    id: 1,
    name: 'Digital safety and security awareness',
    issuer: 'Cisco',
    date: '2025',
    link: 'https://drive.google.com/file/d/1RHf6FxsfB-wDr6uqcxDy01DaZ2Gua-Dc/view?usp=sharing',
  },
  {
    id: 2,
    name: 'Ia y herramientas digitales',
    issuer: 'DECYGO',
    date: '2025',
    link: 'https://drive.google.com/file/d/1qwhPHeuDJWanOBes4902D1xG-j7xpKWi/view?usp=sharing',
  },
  {
    id: 3,
    name: 'Design Thinking',
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/1NSH9oT3aVi-a9dNrB-18NJPXdXgZiJHh/view?usp=sharing',
  },
  {
    id: 4,
    name: 'Marketing Digital',
    issuer: 'Fundación Telefónica del Perú',
    date: '2024',
    link: 'https://drive.google.com/file/d/14AYLktfthXEeBX_Q9AInqqFmmv2Hfn7J/view?usp=sharing',
  },
  {
    id: 5,
    name: 'Java Fundamentals',
    issuer: 'Oracle',
    date: '2023',
    link: 'https://drive.google.com/file/d/19emla-qdv927vfNLEw9mNUoSGx0fpJdl/view?usp=sharing',
  },
  {
    id: 6,
    name: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat',
    date: '2023',
    link: 'https://drive.google.com/file/d/1_vsLDnfGNZtspfxJ6VQmZFQzYPbXykR7/view?usp=sharing',
  },
];

export function PortfolioTabs() {
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
          Mi <span className="bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text text-transparent">Portafolio</span>
        </h2>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-gray-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] hover:border-[#0084ff] hover:text-[#0084ff] dark:hover:text-white'
            }`}
          >
            Proyectos Destacados
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-gray-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] hover:border-[#0084ff] hover:text-[#0084ff] dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Logros
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white shadow-lg shadow-[#0084ff]/50'
                : 'bg-white dark:bg-[#1a1f3a] text-gray-700 dark:text-[#a0a8c0] border border-gray-200 dark:border-[#2a3f5f] hover:border-[#0084ff] hover:text-[#0084ff] dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Certificados
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
                  className="group bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-xl overflow-hidden hover:border-[#0084ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#0084ff]/20"
                >
                  {/* Project Image Carousel */}
                  <div 
                    className={`relative w-full bg-gradient-to-br from-[#0084ff]/20 to-[#00d4ff]/20 overflow-hidden ${
                      project.id === 3 ? 'h-96 flex items-center justify-center' : 'h-64'
                    } cursor-grab active:cursor-grabbing`}
                    onTouchStart={(e) => handleTouchStart(project.id, e)}
                    onTouchEnd={(e) => handleTouchEnd(project.id, totalImages, e)}
                  >
                    <Image
                      src={project.images[currentImageIndex]}
                      alt={`${project.name} - Imagen ${currentImageIndex + 1}`}
                      fill
                      className={`${project.id === 3 ? 'object-contain' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                      priority={project.id === 1 && currentImageIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image Navigation */}
                    {totalImages > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={() => prevImage(project.id, totalImages)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={() => nextImage(project.id, totalImages)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Siguiente imagen"
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
                              aria-label={`Ir a imagen ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-[#a0a8c0] text-sm mb-4 text-justify">
                      {project.description}
                    </p>

                    {project.longDescription && (
                      <p className="text-gray-600 dark:text-[#a0a8c0] text-xs mb-4 text-justify">
                        {project.longDescription}
                      </p>
                    )}

                    {/* Benefits */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-[#0a0e27] rounded-lg border border-gray-200 dark:border-[#2a3f5f]">
                      <p className="text-xs font-semibold text-[#0084ff] mb-1">✨ Impacto:</p>
                      <p className="text-sm text-gray-900 dark:text-[#e0e6f7]">
                        {project.benefits}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-600 dark:text-[#a0a8c0] mb-2">Tecnologías:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-1 bg-gradient-to-r from-[#0084ff]/20 to-[#00d4ff]/20 text-[#0084ff] dark:text-[#00d4ff] text-xs rounded-full border border-[#0084ff]/50 hover:border-[#00d4ff] transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2a3f5f]">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 flex-1 justify-center px-4 py-2 bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0084ff]/50 transition-all duration-300"
                        >
                          <Globe className="w-4 h-4" />
                          Ver Proyecto
                        </a>
                      )}
                    </div>
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
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1f3a] dark:to-[#0a0e27] border border-gray-200 dark:border-[#2a3f5f] rounded-xl p-6 hover:border-[#00d4ff] transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/20 relative overflow-hidden"
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
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-700 dark:text-[#a0a8c0] text-sm mb-3 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#0084ff]" />
                      <p className="text-xs text-[#0084ff] font-semibold">
                        {achievement.date}
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
                      <p className="text-xs text-gray-600 dark:text-[#a0a8c0]">Certificado</p>
                      <p className="text-xs font-semibold text-[#0084ff] dark:text-[#00d4ff]">{certificate.date}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0084ff] dark:group-hover:text-[#00d4ff] transition-colors">
                    {certificate.name}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-[#a0a8c0]">Emisor</p>
                      <p className="text-sm font-semibold text-[#0084ff] dark:text-[#00d4ff]">
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
                          Ver Certificado
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
