import { createFileRoute } from '@tanstack/react-router';
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute('/series')({
  head: () => ({ meta: [{ title: 'Series — Aura' }, { name: 'description', content: 'Explore television series in Aura’s curated demo collection.' }, { property: 'og:title', content: 'Series worth staying in for — Aura' }, { property: 'og:description', content: 'Discover exceptional television and find your next favorite series.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <BrowsePage view="series" />,
});