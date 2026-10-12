# Metadata and playback foundation

## Phase 1
Watchy uses a curated local demonstration catalog, illustrative ratings and artwork from TMDB. It does not make live TMDB requests, offer full-length playback, or track playback progress. My List is session-only. No authentication or database is implemented.

## Metadata
`MediaTitle` normalizes internal and TMDB identifiers, optional IMDb IDs, external mappings, artwork, cast and movie/series facts. `MetadataService` isolates browsing and search from the data source. The next metadata phase should implement documented TMDB endpoints behind a secret-safe server boundary, handle rate limits and cache responses, with required attribution. TVmaze and Wikidata can supplement explicitly matched records. Artwork availability does not establish redistribution rights; confirm usage terms before production.

## Playback setup
`PlaybackProvider` defines supported media types, explicit required identifiers, embedding method, capabilities, limitations and origin allowlist. The registry filters disabled, unverified and incompatible sources and validates HTTPS URLs with exact origins. It never assumes that a TMDB ID is a provider ID.

The provider configuration intentionally contains no enabled adapters. To add one, verify authorization, provider documentation, required identifiers, iframe permissions/referrer/sandbox requirements, allowed origins and observable errors. Keep URL construction inside that adapter. Independently test the integration before marking it verified. Never invent URLs, query parameters, quality or progress support.

The next playback phase adds StreamingPlayer, an explicit compatible-source selector, loading, retry and unavailable states, and verified adapters. Playback progress and cross-source resume remain unavailable unless documented and reliably exposed by the provider.