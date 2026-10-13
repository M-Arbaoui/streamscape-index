import { useState } from 'react';
import { Play, Plus, Check, Info, Star, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { catalog } from '@/data/catalog';
import type { MediaTitle } from '@/services/metadata/types';
import { useLibrary } from './LibraryContext';
import { CinematicImage } from './CinematicImage';
import duneArt from '@/assets/dune-hero.asset.json';
import interstellarArt from '@/assets/interstellar-hero.asset.json';
import batmanArt from '@/assets/batman-hero.asset.json';

const features = [{ title: catalog[0], artwork: duneArt.url }, { title: catalog[1], artwork: interstellarArt.url }, { title: catalog[2], artwork: batmanArt.url }];
export function Hero({ onDetails, onPlay }: { onDetails: (title: MediaTitle) => void; onPlay: (title: MediaTitle) => void }) {
  const [active, setActive] = useState(0);
  const { saved, toggle } = useLibrary();
  const feature = features[active];
  if (!feature?.title) return null;
  const title = feature.title;
  return <section className="hero">
    <CinematicImage src={feature.artwork} alt={`${title.title} cinematic backdrop`} frameClassName="hero-art" className="hero-artwork" fetchPriority="high" />
    <div key={title.id} className="hero-copy page-width absolute inset-x-0 top-[145px] z-10 sm:top-[185px]">
      <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-primary">In the spotlight</span><span className="ml-2 rounded border border-foreground/20 px-2 py-0.5 text-[9px]">MOVIE</span><span className="rounded border border-foreground/20 px-2 py-0.5 text-[9px]">DEMO CATALOG</span></div>
      <h1 className="hero-title max-w-xl">{active === 0 ? 'Dune' : title.title}</h1>{active === 0 && <p className="hero-subtitle">PART TWO</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-foreground/80"><span className="flex items-center gap-1.5 font-bold text-primary"><Star className="h-3.5 w-3.5 fill-current" />{title.rating}</span><span className="text-muted-foreground">|</span><span>{title.releaseDate.slice(0, 4)}</span><span className="rounded border border-foreground/25 px-1.5 py-0.5 text-[10px]">{title.certification}</span><span>{Math.floor((title.runtime ?? 0) / 60)}h {(title.runtime ?? 0) % 60}m</span><span className="hidden sm:inline">{title.genres.slice(0, 2).join(' · ')}</span></div>
      <p className="mt-5 max-w-[450px] line-clamp-3 text-[13px] leading-[1.9] text-foreground/70 sm:line-clamp-none">{active === 0 ? 'Paul Atreides unites with Chani and the Fremen on a path of revenge, while facing a choice between the love of his life and the fate of the universe.' : title.overview}</p>
      <div className="mt-7 flex items-center gap-3"><Button size="lg" className="h-11 px-6 font-bold" onClick={() => onPlay(title)}><Play className="fill-current" />Play now</Button><Button variant="secondary" size="lg" className="h-11 px-5 backdrop-blur-md" onClick={() => onDetails(title)}><Info />More info</Button><Button variant="secondary" size="icon" className="h-11 w-11 backdrop-blur-md" onClick={() => toggle(title.id)} aria-label={saved.includes(title.id) ? 'Remove featured title from My List' : 'Add featured title to My List'} title="My List">{saved.includes(title.id) ? <Check className="text-primary" /> : <Plus />}</Button></div>
    </div>
    <div className="page-width absolute inset-x-0 bottom-[68px] z-10 flex items-center justify-between"><div className="flex items-center gap-2">{features.map((item, index) => <Button key={item.title?.id} variant="ghost" size="icon" className="h-8 w-8 hover:bg-transparent" onClick={() => setActive(index)} aria-label={`Feature ${item.title?.title}`} aria-pressed={active === index}><span className="featured-dot" data-active={active === index} /></Button>)}<span className="ml-3 text-[10px] text-muted-foreground">0{active + 1}<span className="mx-2 text-muted-foreground/50">/</span>03</span></div><Button variant="ghost" className="hidden text-[10px] text-foreground/55 sm:flex" onClick={() => onDetails(title)}>EXPLORE THE STORY<ArrowUpRight className="ml-1 h-3 w-3" /></Button></div>
  </section>;
}