import type { Section } from '../types'

export const designMethod: Section = {
  id: 'design-method',
  title: 'A systematic design method',
  scene: 'sd-method',
  slide: `## A systematic design method

*One nine-step method for the rest of the course.*

### Model
- **Requirements → Estimation → API → Data model → Architecture → Bottlenecks → Scaling → Reliability → Trade-offs**
- Each step produces an **artifact** the next consumes; loop back when needed
- Three movements: **understand** (1–2) · **shape** (3–5) · **defend** (6–9)
- Artifacts: scoped requirements · numbers · endpoints · schema · diagram · ranked bottlenecks · scaling plan · failure modes · decisions

### Worked example & failure
- URL shortener: 400 reads/s, 3 TB → code→URL store + cache; viral link = **hot key**; 301 vs 302
- Boxes first = resume-driven; no estimate = over- or under-build

### Your turn
- Pastebin: one line of artifact per step
- Design: notification service, steps 1–3`,
  narration:
    "We finish the chapter by putting everything together into one method, the sequence we'll use for the rest of the course. It has nine steps in three movements. First, understand the problem: requirements, then estimation. Second, shape the design: the API, the data model, and then the architecture. Third, stress and defend it: find the bottlenecks, plan the scaling, plan for reliability, and write down the trade-offs. The order matters because each step consumes the output of the one before it. Requirements tell you which numbers to estimate. Estimates tell you whether you even need a distributed design. The API fixes the operations, the operations determine the access patterns, the access patterns determine the data model, and only then does the architecture fall out of all of that. This is the principle from the start of the chapter in practice: you derive the architecture, you don't recall it. Let's walk the method through the URL shortener in a line per step. Requirements: shorten a link and redirect, with redirects under fifty milliseconds at p ninety-nine. Estimation: four hundred reads a second and three terabytes in five years. API: a post to create a link, and a get on the short code to redirect. Data model: a key-value mapping from code to long URL, because we only ever look up by code. Architecture: load balancer, stateless app servers, a key-value store, and a cache in front. Bottlenecks: at four hundred queries a second there's nothing, except a viral link, a hot key that every request hits. Scaling: the cache absorbs it, and replicas add read capacity. Reliability: replicate across zones. Trade-offs: a three-oh-one redirect can be cached by browsers, which is fast, but you lose click counts; a three-oh-two lets you count at the cost of more traffic. Notice that each step leaves behind an artifact, as the cards show: a scoped requirements list, then the numbers, then the contracts, the schema, the diagram, a ranked list of bottlenecks, a scaling plan, a failure-mode list, and finally the decisions with their reasons. Notice also that the method is a loop. A bottleneck found in step six can send you back to the data model in step four, and that's fine. Two failure modes to avoid. Jumping straight to a diagram of boxes, which is resume-driven design, picking technologies because they're familiar. And skipping estimation, so you overbuild or underbuild without knowing it. Your turn: write one line of artifact for each of the nine steps for a pastebin service. Then the design problem: take a notification service through the first three steps, requirements, estimation and API, and stop. We'll complete it in Chapter 8. That's Chapter 1. Next we ask how those components actually talk to each other.",
}
