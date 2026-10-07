import type { Section } from '../types'

export const resiliencePatterns: Section = {
  id: 'resilience-patterns',
  title: 'Resilience patterns',
  scene: 'sd-resilience',
  focus: 'breaker',
  slide: `## Resilience patterns

*Fail fast, retry carefully, isolate the damage, shed what you cannot serve.*

### Model
- **Timeout** bounds waits. **Retry** only transient + idempotent, within a budget. **Backoff + jitter** spreads the herd
- **Circuit breaker**: closed → open → half-open. **Bulkhead**: pool per dependency
- **Load shedding**: reject early, lowest priority first
- **Exponential backoff** with **jitter**: random(0, min(cap, base × 2ⁿ))

### Worked example & failure
- 200 threads, a dependency hangs 30 s at 100 req/s → all threads busy in **2 s**; bulkheads confine it
- Retries without a budget turn a blip into an outage

### Your turn
- Breaker: 5 failures, 30 s cooldown; dependency recovers at 10 s — when does traffic resume?
- Design: policy for calling a payment provider`,
  narration:
    "Resilience patterns are the small, specific mechanisms that keep one failure from spreading. We met timeouts and retries in chapter two. Here they combine with three more into a toolkit. Timeouts first, because every other pattern depends on them: a call without a deadline can hold a thread and a connection forever. Retries handle transient faults, but they must be restricted to idempotent calls and bounded by a retry budget, say no more than ten percent extra load, because retries multiply load on a service that's already struggling. Backoff makes each retry wait longer, and jitter makes the wait random, so clients that failed together don't come back together. The circuit breaker is the pattern that gives a failing dependency room to recover. It's a small state machine, and the code card shows it. In the closed state, calls flow normally and failures are counted. After a threshold, say five failures, the breaker opens: calls fail immediately without touching the network, so you stop adding load and stop waiting on timeouts. After a cooldown, it goes half-open and lets one probe through. If the probe succeeds, the breaker closes. If it fails, it opens again. A bulkhead is named for a ship's watertight compartments: give each dependency its own pool of threads or connections, so that a slow dependency can only drain its own pool. Suppose you've two hundred threads shared by everything, and one dependency starts hanging for thirty seconds, at a hundred requests a second. All two hundred threads are stuck in two seconds, and the whole service stops, including endpoints that never touch that dependency. With a pool of fifty per dependency, only that one is lost. And load shedding: when demand exceeds capacity, queueing everything just makes everything slow. Instead reject excess work early with a 503, starting with the lowest-priority requests, so the important work still completes. The classic failure is retries without a budget, where a short blip becomes a sustained outage. Your turn. With a breaker that opens after five failures and has a thirty-second cooldown, the dependency recovering at ten seconds changes nothing until the cooldown ends: at thirty seconds the half-open probe succeeds and traffic resumes. And the design problem: write the policy for calling a payment provider, with a timeout, retry rules that depend on idempotency keys, a breaker, and what the user sees when it's open.",
}
