import type { Scene } from '@graphlearning/flow'

// §1.7 — the nine-step method, banded by what each step is FOR (understand · design · harden) so the
// sequence reads as three movements, not nine peers. Badges carry the order. Each step is a chip
// because they are things counted, not described; the slide says what artifact each one produces.
export const sdMethod: Scene = {
  id: 'sd-method',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'understand',
      label: 'Understand the problem',
      pattern: 'network',
      icon: 'scroll',
      flow: 'LR',
      children: [
        { id: 'req', label: 'Requirements', badge: '01', variant: 'chip' },
        { id: 'est', label: 'Estimation', badge: '02', variant: 'chip' },
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
        { id: 'api', label: 'API', badge: '03', variant: 'chip' },
        { id: 'data', label: 'Data model', badge: '04', variant: 'chip' },
        { id: 'arch', label: 'Architecture', badge: '05', variant: 'chip' },
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
        { id: 'bott', label: 'Bottlenecks', badge: '06', variant: 'chip' },
        { id: 'scale', label: 'Scaling', badge: '07', variant: 'chip' },
        { id: 'rel', label: 'Reliability', badge: '08', variant: 'chip' },
        { id: 'trade', label: 'Trade-offs', badge: '09', variant: 'chip' },
      ],
      edges: [
        { source: 'bott', target: 'scale' },
        { source: 'scale', target: 'rel' },
        { source: 'rel', target: 'trade' },
      ],
    },
  ],
  edges: [
    { source: 'understand', target: 'design' },
    { source: 'design', target: 'harden' },
  ],
}
