import { useState, createContext, useContext, type ReactNode } from 'react';
import type { MediaTitle } from '@/services/metadata/types';
import { LibraryProvider } from './LibraryContext';
import { Navigation } from './Navigation';
import { SearchDialog } from './SearchDialog';
import { TitleDialog } from './TitleDialog';
import { useRouterState } from '@tanstack/react-router';
const CatalogActions = createContext<{ details: (title: MediaTitle) => void; play: (title: MediaTitle) => void; search: () => void }>({ details: () => {}, play: () => {}, search: () => {} });
export const useCatalogActions = () => useContext(CatalogActions);
export function CatalogShell({ children }: { children: ReactNode }) {
  const { loading, pathname } = useRouterState({ select: state => ({ loading: state.isLoading, pathname: state.location.pathname }) });
  const [search, setSearch] = useState(false);
  const [selected, setSelected] = useState<MediaTitle | null>(null);
  const [playback, setPlayback] = useState(false);
  const actions = { details: (title: MediaTitle) => { setPlayback(false); setSelected(title); }, play: (title: MediaTitle) => { setPlayback(true); setSelected(title); }, search: () => setSearch(true) };
  return <LibraryProvider><CatalogActions.Provider value={actions}><Navigation onSearch={actions.search} />{loading && <div className="navigation-loading fixed inset-x-0 top-0 z-50 h-0.5" role="status" aria-label="Loading page" />}<div key={pathname} className="catalog-transition">{children}</div><footer className="page-width mt-12 flex flex-wrap items-center justify-between gap-4 border-t py-7 text-[10px] text-muted-foreground"><span className="text-base font-extrabold text-foreground/60">Aura</span><span>Curated stories. Endless possibilities.</span><span>Demo catalog · Artwork from TMDB · Not endorsed by TMDB</span></footer><SearchDialog open={search} onClose={() => setSearch(false)} onDetails={actions.details} /><TitleDialog title={selected} onClose={() => setSelected(null)} initialPlayback={playback} /></CatalogActions.Provider></LibraryProvider>;
}