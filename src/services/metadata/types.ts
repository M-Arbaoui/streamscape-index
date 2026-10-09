export type MediaType = 'movie' | 'tv';

export interface MediaTitle {
  id: string;
  tmdbId: number;
  imdbId?: string;
  mediaType: MediaType;
  title: string;
  originalTitle: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  poster: string;
  backdrop: string;
  overview: string;
  genres: string[];
  rating: number;
  runtime?: number;
  seasons?: number;
  certification: string;
  cast: string[];
  director?: string;
  externalIds: Record<string, string>;
  source: 'demo' | 'tmdb' | 'tvmaze';
}

export interface MetadataService {
  source: string;
  getTitle(id: string): Promise<MediaTitle | undefined>;
  search(query: string): Promise<MediaTitle[]>;
  discover(mediaType?: MediaType, genre?: string): Promise<MediaTitle[]>;
}