import type { Section } from '../types'

export const deliverySemantics: Section = {
  id: 'delivery-semantics',
  title: 'Delivery semantics',
  scene: 'sd-delivery',
  focus: 'handler',
  slide: `## Delivery semantics

*Choose between losing a message and repeating it — then make repeats harmless.*

### Model
- **At-most-once**: ack first; may lose. **At-least-once**: ack after; may duplicate
- **Exactly-once** *effect* = at-least-once + **idempotent consumer** (or an atomic in-broker transaction)
- **Deduplicate** on a message id or natural key, in the same transaction as the effect

### Worked example & failure
- 1% redelivery on 100K/s = **1,000 duplicates/s**; an undeduped counter is 1% high
- 10M/day × 7 days × 16 B ≈ **1.1 GB** of dedupe ids

### Your turn
- Semantics for: metrics counter · payment · welcome email
- Design: where the dedupe record lives, and how long`,
  narration:
    "Chapter two introduced delivery semantics. Now we look at what they cost and how to build them. Everything follows from one question: when a consumer crashes, where does it leave the message? Suppose a consumer receives a message, does the work, and acknowledges it. If it acknowledges first and then processes, a crash in between means the work is never done, the message is lost, but it can never be processed twice. That's at-most-once. If it processes first and acknowledges afterwards, a crash in between means the broker never saw the acknowledgement and delivers the message again, so the work is done twice. That's at-least-once, and it's the sensible default because losing data is usually worse than repeating it. Duplicates come from three places: a producer retries after a lost acknowledgement, a consumer crashes before acknowledging, and a rebalance hands a partition to another consumer mid-processing. So duplicates are normal, and the way out is the idempotent consumer, shown in the code. Inside one database transaction, the handler first checks a table of processed message ids, and if the id is there, it skips. Otherwise it applies the business effect and inserts the id, in the same transaction, and then acknowledges. If it crashes after the transaction but before the acknowledgement, the message comes again, and the check finds the id and skips it. That's an exactly-once effect built from at-least-once delivery plus idempotency. True exactly-once delivery over an unreliable network can't exist, and the broker features that claim it do it by making an atomic read-process-write within the system. The dedupe key can be the message id, or a natural key such as the order number. You only need to remember ids for a bounded window: ten million messages a day for seven days is seventy million ids, at sixteen bytes about one point one gigabytes. The danger of ignoring all this is quiet. With one percent redelivery at a hundred thousand messages a second, you get a thousand duplicates a second, and a counter built on them is a percent high forever. Your turn. A metrics counter can tolerate at-most-once, or at-least-once if a little error is fine. A payment needs at-least-once plus an idempotency key, so it's applied once. A welcome email is at-least-once with deduplication on the user id, so nobody gets two. For the design problem, decide where the dedupe record lives, why it must be in the same transaction as the effect, and how long you keep it.",
}
