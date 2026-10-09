import { describe, it, expect } from 'vitest';
import { catalog, searchCatalog } from '@/data/catalog';
describe('Demonstration metadata', () => {
  it('has distinct media identities and explicit demo sources', () => {
    expect(new Set(catalog.map(title => title.id)).size).toBe(catalog.length);
    expect(catalog.every(title => title.source === 'demo' && title.tmdbId && title.cast.length)).toBe(true);
  });
  it('searches titles, genres and cast without claiming live results', () => {
    expect(searchCatalog('Dune')[0]?.title).toBe('Dune: Part Two');
    expect(searchCatalog('Amy Adams')[0]?.title).toBe('Arrival');
    expect(searchCatalog('Mystery').length).toBeGreaterThan(0);
    expect(searchCatalog('no-matching-title')).toHaveLength(0);
  });
});