import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MediaTitle } from '@/services/metadata/types';
import { MediaCard } from './MediaCard';

export function MediaRow({ heading, titles, onDetails, ranked = false, onViewAll }: { heading: string; titles: MediaTitle[]; onDetails: (title: MediaTitle) => void; ranked?: boolean; onViewAll?: () => void }) {
  const row = useRef<HTMLDivElement>(null);
  return <section className="mb-10">
    <div className="page-width mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-3"><h2 className="truncate text-lg font-bold">{heading}</h2>{ranked && <span className="rounded border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">HOT</span>}</div>
      <div className="flex shrink-0 items-center gap-2">{onViewAll && <Button variant="ghost" size="sm" className="mr-2 text-[11px] text-muted-foreground" onClick={onViewAll}>View all <ArrowRight className="h-3 w-3" /></Button>}<Button variant="outline" size="icon" className="h-7 w-7 rounded-full" aria-label={`Scroll ${heading} left`} onClick={() => row.current?.scrollBy({ left: -600, behavior: 'smooth' })}><ChevronLeft /></Button><Button variant="outline" size="icon" className="h-7 w-7 rounded-full" aria-label={`Scroll ${heading} right`} onClick={() => row.current?.scrollBy({ left: 600, behavior: 'smooth' })}><ChevronRight /></Button></div>
    </div>
    <div ref={row} className="film-row page-width flex gap-5 overflow-x-auto pb-3 pt-1">{titles.map((title, index) => <MediaCard key={title.id} title={title} onDetails={onDetails} {...(ranked ? { rank: index + 1 } : {})} />)}</div>
  </section>;
}