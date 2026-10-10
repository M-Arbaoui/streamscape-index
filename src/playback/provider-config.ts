import type { PlaybackProvider } from './types';

// Server Hub sources. Each entry is registered so it appears in source selection,
// but stays disabled/unverified with no embed routing until authorization,
// documented embed URLs, required identifiers and allowed origins are confirmed.
// Metadata availability is not playback availability.
const servers: { id: string; label: string; badge?: string }[] = [
  { id: 'vcc', label: 'VCC' }, { id: 've', label: 'VE' }, { id: 'hdh', label: 'HDH', badge: 'NOT FOR CHROME' },
  { id: '2em', label: '2EM' }, { id: 'vf', label: 'VF' }, { id: 'vc', label: 'VC' }, { id: 'rive', label: 'RIVE' },
  { id: 'zee', label: 'ZEE' }, { id: 'air', label: 'AIR' }, { id: 'sync', label: 'SYNC' }, { id: 'rock', label: 'ROCK' },
  { id: 'hexa', label: 'HEXA' }, { id: 'ora', label: 'ORA' }, { id: 'peach', label: 'PEACH' }, { id: 'map', label: 'MAP' },
  { id: 'king', label: 'KING' }, { id: 'tou', label: 'TOU' }, { id: 'vse', label: 'VSE' }, { id: '111m', label: '111M' },
  { id: 'fm', label: 'FM' }, { id: 'cos', label: 'COS' }, { id: 'lux', label: 'LUX' },
];

export const configuredProviders: PlaybackProvider[] = servers.map((server, index) => ({
  id: server.id,
  name: server.label,
  badge: server.badge,
  priority: index,
  enabled: false,
  verified: false,
  mediaTypes: ['movie', 'tv'],
  requiredIdentifier: `${server.id}Id`,
  allowedOrigins: [],
  capabilities: { subtitles: 'unknown', progress: 'unknown', episodes: true },
  embedMethod: 'iframe',
  limitations: ['Not verified: authorization, embed URL format and allowed origins are unconfirmed.', ...(server.badge ? [server.badge] : [])],
  getEmbedUrl: () => null,
}));
