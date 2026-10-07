import type { Section } from '../types'

export const tradeOffAnalysis: Section = {
  id: 'trade-off-analysis',
  title: 'Trade-off analysis',
  scene: 'sd-tradeoffs',
  focus: 'adr',
  slide: `## Trade-off analysis

*Every choice buys something and costs something — say both, and when to revisit.*

### Model
- **Consistency ↔ availability** · **latency ↔ durability** · **read ↔ write** optimisation
- **Simplicity ↔ scalability** · **cost ↔ reliability**
- Record each decision: options, choice, price paid, when to revisit
- Decision record: decision · context · options · chosen · price paid · revisit-if

### Worked example & failure
- Sync replica adds a ~**80 ms** round trip; 3 regions at **150%** vs 2 at **200%**
- Choosing a side silently; scaling before a number demands it

### Your turn
- Name the trade-off in: sync replication · denormalised timelines · a second region
- Design: a decision record for chat message storage`,
  narration:
    "No design is free, so the third expert skill is stating trade-offs explicitly. A trade-off is a choice in which each option buys something and costs something. The weak move is to pick a side without saying what it costs. The strong move is to say both, and to say when you'd choose differently. The plan names five trade-offs that recur in nearly every design. Consistency versus availability: during a partition you either refuse or diverge, as we saw in chapter four. A bank balance refuses, a shopping cart merges. Latency versus durability: do you acknowledge a write once it's in memory, or after it's been flushed to disk or copied to a replica? Waiting for a synchronous cross-region replica adds a round trip of about eighty milliseconds to every write. Read versus write optimisation: you can precompute results so reads are fast, with indexes, denormalised copies and materialised views, but every write then does more work. Simplicity versus scalability: every distributed component, such as a cache, a queue or a shard, is a cost in complexity, so add it only when a number demands it. And cost versus reliability: each extra nine of availability costs more than the previous one. Two regions need two hundred percent capacity so either can carry the load, three regions a hundred and fifty percent. To make a decision durable, write it down as a decision record, like the one on the left. It states the decision, the context with its numbers, the options considered, the one chosen, the price you're paying, and the condition under which you'd revisit. Here, the feed is served from precomputed timelines. The hybrid option wins, fan-out on write for ordinary users and on read for celebrities, paying write amplification for read latency, and revisiting if celebrities produce more than five percent of posts. A record like that lets a new team member understand not just what was built, but why, and when it should change. The failure modes are making a choice silently, so nobody knows it was a choice, and scaling early, paying complexity for a problem that doesn't exist yet. Your turn. Synchronous replication is latency versus durability. Denormalised timelines are read versus write optimisation. A second region is cost versus reliability, with a consistency question attached. And the design problem: write a decision record for how a chat system stores its messages, with the options, your pick, the price, and the trigger to revisit.",
}
