import type { Section } from '../types'

export const distributedCaching: Section = {
  id: 'distributed-caching',
  title: 'Distributed caching',
  scene: 'sd-dist-cache',
  focus: 'cluster',
  slide: `## Distributed caching

*One cache node is not enough: shard it, replicate it, and survive the spikes.*

### Model
- **Cache cluster**: keys **partitioned** across shards (hash slots / consistent hashing)
- **Replication** per shard for failover — async, so recent writes can vanish
- **Hot keys**, **stampedes**, and cache-vs-DB **consistency** are the failure modes

### Worked example & failure
- Key at 5K req/s, rebuild 200 ms → **1,000** DB queries at expiry; single-flight → **1**
- Hot key at 50K req/s copied to 8 shards → **6.25K** each

### Your turn
- 1M keys all set with TTL 300 s: what happens at 300 s?
- Design: cache a celebrity's profile`,
  narration:
    "When your cache outgrows one machine, or one machine's failure would melt your database, you build a cache cluster. The first decision is partitioning: how keys map to shards. In the scene, the client library hashes each key to a shard. Redis cluster, for example, divides the key space into sixteen thousand three hundred and eighty-four hash slots and assigns slots to nodes. Using consistent hashing or fixed slots, adding a node moves only a small fraction of the keys. Second, replication: each shard has a replica, so if the primary dies, the replica takes over and the cache stays warm. Remember, though, that replication is asynchronous, so a failover can lose the most recent writes, which is acceptable for a cache because the database is the truth. Now three ways a cache cluster hurts you. First, the hot key. Sharding spreads keys evenly, not traffic. A celebrity's profile might draw fifty thousand reads a second, all landing on one shard. Fixes: copy the hot key under several names, say key hash one to key hash eight, and spread reads across them, so eight copies give about six thousand two hundred and fifty reads each, or add a small local cache inside each app server. Second, the cache stampede. A very popular key expires, and in the next few hundred milliseconds every request misses and goes to the database to rebuild it. If the key gets five thousand requests a second and a rebuild takes two hundred milliseconds, that's a thousand identical database queries at once, which can knock the database over. Fixes: single-flight, where only one request rebuilds while the others wait for its result; jitter on TTLs, so keys don't expire together; and serving the stale value while refreshing in the background. Third, consistency between the cache and the database. Treat the database as the source of truth, invalidate from its change stream rather than from every application, and always keep a TTL as a safety net. Your turn. If a million keys are all set with a three-hundred-second TTL at the same moment, they all expire at the same moment, a mass stampede. Add random jitter, ten percent or so, to each TTL. And the design problem: how would you cache a celebrity's profile that takes fifty thousand reads a second? Combine a local in-process cache with a short TTL, replicated copies of the key, and single-flight rebuilds, and say how stale you'll allow it to get.",
}
