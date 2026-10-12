import { Link } from '@tanstack/react-router';

export function BrandLogo() {
  return <Link to="/" aria-label="Watchy home" className="brand-logo relative flex shrink-0 items-center rounded-sm py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background">
    <span className="brand-wordmark relative leading-none">Watchy<span className="logo-dot" aria-hidden="true">.</span></span>
  </Link>;
}
