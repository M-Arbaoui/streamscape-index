<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use normalized media records behind a metadata service, separate from playback adapters; catalog identifiers do not establish playback availability.
- Keep provider configuration and explicit identifier matching in the playback registry, and validate every embed URL against the adapter's HTTPS origin allowlist; presentation never constructs provider URLs.
- Phase 1 uses a local demonstration catalog and session-only library state; no live metadata or playback is claimed before verified integrations exist.
- Shared catalog navigation uses TanStack leaf routes and a reusable browsing view; title quick details and search use accessible dialogs.
- BrandLogo keeps a stationary serif wordmark and inline period; a text-clipped CSS spotlight uses native pointer listeners and event-coalesced animation-frame updates because delegated pointer events were unreliable in the SSR header. CSS handles fades and centered keyboard focus; reduced motion disables cursor tracking, with no icons, background glow, dependencies, or continuous animation loops.
- Theme surfaces, lighting, and button finishes use shared semantic CSS tokens and Button variants so catalog views and playback controls stay visually consistent.
- Artwork uses the shared CinematicImage loading/error lifecycle and fixed-size frames; navigation indicators reflect actual router loading, with CSS-only motion respecting reduced motion to avoid artificial waits and layout shifts.
