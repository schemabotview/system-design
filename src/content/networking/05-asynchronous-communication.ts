import type { Section } from '../types'

export const asynchronousCommunication: Section = {
  id: 'asynchronous-communication',
  title: 'Asynchronous communication',
  scene: 'sd-async',
  focus: 'flow',
  slide: `## Asynchronous communication

*Decouple producers from consumers with a broker, and know what it promises.*

### Model
- **Event**: a fact. **Producer** publishes; **consumer** processes later
- **Queue**: one consumer per message. **Pub/sub**: every subscriber gets a copy
- **Delivery**: at-most-once · **at-least-once** · exactly-once effect = at-least-once + **idempotent consumer**
- **Queue**: work distribution, one consumer per message · **pub/sub**: broadcast, every subscriber gets a copy

### Worked example & failure
- Burst 5,000/s for 60 s vs 2,000/s capacity → backlog **180,000**; drains in 180 s at 1,000/s load
- Crash before ack → duplicate; a poison message blocks the queue

### Your turn
- 2,500 msg/s in, workers do 700/s: how many?
- Design: upload → thumbnail → notify`,
  narration:
    "The alternative to waiting for an answer is to hand the work to a broker and move on. This is asynchronous communication, and it changes the shape of a system. The basic pieces: a producer publishes a message or an event, an event being a record that something happened, such as a photo was uploaded. A broker stores it, and consumers process it later, at their own pace. The scene shows two shapes. A queue distributes work: each message goes to exactly one consumer, so adding workers adds capacity, as with the thumbnail workers. Publish-subscribe broadcasts facts: every subscriber gets its own copy, so the feed fan-out and the notifier each react to the same photo-uploaded event, and the producer doesn't know or care who's listening. A system built from these is event-driven. Its great advantage is decoupling in time and in knowledge: the upload service doesn't wait for thumbnails and doesn't need to be changed to add a new subscriber. The costs are eventual consistency, because the thumbnail doesn't exist the instant the upload returns, and harder debugging, because a flow is spread across services. Now the contract. Delivery semantics describe what the broker promises. At-most-once means send and forget: no duplicates, but a message can be lost, which is fine for metrics. At-least-once means redeliver until the consumer acknowledges, so nothing is lost but duplicates can happen, and this is the usual default. Exactly-once delivery doesn't exist across a network, but you can get an exactly-once effect by combining at-least-once with an idempotent consumer, one that deduplicates on a message id so processing twice is harmless. The queue also absorbs bursts. Suppose five thousand messages a second arrive for sixty seconds while consumers handle two thousand a second. The backlog grows by three thousand a second, so after a minute it holds a hundred and eighty thousand messages. When the load falls to a thousand a second, you drain one thousand a second of spare capacity, so it takes a hundred and eighty seconds to catch up. The queue turned an outage into a delay, but you must watch queue depth and age. Failure modes: a consumer that crashes after processing but before acknowledging gets the message again, which is why idempotency matters, and a poison message that always fails can block a queue, so you route it to a dead-letter queue after a few attempts. Your turn. With twenty-five hundred messages a second arriving and workers handling seven hundred each, three workers manage two thousand one hundred, so the backlog grows by four hundred a second; four workers give twenty-eight hundred, which keeps up with headroom to spare. The design problem: take an upload through thumbnail generation and a notification, choose queue or topic for each step, and state the delivery guarantee you need.",
}
