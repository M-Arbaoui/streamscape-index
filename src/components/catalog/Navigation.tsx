import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ChevronDown, Menu, Bookmark, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const links = [{ label: 'Home', to: '/' }, { label: 'Discover', to: '/discover' }, { label: 'Movies', to: '/movies' }, { label: 'Series', to: '/series' }, { label: 'Trending', to: '/trending' }, { label: 'My List', to: '/my-list' }] as const;
export function Navigation({ onSearch }: { onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`page-width fixed inset-x-0 top-0 z-40 grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-colors duration-300 ${scrolled ? 'border-b border-border bg-background/95 backdrop-blur-xl' : 'bg-transparent'}`}>
    <div className="flex min-w-0 items-center gap-12"><Link to="/" aria-label="Frame home" className="flex shrink-0 items-center gap-2.5"><span className="relative block h-6 w-5 border-y-[3px] border-l-[3px] border-primary"><span className="absolute right-0 top-1 h-2 w-[3px] bg-primary" /><span className="absolute -right-1 bottom-0 h-2 w-[3px] bg-primary" /></span><span className="text-[23px] font-extrabold">frame<span className="text-primary">.</span></span></Link><nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{links.map(link => <Link key={link.to} to={link.to} activeOptions={{ exact: true }} activeProps={{ className: 'text-foreground after:bg-primary' }} inactiveProps={{ className: 'text-foreground/55 after:bg-transparent' }} className="relative py-7 text-[12px] font-semibold transition-colors hover:text-foreground after:absolute after:inset-x-2 after:bottom-3 after:h-0.5 after:rounded-full">{link.label}</Link>)}</nav></div>
    <div className="flex shrink-0 items-center gap-3 sm:gap-5">
      <Button variant="ghost" size="icon" onClick={onSearch} aria-label="Search titles" title="Search"><Search className="h-[19px] w-[19px]" /></Button>
      <span className="hidden h-5 w-px bg-border sm:block" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" className="gap-2 p-0" aria-label="Profile menu"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">M</span><ChevronDown className="hidden h-3 w-3 text-muted-foreground sm:block" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled><UserRound />Guest profile</DropdownMenuItem>
          <DropdownMenuItem asChild><Link to="/my-list"><Bookmark />My List</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">{links.map(link => <DropdownMenuItem asChild key={link.to}><Link to={link.to}>{link.label}</Link></DropdownMenuItem>)}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>;
}