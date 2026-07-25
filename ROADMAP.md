# ⚰️ POLYCRISIS TRAIL — Roadmap

Phase 1 (opening sequence) is done. This is the plan for the rest.
Each phase ends with a playable game. Vanilla JS, no build step, per the design doc.

---

## ✅ Phase 1 — Opening Sequence (DONE)

Class select → party pick → naming → resolutions → summary screen.

---

## ✅ Phase 2 — The Trail Loop (DONE)

The core game engine. Playable start-to-finish run with a simple event model.

**Architecture first — everything later depends on this:**

- **Event data model.** Events as declarative data, not code:
  ```js
  {
    id: 'rent-increase',
    themes: ['neo-feudalism'],
    months: [4],              // eligible months (null = any)
    condition: (state) => true,   // optional gate
    weight: 10,               // draw probability
    text: "Rent increased. Landlord cites 'market rate.'",
    choices: [
      { text: "Pay it", effects: { money: -800 } },
      { text: "Refuse", effects: { classStat: -1, hope: -5 } },
    ]
  }
  ```
  Choices with `requires` gates (party member, stat threshold, resolution item).
  Effects as structured deltas the engine applies generically.

- **Monthly loop:** Feb → Dec. Each month: status screen → event draw → choice → outcome text → stat application → death checks → next month.

- **Stat engine:** All 9 stats from the design doc. Per-member (Health, Stamina, Morale, Infection, Class) + party-wide (Money, Supplies, Hope, Sanity, Agency). Derived stats recomputed monthly.

- **Month screen:** status bar (money/supplies/party health), event card, choice buttons, outcome reveal, "continue" to next month.

- **Death checks:** health ≤ 0 or Hope ≤ 0 → death screen → tombstone → continue with remaining party (or game over).

- **Event content:** seed ~40 events across all 7 themes from the design doc's event lists. One event per month for now — the simultaneity comes in Phase 3.

- **Endings (basic):** survive to Jan 2027 → generic "You Made It" or "Total Party Wipe." Themed endings in Phase 4.

**Deliverable:** a full run is playable. 11 months, ~11 events, deaths possible, two endings. Probably 30-60 min of play.

---

## Phase 3 — The Polycrisis Proper (simultaneity + theme mechanics)

This is where the game earns its name. Multiple crises per month, and each theme gets its teeth.

- **Multi-event months:** draw 1-3 events per month based on how many themes have that month flagged (see the 12-month table in DESIGN.md). Events chain: outcome of one feeds the next.
- **Cross-theme events:** the combo pool (kaiju exposes elder sign → sanity check → AI-denied insurance...).
- **Theme mechanics:**
  - 🐙 Sanity < 20: choice text gets subtly wrong, options reorder
  - 🤖 Agency < 50: some events auto-resolve; below 30, one choice per event is "auto-selected" (highlighted after a delay — you can override it, maybe)
  - 💰 Class < 3: some choices hidden (grayed with 🔒), Class < 1: one choice only
  - 🦠 Infection: per-member value, spreads at month-end, Healthcare Worker suppresses
  - 👽 Ontological shock: debuff — member useless for a month
  - 🏢 Evacuation choices: flee/shelter/jaeger-bet structure
  - 🌍 Weather: direct health/supply/mobility damage, blocks travel progress
- **Mini-games (first 3):** Disaster Prep (climate), Congressional Briefing (aliens), Evacuation Route (kaiju). Implement as structured choice trees — same engine, richer presentation.
- **Party-member-specific options:** Boomer's "just the flu," Tech Bro's "align with AI," Conspiracy Theorist's "bribe the training data." The `requires` gate does the work.
- **Synergy events:** Unionize (Gig Worker + Teacher), "The AI is your fault" (Tech Bro + AI Researcher), etc. — fire when the roster matches.
- **Content pass:** full event pool from DESIGN.md (~70 events + cross-theme).

**Deliverable:** the real game. Chaotic, overlapping, unfair. The joke lands.

---

## Phase 4 — Death, Tombstones & Endings

- **Death system:** per-theme death causes from DESIGN.md, context-aware selection (killed by what actually killed you).
- **Tombstone screen:** name, cause, month, epitaph input field.
- **Tombstone persistence:** localStorage. Future runs see old tombstones on the trail (random month splash: "You pass a grave: [name] — [epitaph]"). Sanity < 20: tombstones in languages that don't exist. High AI: grammatically perfect, emotionally hollow epitaphs.
- **All 12 endings:** condition evaluation per DESIGN.md (survivor count, Hope/Sanity/Agency thresholds, dominant theme by damage taken). Ending screen with stats breakdown: months survived, per-member fates, damage-by-theme pie.
- **Run summary / share card:** text summary you can copy-paste. "3/4 survived. Debt: -$12,000. The Venture Capitalist thrived. The Old Ones were pleased."

---

## Phase 5 — The Weirdness Layer (juice)

Visual/audio degradation per theme (DESIGN.md "Visual Style"):

- Scanline/flicker intensifies as stats drop
- Fever haze filter below 30% health
- Redacted-text flickers during disclosure months
- Screen shake for kaiju events
- Paywall banner over the UI at Class 1
- Optional: WebAudio bass rumble (kaiju), drone (cthulhu). Off by default.

Also: balance pass. Playtest until a Perfect Run is statistically impossible but a Working Class run is winnable with good choices.

---

## Implementation notes

- Keep it vanilla JS, single `game.js` (or split into `data.js` / `engine.js` / `ui.js` if it grows past ~3k lines — no modules needed, just script order).
- All content as data. The engine should be ~30% of the code; the rest is writing. The writing IS the game.
- State stays in one object; add a `log` array for the run summary.
- No backend. localStorage for tombstones + maybe one "share run" feature later.
- Serve from both dashboard + GitHub Pages (relative paths only — learned that the hard way).

## Suggested order of attack for Phase 2

1. Event data model + effect engine (the heart)
2. Month loop skeleton with 3 stub events
3. Status screen UI
4. Death checks + basic death screen
5. Full stat engine
6. Seed ~40 events
7. Basic endings + run-complete screen
