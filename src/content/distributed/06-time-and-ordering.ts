import type { Section } from '../types'

export const timeAndOrdering: Section = {
  id: 'time-and-ordering',
  title: 'Time and ordering',
  scene: 'sd-time',
  focus: 'clocks',
  slide: `## Time and ordering

*When clocks cannot be trusted, order events by causality.*

### Model
- **Physical clocks** drift and jump (NTP: ms to tens of ms); use **monotonic** clocks for durations
- **Happens-before**: same process, or send → receive; else **concurrent**
- **Lamport**: max + 1, orders consistently. **Vector clocks** detect concurrency
- **Wall clocks**: NTP ms–tens of ms off, can jump backwards — never order events across machines with them

### Worked example & failure
- Node clock +300 ms: its earlier write is stamped **later** and wins last-write-wins
- Lamport can't say two events are concurrent

### Your turn
- A sends at t = 5 to B whose counter is 3: B's new value? Are [2,1] and [1,2] ordered?
- Design: order comments in a thread without synced clocks`,
  narration:
    "On one machine, you can order events by looking at the clock. Across machines, that fails, and understanding why is one of the most useful ideas in the field. Physical clocks first. Each machine has a wall clock, kept roughly right by NTP, but they differ by milliseconds to tens of milliseconds, and sometimes by seconds. They also drift: a quartz clock gains or loses tens of parts per million, a few seconds a day, between corrections. And when NTP does correct, the clock can jump, even backwards. So never use wall-clock time to order events across machines, and use a monotonic clock for measuring durations on one. Here's what goes wrong. Last-write-wins replication stamps each write with its node's clock. If node one's clock is three hundred milliseconds fast, then a write there at true time ten hundred hours and two hundred milliseconds gets the stamp five hundred, while a later, true, write on an accurate node gets three hundred and fifty. The earlier write wins, and the later one is silently lost. The fix is to stop asking when, and ask what could have caused what. Define happens-before: event a happens before b if they're on the same process with a first, or if a is the sending of a message and b is its receipt, and by chaining those. If neither happens before the other, they're concurrent. A Lamport timestamp is a counter that respects this. Each process keeps a number. On a send, it increments and attaches the value. On a receive, it takes the maximum of its own value and the message's, and adds one. So if a happens before b, a's timestamp is lower. But the reverse isn't true: a lower timestamp doesn't prove a happened first, and Lamport clocks can't tell you two events were concurrent. Vector clocks fix that. Each process keeps a counter per process, and merges by taking the maximum. Compare two vectors: if one is less than or equal to the other everywhere, it happened first. If neither is, they're concurrent, a genuine conflict to resolve. In the scene, the post, the reply and an unrelated write show this: the reply's vector is after the post's, and concurrent with the unrelated write. The cost is that vectors grow with the number of nodes. Your turn. A sends with timestamp five to B, whose counter is three, so B becomes max of three and five, plus one: six. And the vectors two-one and one-two are concurrent, since each is larger in one position. The design problem: order the comments in a thread without synchronised clocks. Consider parent pointers for causality, and a single sequence assigned per thread by one partition leader for display order.",
}
