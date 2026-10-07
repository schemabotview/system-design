import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { networkingScenes } from './networking'
import { storageScenes } from './storage'
import { distributedScenes } from './distributed'
import { scalingScenes } from './scaling'
import { architectureScenes } from './architecture'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup is unambiguous.
const ALL: Scene[] = [...foundationsScenes, ...networkingScenes, ...storageScenes, ...distributedScenes, ...scalingScenes, ...architectureScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
