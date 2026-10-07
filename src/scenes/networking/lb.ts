import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §2.6 — the balancer in context (clients → LB → pool, with the health probe dashed), then one card
// each for the layer choice, the algorithms, health checks and the global tier.
export const sdLb: Scene = {
  id: 'sd-lb',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'One balancer, one pool',
      pattern: 'network',
      icon: 'network',
      flow: 'LR',
      children: [
        { id: 'clients', label: 'Clients', pattern: 'user', icon: 'user', sub: 'many' },
        { id: 'lb', label: 'Load balancer', pattern: 'network', icon: 'network', sub: 'picks a backend per request' },
        {
          id: 'pool',
          label: 'Backend pool',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'b1', label: 'backend 1', pattern: 'service', icon: 'server', sub: '8 cores · weight 2' },
            { id: 'b2', label: 'backend 2', pattern: 'service', icon: 'server', sub: '4 cores · weight 1' },
            { id: 'b3', label: 'backend 3', pattern: 'warn', icon: 'server', sub: 'failed health check' },
          ],
          edges: [],
        },
      ],
      edges: [
        { source: 'clients', target: 'lb' },
        { source: 'lb', target: 'pool' },
        { source: 'lb', target: 'b3', dashed: true, label: 'health probe' },
      ],
    },
    row('layers', 'Where it looks', [
      card('l4', 'Layer 4', 'storage', ['Sees IP + port + TCP', 'Very fast; protocol-agnostic', 'Can pass TLS through untouched']),
      card('l7', 'Layer 7', 'network', ['Sees host, path, headers, cookies', 'Routes by content; terminates TLS; retries', 'More CPU per request']),
    ]),
    row('algos', 'How it chooses', [
      card('rr', 'Round robin · weighted', 'service', ['Take turns: 1, 2, 3, 1, 2, 3…', 'Weights match capacity (8 : 4 cores = 2 : 1)']),
      card('lc', 'Least connections', 'external', ['Send to the least busy', 'Handles uneven request cost']),
      card('ch', 'Consistent hashing', 'warn', ['Same key → same backend (cache locality)', 'Adding one of N+1 moves ~1/(N+1) of keys, not ~all']),
    ]),
    row('ops', 'Staying correct', [
      card('hc', 'Health checks', 'warn', ['Probe /healthz every 5 s', '2 fails → out · 2 passes → back in', 'Check the dependencies it needs, not just “process up”']),
      card('glb', 'Global load balancing', 'external', ['Geo-DNS or anycast → nearest region', 'Fail a whole region over', 'DNS TTL limits how fast']),
    ]),
  ],
  edges: [],
}
