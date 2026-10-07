import type { Section } from '../types'

export const latencyThroughput: Section = {
  id: 'latency-throughput',
  title: 'Latency and throughput',
  scene: 'sd-latency',
  focus: 'dist',
  slide: `## Latency and throughput

*Reason with percentiles, Little's Law and queueing.*

### Model
- **Latency**: one request's time, a **distribution** — p50 · p95 · p99. **Throughput**: completed req/s
- **Bottleneck**: the slowest stage caps throughput
- **L = λ × W**; queue wait ~ 1 ÷ (1 − utilisation)
- **Throughput** = completed req/s; the slowest stage is the **bottleneck**: LB 5,000 → app 2,000 → DB 800 ⇒ **800**
- Tail is ~4× the median: p50 100 ms · p95 268 · p99 403

### Worked example & failure
- Median 100 ms, mean 120, p99 **403**
- 100 backend calls at p99 → **63%** of pages hit a slow one
- 90% utilisation = 10× service time
- 1,000 req/s × 0.2 s = **200** in flight; 50 workers ⇒ **250 req/s** ceiling

### Your turn
- 1 worker, 20 ms: latency at 25, 45, 49 req/s?
- Design: p99 < 300 ms over 5 backends`,
  narration:
    "Latency and throughput are the two numbers everyone quotes and almost everyone misreads. Latency is how long one request takes. Throughput is how many requests the system completes each second. They're related but not opposites: a pipeline can have high latency and high throughput at once. The first rule is that latency is not a number, it's a distribution. The plot shows a typical one, from a million requests to a single endpoint. Notice the long tail on the right. The median, p fifty, is a hundred milliseconds, half of all requests are faster than that. The mean is a hundred and twenty, pulled up by the tail, which is why averages mislead. The ninety-fifth percentile is about two hundred and seventy, and the ninety-ninth, p ninety-nine, is over four hundred, four times the median. We care about the tail for a reason that surprises people. If a page makes a hundred calls to backends, and each backend is slow one time in a hundred, then the chance that at least one call is slow is one minus point nine nine to the hundred, which is sixty-three percent. At scale, the backend's p ninety-nine is the typical user's experience. Next, Little's Law, the most useful equation in the course: the number of requests in flight equals the arrival rate times the time each spends in the system. A thousand requests a second at two hundred milliseconds each means two hundred requests in flight at any moment. If a server has fifty worker slots, it saturates at fifty divided by point two, which is two hundred and fifty requests a second, and that's a ceiling you can calculate before you ever load-test. Throughput is also capped by the slowest stage in the path. In the pipeline below, the balancer can pass five thousand a second and the app tier two thousand, but the database only eight hundred, so the system delivers eight hundred. That's your bottleneck, and speeding up anything else changes nothing. Finally, queueing, which is where systems really fail. As utilisation climbs toward one hundred percent, waiting time grows roughly as one over one minus utilisation. At fifty percent, a request spends about twice its service time in the system. At ninety percent, ten times. At ninety-nine percent, a hundred times. A server that looks just fine at eighty percent can fall over at ninety-five with no change in the code. Your turn. A single worker takes twenty milliseconds per request, so its ceiling is fifty a second. What's the response time at twenty-five requests a second? Forty milliseconds. At forty-five? Two hundred. At forty-nine? A full second. Then the design problem: your page needs p ninety-nine under three hundred milliseconds across five backend calls. Think about parallel fan-out, timeouts, and caching, and which of them attacks the tail.",
}
