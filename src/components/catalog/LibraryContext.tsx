import { createContext, useContext, useState, type ReactNode } from 'react';

const LibraryContext = createContext<{ saved: string[]; toggle: (id: string) => void }>({ saved: [], toggle: () => {} });
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  function toggle(id: string) { setSaved(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]); }
  return <LibraryContext.Provider value={{ saved, toggle }}>{children}</LibraryContext.Provider>;
}
export const useLibrary = () => useContext(LibraryContext);