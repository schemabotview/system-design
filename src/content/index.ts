import { foundations } from './foundations'
import { networking } from './networking'
import { storage } from './storage'
import { distributed } from './distributed'
import { scaling } from './scaling'
import { architecture } from './architecture'
import { reliability } from './reliability'
import { expert } from './expert'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored:
// foundations · networking · storage · distributed · scaling · architecture · reliability · expert.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [networking.id]: networking,
  [storage.id]: storage,
  [distributed.id]: distributed,
  [scaling.id]: scaling,
  [architecture.id]: architecture,
  [reliability.id]: reliability,
  [expert.id]: expert,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
