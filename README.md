# ⚰️ Polycrisis Trail

A satirical Oregon Trail clone where you survive 7 simultaneous apocalypses.
Everything is on fire at once — and that's the joke.

**Play it:**
- GitHub Pages: https://kylebruce.github.io/polycrisis-trail/
- Dashboard mirror: https://kbruce.duckdns.org/dashboard/trail/

## Docs

- `DESIGN.md` — the full vision (themes, events, endings, mechanics)
- `ROADMAP.md` — phased build plan (Phase 1 done ✅)

## Structure

Vanilla JS. No build step, no dependencies, no framework. Just suffering.

```
index.html   markup + screen containers
style.css    all styles (terminal green/amber, scanlines, glitch)
data.js      pure data: classes, party members, synergies, resolutions
game.js      state + rendering + flow (Phase 1: opening sequence)
```

Planned for Phase 2 (see ROADMAP.md): `events.js` (event pool),
`engine.js` (DOM-free game logic — node-testable), `ui.js` (rendering).

## Run locally

Any static server from the repo root:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

- **GitHub Pages** — auto-deploys from `master` on push. That's it.
- **Dashboard** — served by `~/apps/dashboard/server.js` from this directory
  via `express.static`. Restart not needed; files are read per-request.

⚠️ **Always use relative paths** for scripts/styles (`game.js`, not
`/dashboard/trail/game.js`). The page is served from two different base
paths; absolute paths break one of them. Learned the hard way.
