import type { Scene } from '@graphlearning/flow'

// §1.3 — the seven attributes as one table: the question each answers, the number that measures it,
// and a target worth recognising. Reading across a row is the lesson: every attribute is a number.
export const sdQuality: Scene = {
  id: 'sd-quality',
  padding: 0.12,
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
  ],
  edges: [],
}
