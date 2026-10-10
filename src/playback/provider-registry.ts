import { configuredProviders } from './provider-config';
import type { PlaybackProvider, PlaybackRequest } from './types';

export function validateEmbedUrl(value: string, origins: string[]): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && origins.includes(url.origin) ? url.href : null;
  } catch { return null; }
}

export class ProviderRegistry {
  private providers = new Map<string, PlaybackProvider>();
  constructor(providers: PlaybackProvider[] = []) { providers.forEach(provider => this.register(provider)); }
  register(provider: PlaybackProvider) {
    if (this.providers.has(provider.id)) throw new Error(`Duplicate provider: ${provider.id}`);
    this.providers.set(provider.id, provider);
  }
  compatible(request: PlaybackRequest) {
    return [...this.providers.values()].filter(provider => provider.enabled && provider.verified && provider.mediaTypes.includes(request.mediaType) && Boolean(request.providerIds[provider.requiredIdentifier]) && (request.mediaType !== 'tv' || provider.capabilities.episodes));
  }
  all() {
    return [...this.providers.values()].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
  }
  isPlayable(id: string, request: PlaybackRequest) {
    return this.compatible(request).some(item => item.id === id);
  }
  resolve(id: string, request: PlaybackRequest) {
    const provider = this.compatible(request).find(item => item.id === id);
    if (!provider) return null;
    const value = provider.getEmbedUrl(request);
    return value ? validateEmbedUrl(value, provider.allowedOrigins) : null;
  }
  /** Preferred source first, then remaining compatible sources by priority; first valid embed wins. */
  resolveWithFailover(preferredId: string | null, request: PlaybackRequest) {
    const ordered = this.compatible(request).sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
    const chain = preferredId ? [...ordered.filter(p => p.id === preferredId), ...ordered.filter(p => p.id !== preferredId)] : ordered;
    for (const provider of chain) {
      const url = this.resolve(provider.id, request);
      if (url) return { providerId: provider.id, url };
    }
    return null;
  }
}
export const providerRegistry = new ProviderRegistry(configuredProviders);