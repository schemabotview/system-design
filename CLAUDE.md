# CLAUDE.md — system-design (lean operational pointers)

The **System Design** concept app of GraphL. Workspace-wide invariants, the content model and the
working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
repo-specific. The syllabus is [`COURSE-PLAN.md`](COURSE-PLAN.md).

## Course arc (8 chapters × 7 sections)

`foundations · networking · storage · distributed · scaling · architecture · reliability · expert`
= plan chapters 1–8. One chapter = one course = one folder in `src/content/` and `src/scenes/`.
**Status:** all eight chapters, 56 sections authored and live at `graphl.in/system-design/` (Pages via
`.github/workflows/deploy.yml`; listed in `ui-graphl`'s catalog). `scripts/audio-manifest.json` (56 entries)
and the Colab notebook (pointed at this repo, branch `main`) are ready; **narration wavs are not yet
generated**. Not yet checked at 4K or mobile portrait.

The recurring principle: *derive architectures from requirements, constraints and trade-offs — never
recall them.* Chapter 1 §7 states the nine-step method every later case study follows.

## Section template (every section)

objective → model → worked example → architecture & failure analysis → exercise → design problem.
The slide panel is a fixed 42% column that **clips overflow** (~1080 design px tall at 1920×1080), so:
- the **slide** carries each beat in one or two lines: an italic objective lede, then `### Model`,
  `### Worked example`, `### Architecture & failure`, `### Your turn` (exercise + design problem).
  Keep it ≲ 900px tall at 1920×1080 — render it and check; the build cannot.
- the **narration** carries every beat in full, spoken, **gives the exercise answer** and leaves the
  design problem open. Spell numbers and symbols for the TTS ("p ninety-nine", "times", "about").

## Layout

```
src/scenes/<course>/   scenes + registry (src/scenes/index.ts)
src/content/<course>/  one file per section + index.ts; courses registered in src/content/index.ts
src/main.tsx · src/theme.css   mounts <ConceptApp>; teal / amber brand tokens
scripts/               concept.json · titles.json · colab notebook (audio-manifest is generated)
public/audio/<course>/ narration wavs — Colab + Chatterbox only
```

Adding a course: scenes folder + `index.ts` → register in `src/scenes/index.ts`; content folder +
`index.ts` → register in `src/content/index.ts`; add a `titles.json` entry.

## Scene notes (learned the hard way)

- Plot series `labelAt` is an **absolute data position**, not an offset from the series.
- `kind: 'table'` right-aligns text columns and renders small; prefer `list` or a code card when the
  cells are prose.
- Cross-container edges can vanish: point an edge at the leaf node, not at its container.
- Edges between nodes inside DIFFERENT nested groups tangle; keep an edge's ends in one flat flow, or stack the groups top-to-bottom.
- **Edges and orphan rows**: when a scene has top-level `edges`, a node with no edge lands in the first
  rank beside the others, not below. Chain every added row (`{ source: 'prev', target: 'row' }`).
- A computed curve (latency distribution) is written in the scene file — the engine has no parser.

## Filling the frame

Measured at 1920×1080 in the browser (rendered rects, not source): the slide should use ~90–97% of the
panel height (`.slide-panel__scaler` scrollHeight ÷ panel height; > 1.0 clips), and a scene should
use as much of the pane as its shape allows — each axis tops out near 0.89, so ~0.75–0.80 of the area
is the practical ceiling. Mean today: slides 0.94, scenes 0.72.
- A **wide, short** scene (width binds) has free vertical room: add a row of cards.
- A **tall, narrow** scene (height binds) needs width, not height: add a card to a 2-card row. Do not
  add rows, and `twoCols` (in `src/scenes/kit.ts`) only helps when the rows are narrow — it made
  3-card-wide rows worse. Only `sd-evolution` uses it.
- Cover the plan's bullets with the plan's own words (`COURSE-PLAN.md`), not synonyms.
- Slide detail comes from the narration, so narration rarely needs to change when a slide grows; if it
  does, run `npm run gen:audio` and re-record only the sections whose narration changed.

## Build & verify

`npm install` → `npm run dev` (:5173) · `npm run build` + `npx tsc --noEmit` must be clean (there is no
`check` script here). Neither shows a clipped slide or a mis-placed label: open `#/<course>-<section>`.
Pinned `flow@^1.2.0` + `shell@^0.8.0` — never commit a `file:` dependency.
