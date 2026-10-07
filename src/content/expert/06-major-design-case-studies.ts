import type { Section } from '../types'

export const majorDesignCaseStudies: Section = {
  id: 'major-design-case-studies',
  title: 'Major design case studies',
  scene: 'sd-case-studies',
  focus: 'a',
  slide: `## Major design case studies

*Ten systems, one method: the dominant constraint decides the design.*

### The ten designs
- **URL shortener**: base62 code → KV + cache
- **Rate limiter**: token bucket in Redis
- **Notifications**: queue per channel, idempotent send
- **Chat**: gateways, order per conversation
- **News feed**: hybrid fan-out, cached timelines
- **Search**: precomputed top-k + inverted index
- **Video**: transcode → object store → CDN
- **Ride-sharing**: in-memory geo-index by cell
- **Payments**: ledger, idempotency, reconcile
- **File storage**: chunks, dedupe, change log
- Numbers that justify: 62⁷ ≈ 3.5T codes · 100K ops/s · 2.8K notifs/s · 50 gateways · ~200 followers · 250K updates/s · 50 Tbps · 262,144 chunks

### Your turn
- For each: name the dominant constraint first
- Design: run the nine-step method on one, end to end`,
  narration:
    "Now we put the method to work on ten classic systems. For each one, we'll state the dominant constraint first, because it decides the design, then the design it forces, then the number that justifies it. First, the URL shortener, which we've been sizing since chapter one. The dominant constraint is a read-heavy lookup by key: forty creates and four hundred resolves a second. A seven-character code in base sixty-two gives sixty-two to the seventh, about three and a half trillion codes. Store code to URL in a key-value store with a cache for viral links, generate codes from per-node counter ranges to avoid collisions, and choose a three-oh-two redirect if you want to count clicks. Second, the rate limiter. Every request needs an allow-or-deny decision, so the constraint is a very fast decision. Use a token bucket in a shared Redis, updated atomically, which handles about a hundred thousand operations a second per node. Decide whether it fails open or closed if Redis is down. Third, the notification service. The constraint is fan-out with no duplicates: ten million notifications an hour is about twenty-eight hundred a second. Use a queue per channel, an idempotent sender keyed by notification id, user preferences checked before sending, retries with backoff and a dead-letter queue. Fourth, chat. The constraint is millions of open connections with ordering. Five million connections over a hundred thousand per gateway is fifty gateways. Messages are stored partitioned by conversation with a sequence number per conversation, and offline devices are woken through push. Fifth, the news feed. The constraint is read latency against write cost. Use a hybrid: when an ordinary user posts, push the post into followers' cached timelines, about two hundred followers each, and for celebrities fetch their posts at read time. Sixth, search and autocomplete. The constraint is under a hundred milliseconds. For autocomplete, precompute the top ten completions per prefix offline from query logs and serve them from memory. For full search, an inverted index sharded by document with scatter-gather. Seventh, the video platform. The constraint is bandwidth and storage cost. Uploads go to a transcoding queue, which produces several bitrates into object storage, served through a CDN. Ten million concurrent streams at five megabits each is fifty terabits a second, which makes the CDN essential. Eighth, ride-sharing. The constraint is the write rate of location updates and matching latency: a million drivers reporting every four seconds is two hundred and fifty thousand updates a second. Keep them in an in-memory geospatial index partitioned by map cell, match from neighbouring cells, and run each trip as a state machine with a saga. Ninth, the payment system. The constraint is correctness above everything. Use idempotency keys on every call, a double-entry ledger in a strongly consistent relational store, a saga with the payment provider through an outbox, and daily reconciliation against the provider's records. Tenth, cloud file storage. The constraint is durability and sync. Split files into four-megabyte chunks, so a one-terabyte file is about two hundred and sixty thousand chunks, deduplicate by content hash, store them in object storage, keep metadata in a sharded relational store, and sync devices through a change log. Notice what happened: the same nine steps from chapter one produced ten very different answers, because the dominant constraint was different each time. Your turn: for each system, state the dominant constraint before anything else. And the design problem: pick one and run the full method, requirements to trade-offs, writing each step's artifact.",
}
