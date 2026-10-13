import { Server } from 'lucide-react';
import { providerRegistry } from '@/playback/provider-registry';
import type { PlaybackRequest } from '@/playback/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ServerHub({ request, selected, onSelect }: { request: PlaybackRequest; selected: string | null; onSelect: (id: string) => void }) {
  const servers = providerRegistry.all();
  const playable = providerRegistry.compatible(request).length;
  const failover = playable > 1;
  return <section aria-label="Server Hub" className="border-t border-border pt-5">
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
        return <Button key={server.id} variant={active ? 'default' : 'secondary'} size="sm" type="button" role="radio" aria-checked={active} title={available ? server.name : `${server.name} — not verified yet`} onClick={() => onSelect(server.id)}
          className={cn('relative rounded-full px-4 text-xs font-bold', active && 'border border-primary', !available && !active && 'text-muted-foreground')}>
          {server.name}
          {server.badge && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-destructive px-1 text-[8px] font-extrabold leading-tight text-destructive-foreground">{server.badge}</span>}
        </Button>;
      })}
    </div>
  </section>;
}
