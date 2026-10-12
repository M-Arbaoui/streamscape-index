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
- The header logo is a pure-CSS serif wordmark in BrandLogo ("Watchy" plus an inline gold period): hover and keyboard focus only shift colors and fade the period's glow via CSS transitions — no JavaScript animation, no icons, and no layout-affecting properties.
