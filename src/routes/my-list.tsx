import { createFileRoute } from '@tanstack/react-router';
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute('/my-list')({
  head: () => ({ meta: [{ title: 'My List — Glint' }, { name: 'description', content: 'Your session’s saved movies and series on Glint.' }, { property: 'og:title', content: 'Your personal collection — Glint' }, { property: 'og:description', content: 'Keep your favorite stories together in My List.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <BrowsePage view="my-list" />,
});