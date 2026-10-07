import type { Section } from '../types'

export const whyDistributedSystemsAreDifficult: Section = {
  id: 'why-distributed-systems-are-difficult',
  title: 'Why distributed systems are difficult',
  scene: 'sd-why-hard',
  focus: 'silence',
  slide: `## Why distributed systems are difficult

*Learn to reason when the only evidence is silence.*

### Model
- **Partial failure**: some parts fail while others run — at scale, always
- **Network failure** and **unreliable communication**: loss, delay, duplication, reordering
- **Clock uncertainty**, **concurrent execution**, **failure detection**: no shared "now", slow looks like dead

### Worked example & failure
- 10,000 servers × 3% a year = 300 failures/yr ≈ **one every 29 hours**
- A timeout has **four** explanations; blind retry may repeat a charge

### Your turn
- 2,000 nodes, MTBF 3 years: failures per day?
- Design: the caller timed out on "charge card" — what now?`,
  narration:
    "Chapter four is the theory underneath everything we've built so far. We begin with why distributed systems are hard, because the difficulty isn't scale, it's a particular kind of uncertainty. On one machine, a function call either returns or the whole program dies, together. Across machines, that coupling is gone. The first difficulty is partial failure: some parts fail while others keep running, and the system has no single state of up or down. At scale, it's the normal condition, not an exception. If you run ten thousand servers and each has a three percent chance of failing in a year, you should expect about three hundred failures a year, roughly one every twenty-nine hours. Failure is a routine event you design for. The second and third difficulties are the network and communication. Messages can be lost, delayed, duplicated or reordered, and a partition can split machines that are all individually healthy. There's no guarantee of delivery or order, and retrying a message to be safe creates duplicates. Put those together, and look at the top of the scene. A caller sends a request and waits three hundred milliseconds. Nothing comes back. What happened? There are four explanations, and the caller cannot tell them apart. The request never arrived. Or the server crashed before doing the work. Or the server did the work but the response was lost. Or the server is merely slow and will finish. Those need opposite responses: in the first two a retry is right, in the third a retry repeats the work, in the fourth it adds load to a struggling server. That ambiguity is the root of the chapter. Three more difficulties follow from it. Clock uncertainty: machines' clocks disagree by milliseconds or seconds, so timestamps can order events wrongly. Concurrent execution: many nodes act at once, and there's no global now to put their actions in order. And failure detection: from the outside, a slow node and a dead node look the same, so every failure detector can be wrong. These are the problems the rest of the chapter solves, with consistency models, consensus, logical time, and carefully chosen assumptions. Your turn. A cluster of two thousand nodes, each with a mean time between failures of three years, loses two thousand divided by about eleven hundred days, so about one point eight nodes a day, call it two. And the design problem: a caller times out on a charge card call. Write down the four possibilities, and the protocol that lets it retry safely, which uses the idempotency key from chapter two.",
}
