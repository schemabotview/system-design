import type { PatternKey, SceneNode } from '@graphlearning/flow'

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
