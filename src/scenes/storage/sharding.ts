import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.6 — a router in front of shards (and the one shard that runs hot), then partitioning schemes,
// key choice, and how data moves when the cluster changes.
export const sdSharding: Scene = {
  id: 'sd-sharding',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'cluster',
      label: 'Horizontal partitioning: one table, many nodes',
      pattern: 'network',
      icon: 'database',
      flow: 'LR',
      children: [
        { id: 'router', label: 'Router', pattern: 'service', icon: 'network', sub: 'shard = f(shard key)' },
        {
          id: 'shards',
          label: 'Shards',
          pattern: 'storage',
          flow: 'TB',
          children: [
            { id: 's1', label: 'Shard 1', pattern: 'storage', icon: 'database', sub: 'users 0 – 33M' },
            { id: 's2', label: 'Shard 2', pattern: 'warn', icon: 'database', sub: 'hot: one celebrity key' },
            { id: 's3', label: 'Shard 3', pattern: 'storage', icon: 'database', sub: 'users 66M – 100M' },
          ],
          edges: [],
        },
      ],
      edges: [{ source: 'router', target: 'shards' }],
    },
    row('schemes', 'How to split', [
      card('range', 'Range partitioning', 'service', ['Contiguous key ranges', 'Range scans stay on one shard', 'Monotonic keys (time) pile on the last shard']),
      card('hash', 'Hash partitioning', 'network', ['hash(key) picks the shard', 'Even spread', 'Range queries scatter to all shards']),
      card('key', 'Choosing the shard key', 'external', ['High cardinality, even, in every hot query', 'user_id for user-centric data', 'Cross-shard joins and transactions are costly']),
    ]),
    row('living', 'Living with it', [
      card('hot', 'Hot partitions', 'warn', ['One key gets most traffic', 'Split the key, add a salt, or cache it']),
      card('rebal', 'Rebalancing', 'storage', ['Many fixed partitions (1,024) mapped to nodes', 'New node takes whole partitions: ~16 move', 'Consistent hashing: ~1/(N+1) of keys move']),
    ]),
  ],
  edges: [],
}
