import { createFileRoute } from '@tanstack/react-router';
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute('/movies')({
  head: () => ({ meta: [{ title: 'Movies — Glint' }, { name: 'description', content: 'Discover remarkable films in Glint’s demo movie catalog.' }, { property: 'og:title', content: 'Remarkable movies — Glint' }, { property: 'og:description', content: 'Explore films, cast, genres and ratings from our demonstration collection.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <BrowsePage view="movies" />,
});