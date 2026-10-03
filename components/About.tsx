'use client';

import React, { useRef, useState } from 'react';
import { Download, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { LogoMark } from '@/components/Logo';
import { useLanguage } from '@/lib/i18n';

const CV_URL = 'https://drive.google.com/file/d/1L0r5ddDeYvzRLKSJahDyrXeCCzwwMLs_/view?usp=sharing';

function IdBadge() {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTilting, setIsTilting] = useState(false);

  // Inclinación 3D siguiendo el cursor (vía variables CSS, sin re-render por frame)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cardRef.current.style.setProperty('--rx', `${(0.5 - py) * 14}deg`);
    cardRef.current.style.setProperty('--ry', `${(px - 0.5) * 16}deg`);
    cardRef.current.style.setProperty('--gx', `${px * 100}%`);
    cardRef.current.style.setProperty('--gy', `${py * 100}%`);
  };

  const handlePointerLeave = () => {
    setIsTilting(false);
    cardRef.current?.style.setProperty('--rx', '0deg');
    cardRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="relative flex flex-col items-center pt-2 select-none" style={{ perspective: '1200px' }}>
      <div className={`flex flex-col items-center animate-badge-drop`}>
        <div className={`flex flex-col items-center ${isTilting ? '' : 'animate-badge-swing'}`}>
          {/* Cinta (lanyard) */}
          <div className="relative w-7 h-14 sm:h-16 -mb-1 rounded-b-sm bg-gradient-to-b from-[#0a5bd8] to-[#00a8e6] shadow-md overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,transparent_0_10px,rgba(255,255,255,0.35)_10px_12px)]" />
            <span className="absolute inset-x-0 top-1 text-center text-[7px] font-bold tracking-[0.2em] text-white/80 [writing-mode:vertical-rl] mx-auto">
              ADRIANA
            </span>
          </div>
          {/* Broche metálico */}
          <div className="relative z-10 w-10 h-6 rounded-md bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 dark:from-slate-300 dark:via-slate-500 dark:to-slate-700 shadow-md border border-white/40">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-4 h-1.5 rounded-full bg-slate-700/60" />
          </div>
          <div className="w-1.5 h-3 bg-slate-400 dark:bg-slate-500 -mt-0.5" />

          {/* Tarjeta */}
          <div
            ref={cardRef}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setIsTilting(true)}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="group relative w-[17rem] sm:w-[19rem] rounded-2xl transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ranura del broche */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20 w-12 h-2 rounded-full bg-slate-200 dark:bg-[#0a0e27] shadow-inner" />

            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0f1430] border border-gray-200 dark:border-[#2a3f5f] shadow-[0_25px_60px_-20px_rgba(0,70,160,0.45)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
              {/* Cabecera */}
              <div className="relative h-24 bg-gradient-to-br from-[#0a5bd8] via-[#0084ff] to-[#00c2f0] px-5 pt-7 flex items-start justify-between">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="relative flex items-center gap-2">
                  <LogoMark className="w-7 h-7 ring-1 ring-white/40 rounded-[8px]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/90">
                    {t.about.cardLabel}
                  </span>
                </div>
                {/* Chip */}
                <div className="relative w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 border border-amber-600/30 shadow-sm">
                  <div className="absolute inset-1 rounded-sm border border-amber-700/30 bg-[linear-gradient(90deg,transparent_45%,rgba(120,70,0,0.25)_45%_55%,transparent_55%),linear-gradient(0deg,transparent_45%,rgba(120,70,0,0.25)_45%_55%,transparent_55%)]" />
                </div>
              </div>

              {/* Foto */}
              <div className="relative -mt-10 mx-auto w-36 h-44 sm:w-40 sm:h-48 rounded-xl p-[3px] bg-gradient-to-br from-[#0084ff] to-[#00d4ff] shadow-lg">
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-gradient-to-b from-[#eaf3ff] to-white">
                  <Image
                    src="/foto-perfil.png"
                    alt={t.about.photoAlt}
                    fill
                    sizes="176px"
                    className="object-cover object-[50%_28%] scale-[1.15] transition-transform duration-700 group-hover:scale-[1.22]"
                  />
                </div>
              </div>

              {/* Datos */}
              <div className="px-5 pt-4 pb-5 text-center">
                <p className="font-bold text-lg leading-tight text-gray-900 dark:text-white">
                  Adriana Marilu Diaz Mendo
                </p>
                <p className="mt-1 text-xs font-medium text-[#0066cc] dark:text-[#00d4ff]">
                  {t.about.cardTitle}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                  <div className="rounded-lg bg-slate-50 dark:bg-[#1a1f3a] border border-slate-100 dark:border-[#2a3f5f] px-3 py-2">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#7c86a6]">{t.about.specialty}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-gray-800 dark:text-[#e0e6f7]">
                      <Sparkles className="w-3 h-3 text-[#0084ff] shrink-0" />
                      {t.about.specialtyValue}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-[#1a1f3a] border border-slate-100 dark:border-[#2a3f5f] px-3 py-2">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-[#7c86a6]">{t.about.location}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-gray-800 dark:text-[#e0e6f7]">
                      <MapPin className="w-3 h-3 text-[#0084ff] shrink-0" />
                      Chiclayo, Perú
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                    {t.about.available}
                  </span>
                  {/* Código de barras decorativo */}
                  <div
                    aria-hidden="true"
                    className="h-6 w-20 opacity-70 dark:opacity-50 bg-[repeating-linear-gradient(90deg,#0f172a_0_2px,transparent_2px_4px,#0f172a_4px_5px,transparent_5px_8px)] dark:bg-[repeating-linear-gradient(90deg,#e0e6f7_0_2px,transparent_2px_4px,#e0e6f7_4px_5px,transparent_5px_8px)]"
                  />
                </div>
              </div>

              {/* Brillo que recorre la tarjeta */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="animate-shimmer absolute -inset-y-4 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 dark:via-white/10 to-transparent" />
              </div>
              {/* Reflejo holográfico que sigue al cursor */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-soft-light"
                style={{
                  background:
                    'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.75), rgba(0,212,255,0.25) 35%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Sombra en el suelo */}
      <div aria-hidden="true" className="mt-4 w-48 h-4 rounded-[50%] bg-[#0a5bd8]/15 dark:bg-black/40 blur-md" />
    </div>
  );
}

export function About() {
  const { t } = useLanguage();

  const metrics = [
    { value: '2+', label: t.about.years },
    { value: '5+', label: t.about.projects },
    { value: '4', label: t.about.clients },
  ];

  return (
    <section className="min-h-screen bg-[#f6f8fc] dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {t.about.titleA} <span className="text-gradient">{t.about.titleB}</span>
        </h2>

        <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200/80 dark:border-[#2a3f5f] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <IdBadge />

            {/* Info Section */}
            <div className="flex flex-col justify-center space-y-8">
              <p className="text-slate-700 dark:text-[#a0a8c0] leading-relaxed text-base lg:text-lg text-justify">
                {t.about.bio}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-gradient-to-br from-[#0084ff] to-[#00d4ff] p-[2px] rounded-lg">
                    <div className="bg-white dark:bg-[#1a1f3a] p-4 rounded-md text-center h-full">
                      <div className="text-2xl lg:text-3xl font-bold text-gradient">{metric.value}</div>
                      <div className="text-xs lg:text-sm text-slate-600 dark:text-[#a0a8c0] mt-1">{metric.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download CV Button */}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full lg:w-auto lg:self-start inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0084ff] to-[#00b4f0] dark:to-[#00d4ff] hover:from-[#0066cc] hover:to-[#0099e6] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#0084ff]/40"
              >
                <Download className="w-5 h-5" />
                {t.about.cv}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
