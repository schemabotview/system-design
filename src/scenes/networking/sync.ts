import type { Scene } from '@graphlearning/flow'
import { card, row } from './kit'

// §2.4 — the safe way to call another service, as code (deadline, idempotency key, bounded retries
// with jittered backoff), flanked by the four ideas it applies.
export const sdSync: Scene = {
  id: 'sd-sync',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'call',
      kind: 'code',
      filename: 'call.py',
      label: [
        'def call(req, attempts=4, base=0.1, cap=2.0):',
        '    key = new_idempotency_key()            # same key on every retry',
        '    for n in range(attempts):',
        '        try:',
        '            return http.post(URL, req, timeout=0.3,',
        '                             headers={"Idempotency-Key": key})',
        '        except (Timeout, Unavailable):',
        '            wait = random.uniform(0, min(cap, base * 2**n))',
        '            sleep(wait)                    # exponential backoff + jitter',
        '    raise GaveUp                           # bounded: never retry forever',
      ].join('\n'),
    },
    row('ideas', 'What each line is for', [
      card('rr', 'Request–response', 'service', ['The caller waits; the answer is the success signal', 'Simple, but the caller inherits the callee’s slowness']),
      card('to', 'Timeouts', 'warn', ['Every call has a deadline', 'Connect and read timeouts differ', 'Pass the remaining budget downstream']),
      card('rt', 'Retries and backoff', 'network', ['Retry only transient errors', 'Delay = random(0, base × 2ⁿ), capped', 'Layers multiply: 3 × 3 × 3 = 27 calls']),
    ]),
    row('safety', 'Making retries safe and cheap', [
      card('idem', 'Idempotency', 'external', ['Doing it twice = doing it once', 'PUT and DELETE already are', 'POST: client key, server stores the result']),
      card('pool', 'Connection pooling', 'storage', ['Reuse connections: a new one costs 2–3 RTT', 'Pool size ≈ rate × latency (Little’s Law)', '400 req/s × 0.025 s = 10 busy']),
    ]),
  ],
  edges: [],
}
