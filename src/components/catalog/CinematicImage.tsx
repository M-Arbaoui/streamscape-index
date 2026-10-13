import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = ImgHTMLAttributes<HTMLImageElement> & { frameClassName?: string };

export function CinematicImage(props: Props) {
  return <ImageFrame key={props.src} {...props} />;
}

function ImageFrame({ frameClassName, className, alt = '', ...props }: Props) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  return <div className={cn('cinematic-image relative overflow-hidden', frameClassName)} data-image-state={state} aria-busy={state === 'loading'}>
    {state === 'loading' && <div className="cinematic-skeleton absolute inset-0" role="status" aria-label={`Loading ${alt || 'artwork'}`} />}
    {state === 'error' && <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground" role="img" aria-label={`${alt || 'Artwork'} unavailable`}><ImageOff className="h-6 w-6" aria-hidden="true" /></div>}
    <img {...props} alt={alt} className={cn('cinematic-image-content h-full w-full object-cover', className)}
      ref={image => { if (image?.complete && image.naturalWidth > 0) setState('ready'); }}
      onLoad={event => { setState('ready'); props.onLoad?.(event); }}
      onError={event => { setState('error'); props.onError?.(event); }} />
  </div>;
}