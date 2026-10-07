import type { Section } from '../types'

export const caching: Section = {
  id: 'caching',
  title: 'Caching',
  scene: 'sd-caching',
  focus: 'aside',
  slide: `## Caching

*Trade a little staleness for a lot of speed, on purpose.*

### Model
- **Cache-aside**: app reads cache, then DB, then fills. **Read-through**: the cache loads itself
- **Write-through**: both at once. **Write-back**: cache now, DB later
- **TTL** bounds staleness; **eviction** (LRU, LFU) bounds size; **invalidate** on write
- **Cache-aside** survives cache loss; **write-back** can lose data on a crash

### Worked example & failure
- Mean latency = h × 1 ms + (1 − h) × 20 ms: 90% → **2.9 ms**, 99% → **1.2 ms**
- Race: reader re-caches the old value after the delete; write-back loses data on a crash

### Your turn
- 95% hits at 58K req/s: mean latency and DB load?
- Design: strategy for a product page, a cart, a view counter`,
  narration:
    "Caching is the cheapest scaling lever there is: keep a copy of frequently read data somewhere faster, and answer from it. It works because access is skewed, a small part of the data gets most of the reads. The price is that the copy can be wrong, so every cache design is a decision about how stale is acceptable. There are four ways to wire a cache. In cache-aside, the application is in charge: it checks the cache, on a miss it reads the database, and then it fills the cache, as the code on the left shows. On a write, it updates the database and deletes the cache entry, so the next read repopulates it. It's the default, and it survives the cache being down. In read-through, the cache itself loads from the database on a miss, so the application only talks to the cache. In write-through, every write goes to the cache and the database together, so reads are always fresh but writes are slower. In write-back, the application writes only to the cache, and the cache flushes to the database later. That's very fast for writes, but if the cache crashes before flushing, you lose data. Two controls keep a cache correct and bounded. A time-to-live makes every entry expire, which is your backstop against stale data. And eviction decides what to drop when the cache is full: least recently used, least frequently used, or first in, first out. Invalidation is the hard part. Deleting on write sounds simple, but there's a race: a reader misses, reads the old value from the database, a writer updates the database and deletes the entry, and then the reader writes the old value into the cache. It stays stale until the TTL expires, which is why you always keep one. Now the arithmetic that justifies all of it. Mean latency is the hit ratio times the cache latency plus the miss ratio times the database latency. With a one-millisecond cache and a twenty-millisecond database, a ninety percent hit ratio gives two point nine milliseconds, and ninety-nine percent gives one point two. It also protects the database: at ninety-five percent hits, only five percent of reads get through. Your turn. At ninety-five percent, the mean is point nine five plus one, so one point nine five milliseconds, and the database sees five percent of fifty-eight thousand, about twenty-nine hundred reads a second. Now the design problem. For a product page, use cache-aside with a TTL of a few minutes. For a shopping cart, which must survive, use write-through to a durable store. And for a view counter, where losing a few increments is fine, write-back is acceptable. State what you lose in each case.",
}
