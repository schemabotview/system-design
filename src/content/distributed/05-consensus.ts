import type { Section } from '../types'

export const consensus: Section = {
  id: 'consensus',
  title: 'Consensus',
  scene: 'sd-consensus',
  focus: 'cluster',
  slide: `## Consensus

*Make many nodes agree on one value, despite failures.*

### Model
- **Problem**: agreement, validity, termination. **Quorum** = majority ⌊N/2⌋+1; tolerates (N−1)/2 crashes
- **Leader election** by votes in numbered **terms**; **Raft** commits when a majority stored the entry
- **Paxos**: proposers, acceptors, prepare/accept — same majority idea

### Worked example & failure
- 5 nodes split 3 | 2: the majority side keeps committing; the minority cannot
- **Split brain** needs two disjoint majorities — impossible

### Your turn
- 7 nodes tolerate how many failures? Why is 4 no better than 3?
- Design: 5-node coordination service across 3 zones`,
  narration:
    "Consensus is the problem of getting a group of nodes to agree on a single value, or on a single ordered log of values, even when some of them crash and messages are delayed. It's the foundation of leader election, locks, configuration stores, and strongly consistent databases. A correct consensus protocol has three properties: agreement, so no two nodes decide differently; validity, so the decided value was actually proposed; and termination, so the nodes eventually decide. The key tool is the quorum: a majority of the nodes. With N nodes, a majority is the floor of N over two, plus one. Any two majorities overlap in at least one node, and that overlap is what stops two sides from making conflicting decisions. A cluster of N nodes tolerates N minus one over two crashes: three nodes tolerate one, five tolerate two, seven tolerate three. Now Raft, the algorithm designed to be understandable. Time is divided into numbered terms. One node is the leader, and clients send it all writes. The leader appends each to its log and sends it to the followers, and an entry is committed once a majority has stored it, and only then does the leader answer the client. If followers stop hearing from the leader, one times out, after a random wait of about a hundred and fifty to three hundred milliseconds, becomes a candidate in a higher term and asks for votes. A majority of votes makes it leader. The randomness stops everyone from standing at once. The term number fences off old leaders: any message from an older term is rejected. Paxos solves the same problem with proposers and acceptors in two phases, prepare and promise, then accept, and it's the same majority idea underneath, but it's famously harder to explain and implement. Look at the scene: five nodes, and a partition splits them three and two. The side with three can still form a majority, so it keeps its leader and keeps committing. The side with two can't reach a majority, so its nodes time out and ask for votes, but never win, and can't commit anything. That's how consensus avoids split brain: two leaders would each need a majority, and two disjoint majorities of the same five nodes can't exist. The price is that the minority side is unavailable for writes, which is CAP's choice of consistency. Your turn. Seven nodes tolerate three failures, as a quorum is four. And four nodes are no better than three: the quorum is three, so you still tolerate only one failure, while paying for an extra node, which is why clusters have odd sizes. The design problem: place a five-node coordination service across three availability zones, perhaps two, two and one, and check that losing any single zone still leaves a majority.",
}
