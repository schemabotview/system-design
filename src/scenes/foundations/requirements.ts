import type { Scene } from '@graphlearning/flow'

// §1.2 — five kinds of statement converge on a prioritised set. Explicit ones are given (solid
// edges); implicit ones and assumptions are FOUND, so their edges are dashed. The last card is the
// prioritisation itself, with the dominant NFR named — the one the architecture will bend around.
export const sdRequirements: Scene = {
  id: 'sd-requirements',
  padding: 0.12,
  flow: 'LR',
  framed: true,
  nodes: [
    {
      id: 'fr',
      kind: 'list',
      label: 'Functional · explicit',
      pattern: 'service',
      items: ['A user uploads a photo', 'A user follows another user', 'A user opens a feed of followed posts'],
    },
    {
      id: 'nfr',
      kind: 'list',
      label: 'Non-functional · explicit',
      pattern: 'network',
      items: ['Feed p95 under 300 ms', 'Available 99.95% of the month', 'An uploaded photo is never lost'],
    },
    {
      id: 'cons',
      kind: 'list',
      label: 'Constraints · explicit',
      pattern: 'storage',
      items: ['6 engineers, 4 months', 'EU user data stays in the EU', 'Already runs on AWS'],
    },
    {
      id: 'assum',
      kind: 'list',
      label: 'Assumptions · written down',
      pattern: 'external',
      items: ['Peak traffic is 5× the average', 'The average photo is 2 MB', 'Most users are on mobile'],
    },
    {
      id: 'impl',
      kind: 'list',
      label: 'Implicit · nobody said it',
      pattern: 'warn',
      items: ['Deleted photos stay deleted', 'Private stays private', 'Traffic is encrypted'],
    },
    {
      id: 'prio',
      kind: 'list',
      label: 'Prioritisation · MoSCoW',
      pattern: 'service',
      items: [
        'Must: upload, follow, feed',
        'Should: comments',
        'Could: stories',
        'Won’t (v1): video',
        'Dominant NFR: feed latency under read-heavy load',
      ],
    },
  ],
  edges: [
    { source: 'fr', target: 'prio' },
    { source: 'nfr', target: 'prio' },
    { source: 'cons', target: 'prio' },
    { source: 'assum', target: 'prio', dashed: true },
    { source: 'impl', target: 'prio', dashed: true },
  ],
}
