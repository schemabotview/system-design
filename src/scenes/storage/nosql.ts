import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.3 — five NoSQL families, each as: the shape of the data, the question it answers well, and
// the question it answers badly. The last card is the decision rule the section ends on.
export const sdNosql: Scene = {
  id: 'sd-nosql',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    row('first', 'Key lookups and documents', [
      card('kv', 'Key-value', 'service', ['Shape: key → opaque value', 'Good: get/put by key at huge scale', 'Bad: anything but the key', 'e.g. Redis, DynamoDB · sessions, carts']),
      card('doc', 'Document', 'network', ['Shape: nested JSON per key', 'Good: one read returns the whole thing', 'Bad: joins and multi-document transactions', 'e.g. MongoDB · catalogs, profiles']),
      card('wide', 'Wide-column', 'storage', ['Shape: partition key + sorted clustering key', 'Good: enormous write rates, range by time', 'Bad: ad-hoc queries', 'e.g. Cassandra, Bigtable · messages, events']),
    ]),
    row('second', 'Relationships and time', [
      card('graph', 'Graph', 'external', ['Shape: nodes and edges', 'Good: multi-hop traversals', 'Bad: bulk scans, sharding', 'e.g. Neo4j · fraud, recommendations']),
      card('ts', 'Time-series', 'warn', ['Shape: (series, time) → value, append-only', 'Good: ranges, downsampling, retention', 'Bad: updating the past', 'e.g. Prometheus, Timescale · metrics']),
    ]),
    {
      id: 'rule',
      kind: 'list',
      label: 'When NoSQL is the right call',
      pattern: 'group',
      framed: true,
      items: [
        'The access pattern is narrow and known (by key, by time)',
        'Scale or write rate outgrows one relational node',
        'The data’s shape varies, or is a graph or a series',
        'Otherwise stay relational: joins and transactions are free there',
      ],
    },
    row('sd-nosql-put', 'Putting it to work', [
      card('sd-nosql-w', 'Worked example & failure', 'service', ['Cart as key-value: 1 read by user; "revenue by product" means scanning everything', 'Document store then needing joins and multi-document transactions']),
      card('sd-nosql-t', 'Your turn', 'external', ['Pick a store: session tokens · product catalog · sensor readings · friends-of-friends · 1M writes/s messages', 'Design: stores for a ride-hailing app']),
    ]),
  ],
  edges: [],
}
