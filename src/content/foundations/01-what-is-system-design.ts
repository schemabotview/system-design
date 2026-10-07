import type { Section } from '../types'

// §1.1 — opens the course with its one recurring principle: derive architectures, don't memorize them.
export const whatIsSystemDesign: Section = {
  id: 'what-is-system-design',
  title: 'What is system design?',
  scene: 'sd-layers',
  focus: 'hld',
  slide: `## What is system design?

*Name a system's parts; separate architecture from detail.*

### Model
- **System** = components + **interfaces**; an interface is a promise — *what*, never *how*
- **HLD**: boxes, stores, protocols. **LLD**: classes, schemas, algorithms

### Worked example
- Photo app: upload + feed subsystems → the feed's heap and \`photos\` table

### Architecture & failure
- Architecture = decisions **costly to reverse**
- No interface → no parallel teams; LLD before load → polishing the wrong part

### Your turn
- Write one subsystem's interface as 3 operations
- Design: URL shortener in ≤ 5 boxes — your biggest regret?`,
  narration:
    "Let's start with the question the whole course answers: what is system design? A system is a set of components that work together toward a goal, connected by interfaces. A subsystem is a group of components that presents its own interface to the rest, and a component is a piece you treat as a unit at the level you're currently thinking at. The interface is the important word there. An interface is a promise about what a component does, never about how it does it. Upload a photo, get back an id. As long as that promise holds, everything behind it can change. Now, the picture on the left shows two altitudes of the same photo-sharing app. The top band is the high-level design, or HLD: a client, an upload subsystem, a feed subsystem, an object store for photo bytes, and a metadata database, with the contracts between them. The card below is the low-level design, or LLD, of just one of those boxes: the feed builder merges the posts of everyone you follow using a heap, over a photos table with an index on owner and time. That gives us the cleanest distinction between architecture and detailed design. Architecture is the set of decisions that are expensive to reverse, such as where the boundaries are, which data store holds what, and which protocol joins them. Detailed design is everything that's cheap to change later. And it also separates system design from software design. Software design is about the code inside one process. System design is about how many processes and machines are arranged, and how that arrangement behaves under load and under failure. Here is how this goes wrong. If you draw boxes without defining the interfaces, two teams can't build in parallel, because neither knows what the other promised. If you dive into the class hierarchy before you know the load, you can polish a component that was never the problem. And if an interface leaks, say callers come to depend on a table's column layout, then every internal change ripples outward. One principle will run through every chapter: don't memorize architectures, derive them from requirements, constraints and trade-offs. Your turn. First, pick a subsystem and write its interface as three operations, each with inputs, outputs and an error case. Then the design problem: sketch a URL shortener in no more than five boxes, and name the one decision you'd most regret in a year. Keep that answer; we'll check it against the real numbers in section four.",
}
