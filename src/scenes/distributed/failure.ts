import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.7 — the failure models as a ladder of how badly a node may misbehave (each rung is harder and
// costlier to tolerate), then the machinery that sits on top: heartbeats, detectors, recovery.
export const sdFailure: Scene = {
  id: 'sd-failure',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'models',
      label: 'Failure models, mildest to worst',
      pattern: 'group',
      icon: 'layers',
      flow: 'TB',
      children: [
        {
          id: 'mild',
          label: 'Nodes stop',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'crash', label: 'Crash', badge: '1', sub: 'stops, stays stopped' },
            { id: 'recover', label: 'Crash-recovery', badge: '2', sub: 'restarts, loses memory' },
          ],
          edges: [{ source: 'crash', target: 'recover' }],
        },
        {
          id: 'severe',
          label: 'Nodes or links misbehave',
          pattern: 'warn',
          flow: 'LR',
          children: [
            { id: 'omit', label: 'Omission · partition', badge: '3', sub: 'drops or delays messages' },
            { id: 'byz', label: 'Byzantine', badge: '4', sub: 'lies, equivocates, malicious' },
          ],
          edges: [{ source: 'omit', target: 'byz' }],
        },
      ],
      edges: [{ source: 'mild', target: 'severe', label: 'harder and costlier to tolerate' }],
    },
    row('detect', 'Noticing failure', [
      card('hb', 'Heartbeats', 'service', ['Every node says “alive” each 500 ms', 'Suspect after k missed beats', 'Detection ≈ interval × k']),
      card('det', 'Failure detectors', 'warn', ['Slow looks exactly like dead', 'Short timeout: fast, but false alarms', 'Long timeout: accurate, but slow failover', 'Adaptive (phi-accrual) tunes it']),
      card('f-w', 'Worked example & failure', 'service', ['1 s heartbeat, 3 misses: noticed in ~3–4 s', 'A 5 s GC pause is falsely declared dead', 'Byzantine needs 3f + 1 nodes; false suspicion → split brain']),
    ]),
    row('handle', 'Handling it', [
      card('byzc', 'Byzantine tolerance', 'external', ['Needs N ≥ 3f + 1 nodes', 'Used where nodes may be malicious', 'Most data-centre systems assume it away']),
      card('rec', 'Recovery strategies', 'storage', ['Restart and replay the log', 'Fail over to a replica', 'Retry idempotently', 'Rebuild from peers, then repair']),
      card('f-t', 'Your turn', 'external', ['500 ms beats, suspect after 4 misses: detection time? And a 3 s pause?', 'Design: a detector for a leader with a 10 s RTO']),
    ]),
  ],
  edges: [],
}
