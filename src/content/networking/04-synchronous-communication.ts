import type { Section } from '../types'

export const synchronousCommunication: Section = {
  id: 'synchronous-communication',
  title: 'Synchronous communication',
  scene: 'sd-sync',
  focus: 'call',
  slide: `## Synchronous communication

*Call another service so that failure stays small and retries stay safe.*

### Model
- **Request–response**: the caller waits, so it inherits the callee's slowness
- **Timeouts**: every call has a deadline. **Retries**: transient errors only, bounded
- **Backoff + jitter**: wait random(0, base × 2ⁿ). **Idempotency** makes a retry safe
- **Connection pool**: reuse; size ≈ rate × latency
- **Timeouts**: connect ≠ read; pass the **remaining budget** downstream

### Worked example & failure
- 3 layers × 3 tries = **27×** load on the bottom service; no jitter → all retry together
- Pool: 400 req/s × 25 ms = **10** busy connections

### Your turn
- 1,000 req/s at 50 ms: pool size?
- Design: make "charge a card" safe to retry`,
  narration:
    "Most calls between services are synchronous: the caller sends a request and waits for the answer. That's simple, and the answer itself is the success signal, but it has a cost: the caller inherits the callee's slowness and its failures. Everything in this section is about containing that. First, timeouts. Every call needs a deadline, because without one a stuck dependency holds a thread, a connection and a user forever, and the damage spreads upstream. Connect and read timeouts are different things, and a good system passes the remaining time budget along to downstream calls, so no one works on a request the user already gave up on. Second, retries. A transient failure, a timeout or a briefly unavailable service, often succeeds on the second try. But retries must be bounded and limited to errors that can pass. And they must back off: wait longer after each failure, with exponential growth, so base times two to the n, capped. Add jitter, which means picking a random delay within that range. Here's why. If ten thousand clients fail at the same instant and all retry after exactly a hundred milliseconds, they arrive together again and knock it over once more, a retry storm. Randomising spreads them out. Retries also multiply across layers: if each of three layers tries three times, the service at the bottom sees twenty-seven calls for one user request. Third, idempotency. A retry is only safe if doing something twice has the effect of doing it once. GET, PUT and DELETE already are. For a POST like charging a card, the client sends an idempotency key, the same on every retry, and the server stores the result under that key and returns it on a repeat, instead of charging twice. The code card puts all of this together: a key, a short timeout, a bounded loop, jittered exponential delay, and a clear give-up. Fourth, connection pooling. A new connection costs two or three round trips, so you keep a pool of open connections and reuse them. How big? By Little's Law from chapter one, busy connections equal the request rate times the latency: four hundred requests a second at twenty-five milliseconds means ten connections in use, so a pool of about twelve to fifteen. Your turn: a thousand requests a second at fifty milliseconds is fifty busy connections, so size the pool a little above that. For the design problem, a payment call times out and the client doesn't know whether it was charged. Design the idempotency key, where it's stored, and how long it lives.",
}
