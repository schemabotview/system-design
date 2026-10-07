import type { Section } from '../types'

export const capAndPacelc: Section = {
  id: 'cap-and-pacelc',
  title: 'CAP and PACELC',
  scene: 'sd-cap',
  focus: 'part',
  slide: `## CAP and PACELC

*A partition forces one choice: consistency or availability.*

### Model
- **C** = linearizability · **A** = every live node answers · **P** = the network splits
- Partitions happen, so the real choice is **CP vs AP**, and only *during* one
- **PACELC**: if **P**: A or C; **E**lse: **L**atency or **C**onsistency
- **CAP theorem**: during a partition a replica must refuse (C) or answer, possibly stale (A)
- Misconceptions: not "pick two" · C ≠ ACID · A ≠ high uptime

### Worked example & failure
- Bank balance: refuse rather than lie (CP). Shopping cart: accept both sides, merge (AP)
- Misreading CAP as "pick two" or "C means ACID"; assuming you must choose all the time

### Your turn
- CP or AP: ATM withdrawal · like counter · last item in stock · DNS
- Design: PACELC stance for catalog browsing vs checkout`,
  narration:
    "The CAP theorem is the most quoted and most misquoted result in distributed systems, so let's state it carefully. Imagine two replicas of a value in two regions. The link between them goes down: a network partition. Both replicas are alive, and each can still talk to its own clients. A client writes x equals one to replica A. Another client reads x from replica B, which can't hear A. What should B do? It has exactly two honest options. It can refuse, or return an error, rather than return a value that might be stale: that is choosing consistency, and the system is unavailable on that side. Or it can answer with what it has, x equals zero: that is choosing availability, and the system is no longer consistent. It can't do both, and that's the whole theorem: when a partition occurs, you must choose between consistency and availability. In CAP, consistency specifically means linearizability from the last section. Availability means every non-failed node returns a response, not that the system has high uptime. And partition tolerance isn't something you choose: partitions happen whether you like it or not, so the real choice is CP or AP. The misconceptions are worth memorising. CAP isn't pick any two of three, because you can't opt out of partitions. It describes behaviour only during a partition, and most of the time there isn't one. And the C in CAP is not the C in ACID. CAP has a gap: it says nothing about the system when the network is healthy. PACELC fills it in: if there's a Partition, choose between Availability and Consistency; Else, when running normally, choose between Latency and Consistency. That second half is the one you feel every day, because stronger consistency means coordinating replicas, which costs round trips even when nothing is broken. Systems fall into styles: Cassandra by default is PA/EL, favouring availability and latency, and Spanner is PC/EC, favouring consistency in both cases, though many are tunable. How do you choose? By what's worse for the business. A bank balance should refuse rather than show a wrong number, so CP. A shopping cart should keep accepting items on both sides of a partition and merge later, so AP. A like counter is AP. Your turn: an ATM withdrawal is CP; a like counter is AP; the last item in stock leans CP, or AP with a plan to apologise for oversells; DNS is AP. And the design problem: take product browsing and checkout in one shop and state a PACELC stance for each, with a reason.",
}
