import type { Section } from '../types'

export const qualityAttributes: Section = {
  id: 'quality-attributes',
  title: 'Quality attributes',
  scene: 'sd-quality',
  focus: 'qa',
  slide: `## Quality attributes

*Turn seven adjectives into numbers you can design against.*

### Model
- **Availability · reliability · scalability · performance · durability · maintainability · security**
- Availability = MTBF ÷ (MTBF + MTTR); up ≠ correct (**reliability**)
- **Series** multiplies; **redundancy**: 1 − (1 − a)ⁿ
- **Durability**: yearly loss probability (11 nines) · **performance**: latency percentiles · **security**: threat model, least privilege · **maintainability**: lead time, time to restore

### Worked example & failure
- 99.9% ≈ **8.8 h**/yr; 3 × 99.9% in series → **99.7%**; 2 replicas → **99.9999%**
- One 99.9% dependency caps ten services near 99%; attributes conflict

### Your turn
- LB 99.99 → app 99.9 → DB 99.95: total?
- Design: reach 99.99% for payments`,
  narration:
    "Quality attributes are the adjectives of system design: available, reliable, scalable, fast, durable, maintainable, secure. The trouble is that adjectives don't build anything. The skill in this section is turning each one into a number. The table shows all seven, each with the question it answers, how it's measured, and a typical target. Take availability, the most quoted of them. It's the fraction of time the system is up, which is mean time between failures divided by that plus mean time to repair. Ninety-nine point nine percent sounds great, but it allows about eight point eight hours of downtime a year. Ninety-nine point nine nine percent is about fifty-three minutes, and five nines is about five minutes. Now be careful with reliability, which is different. Reliability is whether the system behaves correctly over time. A service that is up but returning wrong answers is available and not reliable. Two formal rules do most of the work. When components are chained in series, so every one is needed, their availabilities multiply. Three services at ninety-nine point nine percent each give about ninety-nine point seven overall, which is roughly twenty-six hours of downtime a year. When you add independent redundancy, you multiply the failure probabilities instead: two replicas, each ninety-nine point nine percent, fail together only one time in a million, so ninety-nine point nine nine nine nine percent. Those two rules are the heart of the architecture analysis here. One ninety-nine point nine percent dependency shared by ten services drags all ten toward ninety-nine percent, because the chain is only as strong as the product of its links. And attributes pull against each other. Making data durable, by waiting for several disks to confirm a write, costs latency. Making a system scale usually costs simplicity. Security pulls against performance, since encryption and checks cost time, and availability pulls against cost, since every extra nine multiplies the spend. You never maximise all seven, you choose which ones dominate, and that was last section's dominant requirement. Your turn. A load balancer at ninety-nine point nine nine percent, an application tier at ninety-nine point nine, and a database at ninety-nine point nine five: multiply them and you get about ninety-nine point eight four percent, roughly fourteen hours a year. Now the design problem. A payments API needs ninety-nine point nine nine percent, about fifty-three minutes of downtime a year. Which components would you replicate, and across which failure domains, to move from fourteen hours to under one?",
}
