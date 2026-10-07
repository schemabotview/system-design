import type { Scene } from '@graphlearning/flow'

// §1.1 — every plan bullet is a node. Top: the anatomy (system ⊃ subsystem ⊃ component, with the
// interfaces drawn as labelled edges). Bottom: the three distinctions the section teaches, one card
// each — architecture vs detailed design, system design vs software design, HLD vs LLD.
export const sdLayers: Scene = {
  id: 'sd-layers',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'anatomy',
      label: 'Anatomy · a photo-sharing system',
      pattern: 'group',
      icon: 'layers',
      flow: 'LR',
      children: [
        { id: 'client', label: 'Client', pattern: 'user', icon: 'user', sub: 'outside the system' },
        {
          id: 'system',
          label: 'System · the photo app',
          pattern: 'network',
          icon: 'layers',
          flow: 'LR',
          children: [
            {
              id: 'upload',
              label: 'Subsystem · Upload',
              pattern: 'service',
              flow: 'TB',
              children: [
                { id: 'validator', label: 'Validator', pattern: 'service', icon: 'server', sub: 'component' },
                { id: 'resizer', label: 'Resizer', pattern: 'service', icon: 'server', sub: 'component' },
              ],
              edges: [{ source: 'validator', target: 'resizer' }],
            },
            {
              id: 'feed',
              label: 'Subsystem · Feed',
              pattern: 'service',
              flow: 'TB',
              children: [
                { id: 'ranker', label: 'Ranker', pattern: 'service', icon: 'server', sub: 'component' },
                { id: 'cache', label: 'Timeline cache', pattern: 'storage', icon: 'database', sub: 'component' },
              ],
              edges: [{ source: 'ranker', target: 'cache' }],
            },
          ],
          edges: [{ source: 'upload', target: 'feed', label: 'interface: publish(photo_id)' }],
        },
      ],
      edges: [{ source: 'client', target: 'system', label: 'interface: POST /photos · GET /feed' }],
    },
    {
      id: 'distinctions',
      label: 'Three distinctions',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'arch',
          kind: 'list',
          label: 'Architecture vs detailed design',
          pattern: 'warn',
          framed: true,
          items: [
            'Architecture: boundaries, data stores, protocols — costly to reverse',
            'Detailed design: classes, queries, tuning — cheap to change',
          ],
        },
        {
          id: 'sw',
          kind: 'list',
          label: 'System design vs software design',
          pattern: 'storage',
          framed: true,
          items: [
            'System design: how machines and processes are arranged, under load and failure',
            'Software design: how the code inside one process is structured',
          ],
        },
        {
          id: 'hl',
          kind: 'list',
          label: 'HLD and LLD',
          pattern: 'network',
          framed: true,
          items: [
            'HLD: boxes, data flows, protocols, capacity',
            'LLD: classes, schemas, algorithms, function signatures',
            'e.g. Ranker: top-K by created_at in a min-heap; photos(id PK, owner_id FK, created_at)',
          ],
        },
      ],
      edges: [],
    },
  ],
  edges: [],
}
