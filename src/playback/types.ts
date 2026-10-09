import type { MediaType } from '@/services/metadata/types';

export interface PlaybackRequest {
  mediaId: string;
  mediaType: MediaType;
  providerIds: Record<string, string>;
  season?: number;
  episode?: number;
}
export interface PlaybackProvider {
  id: string;
  name: string;
  enabled: boolean;
  verified: boolean;
  mediaTypes: MediaType[];
  requiredIdentifier: string;
  allowedOrigins: string[];
  capabilities: { subtitles: boolean | 'unknown'; progress: boolean | 'unknown'; episodes: boolean };
  embedMethod: 'iframe';
  limitations: string[];
  getEmbedUrl(request: PlaybackRequest): string | null;
}