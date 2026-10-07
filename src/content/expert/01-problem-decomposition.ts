import type { Section } from '../types'

export const problemDecomposition: Section = {
  id: 'problem-decomposition',
  title: 'Problem decomposition',
  scene: 'sd-problem',
  focus: 'funnel',
  slide: `## Problem decomposition

*Turn an ambiguous prompt into a design problem you can actually solve.*

### Model
- **Clarify** scope, scale and targets; surface **hidden requirements**
- Find the **dominant constraint**, in one sentence; trace the **critical path**
- Draw the **system boundary**: what is inside, what is outside

### Worked example & failure
- Chat: 50M DAU × 40 msgs = 2B/day ≈ **23K msgs/s** (116K peak); 10% online = **5M connections** ÷ 100K = **50 gateways**
- Designing before clarifying; boundaries that grow to "everything"

### Your turn
- Ride-hailing: five clarifying questions and the dominant constraint?
- Design: boundary and critical path for a video upload service`,
  narration:
    "Chapter eight is different from the rest. It introduces almost no new components. Instead it develops judgement: the ability to take a vague problem and produce a design you can defend. That begins before any drawing, with decomposition. A prompt like design a chat system is not a problem yet. It's an invitation to ask questions, and the scene shows the funnel an expert runs. Step one is clarifying. What's in scope: one-to-one messages only, or groups and how large? What's the scale: how many daily users, what peak, what growth? What are the targets for latency, for consistency, for durability? You aren't stalling, you're turning an open question into numbers. Along the way you surface the hidden requirements, the ones nobody states. In chat, messages must arrive in order, devices that are offline must receive messages later, people expect read receipts, and there are abuse, retention and privacy-law questions. Step two is finding the dominant constraint: the one or two requirements that will bend the architecture more than any others, said in a single sentence. For chat it's keeping millions of connections open and delivering in order. Check it with arithmetic: fifty million daily users sending forty messages is two billion messages a day, about twenty-three thousand a second, and a peak of about a hundred and sixteen thousand. If ten percent are online, that's five million open connections, and at a hundred thousand connections per gateway machine, you need fifty gateways. Now you know the problem is connections and ordering, not raw message throughput. Step three is the critical path: the sequence of steps that determines the user's experience, here send, persist, deliver. And finally the system boundary. In the context diagram, the users and the push providers are outside our system, and the gateway, the message service and the store are inside. Everything inside is ours to design and operate. The failures are predictable: designing before clarifying, so you solve the wrong problem elegantly, and a boundary that quietly expands to include everything. Your turn. For a ride-hailing app, five good questions are: how many cities and riders, what's the matching latency target, how often do drivers report location, what happens when a driver cancels, and which payment methods. The dominant constraint is location updates and matching: a million drivers reporting every four seconds is two hundred and fifty thousand updates a second. And the design problem: draw the boundary and critical path of a video upload service.",
}
