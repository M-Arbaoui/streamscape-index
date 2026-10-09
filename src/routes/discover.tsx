import { createFileRoute } from '@tanstack/react-router';
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute('/discover')({
  head: () => ({ meta: [{ title: 'Discover — Frame' }, { name: 'description', content: 'Explore stories by genre in the Frame demo catalog.' }, { property: 'og:title', content: 'Discover your next story — Frame' }, { property: 'og:description', content: 'Browse a curated collection of movies and television by genre.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <BrowsePage view="discover" />,
});