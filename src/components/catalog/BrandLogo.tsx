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
  const horizontalRay = useMotionValue(1);
  const verticalRay = useMotionValue(1);
  const animatedX = useSpring(x, spring);
  const animatedY = useSpring(y, spring);
  const animatedRotateX = useSpring(rotateX, spring);
  const animatedRotateY = useSpring(rotateY, spring);
  const animatedScale = useSpring(scale, spring);
  const animatedLight = useSpring(light, spring);
  const animatedSweep = useSpring(sweep, { stiffness: 170, damping: 24 });
  const animatedHorizontalRay = useSpring(horizontalRay, mechanicalSpring);
  const animatedVerticalRay = useSpring(verticalRay, mechanicalSpring);
  const glintOpacity = useTransform(animatedLight, [0, 1], [0.45, 1]);
  const sweepPosition = useTransform(animatedSweep, value => `${value}%`);

  useEffect(() => {
    const node = anchor.current;
    if (!node || reducedMotion) return;

    const reset = () => {
      bounds.current = null;
      x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
      scale.set(1); light.set(0); sweep.set(-20);
      horizontalRay.set(1); verticalRay.set(1);
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
      horizontalRay.set(1.15 + (horizontal + 1) * 0.1);
      verticalRay.set(1.1 + (vertical + 1) * 0.08);
    };

    const activate = () => {
      light.set(1); horizontalRay.set(1.25); verticalRay.set(1.18); scale.set(1.025); sweep.set(60);
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
        <motion.svg className="brand-flare relative h-9 w-9" viewBox="0 0 40 40" fill="none">
          <motion.path className="brand-flare-ray" d="M6 20 L20 16.5 L34 20 L20 23.5 Z" fill="currentColor" style={{ scaleX: animatedHorizontalRay, transformOrigin: '20px 20px' }} />
          <motion.path className="brand-flare-ray" d="M20 5 L23.5 20 L20 35 L16.5 20 Z" fill="currentColor" style={{ scaleY: animatedVerticalRay, transformOrigin: '20px 20px' }} />
          <motion.path className="text-foreground" d="M20 14 L21.5 18.5 L26 20 L21.5 21.5 L20 26 L18.5 21.5 L14 20 L18.5 18.5 Z" fill="currentColor" style={{ opacity: glintOpacity }} />
        </motion.svg>
      </span>
      <span className="brand-wordmark relative text-[21px] font-extrabold sm:text-[23px]">Glint<span className="text-primary">.</span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><motion.span className="brand-logo-sweep absolute inset-y-0 w-7" style={{ left: sweepPosition, opacity: animatedLight }} /></span>
      </span>
    </motion.span>
  </Link>;
}
