import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from '@/components/catalog/BrowsePage';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Frame — A world of stories' },
    { name: 'description', content: 'Explore a curated cinematic catalog of exceptional movies and series on Frame.' },
    { property: 'og:title', content: 'Frame — A world of stories' },
    { property: 'og:description', content: 'Discover your next obsession with Frame’s movie and series demonstration catalog.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <BrowsePage />,
});
