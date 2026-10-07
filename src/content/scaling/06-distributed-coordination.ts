import type { Section } from '../types'

export const distributedCoordination: Section = {
  id: 'distributed-coordination',
  title: 'Distributed coordination',
  scene: 'sd-coordination',
  focus: 'trace',
  slide: `## Distributed coordination

*Get processes to take turns safely, even when one of them pauses.*

### Model
- **Distributed lock**: mutual exclusion — needs a consensus-backed service. **Lease**: a lock that expires
- **Leader election**: hold the lease. **Coordination services**: ZooKeeper, etcd, Consul
- **Fencing token**: monotonic number the resource checks. **Counters**: shard the hot key

### Worked example & failure
- Lease expires during a 15 s GC pause; B takes token 34; A's write with 33 is **rejected**
- 200K likes/s on one key vs ~100K/s limit → **8 shards** ≈ 25K each

### Your turn
- Lease 10 s, renewed every 3 s, a 15 s pause: what breaks, and the fix?
- Design: run a nightly job on only one of 20 replicas`,
  narration:
    "Sometimes several processes must take turns: only one should run the nightly job, only one should be the leader, only one should write to a file. That's coordination, and it's harder than it looks, because of everything we learned in chapter four. A distributed lock gives mutual exclusion across processes. But a lock held by a process that crashes would block everyone forever, so we use a lease: a lock with an expiry time. The holder must renew it before it runs out, and if it dies, the lease lapses and someone else can take over. Leader election is the same thing: whoever holds the lease on a well-known key is the leader, and the others watch the key and compete when it frees up. Where does the lock live? In a coordination service such as ZooKeeper, etcd or Consul. These are small, strongly consistent stores, built on consensus like Raft, that hold configuration, track membership, and provide locks and watches. A lock held on a single Redis node is not safe, because if that node fails over, the replica may not know about the lock. Now the subtle failure, shown in the trace. Client A acquires the lock with a ten-second lease and gets token thirty-three. Then A hits a long garbage-collection pause, fifteen seconds. The lease expires. Client B acquires the lock and gets token thirty-four, and writes to storage. Then A wakes up, still believing it holds the lock, and writes. Both wrote under the same lock, the exact corruption the lock was meant to prevent, and A had no way to know it was paused. The fix is the fencing token. Every lock grant comes with a number that only increases, and the storage layer remembers the highest token it has seen and rejects any write with a lower one. A's write with thirty-three is rejected because thirty-four has already been seen. A paused holder becomes harmless. Last, counters. A single key can handle perhaps a hundred thousand updates a second. A viral post getting two hundred thousand likes a second needs the counter split into, say, eight sub-counters, about twenty-five thousand each, summed on read. Your turn. A lease of ten seconds renewed every three seconds fails during a fifteen-second pause, since the lease expires while the process is stopped, and the fix is a fencing token checked by the resource. And for the design problem, to run a nightly job on only one of twenty replicas, use a lease with a fencing token, or even simpler, a unique constraint on job name and date in the database, so only one insert can succeed.",
}
