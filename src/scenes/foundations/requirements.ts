import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §1.2 — five kinds of statement converge on a prioritised set. Explicit ones are given (solid
// edges); implicit ones and assumptions are FOUND, so their edges are dashed. The last card is the
// prioritisation itself, with the dominant NFR named — the one the architecture will bend around.
export const sdRequirements: Scene = {
  id: 'sd-requirements',
  padding: 0.12,
  flow: 'TB',
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
      label: 'Requirement prioritization · MoSCoW',
      pattern: 'service',
      items: [
        'Must: upload, follow, feed',
        'Should: comments',
        'Could: stories',
        'Won’t (v1): video',
        'Dominant NFR: feed latency under read-heavy load',
      ],
    },
    row('testable', 'Make every requirement testable', [
      card('t1', '“Fast” becomes', 'service', ['Feed p95 under 300 ms', 'Upload acknowledged < 2 s']),
      card('t2', '“Reliable” becomes', 'network', ['99.95% available each month', 'No uploaded photo is ever lost']),
      card('t3', '“Secure” becomes', 'storage', ['EU data stays in the EU', 'Private photos never public']),
    ]),
    row('wrong', 'Where it goes wrong', [
      card('w1', 'Implicit need found late', 'warn', ['“Delete my data” forces a redesign of backups and logs']),
      card('w2', 'Unmeasurable NFR', 'warn', ['“Make it fast” can never be met or missed']),
      card('w3', 'Your turn', 'external', ['Rewrite “fast and reliable” as 2 measurable NFRs', 'Ride-hailing: 3 FR, 3 NFR, 2 constraints, 2 implicit']),
    ]),
  ],
  edges: [
    { source: 'fr', target: 'prio' },
    { source: 'nfr', target: 'prio' },
    { source: 'cons', target: 'prio' },
    { source: 'assum', target: 'prio', dashed: true },
    { source: 'impl', target: 'prio', dashed: true },
    { source: 'prio', target: 'testable' },
    { source: 'testable', target: 'wrong' },
  ],
}
