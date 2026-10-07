import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.7 — the case study as the lead object: the incident notes of a service failing at 10× traffic,
// read the way an on-call engineer would (symptom, saturated resource, hidden cause, amplifier).
// The cards are the production practices that would have prevented or contained it.
export const sdOperations: Scene = {
  id: 'sd-operations',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'incident',
      kind: 'code',
      filename: 'incident-notes.txt',
      label: [
        't+0   traffic × 10 (campaign)    p99 220 ms → 8 s · errors 30%',
        't+3   app CPU 45% · DB connections 100/100 · requests queue on the pool',
        '                                  → saturation is at the DATABASE, not the app',
        't+6   cache hit ratio 95% → 40%  → key format changed in yesterday’s deploy',
        't+9   clients retry 3 × 3        → 9× load on the same DB: a retry storm',
        '',
        'mitigate: shed 30% low-priority traffic · roll back the key change · cap retries',
      ].join('\n'),
    },
    row('deploy', 'Deployment strategies', [
      card('roll', 'Rolling', 'service', ['Replace instances gradually', 'Mixed versions; capacity dips']),
      card('bg', 'Blue-green', 'network', ['Two full environments; flip the router', 'Instant rollback · 2× capacity']),
      card('can', 'Canary', 'external', ['1% → 10% → 50% → 100%', 'Automatic checks; abort on regression']),
    ]),
    row('control', 'Controlling change and load', [
      card('ff', 'Feature flags', 'storage', ['Deploy ≠ release', 'A kill switch; remove stale flags']),
      card('cfg', 'Configuration management', 'warn', ['Config as code: reviewed, versioned', 'Roll out gradually — bad config is a top cause of outages']),
      card('cap', 'Capacity management', 'service', ['Forecast, load-test, keep headroom', 'Know the limit before traffic finds it']),
    ]),
  ],
  edges: [],
}
