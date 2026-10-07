import type { Section } from '../types'

export const rateLimiting: Section = {
  id: 'rate-limiting',
  title: 'Rate limiting',
  scene: 'sd-rate-limit',
  focus: 'bucket',
  slide: `## Rate limiting

*Protect capacity and fairness by deciding who gets how much, and when.*

### Model
- **Fixed window**: cheap, bursty at the edge. **Sliding window**: accurate, costlier
- **Token bucket**: refill r/s, burst b. **Leaky bucket**: constant drain, smooth
- **Distributed**: shared Redis counter or local shares. **Quotas**: long-horizon budgets

### Worked example & failure
- Fixed 100/min: 100 at :59 + 100 at :00 = **200 in 2 s**
- Central counter = a hop per request; local-only limits drift apart

### Your turn
- Bucket 5/s, burst 10: 10 instant requests, then when is the next allowed?
- Design: public API limits and headers`,
  narration:
    "A rate limiter decides how many requests a client can make in a period. It protects your capacity from overload, spreads it fairly among clients, and blunts abuse. Four algorithms cover almost everything. The fixed window counts requests in each interval, say per minute, and rejects beyond the limit. It's the simplest and cheapest, but it has a boundary problem: a client can send a hundred requests at the end of one minute and a hundred at the start of the next, two hundred in two seconds, double the limit. The sliding window fixes that by counting requests in the last sixty seconds exactly, either by storing timestamps or by weighting two adjacent windows, at the cost of more memory or some approximation. The token bucket is the most widely used. Imagine a bucket that holds up to b tokens and refills at r tokens a second. Each request takes a token, and if the bucket is empty, the request is refused. So a client can burst up to b requests at once, but the long-run average can't exceed r. The code shows it in about ten lines: refill by elapsed time, cap at the burst size, then take a token or reject with a four-two-nine and a Retry-After header. The leaky bucket is the mirror image: requests join a queue that drains at a constant rate, which smooths the output into a steady stream, at the price of added delay. Now distribution. With many servers, a limit of one hundred per minute must hold across all of them. The usual answer is a shared counter in a fast store, such as Redis, using an atomic increment or a small script, which gives an exact count at the cost of a network hop per request, and one Redis node handles on the order of a hundred thousand operations a second. The alternative is local limiting, where each server enforces its share, say a tenth of the limit on each of ten servers, which is fast but drifts when load is uneven. Quotas are a different thing, long-horizon budgets such as a million calls a day per customer, tied to billing and plans, while rate limits protect capacity second by second. Your turn. A bucket with rate five per second and a burst of ten allows ten instant requests, then the next is allowed after two hundred milliseconds, when one token has refilled. For the design problem, specify limits for a public API: a token bucket of a hundred per second with a burst of two hundred per key, a daily quota, and response headers that report the limit, the remaining count, and when to retry.",
}
