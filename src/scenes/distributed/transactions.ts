import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.4 — the two answers to "one business action, many services": 2PC (everyone votes, then the
// coordinator decides — atomic, but blocking) and a saga (local steps with compensations — available,
// but only eventually consistent). The outbox card is the glue that makes either reliable.
export const sdTransactions: Scene = {
  id: 'sd-transactions',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'tpc',
      label: 'Two-phase commit · atomic, blocking',
      pattern: 'network',
      icon: 'repeat',
      flow: 'LR',
      children: [
        { id: 'coord', label: 'Coordinator', pattern: 'service', icon: 'server', sub: 'decides commit or abort' },
        { id: 'p1', label: 'Inventory', pattern: 'storage', icon: 'database', sub: 'participant' },
        { id: 'p2', label: 'Payments', pattern: 'storage', icon: 'database', sub: 'participant' },
      ],
      edges: [
        { source: 'coord', target: 'p1', label: '1 prepare? → yes · 2 commit' },
        { source: 'coord', target: 'p2', label: '1 prepare? → yes · 2 commit' },
      ],
    },
    {
      id: 'saga',
      label: 'Saga · local steps, compensations',
      pattern: 'service',
      icon: 'repeat',
      flow: 'LR',
      children: [
        { id: 's1', label: 'Reserve stock', badge: 'T1', sub: 'undo: release stock' },
        { id: 's2', label: 'Charge card', badge: 'T2', sub: 'undo: refund' },
        { id: 's3', label: 'Ship order', badge: 'T3', sub: 'fails → run T2, T1 undos' },
      ],
      edges: [
        { source: 's1', target: 's2' },
        { source: 's2', target: 's3' },
      ],
    },
    row('parts', 'Around the two patterns', [
      card('local', 'Local vs distributed', 'service', ['Local: one database, ACID for free', 'Distributed: no shared log or lock', 'Atomicity must be built on messages']),
      card('outbox', 'Transactional outbox', 'warn', ['Write the row and an event row in ONE local tx', 'A relay publishes the event afterwards', 'No “committed but never published”']),
      card('ec', 'Eventual consistency', 'external', ['Between saga steps, state is partial', 'Design the UI and invariants for it']),
    ]),
  ],
  edges: [],
}
