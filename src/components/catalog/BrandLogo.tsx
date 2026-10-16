import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export function BrandLogo() {
  const logoRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    const targets = logo.querySelectorAll<HTMLElement>('.brand-wordmark, .brand-mark');
    if (!targets.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | undefined;
    let x = 0;
    let y = 0;
    const reset = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      logo.removeAttribute('data-spotlight');
    };
    const track = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      if (frame !== undefined) return;
      x = event.clientX;
      y = event.clientY;
      frame = requestAnimationFrame(() => {
        for (const target of targets) {
          const bounds = target.getBoundingClientRect();
          target.style.setProperty('--spotlight-x', `${x - bounds.left}px`);
          target.style.setProperty('--spotlight-y', `${y - bounds.top}px`);
        }
        logo.dataset['spotlight'] = 'active';
        frame = undefined;
      });
    };
    logo.addEventListener('pointerenter', track);
    logo.addEventListener('pointermove', track);
    logo.addEventListener('pointerleave', reset);
    logo.addEventListener('pointercancel', reset);
    reducedMotion.addEventListener('change', reset);
    return () => {
      reset();
      logo.removeEventListener('pointerenter', track);
      logo.removeEventListener('pointermove', track);
      logo.removeEventListener('pointerleave', reset);
      logo.removeEventListener('pointercancel', reset);
      reducedMotion.removeEventListener('change', reset);
    };
  }, []);
  return <Link ref={logoRef} to="/" aria-label="Aura home" className="brand-logo relative flex shrink-0 items-center gap-2.5 rounded-sm py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="aura-lens" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="oklch(0.78 0.16 300)" />
            <stop offset="1" stopColor="oklch(0.88 0.13 200)" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="12.5" stroke="url(#aura-lens)" strokeWidth="1.6" />
        <path d="M16 7.5 L22.8 20.5 L9.2 20.5 Z" stroke="url(#aura-lens)" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <circle cx="16" cy="16" r="2.1" fill="url(#aura-lens)" />
      </svg>
    </span>
    <span className="brand-wordmark relative leading-none" data-wordmark="Aura">Aura</span>
  </Link>;
}
