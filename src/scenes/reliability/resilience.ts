import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.2 — the circuit breaker as code (the one pattern here that is a small state machine), then the
// six patterns as cards grouped by what they protect: the caller, the dependency, and the system.
export const sdResilience: Scene = {
  id: 'sd-resilience',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'breaker',
      kind: 'code',
      filename: 'circuit_breaker.py',
      label: [
        'class CircuitBreaker:                       # CLOSED → OPEN → HALF_OPEN → CLOSED',
        '    def call(self, fn):',
        '        if self.state == OPEN:',
        '            if now() - self.opened_at < COOLDOWN:      # e.g. 30 s',
        '                raise Rejected                         # fail fast, no network call',
        '            self.state = HALF_OPEN                     # let ONE probe through',
        '        try:',
        '            result = fn(timeout=0.3)',
        '        except Exception:',
        '            self.failures += 1',
        '            if self.state == HALF_OPEN or self.failures >= 5:',
        '                self.state, self.opened_at = OPEN, now()',
        '            raise',
        '        self.state, self.failures = CLOSED, 0          # success closes it',
        '        return result',
      ].join('\n'),
    },
    row('caller', 'Protect the caller', [
      card('to', 'Timeout', 'warn', ['Bound every wait', 'No timeout = a thread held forever']),
      card('rt', 'Retry', 'service', ['Transient errors, idempotent calls only', 'A budget: ≤ 10% extra load']),
      card('bj', 'Backoff + jitter', 'network', ['Wait random(0, min(cap, base × 2ⁿ))', 'Jitter de-synchronises the herd']),
    ]),
    row('system', 'Protect the dependency and the system', [
      card('cb', 'Circuit breaker', 'external', ['Closed → open after N failures', 'Open: fail fast, give it room to recover', 'Half-open: probe, then close']),
      card('bh', 'Bulkhead', 'storage', ['A separate pool per dependency', 'One slow dependency can’t drain every thread']),
      card('ls', 'Load shedding', 'warn', ['Reject early (503) instead of queueing', 'Drop low-priority work first']),
    ]),
  ],
  edges: [],
}
