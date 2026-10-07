import type { Section } from '../types'

export const architectureDefense: Section = {
  id: 'architecture-defense',
  title: 'Architecture defense',
  scene: 'sd-defense',
  focus: 'first',
  slide: `## Architecture defense

*Be ready to answer seven questions about your design — with numbers.*

### The seven questions, answered for the URL shortener
- **Why this component?** Cache for tail latency and viral spikes, not capacity
- **Why this database?** Only lookup is by code: a key-value store
- **What fails first?** The cache on a viral link; users see a slower redirect, not an error
- **In a partition?** Reads served locally; creates refused on the minority side
- **Scale 10×?** 4K reads/s still fits; 30 TB → shard by code hash
- **Consistency?** Creator reads at once; others within ~1 s
- **Cost?** A few thousand dollars a month
- Principle: every part has a reason, every failure a plan, every promise a boundary

### Your turn
- Defend the payment system on all seven
- Design: write a one-page defence of your chosen case`,
  narration:
    "The final skill is defence. A design isn't finished when it's drawn; it's finished when you can answer hard questions about it. The plan gives seven, and the scene shows what a strong answer to each must contain. First, why this component? A good answer names the requirement or the number the component satisfies, and what would happen if you removed it. Second, why this database? Name the access pattern it matches, and be honest about what it's bad at and why that's acceptable. Third, what fails first? Name the weakest part and the signal that tells you, and describe what the user sees when it fails. Fourth, what happens during a network partition? Say which side refuses and which diverges, and what reconciles afterwards. Fifth, how does it scale ten times? Name the next bottleneck in numbers, and the change that moves it. Sixth, what consistency guarantee exists? State it per operation, in words a user would use, and say where it's weaker and why. Seventh, what does it cost? Compute, storage, bandwidth and people, and the cheaper alternative with what it would give up. Let's defend the URL shortener on all seven, as the slide shows. The cache: it's there for tail latency and viral spikes, not capacity, because at four hundred reads a second the database alone could cope. The database: the only access is lookup by code, so a key-value store fits, with no joins and about three terabytes. What fails first: the cache on a viral link, and the user sees a slightly slower redirect rather than an error, because the database is the fallback. A partition: reads are served from the local replica, but creating a link is refused on the minority side, so we never issue the same code twice. Ten times the traffic: four thousand reads a second still fits, and thirty terabytes would be sharded by hash of the code. Consistency: the creator can read their link immediately, and everyone else within about a second. Cost: a few thousand dollars a month at assumed cloud prices, mostly storage. That is a defensible design: every part has a reason, every failure has a plan, and every promise has a boundary. Your turn: defend the payment system on all seven questions, remembering that its answers will be much stricter on consistency and failure. And the design problem: write a one-page defence of the case study you chose in the last section. That completes the course. You began with requirements, estimation and a method, and you now have the toolkit to derive, defend and evolve a system, rather than to recite one. The one habit to keep is the one we started with: don't memorise architectures, derive them from requirements, constraints and trade-offs.",
}
