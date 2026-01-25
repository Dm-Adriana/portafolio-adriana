# Portafolio 

Un portafolio web moderno, responsivo y profesional desarrollado con React, Next.js y Tailwind CSS. Diseñado con una estética sobria que combina negro, gris plomo y degradados en azul marino para transmitir profesionalismo, confianza e innovación.

## 🎨 Características

### Secciones Principales

1. **Hero Section (Inicio)**
   - Animación de escritura letra por letra con rotación de roles
   - Imagen de perfil con efecto glow al pasar el cursor
   - Enlaces a redes sociales con hover effect
   - Diseño responsive para móvil y escritorio

2. **Sección Sobre Mí**
   - Foto de credencial estilo ID card
   - Animación interactiva del colgador (clothespin)
   - Foto que se mueve al hacer clic
   - Métricas profesionales (años de experiencia, proyectos, clientes)
   - Botón para descargar CV

3. **Portafolio (Proyectos, Logros, Certificados)**
   - Sistema de navegación por pestañas
   - Filtrado dinámico de contenido
   - Tarjetas con información detallada de proyectos
   - Listado de logros y certificaciones
   - Animaciones suaves de transición

4. **Sección de Contacto**
   - Formulario interactivo
   - Validación de campos
   - Información de contacto rápido
   - Retroalimentación visual al enviar

5. **Navegación y Footer**
   - Barra de navegación sticky responsiva
   - Menú móvil hamburguesa
   - Footer con enlaces y redes sociales
   - Botón scroll-to-top automático

## 🎯 Características Técnicas

### Animaciones Implementadas

- **Typing Animation**: Rotación automática de roles profesionales
- **Glow Effect**: Efecto luminoso al pasar el cursor sobre la imagen
- **Clothespin Animation**: Movimiento dinámico del colgador de la ID
- **Smooth Transitions**: Transiciones suaves entre estados
- **Hover Effects**: Efectos visuales en enlaces y botones
- **Scroll-based Effects**: Aparición del botón scroll-to-top

### Colores

- **Fondo Primario**: #0a0e27 (Negro profundo)
- **Fondo Secundario**: #1a1f3a (Gris plomo oscuro)
- **Bordes**: #2a3f5f (Gris plomo)
- **Texto Principal**: #e0e6f7 (Blanco suave)
- **Texto Secundario**: #a0a8c0 (Gris claro)
- **Primario**: #0084ff (Azul marino)
- **Acento**: #00d4ff (Cyan)

## 🚀 Instalación y Setup

### Requisitos Previos

- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

```bash
# Clonar o descargar el proyecto
git clone https://github.com/tu-usuario/tu-repositorio.git

# Instalar dependencias
npm install
# o
yarn install

# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
```

Demo: https://portafolio-adriana.vercel.app

### Build para Producción

```bash
npm run build
```

## 📝 Personalización

### Datos a Actualizar

1. **Nombre y Roles** (`/components/Hero.tsx`)
   - Cambiar nombre: línea donde dice "Adriana Diaz Mendo"
   - Agregar/modificar roles en el array `roles`

2. **Información Personal** (`/components/About.tsx`)
   - Descripción personal
   - Métricas (años de experiencia, proyectos, clientes)

3. **Proyectos, Logros y Certificados** (`/components/PortfolioTabs.tsx`)
   - Arrays `projectsData`, `achievementsData`, `certificatesData`
   - Agregar, modificar o eliminar elementos

4. **Información de Contacto** (`/components/Contact.tsx`)
   - Email
   - Teléfono
   - Ubicación

5. **Enlaces de Redes Sociales**
   - Actualizar atributos `href` en componentes Hero, Navigation y Footer

### Imágenes

- **Foto de Perfil**: Reemplaza `/public/adriana.png`
- **Foto de ID Card**: Reemplaza `/public/id-card.jpg`

### Metadatos

Actualiza en `/app/layout.tsx`:
- `title`: Título de la pestaña del navegador
- `description`: Meta descripción para SEO

## 🔧 Estructura de Archivos

```
/app
  ├── layout.tsx          # Layout principal
  ├── page.tsx            # Página principal
  ├── globals.css         # Estilos globales y temas

/components
  ├── Hero.tsx            # Sección hero
  ├── About.tsx           # Sección sobre mí
  ├── PortfolioTabs.tsx   # Proyectos/logros/certificados
  ├── Contact.tsx         # Sección contacto
  ├── Navigation.tsx      # Barra de navegación
  ├── ScrollToTop.tsx     # Botón scroll-to-top
  └── Footer.tsx          # Pie de página

/public
  ├── adriana.png         # Foto de perfil
  └── id-card.jpg         # Foto de ID card
```

## 📱 Responsividad

El portafolio es completamente responsive y se adapta a:
- **Móvil**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## ⚡ Performance

- Optimización de imágenes con Next.js Image component
- CSS-in-JS con Tailwind para cargas rápidas
- Animaciones GPU-optimized
- Lazy loading de componentes

## 🔐 SEO

- Etiquetas meta dinámicas
- Estructura HTML semántica
- Alt text en imágenes
- URLs descriptivas con IDs de sección

## 📦 Dependencias Principales

- **React 19.2.0**: Framework UI
- **Next.js 16.0.10**: Meta-framework React
- **Tailwind CSS 4.1.9**: Framework de estilos
- **Lucide React**: Iconos

## 🎓 Aprendizaje

Este proyecto demuestra:
- React hooks (useState, useEffect)
- Componentes funcionales
- Tailwind CSS avanzado
- Animaciones con CSS y JavaScript
- Responsive design patterns
- Next.js Image optimization
- Accesibilidad web (aria-labels, semantic HTML)

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de adaptarlo a tus necesidades.

## 💡 Tips de Uso

1. **Para cambiar colores**: Modifica las variables CSS en `globals.css` o directamente en los componentes
2. **Para agregar más secciones**: Crea nuevos componentes y añádelos a `page.tsx`
3. **Para mejorar el rendimiento**: Considera usar React.memo() para componentes que no cambian frecuentemente
4. **Para añadir animaciones**: Agrega clases personalizadas en `globals.css` en la sección `@layer utilities`

## 🚀 Deployment

El portafolio está listo para ser desplegado en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 📞 Soporte

Para preguntas o mejoras, consulta la documentación oficial:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

---

Creado por Adriana Diaz Mendo – Ingeniera de Software
