import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.6 — the two logical clocks run by hand on the same three-process history (a post, a reply to
// it, and an unrelated write), because the point is the arithmetic and what each clock can say.
export const sdTime: Scene = {
  id: 'sd-time',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'clocks',
      kind: 'code',
      filename: 'clocks.txt',
      label: [
        'Lamport:  send → t = t + 1, attach t ·  receive(m) → t = max(t, m.t) + 1',
        'Vector:   one counter per process; receive → merge by max, then +1 on yours',
        '',
        'A: post        Lamport 1     vector [1,0,0]',
        '      │ message',
        'B: reply       Lamport 2     vector [1,1,0]   ← happened after the post',
        'C: unrelated   Lamport 1     vector [0,0,1]   ← concurrent with both',
        '',
        '[1,1,0] vs [0,0,1]: neither ≤ the other → CONCURRENT',
        'Lamport 2 vs 1 looks ordered, but says nothing about causality.',
      ].join('\n'),
    },
    row('phys', 'Physical clocks', [
      card('wall', 'Wall clocks', 'warn', ['Synced by NTP: ms to tens of ms off', 'Can jump backwards when corrected', 'Never use them to order events across machines']),
      card('drift', 'Clock drift', 'service', ['Quartz drifts tens of ppm ≈ seconds a day', 'Use a monotonic clock for durations']),
    ]),
    row('log', 'Logical clocks', [
      card('lam', 'Lamport timestamps', 'network', ['A counter that obeys happens-before', 'a → b ⇒ L(a) < L(b), not the reverse']),
      card('vc', 'Vector clocks', 'external', ['Detects concurrent writes exactly', 'Cost grows with the number of nodes']),
      card('ord', 'Ordering events', 'storage', ['Happens-before: same process, or send → receive', 'Otherwise concurrent: no honest order exists']),
    ]),
    row('sd-time-put', 'Putting it to work', [
      card('sd-time-w', 'Worked example & failure', 'service', ['Node clock +300 ms: its earlier write is stamped later and wins last-write-wins', 'Lamport can\'t say two events are concurrent']),
      card('sd-time-t', 'Your turn', 'external', ['A sends at t = 5 to B whose counter is 3: B\'s new value? Are [2,1] and [1,2] ordered?', 'Design: order comments in a thread without synced clocks']),
    ]),
  ],
  edges: [],
}
