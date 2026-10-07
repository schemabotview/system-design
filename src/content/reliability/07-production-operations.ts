import type { Section } from '../types'

export const productionOperations: Section = {
  id: 'production-operations',
  title: 'Production operations',
  scene: 'sd-operations',
  focus: 'incident',
  slide: `## Production operations

*Case study: a service fails under 10× traffic — diagnose and redesign.*

### Model
- **Rolling**, **blue-green**, **canary** deployments; **feature flags** decouple deploy from release
- **Configuration management**: reviewed, versioned, rolled out gradually
- **Capacity management**: forecast, load-test, keep headroom

### Worked example & failure
- 10× traffic: DB reads 2.9K → 29K/s at 95% hits, but **348K/s** at 40% — **120×**, 23× the DB's limit
- A cache-key change + retry storm + a saturated pool

### Your turn
- 10× traffic, hit ratio restored to 95%: read replicas needed at 15K/s each?
- Design: capacity and load-shedding plan`,
  narration:
    "This last section of the chapter is about running systems in production, and it ends with a case study that pulls the whole chapter together. We begin with how to change a running system safely, since most outages follow a change. A rolling deployment replaces instances gradually, so capacity dips and two versions run side by side for a while. Blue-green keeps two complete environments and switches the router from the old to the new, which allows instant rollback, at twice the capacity. A canary sends a small share of traffic, one percent, then ten, then fifty, then everything, to the new version, with automatic checks on error rate and latency that abort the rollout on a regression. Feature flags decouple deploying code from releasing a feature, giving you a kill switch, though stale flags become debt. Configuration management treats configuration like code: reviewed, versioned, validated, and rolled out gradually, because a bad configuration change is among the most common causes of large outages. And capacity management means forecasting demand, load-testing to find your limits before traffic does, and keeping headroom. Now the case study, in the notes on the left. A campaign sends ten times the normal traffic. Latency goes from two hundred and twenty milliseconds to eight seconds, and thirty percent of requests fail. First, find the saturated resource: application CPU is only forty-five percent, but the database connection pool is full, so the bottleneck is the database. Second, why is the database so loaded? The cache hit ratio fell from ninety-five to forty percent, because yesterday's deployment changed the key format. Do the arithmetic. At ninety-five percent hits, ten times the traffic, five hundred and eighty thousand requests a second, sends twenty-nine thousand reads to the database. At forty percent, it sends three hundred and forty-eight thousand: a hundred and twenty times the baseline of twenty-nine hundred, and twenty-three times what the database can serve. Third, the amplifier: clients retry three times at each of three layers, nine times the load, a retry storm. The mitigation is to shed thirty percent of low-priority traffic, roll back the key change, and cap retries. The redesign applies chapter seven: a canary would have caught the hit-ratio drop, retry budgets and a breaker stop the storm, bulkheads protect the pool, load shedding keeps the core alive, and a load test at twice expected peak would have found this beforehand. Your turn. With the hit ratio restored, twenty-nine thousand reads a second over fifteen thousand per node is two replicas at minimum, so use three for headroom. And the design problem: write the capacity and load-shedding plan, including what you shed first. That completes chapter seven. The last chapter integrates everything into expert design.",
}
