import { useRef, type PointerEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const spring = { stiffness: 260, damping: 22, mass: 0.65 };

export function BrandLogo() {
  const bounds = useRef<DOMRect | null>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const light = useMotionValue(0);
  const sweep = useMotionValue(-140);
  const animatedX = useSpring(x, spring);
  const animatedY = useSpring(y, spring);
  const animatedRotateX = useSpring(rotateX, spring);
  const animatedRotateY = useSpring(rotateY, spring);
  const animatedScale = useSpring(scale, spring);
  const animatedLight = useSpring(light, spring);
  const animatedSweep = useSpring(sweep, { stiffness: 110, damping: 23 });

  const reset = () => {
    bounds.current = null;
    x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
    scale.set(1); light.set(0); sweep.set(-140);
  };

  const track = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const rect = bounds.current ?? event.currentTarget.getBoundingClientRect();
    bounds.current = rect;
    const horizontal = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const vertical = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    x.set(horizontal * 3); y.set(vertical * 2);
    rotateX.set(-vertical * 9); rotateY.set(horizontal * 12);
    scale.set(1.045); light.set(1); sweep.set(horizontal * 85);
  };

  return <Link to="/" aria-label="Frame home" className="brand-logo relative flex shrink-0 items-center py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm" onPointerEnter={track} onPointerMove={track} onPointerLeave={reset} onPointerCancel={reset} onBlur={reset}>
    <motion.span className="brand-logo-body relative flex items-center gap-2.5" style={{ x: animatedX, y: animatedY, rotateX: animatedRotateX, rotateY: animatedRotateY, scale: animatedScale }}>
      <motion.span aria-hidden="true" className="brand-logo-glow absolute -inset-2 rounded-sm" style={{ opacity: animatedLight }} />
      <span aria-hidden="true" className="relative block h-6 w-5 border-y-[3px] border-l-[3px] border-primary"><span className="absolute right-0 top-1 h-2 w-[3px] bg-primary" /><span className="absolute -right-1 bottom-0 h-2 w-[3px] bg-primary" /></span>
      <span className="relative text-[23px] font-extrabold">frame<span className="text-primary">.</span></span>
      <span aria-hidden="true" className="pointer-events-none absolute -inset-1 overflow-hidden rounded-sm"><motion.span className="brand-logo-sweep absolute inset-y-0 left-1/2 w-8" style={{ x: animatedSweep, opacity: animatedLight }} /></span>
    </motion.span>
  </Link>;
}