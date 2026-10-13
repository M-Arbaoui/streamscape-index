import { Plus, Check, Star, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MediaTitle } from '@/services/metadata/types';
import { useLibrary } from './LibraryContext';
import { CinematicImage } from './CinematicImage';

export function MediaCard({ title, onDetails, rank }: { title: MediaTitle; onDetails: (title: MediaTitle) => void; rank?: number }) {
  const { saved, toggle } = useLibrary();
  const inList = saved.includes(title.id);
  return <article className="media-card group min-w-0">
    <div className="poster-wrap">
      <Button variant="ghost" className="absolute inset-0 h-full w-full rounded-none p-0 hover:bg-transparent" onClick={() => onDetails(title)} aria-label={`Details for ${title.title}`}>
        <CinematicImage src={title.poster} alt={`${title.title} poster`} loading="lazy" frameClassName="h-full w-full" className="transition-transform duration-500 group-hover:scale-[1.025]" />
      </Button>
      {rank && <span className="pointer-events-none absolute left-3 top-3 rounded border border-primary/30 bg-background/75 px-2 py-1 text-[10px] font-extrabold text-primary backdrop-blur-md">TOP {rank < 10 ? `0${rank}` : rank}</span>}
      <div className="card-details pointer-events-none absolute inset-0 flex flex-col justify-end p-3">
        <div className="quick-info mb-2"><p className="text-xs font-semibold">{title.genres.slice(0, 2).join(' · ')}</p><p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-foreground/75">{title.overview}</p></div>
        <div className="pointer-events-auto flex justify-between">
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full backdrop-blur-md" onClick={() => onDetails(title)} aria-label={`More about ${title.title}`} title="More details"><ArrowUpRight /></Button>
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full backdrop-blur-md" onClick={() => toggle(title.id)} aria-label={`${inList ? 'Remove' : 'Add'} ${title.title} ${inList ? 'from' : 'to'} My List`} title={inList ? 'Remove from My List' : 'Add to My List'}>{inList ? <Check className="text-primary" /> : <Plus />}</Button>
        </div>
      </div>
    </div>
    <h3 className="mt-3 truncate text-[13px] font-bold">{title.title}</h3>
    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground"><span>{title.releaseDate.slice(0, 4)}</span><span>·</span><span>{title.mediaType === 'movie' ? 'Movie' : 'Series'}</span><span className="ml-auto flex items-center gap-1 text-foreground/85"><Star className="h-3 w-3 fill-primary text-primary" />{title.rating.toFixed(1)}</span></div>
  </article>;
}