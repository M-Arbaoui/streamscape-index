import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

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
  const shutter = useMotionValue(0);
  const aperture = useMotionValue(0);
  const animatedX = useSpring(x, spring);
  const animatedY = useSpring(y, spring);
  const animatedRotateX = useSpring(rotateX, spring);
  const animatedRotateY = useSpring(rotateY, spring);
  const animatedScale = useSpring(scale, spring);
  const animatedLight = useSpring(light, spring);
  const animatedSweep = useSpring(sweep, { stiffness: 170, damping: 24 });
  const animatedShutter = useSpring(shutter, mechanicalSpring);
  const animatedAperture = useSpring(aperture, mechanicalSpring);
  const iconScale = useTransform(animatedAperture, [0, 18], [1, 1.12]);
  const sweepPosition = useTransform(animatedSweep, value => `${value}%`);

  useEffect(() => {
    const node = anchor.current;
    if (!node || reducedMotion) return;

    const reset = () => {
      bounds.current = null;
      x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
      scale.set(1); light.set(0); sweep.set(-20);
      shutter.set(0); aperture.set(0);
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
      shutter.set(48 + horizontal * 28); aperture.set(14 + (horizontal + 1) * 2);
    };

    const activate = () => {
      light.set(1); shutter.set(48); aperture.set(16); scale.set(1.025); sweep.set(60);
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
    };
  }, [reducedMotion]);

  return <Link ref={anchor} to="/" aria-label="Glint home" className="brand-logo relative flex shrink-0 items-center py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm">
    <motion.span className="brand-logo-body relative flex items-center gap-2.5" style={{ x: animatedX, y: animatedY, rotateX: animatedRotateX, rotateY: animatedRotateY, scale: animatedScale }}>
      <span aria-hidden="true" className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <motion.svg className="relative h-8 w-8 text-primary" viewBox="0 0 32 32" fill="none" style={{ rotate: animatedShutter, scale: iconScale }}>
          <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
          {[0, 60, 120, 180, 240, 300].map(angle => <g key={angle} transform={`rotate(${angle} 16 16)`}>
            <motion.path d="M16 3.5 L26.8 9.75 L21.3 16 L16 10.2 Z" fill="currentColor" style={{ rotate: animatedAperture, transformOrigin: '16px 16px' }} />
          </g>)}
        </motion.svg>
        <svg className="absolute h-3 w-3 text-foreground" viewBox="0 0 12 12" fill="currentColor"><path d="M4 2.5 L9 6 L4 9.5 Z" /></svg>
      </span>
      <span className="brand-wordmark relative text-[21px] font-extrabold sm:text-[23px]">Glint<span className="text-primary">.</span>
        <span aria-hidden="true" className="pointer-events-none absolute -inset-2 overflow-hidden"><motion.span className="brand-logo-sweep absolute inset-y-0 w-10" style={{ left: sweepPosition, opacity: animatedLight }} /></span>
      </span>
    </motion.span>
  </Link>;
}
