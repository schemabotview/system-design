import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.3 — a partitioned log: producers write keyed events into three partitions; one consumer group
// reads each partition with exactly one consumer (parallelism = partitions); a second group reads the
// same log independently. The cards state what that structure promises and where it pushes back.
export const sdMessaging: Scene = {
  id: 'sd-messaging',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      label: 'A partitioned log: topic “orders”',
      pattern: 'network',
      icon: 'database',
      flow: 'LR',
      children: [
        { id: 'prod', label: 'Producers', pattern: 'service', icon: 'server', sub: 'partition = hash(key) % 3' },
        {
          id: 'topic',
          label: 'Topic · retained, replayable',
          pattern: 'storage',
          flow: 'TB',
          children: [
            { id: 'p0', label: 'Partition 0', pattern: 'storage', icon: 'database', sub: 'ordered by offset' },
            { id: 'p1', label: 'Partition 1', pattern: 'storage', icon: 'database', sub: 'ordered by offset' },
            { id: 'p2', label: 'Partition 2', pattern: 'storage', icon: 'database', sub: 'ordered by offset' },
          ],
          edges: [],
        },
        {
          id: 'group',
          label: 'Consumer group “billing”',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'c0', label: 'Consumer 0', pattern: 'service', icon: 'server', sub: 'reads P0' },
            { id: 'c1', label: 'Consumer 1', pattern: 'service', icon: 'server', sub: 'reads P1' },
            { id: 'c2', label: 'Consumer 2', pattern: 'service', icon: 'server', sub: 'reads P2' },
          ],
          edges: [],
        },
      ],
      edges: [
        { source: 'prod', target: 'topic' },
        { source: 'p0', target: 'c0' },
        { source: 'p1', target: 'c1' },
        { source: 'p2', target: 'c2' },
      ],
    },
    row('model', 'Queue or stream', [
      card('qs', 'Queues vs streams', 'service', ['Queue: a message is removed once acked', 'Stream/log: retained; consumers track an offset and can replay']),
      card('cg', 'Consumer groups', 'network', ['Each partition has one consumer per group', 'Parallelism ≤ partitions', 'Other groups read the same log independently']),
    ]),
    row('limits', 'Guarantees and limits', [
      card('ord', 'Partitioning and ordering', 'external', ['Order holds within a partition only', 'Same key → same partition → ordered']),
      card('bp', 'Backpressure', 'warn', ['Consumers pull at their own pace', 'Lag = how far behind', 'Bound queues; shed or slow producers']),
      card('dlq', 'Dead-letter queue', 'warn', ['A message that keeps failing is parked after N tries', 'Alert, inspect, replay']),
    ]),
  ],
  edges: [],
}
