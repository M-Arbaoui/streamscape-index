import { describe, it, expect } from 'vitest';
import { ProviderRegistry, validateEmbedUrl } from '@/playback/provider-registry';
import type { PlaybackProvider, PlaybackRequest } from '@/playback/types';
const request: PlaybackRequest = { mediaId: 'movie-1', mediaType: 'movie', providerIds: { licensedId: 'film-1' } };
const adapter: PlaybackProvider = { id: 'test', name: 'Test only', enabled: true, verified: true, mediaTypes: ['movie'], requiredIdentifier: 'licensedId', allowedOrigins: ['https://example.com'], capabilities: { episodes: false, subtitles: 'unknown', progress: false }, embedMethod: 'iframe', limitations: [], getEmbedUrl: () => 'https://example.com/embed/film-1' };
describe('Playback registry boundaries', () => {
  it('requires verified adapters and explicit identifiers', () => {
    expect(new ProviderRegistry([adapter]).compatible(request)).toHaveLength(1);
    expect(new ProviderRegistry([adapter]).compatible({ ...request, providerIds: {} })).toHaveLength(0);
    expect(new ProviderRegistry([{ ...adapter, verified: false }]).compatible(request)).toHaveLength(0);
  });
  it('validates secure exact origins and forbids URL credentials', () => {
    expect(validateEmbedUrl('https://example.com/embed/1', adapter.allowedOrigins)).toBeTruthy();
    for (const value of ['http://example.com/embed/1', 'https://example.com.evil.test/embed', 'javascript:alert(1)', 'https://user:pass@example.com/embed']) expect(validateEmbedUrl(value, adapter.allowedOrigins)).toBeNull();
  });
  it('does not advertise playback without configured providers', () => { expect(new ProviderRegistry().compatible(request)).toHaveLength(0); });
});