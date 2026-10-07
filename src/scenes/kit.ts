import type { PatternKey, Scene, SceneNode } from '@graphlearning/flow'

// Authoring shorthand for this course's scenes: a framed list card (a header and its bullets) and a
// plain band that holds a row of them. Layout stays the engine's — these only build nodes.
export const card = (id: string, label: string, pattern: PatternKey, items: string[]): SceneNode => ({
  id,
  kind: 'list',
  label,
  pattern,
  framed: true,
  items,
})

export const row = (id: string, label: string, children: SceneNode[]): SceneNode => ({
  id,
  label,
  pattern: 'group',
  flow: 'LR',
  children,
  edges: [],
})

// A borderless-feeling column: stacks its children top-to-bottom so a tall scene can be laid out as
// two side-by-side columns (the pane is nearly square; a single tall stack leaves its sides empty).
export const col = (id: string, children: SceneNode[]): SceneNode => ({
  id,
  label: ' ',
  pattern: 'group',
  flow: 'TB',
  children,
  edges: [],
})

// Lay a scene's top-level nodes out as two side-by-side columns: `left` ids go in the first column,
// everything else in the second. The pane is nearly square, so a tall single stack wastes its sides.
export const twoCols = (scene: Scene, left: string[]): Scene => ({
  ...scene,
  flow: 'LR',
  nodes: [
    col('colL', scene.nodes.filter((n) => left.includes(n.id))),
    col('colR', scene.nodes.filter((n) => !left.includes(n.id))),
  ],
})
