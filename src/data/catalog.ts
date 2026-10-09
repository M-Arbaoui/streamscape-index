import type { MediaTitle, MetadataService } from '@/services/metadata/types';
import dune from '@/assets/dune.asset.json';
import hero from '@/assets/dune-hero.asset.json';
import interstellar from '@/assets/interstellar.asset.json';
import batman from '@/assets/batman.asset.json';
import blade from '@/assets/blade.asset.json';
import oppenheimer from '@/assets/oppenheimer.asset.json';
import shogun from '@/assets/shogun.asset.json';
import severance from '@/assets/severance.asset.json';
import lastofus from '@/assets/lastofus.asset.json';
import breakingbad from '@/assets/breakingbad.asset.json';
import bear from '@/assets/bear.asset.json';
import arrival from '@/assets/arrival.asset.json';
import dark from '@/assets/dark.asset.json';

type Seed = [number, string, string, 'movie' | 'tv', number, string[], string, string[], string, number];
const seeds: Seed[] = [
  [693134, 'Dune: Part Two', dune.url, 'movie', 8.5, ['Science Fiction', 'Adventure'], 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between love and the fate of the universe, he must prevent a terrible future only he can foresee.', ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'], '2024-03-01', 167],
  [157336, 'Interstellar', interstellar.url, 'movie', 8.7, ['Science Fiction', 'Drama'], 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.', ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], '2014-11-07', 169],
  [414906, 'The Batman', batman.url, 'movie', 7.8, ['Crime', 'Thriller'], 'When a killer targets Gotham’s elite, Batman follows a trail of cryptic clues into the city’s darkest corners.', ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'], '2022-03-04', 176],
  [335984, 'Blade Runner 2049', blade.url, 'movie', 8.0, ['Science Fiction', 'Thriller'], 'A new blade runner unearths a long-buried secret that leads him to a former blade runner missing for thirty years.', ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'], '2017-10-06', 164],
  [872585, 'Oppenheimer', oppenheimer.url, 'movie', 8.3, ['Drama', 'History'], 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.'], '2023-07-21', 180],
  [126308, 'Shōgun', shogun.url, 'tv', 8.6, ['Drama', 'History'], 'In Japan in 1600, Lord Toranaga fights for his life as his enemies unite against him, while a mysterious European ship arrives in a nearby village.', ['Hiroyuki Sanada', 'Anna Sawai', 'Cosmo Jarvis'], '2024-02-27', 1],
  [95396, 'Severance', severance.url, 'tv', 8.7, ['Drama', 'Mystery'], 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.', ['Adam Scott', 'Britt Lower', 'Patricia Arquette'], '2022-02-18', 2],
  [100088, 'The Last of Us', lastofus.url, 'tv', 8.6, ['Drama', 'Adventure'], 'Twenty years after civilization has been destroyed, Joel is hired to smuggle Ellie out of an oppressive quarantine zone.', ['Pedro Pascal', 'Bella Ramsey'], '2023-01-15', 2],
  [1396, 'Breaking Bad', breakingbad.url, 'tv', 9.0, ['Crime', 'Drama'], 'A chemistry teacher diagnosed with cancer turns to a life of crime to secure his family’s future.', ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'], '2008-01-20', 5],
  [136315, 'The Bear', bear.url, 'tv', 8.3, ['Drama', 'Comedy'], 'A young chef from the fine dining world comes home to Chicago to run his family’s sandwich shop.', ['Jeremy Allen White', 'Ayo Edebiri', 'Ebon Moss-Bachrach'], '2022-06-23', 4],
  [329865, 'Arrival', arrival.url, 'movie', 7.9, ['Science Fiction', 'Drama'], 'A linguist works with the military to communicate with mysterious spacecraft that have appeared around the world.', ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'], '2016-11-11', 116],
  [70523, 'Dark', dark.url, 'tv', 8.8, ['Mystery', 'Science Fiction'], 'A missing child sets four families on a hunt for answers that unearths a mystery spanning three generations.', ['Louis Hofmann', 'Lisa Vicari', 'Oliver Masucci'], '2017-12-01', 3],
];

export const catalog: MediaTitle[] = seeds.map(([tmdbId, title, poster, mediaType, rating, genres, overview, cast, releaseDate, length]) => ({
  id: `${mediaType}-${tmdbId}`, tmdbId, title, originalTitle: title, mediaType, rating, genres, overview, cast, releaseDate,
  poster, backdrop: hero.url, posterPath: '', backdropPath: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  ...(mediaType === 'movie' ? { runtime: length } : { seasons: length }),
  certification: mediaType === 'movie' ? 'PG-13' : 'TV-MA', externalIds: {}, source: 'demo',
  director: tmdbId === 693134 || tmdbId === 335984 || tmdbId === 329865 ? 'Denis Villeneuve' : undefined,
}));

export function searchCatalog(query: string) {
  const term = query.trim().toLocaleLowerCase();
  return catalog.filter(item => [item.title, item.overview, ...item.genres, ...item.cast, item.director ?? ''].join(' ').toLocaleLowerCase().includes(term));
}
export const demoMetadataService: MetadataService = {
  source: 'Local demonstration catalog',
  async getTitle(id) { return catalog.find(item => item.id === id); },
  async search(query) { return searchCatalog(query); },
  async discover(mediaType, genre) { return catalog.filter(item => (!mediaType || item.mediaType === mediaType) && (!genre || item.genres.includes(genre))); },
};