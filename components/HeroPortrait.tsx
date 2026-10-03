'use client';

import Image from 'next/image';
import { BrainCircuit, Cloud, Code2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

/**
 * Retrato del Hero: la foto recortada (fondo transparente) se apoya sobre un panel con
 * degradado; la cabeza sobresale del marco, un anillo gira detrás y las especialidades
 * flotan alrededor.
 */
export function HeroPortrait({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  const chips = [
    { icon: BrainCircuit, label: t.hero.chipAI, pos: compact ? '-left-6 top-[30%]' : '-left-14 top-[28%]', delay: '0s' },
    { icon: Code2, label: t.hero.chipStack, pos: compact ? '-right-5 top-[52%]' : '-right-10 top-[50%]', delay: '1.2s' },
    { icon: Cloud, label: t.hero.chipCloud, pos: compact ? '-left-3 bottom-[6%]' : '-left-8 bottom-[8%]', delay: '2.4s' },
  ];

  return (
    <div
      className={`group relative mx-auto animate-hero-in ${
        compact ? 'w-56 sm:w-64' : 'w-[19rem] lg:w-[22rem]'
      } aspect-[4/5]`}
    >
      {/* Anillo giratorio + puntos orbitando */}
      <div aria-hidden="true" className="absolute left-1/2 top-[2%] -translate-x-1/2 w-[112%] aspect-square">
        <div className="absolute inset-0 rounded-full border border-dashed border-[#0084ff]/35 dark:border-[#00d4ff]/30 animate-spin-slow" />
        <div className="absolute inset-0 animate-spin-slower">
          <span className="absolute left-1/2 -top-1.5 w-3 h-3 rounded-full bg-[#00c2f0] shadow-[0_0_14px_4px_rgba(0,194,240,0.55)]" />
          <span className="absolute -bottom-1 left-[22%] w-2 h-2 rounded-full bg-[#0084ff] shadow-[0_0_10px_3px_rgba(0,132,255,0.5)]" />
        </div>
      </div>

      {/* Panel con degradado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[22%] rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0a5bd8] via-[#0084ff] to-[#00c2f0] shadow-[0_30px_70px_-25px_rgba(0,90,200,0.65)] transition-shadow duration-500 group-hover:shadow-[0_35px_80px_-20px_rgba(0,132,255,0.75)]"
      >
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-shimmer absolute -inset-y-6 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
        <div className="absolute inset-[6px] rounded-[1.7rem] border border-white/25" />
      </div>

      {/* Foto: sólo se recortan las esquinas inferiores para que la cabeza "salga" del marco */}
      <div className="absolute inset-0 [clip-path:inset(-20%_0_0_0_round_0_0_2rem_2rem)]">
        <Image
          src="/adriana-portrait.webp"
          alt={t.hero.photoAlt}
          fill
          priority
          sizes={compact ? '256px' : '352px'}
          className="object-contain object-bottom drop-shadow-[0_18px_25px_rgba(10,30,80,0.35)] transition-transform duration-700 ease-out origin-bottom group-hover:scale-[1.03]"
        />
      </div>

      {/* Especialidades flotantes */}
      {chips.map(({ icon: Icon, label, pos, delay }) => (
        <div
          key={label}
          className={`absolute ${pos} z-10 animate-float`}
          style={{ animationDelay: delay }}
        >
          <div
            className={`flex items-center gap-2 rounded-xl bg-white/90 dark:bg-[#111735]/90 backdrop-blur-md border border-white dark:border-[#2a3f5f] shadow-[0_12px_30px_-10px_rgba(15,40,100,0.35)] ${
              compact ? 'px-2 py-1.5' : 'px-3 py-2'
            }`}
          >
            <span className={`grid place-items-center rounded-lg bg-gradient-to-br from-[#0084ff] to-[#00c2f0] text-white ${compact ? 'w-5 h-5' : 'w-7 h-7'}`}>
              <Icon className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
            </span>
            <span className={`font-semibold whitespace-nowrap text-slate-800 dark:text-[#e0e6f7] ${compact ? 'text-[10px]' : 'text-xs'}`}>
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
