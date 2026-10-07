import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §1.7 — the nine-step method, banded by what each step is FOR (understand · design · defend). Each
// step is a card whose sub names the ARTIFACT it produces: the next step consumes that artifact,
// which is the whole reason the order is fixed.
export const sdMethod: Scene = {
  id: 'sd-method',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'understand',
      label: 'Understand the problem',
      pattern: 'network',
      icon: 'scroll',
      flow: 'LR',
      children: [
        { id: 'req', label: 'Requirements', badge: '01', sub: 'scoped FR · NFR · constraints' },
        { id: 'est', label: 'Estimation', badge: '02', sub: 'QPS · storage · bandwidth' },
      ],
      edges: [{ source: 'req', target: 'est' }],
    },
    {
      id: 'design',
      label: 'Shape the design',
      pattern: 'service',
      icon: 'layers',
      flow: 'LR',
      children: [
        { id: 'api', label: 'API', badge: '03', sub: 'operations and contracts' },
        { id: 'data', label: 'Data model', badge: '04', sub: 'schema + access patterns' },
        { id: 'arch', label: 'Architecture', badge: '05', sub: 'components and data flow' },
      ],
      edges: [
        { source: 'api', target: 'data' },
        { source: 'data', target: 'arch' },
      ],
    },
    {
      id: 'harden',
      label: 'Stress and defend it',
      pattern: 'warn',
      icon: 'shield',
      flow: 'LR',
      children: [
        { id: 'bott', label: 'Bottlenecks', badge: '06', sub: 'ranked limits' },
        { id: 'scale', label: 'Scaling', badge: '07', sub: 'plan + capacity' },
        { id: 'rel', label: 'Reliability', badge: '08', sub: 'failure modes + fixes' },
        { id: 'trade', label: 'Trade-offs', badge: '09', sub: 'decisions, with reasons' },
      ],
      edges: [
        { source: 'bott', target: 'scale' },
        { source: 'scale', target: 'rel' },
        { source: 'rel', target: 'trade' },
      ],
    },
    row('why', 'Why the order is fixed', [
      card('feed', 'Each step feeds the next', 'service', ['Requirements decide which numbers to estimate', 'Estimates say whether you need distribution at all', 'The API fixes operations, operations fix access patterns, access patterns fix the data model']),
      card('loop', 'It is a loop', 'network', ['A bottleneck found in step 6 can send you back to the data model in step 4', 'Re-run the estimate when a requirement changes']),
      card('ex', 'URL shortener, one line per step', 'external', ['Redirect p99 < 50 ms · 400 reads/s, 3 TB', 'POST /urls + GET /{code} · code → URL key-value', 'Cache + replicas · viral link = hot key · multi-AZ · 301 vs 302']),
    ]),
    row('fail', 'How it goes wrong', [
      card('boxes', 'Boxes first', 'warn', ['Resume-driven design: tools chosen because they are familiar']),
      card('noest', 'No estimate', 'warn', ['Over- or under-building without knowing it']),
      card('notrade', 'No recorded trade-offs', 'warn', ['Nobody can defend the design, or know when to revisit it']),
    ]),
  ],
  edges: [
    { source: 'understand', target: 'design' },
    { source: 'design', target: 'harden' },
    { source: 'harden', target: 'why' },
    { source: 'why', target: 'fail' },
  ],
}
