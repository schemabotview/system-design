# CLAUDE.md — system-design (lean operational pointers)

The **System Design** concept app of GraphL. Workspace-wide invariants, the content model and the
working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
repo-specific. The syllabus is [`COURSE-PLAN.md`](COURSE-PLAN.md).

## Course arc (8 chapters × 7 sections)

`foundations · networking · storage · distributed · scaling · architecture · reliability · expert`
= plan chapters 1–8. One chapter = one course = one folder in `src/content/` and `src/scenes/`.
**Authored so far:** `foundations` (7 sections). The rest are planned in `COURSE-PLAN.md`.

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
- A computed curve (latency distribution) is written in the scene file — the engine has no parser.

## Build & verify

`npm install` → `npm run dev` (:5173) · `npm run build` + `npx tsc --noEmit` must be clean (there is no
`check` script here). Neither shows a clipped slide or a mis-placed label: open `#/<course>-<section>`.
Pinned `flow@^1.2.0` + `shell@^0.8.0` — never commit a `file:` dependency.
