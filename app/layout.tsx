import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Navigation } from '@/components/Navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Adriana Diaz Mendo - Desarrolladora Web | Analista de Datos | Backend Developer',
  description: 'Portafolio profesional de Adriana Diaz Mendo. Desarrolladora Web, Analista de Datos y Backend Developer con experiencia en tecnologías modernas.',
  keywords: 'Desarrolladora Web, Web Developer, Software Engineer, Backend Developer, Analista de Datos, Inteligencia Artificial, Portafolio',
  openGraph: {
    title: 'Adriana Diaz Mendo - Desarrolladora Web | Analista de Datos | Backend Developer',
    description: 'Portafolio profesional de Adriana Diaz Mendo. Especializada en desarrollo web, análisis de datos e inteligencia artificial.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://adrianadiaz.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adriana Diaz Mendo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adriana Diaz Mendo - Desarrolladora Web | Analista de Datos | Backend Developer',
    description: 'Portafolio profesional de Adriana Diaz Mendo.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-[#f6f8fc] dark:bg-[#0a0e27]`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <Navigation />
            {children}
            <ScrollToTop />
          </LanguageProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
