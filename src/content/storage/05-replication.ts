import type { Section } from '../types'

export const replication: Section = {
  id: 'replication',
  title: 'Replication',
  scene: 'sd-replication',
  focus: 'topo',
  slide: `## Replication

*Copy data for availability and read scale; manage the lag.*

### Model
- **Leader–follower**: writes to the leader, a log to followers. **Multi-leader**: a leader per region, conflicts. **Leaderless**: quorum, **W + R > N**
- **Lag**: async followers are behind. **Failover**: detect → promote → repoint
- **Lag** → read-your-writes: route the author to the leader for a few seconds

### Worked example & failure
- 58K reads/s ÷ 15K/node → **4** read replicas
- Post then refresh, and it is missing: read your own writes from the leader
- Async failover loses the newest writes; two leaders = **split brain**

### Your turn
- N = 5: do W = 3, R = 3 and W = 2, R = 2 guarantee fresh reads?
- Design: failover for zero data loss vs 1 s`,
  narration:
    "A single database server is a single point of failure and a single limit on read capacity. Replication keeps copies of the data on several machines. The most common arrangement is leader-follower. All writes go to one leader, which appends them to a replication log; the followers apply that log and serve reads. That gives you read scale and a standby, the picture at the top of the scene. Followers copying asynchronously are slightly behind, which is replication lag, and that's where trouble starts. Read replicas scale reads but not writes: with peak reads of fifty-eight thousand a second and fifteen thousand per node, you need four read replicas, while the leader still handles every write. Now the lag problem. A user posts, the write goes to the leader, the page refreshes and reads from a follower that is a hundred milliseconds behind, and the post isn't there. The usual fix is read-your-writes: route a user's reads to the leader for a few seconds after they write. Related is monotonic reads, so a user doesn't see data go backwards between two followers. The second topology is multi-leader: each region has its own leader, so writes are local and fast, but two regions can change the same row at once, so you need conflict resolution, last-write-wins, merging, or application logic. The third is leaderless: the client writes to W of N replicas and reads from R of them. If W plus R is greater than N, the read set and the write set must overlap, so a read sees the latest write. With N of three, W of two and R of two, you tolerate one failed node. Hence the exercise: with N of five, W of three and R of three sums to six, which is more than five, so reads are fresh; W of two and R of two sums to four, which isn't, so a read can miss the latest write. Finally, failover. When the leader dies, you must detect it, promote a follower, and repoint clients. With asynchronous replication the newest writes the old leader never shipped are lost, and if the old leader comes back believing it's still the leader, you have two leaders accepting writes, split brain, which fencing and consensus, in chapter four, exist to prevent. For the design problem, consider two requirements, zero data loss and at most one second of loss. Zero loss needs a synchronous replica, which makes every write wait for the network. Explain what that does to write latency and availability, and which requirement you would accept in a payments system.",
}
