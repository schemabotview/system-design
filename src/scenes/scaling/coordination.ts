import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.6 — the failure that fencing tokens exist for, as a trace: a lock holder pauses past its lease,
// a second holder takes over, and the storage layer must reject the first one's late write.
export const sdCoordination: Scene = {
  id: 'sd-coordination',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'code',
      filename: 'fencing.txt',
      label: [
        't0   A: lock.acquire(lease = 10 s)     → token 33',
        't1   A: long GC pause ………………………………',
        't11  lease expires',
        't12  B: lock.acquire(lease = 10 s)     → token 34',
        't13  B: storage.write(data, token=34)  ok · highest token seen = 34',
        't16  A: wakes up, still believes it holds the lock',
        't16  A: storage.write(data, token=33)  REJECTED (33 < 34)',
      ].join('\n'),
    },
    row('locks', 'Locks and leadership', [
      card('lock', 'Distributed locks', 'warn', ['Mutual exclusion across processes', 'Needs a consensus-backed service', 'A single Redis node is not enough']),
      card('lease', 'Leases', 'service', ['A lock that expires', 'A crashed holder can’t block forever', 'Holder must renew in time']),
      card('lead', 'Leader election', 'network', ['Hold the lease = be the leader', 'Everyone else watches the key']),
    ]),
    row('support', 'Machinery', [
      card('coord', 'Coordination services', 'storage', ['ZooKeeper · etcd · Consul', 'Small, strongly consistent (Raft)', 'Config, membership, locks, watches']),
      card('fence', 'Fencing tokens', 'external', ['A number that only grows', 'The resource rejects any older token', 'Makes a paused holder harmless']),
      card('count', 'Distributed counters', 'service', ['One hot key caps ~100K ops/s', 'Shard it into N keys; sum on read', 'Approximate or CRDT counters merge']),
    ]),
    row('sd-coordination-put', 'Putting it to work', [
      card('sd-coordination-w', 'Worked example & failure', 'service', ['Lease expires during a 15 s GC pause; B takes token 34; A\'s write with 33 is rejected', '200K likes/s on one key vs ~100K/s limit → 8 shards ≈ 25K each']),
      card('sd-coordination-t', 'Your turn', 'external', ['Lease 10 s, renewed every 3 s, a 15 s pause: what breaks, and the fix?', 'Design: run a nightly job on only one of 20 replicas']),
    ]),
  ],
  edges: [],
}
