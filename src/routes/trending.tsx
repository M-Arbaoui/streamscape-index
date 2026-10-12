import { createFileRoute } from '@tanstack/react-router';
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute('/trending')({
  head: () => ({ meta: [{ title: 'Trending — Watchy' }, { name: 'description', content: 'Explore popular picks in Watchy’s demonstration catalog, not a live trending feed.' }, { property: 'og:title', content: 'Trending picks — Watchy' }, { property: 'og:description', content: 'Explore our curated demonstration selection of popular movies and series.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <BrowsePage view="trending" />,
});