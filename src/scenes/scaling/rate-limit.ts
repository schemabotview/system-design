import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.5 — the token bucket as ~10 lines of code, then the four algorithms compared by the burst
// behaviour that separates them, then the two things a distributed limiter adds.
export const sdRateLimit: Scene = {
  id: 'sd-rate-limit',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'bucket',
      kind: 'code',
      filename: 'token_bucket.py',
      label: [
        'class TokenBucket:',
        '    def __init__(self, rate, burst):      # e.g. 10 tokens/s, burst 20',
        '        self.rate, self.burst = rate, burst',
        '        self.tokens, self.last = burst, now()',
        '    def allow(self):',
        '        t = now()',
        '        self.tokens = min(self.burst, self.tokens + (t - self.last) * self.rate)',
        '        self.last = t',
        '        if self.tokens >= 1:',
        '            self.tokens -= 1; return True',
        '        return False                      # → 429 + Retry-After',
      ].join('\n'),
    },
    row('algos', 'Four algorithms', [
      card('fw', 'Fixed window', 'warn', ['Counter per minute; trivial and cheap', 'Boundary burst: 100 at :59 + 100 at :00 = 200 in 2 s']),
      card('sw', 'Sliding window', 'network', ['Counts the last 60 s exactly', 'Smooth, but stores timestamps (or a weighted estimate)']),
      card('tb', 'Token bucket', 'service', ['Refill r/s, hold up to b tokens', 'Allows bursts, caps the average']),
      card('lb', 'Leaky bucket', 'storage', ['Queue drained at a constant rate', 'Smooths output; adds delay']),
    ]),
    row('scale', 'At scale', [
      card('dist', 'Distributed limiting', 'external', ['Shared counter in Redis: atomic INCR / Lua', 'Or split the limit across nodes locally', 'Trade accuracy against a network hop']),
      card('quota', 'Quotas', 'service', ['Long-horizon budgets: per day, per month', 'Rate limit protects capacity; quota protects the business']),
    ]),
  ],
  edges: [],
}
