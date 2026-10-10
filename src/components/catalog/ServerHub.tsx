import { Server } from 'lucide-react';
import { providerRegistry } from '@/playback/provider-registry';
import type { PlaybackRequest } from '@/playback/types';
import { cn } from '@/lib/utils';

export function ServerHub({ request, selected, onSelect }: { request: PlaybackRequest; selected: string | null; onSelect: (id: string) => void }) {
  const servers = providerRegistry.all();
  const playable = providerRegistry.compatible(request).length;
  const failover = playable > 1;
  return <section aria-label="Server Hub" className="rounded-lg border bg-background/60 p-4">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide"><Server className="h-4 w-4 text-primary" />Server Hub</h3>
      <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
        <span className={cn('h-2 w-2 rounded-full', failover ? 'bg-primary animate-pulse' : 'bg-muted-foreground')} />
        {failover ? 'Auto-failover active' : 'Auto-failover standby'}
      </span>
    </div>
    <div role="radiogroup" aria-label="Playback server" className="flex flex-wrap gap-2">
      {servers.map(server => {
        const active = selected === server.id;
        const available = providerRegistry.isPlayable(server.id, request);
        return <button key={server.id} type="button" role="radio" aria-checked={active} title={available ? server.name : `${server.name} — not verified yet`} onClick={() => onSelect(server.id)}
          className={cn('relative rounded-full border px-4 py-1.5 text-xs font-bold transition-colors', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-accent', !available && !active && 'opacity-60')}>
          {server.name}
          {server.badge && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-destructive px-1 text-[8px] font-extrabold leading-tight text-destructive-foreground">{server.badge}</span>}
        </button>;
      })}
    </div>
  </section>;
}
