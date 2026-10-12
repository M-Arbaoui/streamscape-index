import { useEffect, useId, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const PRISM_G = 'M13 3H27L24 9H16L9 16V24L16 31H24L31 24V20H37V27L27 37H13L3 27V13Z M19 15.5L31 20L19 24.5Z';
const spring = { stiffness: 330, damping: 24, mass: 0.7 };
const mechanicalSpring = { stiffness: 390, damping: 21, mass: 0.8 };

export function BrandLogo() {
  const anchor = useRef<HTMLAnchorElement | null>(null);
  const bounds = useRef<DOMRect | null>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const light = useMotionValue(0);
  const sweep = useMotionValue(-20);
  const lean = useMotionValue(0);
  const animatedX = useSpring(x, spring);
  const animatedY = useSpring(y, spring);
  const animatedRotateX = useSpring(rotateX, spring);
  const animatedRotateY = useSpring(rotateY, spring);
  const animatedScale = useSpring(scale, spring);
  const animatedLight = useSpring(light, spring);
  const animatedSweep = useSpring(sweep, { stiffness: 170, damping: 24 });
  const animatedLean = useSpring(lean, mechanicalSpring);
  const gleamX = useTransform(animatedSweep, [-20, 120], [-26, 44]);
  const leftFacet = useTransform(animatedLean, [-1, 0, 1], [1, 0.62, 0.4]);
  const rightFacet = useTransform(animatedLean, [-1, 0, 1], [0.4, 0.62, 1]);
  const playOpacity = useTransform(animatedLight, [0, 1], [0.7, 1]);
  const playShift = useTransform(animatedLean, [-1, 1], [-0.8, 1.2]);
  const clipId = `glint-prism-${useId().replace(/:/g, '')}`;
  const sweepPosition = useTransform(animatedSweep, value => `${value}%`);

  useEffect(() => {
    const node = anchor.current;
    if (!node || reducedMotion) return;

    const reset = () => {
      bounds.current = null;
      x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
      scale.set(1); light.set(0); sweep.set(-20);
      lean.set(0);
    };

    const track = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = bounds.current ?? node.getBoundingClientRect();
      bounds.current = rect;
      const horizontal = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const vertical = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      x.set(horizontal * 3); y.set(vertical * 2);
      rotateX.set(-vertical * 5); rotateY.set(horizontal * 7);
      scale.set(1.025); light.set(1); sweep.set((horizontal + 1) * 60);
      lean.set(horizontal);
    };

    const activate = () => {
      light.set(1); lean.set(0.4); scale.set(1.025); sweep.set(60);
    };

    node.addEventListener('pointerenter', track);
    node.addEventListener('pointermove', track);
    node.addEventListener('pointerleave', reset);
    node.addEventListener('pointercancel', reset);
    node.addEventListener('focus', activate);
    node.addEventListener('blur', reset);
    return () => {
      node.removeEventListener('pointerenter', track);
      node.removeEventListener('pointermove', track);
      node.removeEventListener('pointerleave', reset);
      node.removeEventListener('pointercancel', reset);
      node.removeEventListener('focus', activate);
      node.removeEventListener('blur', reset);
      reset();
    };
  }, [reducedMotion]);

  return <Link ref={anchor} to="/" aria-label="Glint home" className="brand-logo relative flex shrink-0 items-center py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm">
    <motion.span className="brand-logo-body relative flex items-center gap-2.5" style={{ x: animatedX, y: animatedY, rotateX: animatedRotateX, rotateY: animatedRotateY, scale: animatedScale }}>
      <span aria-hidden="true" className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg className="brand-flare relative h-9 w-9 overflow-visible" viewBox="0 0 40 40" fill="none">
          <defs><clipPath id={clipId}><path d={PRISM_G} /></clipPath></defs>
          <motion.path d="M13 3H27L24 9H16ZM3 13L13 3L16 9L9 16Z" fill="currentColor" style={{ opacity: leftFacet }} />
          <path d="M3 13L9 16V24L3 27Z" fill="currentColor" opacity="0.85" />
          <motion.path d="M3 27L9 24L16 31L13 37ZM13 37L16 31H24L27 37Z" fill="currentColor" style={{ opacity: leftFacet }} />
          <motion.path d="M27 37L24 31L31 24L37 27ZM37 27L31 24V20H37Z" fill="currentColor" style={{ opacity: rightFacet }} />
          <path d={PRISM_G} stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" opacity="0.9" />
          <motion.path className="text-foreground" d="M19 15.5L31 20L19 24.5Z" fill="currentColor" style={{ opacity: playOpacity, x: playShift }} />
          <g clipPath={`url(#${clipId})`}><motion.rect className="text-foreground" y="-4" width="6" height="48" fill="currentColor" transform="skewX(-20)" style={{ x: gleamX, opacity: animatedLight }} /></g>
        </svg>
      </span>
      <span className="brand-wordmark relative text-[21px] font-extrabold sm:text-[23px]">Glint<span className="text-primary">.</span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><motion.span className="brand-logo-sweep absolute inset-y-0 w-7" style={{ left: sweepPosition, opacity: animatedLight }} /></span>
      </span>
    </motion.span>
  </Link>;
}
