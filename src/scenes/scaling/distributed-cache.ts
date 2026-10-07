import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.2 — a cache that no longer fits on one machine: a client library hashes each key to a shard, each
// shard has a replica, and one shard is hot. The cards are the four ways a cluster hurts you.
export const sdDistCache: Scene = {
  id: 'sd-dist-cache',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'cluster',
      label: 'A sharded, replicated cache cluster',
      pattern: 'network',
      icon: 'database',
      flow: 'LR',
      children: [
        { id: 'app', label: 'App servers', pattern: 'service', icon: 'server', sub: 'client library: shard = hash(key)' },
        {
          id: 'shards',
          label: 'Cache shards',
          pattern: 'storage',
          flow: 'TB',
          children: [
            { id: 'sa', label: 'Shard A + replica', pattern: 'storage', icon: 'database', sub: 'keys 0 – 5,460' },
            { id: 'sb', label: 'Shard B + replica', pattern: 'warn', icon: 'database', sub: 'holds the hot key' },
            { id: 'sc', label: 'Shard C + replica', pattern: 'storage', icon: 'database', sub: 'keys 10,923 – 16,383' },
          ],
          edges: [],
        },
      ],
      edges: [{ source: 'app', target: 'shards' }],
    },
    row('cluster-cards', 'Clustering', [
      card('part', 'Partitioning', 'service', ['Hash slots (Redis: 16,384) map to shards', 'Consistent hashing: adding a node moves few keys']),
      card('repl', 'Replication', 'network', ['A replica per shard for failover', 'Async: a failover can lose recent writes']),
    ]),
    row('failures', 'What goes wrong', [
      card('hot', 'Hot keys', 'warn', ['One key outgrows its shard', 'Fix: copy it to N shards (key#1…#8), or a local L1 cache']),
      card('stamp', 'Cache stampede', 'warn', ['A popular key expires; thousands rebuild at once', 'Fix: single-flight, jittered TTL, serve-stale-while-refreshing']),
      card('cons', 'Consistency', 'external', ['Cache and DB can disagree', 'Invalidate from the DB’s change stream; keep a TTL']),
    ]),
  ],
  edges: [],
}
