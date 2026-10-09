import type { PlaybackProvider } from './types';

// No third-party provider is enabled until rights and documented embedding
// requirements have been verified. Metadata availability is not playback availability.
export const configuredProviders: PlaybackProvider[] = [];