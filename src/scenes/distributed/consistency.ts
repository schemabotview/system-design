import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.2 — the models as a ladder from cheapest to strongest (each step adds a guarantee and a cost),
// then the one execution that separates linearizable from merely "eventually right", as a trace.
export const sdConsistency: Scene = {
  id: 'sd-consistency',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'ladder',
      label: 'Weakest to strongest',
      pattern: 'group',
      icon: 'layers',
      flow: 'TB',
      children: [
        {
          id: 'weak',
          label: 'Cheap, available',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'ev', label: 'Eventual', badge: '1', sub: 'converges if writes stop' },
            { id: 'mr', label: 'Monotonic reads', badge: '2', sub: 'never go back in time' },
            { id: 'ryw', label: 'Read-your-writes', badge: '3', sub: 'you see your own update' },
          ],
          edges: [
            { source: 'ev', target: 'mr' },
            { source: 'mr', target: 'ryw' },
          ],
        },
        {
          id: 'strong',
          label: 'Coordinated, costly',
          pattern: 'warn',
          flow: 'LR',
          children: [
            { id: 'causal', label: 'Causal', badge: '4', sub: 'cause before effect, for everyone' },
            { id: 'lin', label: 'Linearizable', badge: '5', sub: 'behaves like one copy' },
          ],
          edges: [{ source: 'causal', target: 'lin' }],
        },
      ],
      edges: [{ source: 'weak', target: 'strong', label: 'stronger guarantee · more latency' }],
    },
    {
      id: 'trace',
      kind: 'code',
      filename: 'history.txt',
      label: [
        'time ─────────────────────────────────────────────►',
        'A:  |── write(x = 1) ──|                     ok',
        'B:                       |── read(x) ──|     → 1   after A finished',
        'C:                                 |── read(x) ──|   → 0   ✗ stale',
        '',
        'Eventual consistency allows C → 0.',
        'Linearizability forbids it: once A’s write has returned,',
        'every later read must see it.',
      ].join('\n'),
    },
    row('fixes', 'Anomalies the middle rungs remove', [
      card('a1', 'Stale own write', 'service', ['You change your photo, refresh, see the old one', 'Fix: read-your-writes']),
      card('a2', 'Time going backwards', 'network', ['5 comments, refresh, 4 comments', 'Fix: monotonic reads']),
      card('a3', 'Effect before cause', 'warn', ['A reply appears without its post', 'Fix: causal consistency']),
    ]),
  ],
  edges: [],
}
