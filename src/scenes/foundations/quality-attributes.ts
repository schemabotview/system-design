import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §1.3 — the seven attributes as one table: the question each answers, the number that measures it,
// and a target worth recognising. Reading across a row is the lesson: every attribute is a number.
export const sdQuality: Scene = {
  id: 'sd-quality',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'qa',
      kind: 'table',
      label: 'Quality attributes',
      headers: ['Attribute', 'The question', 'How it is measured', 'A typical target'],
      values: [
        ['Availability', 'Is it up when needed?', 'MTBF ÷ (MTBF + MTTR)', '99.9% ≈ 8.8 h down a year'],
        ['Reliability', 'Is it correct over time?', 'failed requests · MTBF', '< 0.1% errors'],
        ['Scalability', 'Does it grow with load?', 'throughput as nodes are added', '2× nodes → ~1.8× load'],
        ['Performance', 'How fast is one request?', 'latency percentiles', 'p95 under 300 ms'],
        ['Durability', 'Is stored data kept?', 'yearly probability of loss', '99.999999999% (11 nines)'],
        ['Maintainability', 'How cheaply can it change?', 'lead time · time to restore', 'deploy in under a day'],
        ['Security', 'Who may do or see what?', 'threat model · incidents', 'least privilege, encrypted'],
      ],
    },
    {
      id: 'more',
      label: 'Reading the numbers',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'nines',
          kind: 'list',
          label: 'Availability in nines',
          pattern: 'service',
          framed: true,
          items: ['99.9% → 8.8 hours a year', '99.99% → 53 minutes', '99.999% → 5 minutes'],
        },
        {
          id: 'compose',
          kind: 'list',
          label: 'Composing availability',
          pattern: 'network',
          framed: true,
          items: ['Series: multiply — 3 × 99.9% → 99.7%', 'Redundant: 1 − (1 − a)ⁿ — 2 × 99.9% → 99.9999%'],
        },
        {
          id: 'tension',
          kind: 'list',
          label: 'Attributes pull against each other',
          pattern: 'warn',
          framed: true,
          items: ['Durability ↔ write latency', 'Scalability ↔ simplicity', 'Security ↔ performance', 'Availability ↔ cost'],
        },
      ],
      edges: [],
    },
    row('sd-quality-put', 'Putting it to work', [
      card('sd-quality-w', 'Worked example & failure', 'service', ['99.9% ≈ 8.8 h/yr; 3 × 99.9% in series → 99.7%; 2 replicas → 99.9999%', 'One 99.9% dependency caps ten services near 99%; attributes conflict']),
      card('sd-quality-t', 'Your turn', 'external', ['LB 99.99 → app 99.9 → DB 99.95: total?', 'Design: reach 99.99% for payments']),
    ]),
  ],
  edges: [],
}
