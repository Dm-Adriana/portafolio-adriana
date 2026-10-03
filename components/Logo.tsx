import { useId } from 'react';

/**
 * Monograma "AD": la pierna derecha de la A es también el trazo vertical de la D,
 * y el travesaño termina en un nodo (guiño a datos / IA).
 */
export function LogoMark({ className = 'w-10 h-10' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a5bd8" />
          <stop offset="1" stopColor="#00c2f0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#lg-${id})`} />
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="10.25" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
      <g fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {/* A + trazo compartido */}
        <path d="M8.5 30 L17.5 10 V30" />
        {/* Panza de la D */}
        <path d="M17.5 10 H20.5 A10 10 0 0 1 20.5 30 H17.5" />
        {/* Travesaño de la A */}
        <path d="M12.2 22.5 H21.6" />
      </g>
      <circle cx="23.8" cy="22.5" r="2.5" fill="#ffffff" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="w-9 h-9 md:w-10 md:h-10 shrink-0 drop-shadow-[0_4px_12px_rgba(0,132,255,0.35)]" />
      <span className="hidden sm:flex flex-col leading-none">
        <span className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-white">
          Adriana Diaz
        </span>
        <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#0066cc] dark:text-[#00d4ff]">
          Software · AI
        </span>
      </span>
    </span>
  );
}
