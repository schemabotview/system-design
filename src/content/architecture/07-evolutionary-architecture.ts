import type { Section } from '../types'

export const evolutionaryArchitecture: Section = {
  id: 'evolutionary-architecture',
  title: 'Evolutionary architecture',
  scene: 'sd-evolution',
  focus: 'journey',
  slide: `## Evolutionary architecture

*Case study: evolve a startup monolith into a globally distributed system.*

### Model
- Each stage is triggered by a **measured pressure**, not by fashion
- **Strangler**: route through a facade, replace piece by piece, retire the old
- **Backward compatibility**, **schema and API evolution**: additive, deprecate, never break
- **Technical debt** is a loan; design for change

### Worked example & failure
- Rename a column: add → dual-write → backfill → switch reads → drop. 1B rows ÷ 20K/s ≈ **14 h**
- Big-bang rewrites stall; debt left unpaid slows every change

### Your turn
- Order the steps to rename \`username\` to \`handle\`
- Design: the trigger for each of the four stages`,
  narration:
    "The last section of the chapter is a case study in how architecture changes over time, because no good architecture is designed once. The scene follows a startup. At a thousand users, the right system is a monolith: one application and one database, simple and fast to change. At a hundred thousand users, the database's CPU passes sixty percent, so you introduce a modular structure, read replicas, and a cache. At ten million users, specific contexts are hot or need to scale independently, so you extract them into services, add a queue, and shard the data. At a billion users, with users far from the data centre and regional outages becoming unacceptable, you go multi-region with regional cells and geo-routing. Notice that each stage is triggered by a measured pressure, such as database load, deploy conflicts between teams, or latency from far-away users, not by a wish to use a technology. The way you move between stages is the strangler pattern: put a facade in front of the old system, route one slice of traffic to the new component, verify it, route more, and finally retire the old piece. The old and new run side by side the whole time, so every step is reversible. Several techniques make each step safe. For data migrations, use expand and contract. Say you rename a column from username to handle: first add the new column, then dual-write to both, then backfill the old rows, then switch the reads to the new column, then stop writing the old one, and finally drop it. Backfilling a billion rows at twenty thousand rows a second takes about fourteen hours, so it has to run in the background. Backward compatibility means old clients keep working while new ones roll out: make changes additive, be tolerant of unknown fields, and in protobuf never reuse a field number. API evolution means versioning, announcing deprecations with a sunset date, and testing contracts from the consumer's side. Technical debt is a loan: sometimes taking it is the right call, but you must track it, and it charges interest as slower change, so pay it down at the seams where you're already working. And design for change: narrow interfaces, clear data ownership, reversible decisions, and feature flags. Your turn. The order for the rename is: add the new column, dual-write, backfill, switch reads, stop writing the old column, drop it. The design problem is the case study: for each of the four stages write the measurable trigger that would justify the move. That completes chapter six. Next, reliability, security and operations.",
}
