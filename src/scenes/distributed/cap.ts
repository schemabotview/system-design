import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.3 — CAP as the one decision a partition forces. Two sides of a cut link; the two honest
// responses (refuse or diverge) beneath; then what CAP does not say, and PACELC's extra question.
export const sdCap: Scene = {
  id: 'sd-cap',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'part',
      label: 'A network partition cuts the replicas apart',
      pattern: 'warn',
      icon: 'network',
      flow: 'LR',
      children: [
        {
          id: 'left',
          label: 'Region A',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'ca', label: 'Client A', pattern: 'user', icon: 'user', sub: 'writes x = 1' },
            { id: 'ra', label: 'Replica A', pattern: 'storage', icon: 'database', sub: 'x = 1' },
          ],
          edges: [{ source: 'ca', target: 'ra' }],
        },
        {
          id: 'right',
          label: 'Region B',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'cb', label: 'Client B', pattern: 'user', icon: 'user', sub: 'reads x' },
            { id: 'rb', label: 'Replica B', pattern: 'storage', icon: 'database', sub: 'x = 0 (can’t hear A)' },
          ],
          edges: [{ source: 'cb', target: 'rb' }],
        },
      ],
      edges: [{ source: 'ra', target: 'rb', dashed: true, label: 'link down' }],
    },
    row('choice', 'The only choice a partition leaves', [
      card('cp', 'Choose consistency (CP)', 'network', ['B refuses or errors', 'Never returns x = 0', 'Unavailable on the minority side']),
      card('ap', 'Choose availability (AP)', 'external', ['B answers x = 0', 'Both sides keep accepting writes', 'Must reconcile when the link heals']),
    ]),
    row('notes', 'Reading CAP correctly', [
      card('mis', 'Common misconceptions', 'warn', ['Not “pick any two”: partitions happen, so it is C or A', 'Only about behaviour during a partition', 'C means linearizability, not ACID', 'A means every live node answers, not high uptime']),
      card('pacelc', 'PACELC', 'service', ['If Partition: Availability or Consistency', 'Else: Latency or Consistency', 'Even healthy, strong consistency costs round trips', 'e.g. Cassandra PA/EL · Spanner PC/EC']),
    ]),
  ],
  edges: [],
}
