import type { Section } from '../types'

export const consistencyModels: Section = {
  id: 'consistency-models',
  title: 'Consistency models',
  scene: 'sd-consistency',
  focus: 'ladder',
  slide: `## Consistency models

*A consistency model is a promise about what reads may return.*

### Model
- **Eventual** → **monotonic reads** → **read-your-writes** → **causal** → **linearizable** (strong)
- Stronger = fewer anomalies, **more coordination** and latency
- Linearizable: as if one copy; a write that returned is seen by every later read
- **Causal**: cause before effect, for everyone · **monotonic reads**: time never goes backwards

### Worked example & failure
- Cross-region RTT 80 ms: a linearizable write waits **~80 ms**; an eventual local ack takes **~1 ms**
- Reply visible before its post; page count going 5 → 4

### Your turn
- Name the model that fixes: stale own photo · 5 comments then 4 · reply before post
- Design: pick a model for likes, own posts, comment threads, unique usernames`,
  narration:
    "A consistency model is a contract between the database and its users, a precise statement of what a read may return when writes and replicas are involved. There's a ladder of them, from cheap and loose to strong and costly, and the scene shows five rungs. At the bottom is eventual consistency: if writes stop, all replicas eventually converge on the same value. It promises nothing about what you see in the meantime. Monotonic reads add one rule: you never see data older than what you've already seen, so time doesn't go backwards. Read-your-writes says that after you update something, you see your own update. Causal consistency says that if one operation could have influenced another, everyone sees them in that order: a reply never shows up before the post it answers. At the top is linearizability, often just called strong consistency. The system behaves as if there were a single copy of the data, and every operation takes effect atomically at some instant between its start and its end. In particular, once a write has returned, every later read, from anyone, sees it. The trace shows the difference. Client A writes x equals one, and the write completes. Client B then reads and gets one. Client C reads after that and gets zero. Eventual consistency allows that stale answer. Linearizability forbids it. Why not always choose the top rung? Because it costs coordination. A linearizable write must be confirmed by a majority of replicas, so if your replicas are in different regions, eighty milliseconds apart, every such write waits at least that long. An eventually consistent write can be acknowledged by the local replica in about a millisecond. Weak models are faster and more available, but they expose anomalies, and the middle rungs exist to remove the most annoying ones. The three at the bottom of the scene are the ones users notice. You change your profile photo, refresh, and see the old one: read-your-writes fixes that. A page shows five comments, you refresh, and it shows four: monotonic reads. A reply appears without the post it replies to: causal consistency. So your turn has its answers. And the design problem: for a social network, choose a model for the like counter, for a user viewing their own posts, for comment threads, and for username uniqueness. The like count can be eventual, own posts need read-your-writes, comment threads need causal consistency, and a unique username needs linearizability, since two people must not both win the same name.",
}
