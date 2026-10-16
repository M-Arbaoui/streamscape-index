import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Aura — A world of stories' },
    { name: 'description', content: 'Explore a curated cinematic catalog of exceptional movies and series on Aura.' },
    { property: 'og:title', content: 'Aura — A world of stories' },
    { property: 'og:description', content: 'Discover your next obsession with Aura’s movie and series demonstration catalog.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <BrowsePage />,
});
