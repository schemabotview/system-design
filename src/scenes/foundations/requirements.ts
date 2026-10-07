import type { Scene } from '@graphlearning/flow'

// §1.2 — requirements are three different kinds of statement plus the ones nobody wrote down. They
// converge on a prioritised set; the implicit column feeds it by a dashed edge because it is found,
// not given.
export const sdRequirements: Scene = {
  id: 'sd-requirements',
  padding: 0.14,
  flow: 'LR',
  framed: true,
  nodes: [
    {
      id: 'fr',
      kind: 'list',
      label: 'Functional · what it does',
      pattern: 'service',
      items: ['A user uploads a photo', 'A user follows another user', 'A user opens a feed of followed posts'],
    },
    {
      id: 'nfr',
      kind: 'list',
      label: 'Non-functional · how well',
      pattern: 'network',
      items: ['Feed p95 under 300 ms', 'Available 99.95% of the month', 'An uploaded photo is never lost'],
    },
    {
      id: 'cons',
      kind: 'list',
      label: 'Constraints · what is fixed',
      pattern: 'storage',
      items: ['6 engineers, 4 months', 'EU user data stays in the EU', 'Already runs on AWS'],
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
      label: 'Prioritised requirement set',
      pattern: 'external',
      icon: 'scroll',
      sub: 'Must · Should · Could · Won’t — and the one dominant NFR',
    },
  ],
  edges: [
    { source: 'fr', target: 'prio' },
    { source: 'nfr', target: 'prio' },
    { source: 'cons', target: 'prio' },
    { source: 'impl', target: 'prio', dashed: true },
  ],
}
