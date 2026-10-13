import { Check, Plus, Play, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { MediaTitle } from '@/services/metadata/types';
import { providerRegistry } from '@/playback/provider-registry';
import { useLibrary } from './LibraryContext';
import { ServerHub } from './ServerHub';
import { CinematicImage } from './CinematicImage';

export function TitleDialog({ title, onClose, initialPlayback = false }: { title: MediaTitle | null; onClose: () => void; initialPlayback?: boolean }) {
  const { saved, toggle } = useLibrary();
  const [playback, setPlayback] = useState(false);
  const [server, setServer] = useState<string | null>('2em');
  const showPlayback = playback || initialPlayback;
  const request = title ? { mediaId: title.id, mediaType: title.mediaType, providerIds: title.externalIds } : null;
  const resolved = request ? providerRegistry.resolveWithFailover(server, request) : null;
  const serverName = providerRegistry.all().find(p => p.id === server)?.name;
  return <Dialog open={Boolean(title)} onOpenChange={open => { if (!open) { setPlayback(false); onClose(); } }}>
    <DialogContent className="max-h-[90dvh] max-w-3xl overflow-y-auto border-border bg-card p-0">
      {title && <><div className="grid grid-cols-[100px_minmax(0,1fr)] gap-5 p-6 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8 sm:p-8"><img src={title.poster} alt={title.title} className="w-full rounded-md" /><div className="min-w-0 pr-3"><p className="mb-3 text-[10px] font-bold uppercase text-primary">{title.mediaType === 'movie' ? 'Movie' : 'TV Series'} · Demo catalog</p><DialogTitle className="font-display text-2xl leading-tight sm:text-3xl">{title.title}</DialogTitle><div className="my-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1 text-primary"><Star className="h-3 w-3 fill-current" />{title.rating}</span><span>{title.releaseDate.slice(0, 4)}</span><span>{title.runtime ? `${title.runtime} min` : `${title.seasons} seasons`}</span><span className="rounded border px-1.5 py-0.5">{title.certification}</span></div><DialogDescription className="leading-6">{title.overview}</DialogDescription><div className="mt-5 flex flex-wrap gap-2"><Button onClick={() => setPlayback(true)}><Play className="fill-current" />Play</Button><Button variant="secondary" onClick={() => toggle(title.id)}>{saved.includes(title.id) ? <Check /> : <Plus />}{saved.includes(title.id) ? 'In My List' : 'My List'}</Button></div></div></div><div className="border-t px-6 py-5 text-sm sm:px-8"><p className="mb-3"><span className="text-muted-foreground">Genres: </span>{title.genres.join(', ')}</p><p><span className="text-muted-foreground">Cast: </span>{title.cast.join(', ')}</p>{title.director && <p className="mt-3"><span className="text-muted-foreground">Director: </span>{title.director}</p>}</div>{showPlayback && request && <div className="space-y-4 border-t bg-background p-6 sm:px-8">
        {resolved ? <iframe src={resolved.url} title={`${title.title} player`} className="aspect-video w-full rounded-md" allow="fullscreen; encrypted-media" referrerPolicy="no-referrer" /> : <div role="status" className="flex aspect-video flex-col items-center justify-center rounded-md border bg-card p-6 text-center"><h3 className="font-bold">Playback unavailable{serverName ? ` on ${serverName}` : ''}</h3><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">This server isn't verified yet, and no other verified server could take over. You can still explore the catalog and add this title to My List.</p></div>}
        <ServerHub request={request} selected={server} onSelect={setServer} />
      </div>}</>}
    </DialogContent>
  </Dialog>;
}