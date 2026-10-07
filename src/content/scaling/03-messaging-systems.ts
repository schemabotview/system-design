import type { Section } from '../types'

export const messagingSystems: Section = {
  id: 'messaging-systems',
  title: 'Messaging systems',
  scene: 'sd-messaging',
  focus: 'log',
  slide: `## Messaging systems

*A partitioned log decouples producers from consumers and lets you scale both.*

### Model
- **Queue**: removed once acked. **Stream**: retained log; consumers track an **offset**, can replay
- **Consumer group**: one consumer per partition, so parallelism ≤ partitions
- **Ordering** holds per partition; key → partition. **Backpressure**: pull, lag, bound
- **DLQ** parks poison messages

### Worked example & failure
- 100K msg/s ÷ 5K per consumer = **20** → use 32 partitions
- Produce 100K, consume 80K → lag grows **20K/s** = 12M in 10 min

### Your turn
- 60K msg/s, 4K per consumer: partitions?
- Design: per-user ordering of notifications`,
  narration:
    "In chapter two we met queues and topics. At scale, the structure that matters is the partitioned log, which is what systems like Kafka are built on. A topic is split into partitions. Each partition is an ordered, append-only log, and every message in it has an offset, its position. Producers choose a partition by hashing a key, so all messages with the same key land in the same partition. The log is retained for a period, say seven days, rather than deleted once read. That's the difference between a queue and a stream: in a classic queue, a message is removed once it's acknowledged. In a stream, consumers simply keep track of an offset and can rewind it to replay history, so a new service can be started and read from the beginning, or a bug can be fixed and the data reprocessed. Consumers are organised into consumer groups. Within a group, each partition is read by exactly one consumer, so the group splits the work, and the maximum parallelism is the number of partitions. A second group reads the same log independently, at its own pace, which is how many services consume one stream. Ordering follows from this: messages are ordered within a partition, but not across partitions. If you key by user id, all events for one user are in order, which is usually what you need. Now sizing. If you must handle a hundred thousand messages a second and each consumer manages five thousand, you need twenty consumers, so at least twenty partitions, and you pick thirty-two for headroom, because you can add partitions later but it changes the key mapping. Then backpressure: consumers pull messages at their own pace, so a slow consumer doesn't get overwhelmed, it just falls behind. That gap is lag. If producers write a hundred thousand a second and consumers process eighty thousand, the lag grows by twenty thousand a second, twelve million messages in ten minutes, so you alert on lag and either add consumers, up to the partition count, or shed load. A queue should be bounded, so it can push back on producers rather than grow without limit. And a message that keeps failing, a poison message, would block its partition forever, so after a few retries you move it to a dead-letter queue, raise an alert, inspect it, and replay it once fixed. Your turn. Sixty thousand messages a second at four thousand per consumer is fifteen consumers, so at least fifteen partitions: pick sixteen or twenty-four. The design problem: notifications must arrive in order per user, so key by user id. Then consider a very active user whose partition gets hot, and decide how you'd handle it.",
}
