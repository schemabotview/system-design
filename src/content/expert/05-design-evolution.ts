import type { Section } from '../types'

export const designEvolution: Section = {
  id: 'design-evolution',
  title: 'Design evolution',
  scene: 'sd-design-evolution',
  focus: 'big',
  slide: `## Design evolution

*Design the same system at 1,000 → 100,000 → 10 million → 1 billion users.*

### Model
- Compute the load each size creates (20 reads/user/day, peak 5×)
- **Complexity is justified only when a number crosses a limit**
- 1K one box · 100K one DB + replica · 10M cache, replicas, queue · 1B shards, regions, cells
- 1K one box · 100K DB + replica · 10M cache, replicas, queue · 1B shards, regions, cells

### Worked example & failure
- 1K: **0.2/s** · 100K: **23/s** (peak 115) · 10M: **2.3K/s** (11.6K) · 1B: **231K/s** (1.2M)
- 100K users is still one database; a cache there is for resilience, not load

### Your turn
- At what user count does a 15K reads/s database saturate at peak?
- Design: justify each component of your 10M-user design with a number`,
  narration:
    "The fifth skill is knowing when architecture is justified. The exercise is to design the same system at four sizes: a thousand users, a hundred thousand, ten million, and a billion. The surprising lesson is how long simple designs remain correct, and the way to see it is to compute the load. Assume each user does twenty reads a day, and that peak is five times the average. At a thousand users, that's twenty thousand reads a day, which is about point two reads a second. One application and one database, with no complexity at all. Anything more is waste. At a hundred thousand users, it's two million reads a day, twenty-three a second, and about a hundred and fifteen at peak. This is still one database, a trivial load. A replica and a cache here are for resilience and to survive a failure, not because of load. Teams that build a distributed system at this size are paying for complexity they don't need. At ten million users, it's two hundred million reads a day, about twenty-three hundred a second, and eleven thousand six hundred at peak. Now a single database is straining, so complexity starts to earn its place: a cache, read replicas, a queue for asynchronous work, and the first extraction of a hot service. At a billion users, it's two hundred and thirty-one thousand reads a second, and about one point two million at peak. Now you need sharding, multi-region deployment, cells to limit blast radius, and separate teams owning separate domains. Each step of a hundred times in users changed the architecture, but only when a measurement forced it. The test to apply to any component is: which number demands this? If you can't name one, remove it. Which gives the answer to the exercise. A database that can serve fifteen thousand reads a second at peak, with peak five times average, saturates at three thousand reads a second on average. That's about two hundred and fifty-nine million reads a day, and at twenty reads per user, roughly thirteen million users. Below that, a single database is fine for reads. And the design problem: take your own ten-million-user design and justify every component with a number, then delete any component you can't justify.",
}
