import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export function BrandLogo() {
  const logoRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    const wordmark = logo.querySelector<HTMLElement>('.brand-wordmark');
    if (!wordmark) return;
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
      const bounds = wordmark.getBoundingClientRect();
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        wordmark.style.setProperty('--spotlight-x', `${x}px`);
        wordmark.style.setProperty('--spotlight-y', `${y}px`);
        logo.dataset.spotlight = 'active';
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
  return <Link ref={logoRef} to="/" aria-label="Watchy home" className="brand-logo relative flex shrink-0 items-center rounded-sm py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
    <span className="brand-wordmark relative leading-none" data-wordmark="Watchy.">Watchy<span className="logo-dot" aria-hidden="true">.</span></span>
  </Link>;
}
