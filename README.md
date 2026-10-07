# System Design

A GraphL concept app: *System Design — from foundations to expert practice.* Eight chapters, each a
course of seven sections; each section is a diagram or code scene beside a slide, with narration.
The syllabus is [`COURSE-PLAN.md`](COURSE-PLAN.md). All eight chapters (56 sections) are authored and published at https://graphl.in/system-design/. Narration audio is generated from `scripts/audio-manifest.json` with the Colab notebook in `scripts/`.

```bash
npm install
npm run dev      # http://localhost:5173/#/foundations-what-is-system-design
npm run build
```

Scenes are rendered by `@graphlearning/flow`, the app shell by `@graphlearning/shell`; this repo
supplies only `src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css`. See `CLAUDE.md`.
