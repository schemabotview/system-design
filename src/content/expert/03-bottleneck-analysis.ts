import type { Section } from '../types'

export const bottleneckAnalysis: Section = {
  id: 'bottleneck-analysis',
  title: 'Bottleneck analysis',
  scene: 'sd-bottlenecks',
  focus: 'method',
  slide: `## Bottleneck analysis

*Find the saturated resource; the slowest stage sets the limit.*

### Model
- **On a machine**: CPU · memory · disk · network. **Across the system**: database · lock contention · hot partitions · downstream dependencies
- **USE** each resource: utilisation, saturation, errors. Fix one; the **next appears**
- Four per machine (CPU · memory · disk · network) and four across the system

### Worked example & failure
- App 2,000 req/s, DB 800 req/s: an 80% cache → DB limit **4,000**; the app (**2,000**) is now the bottleneck
- Low CPU but low throughput = locks or waiting on a dependency
- Low CPU + low throughput = something is waiting

### Your turn
- CPU 95%, memory 40%, disk 20%, network 10%: bottleneck? And CPU 30% with a full DB pool?
- Design: bottlenecks of feed generation`,
  narration:
    "A design is only as fast as its slowest stage, so an expert's second skill is finding bottlenecks quickly. The method is simple and a little humbling. Measure every resource for three things: how busy it is, called utilisation; how much work is queued waiting for it, called saturation; and how many errors it's producing. That's the USE method. Find the resource that's saturated. Fix it. Then measure again, because the next bottleneck will appear. You never finish, you just push the limit upward until it's beyond what you need. The scene lists eight places bottlenecks live. On a single machine, four. CPU: high utilisation and slow responses, fixed by profiling, caching or scaling out. Memory: swapping, garbage-collection pauses, out-of-memory kills, fixed by bounding caches and shrinking objects. Disk: high I/O wait, fixed by indexes, faster storage, batching, or moving reads to a cache. Network: a saturated link or retransmits, fixed by compression, a CDN, or co-locating chatty components. Then four across the system. The database: a full connection pool and slow queries, fixed by indexes, replicas, caching, and sharding. Lock contention: here CPU is low but throughput is low too, because work is waiting for a lock, fixed by shorter critical sections or partitioning the lock. Hot partitions: one shard is overloaded while the rest idle, fixed by splitting or salting the key, or caching. And downstream dependencies: you are slow whenever they are slow, fixed with timeouts, breakers, bulkheads, or by making the call asynchronous. Here's how the loop plays out. Suppose the app tier handles two thousand requests a second and the database eight hundred, so the database is the bottleneck at eight hundred. Add an eighty percent cache hit ratio, and only twenty percent reaches the database, so the database's limit becomes four thousand requests a second. Now the app tier, at two thousand, is the bottleneck. Fix it with more servers, and look for the next one. Your turn. A machine with CPU at ninety-five percent and everything else low is CPU-bound: profile first, then scale out. A machine with thirty percent CPU and a full database pool is waiting, not working: the bottleneck is the database connections, or the queries holding them. And the design problem: list the bottlenecks you'd expect in generating a news feed, at each step from write to read, and the first measurement you'd take for each.",
}
