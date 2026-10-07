import type { Scene } from '@graphlearning/flow'
import { card } from '../kit'

// §8.5 — the same product at four sizes, with the load that each size actually creates. The lesson is
// in the numbers: 100,000 users is ~23 reads/s, still one database; complexity earns its place only
// when a measured number forces it.
export const sdDesignEvolution: Scene = {
  id: 'sd-design-evolution',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'small',
      label: 'Simple is correct',
      pattern: 'network',
      icon: 'layers',
      flow: 'LR',
      children: [
        card('s1', '1,000 users', 'service', ['0.2 reads/s average', 'One app, one database', 'Complexity here is waste']),
        card('s2', '100,000 users', 'service', ['23 reads/s · peak ~115', 'Still one database + a replica', 'Add a cache for resilience, not load']),
      ],
      edges: [{ source: 's1', target: 's2', label: '× 100' }],
    },
    {
      id: 'big',
      label: 'Complexity earns its place',
      pattern: 'warn',
      icon: 'layers',
      flow: 'LR',
      children: [
        card('s3', '10 million users', 'warn', ['2.3K reads/s · peak ~11.6K', 'Cache + read replicas + queue', 'Extract hot services']),
        card('s4', '1 billion users', 'warn', ['231K reads/s · peak ~1.2M', 'Sharding, multi-region, cells', 'Dedicated teams per domain']),
      ],
      edges: [{ source: 's3', target: 's4', label: '× 100' }],
    },
  ],
  edges: [{ source: 'small', target: 'big', label: 'a number crosses a limit', dashed: true }],
}
