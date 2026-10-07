import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §1.6 — scale up is one box that gets bigger; scale out is a stateless tier behind a balancer with
// the state pushed out to a shared store. The thing to see: in the right-hand band the servers hold
// nothing, so any of them can vanish — all the state lives in the one storage node.
export const sdScaling: Scene = {
  id: 'sd-scaling',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      label: 'Scale up or scale out',
      pattern: 'group',
      flow: 'LR',
      children: [
    {
      id: 'up',
      label: 'Scale up · vertical',
      pattern: 'warn',
      icon: 'arrowup',
      flow: 'TB',
      children: [
        { id: 'big', label: 'One big server', pattern: 'service', icon: 'server', sub: '64 cores · 512 GB' },
        { id: 'ceil', label: 'The ceiling', pattern: 'warn', icon: 'triangle', sub: 'largest instance · single point of failure' },
      ],
      edges: [{ source: 'big', target: 'ceil', dashed: true }],
    },
    {
      id: 'out',
      label: 'Scale out · horizontal',
      pattern: 'service',
      icon: 'network',
      flow: 'LR',
      children: [
        { id: 'lb', label: 'Load balancer', pattern: 'network', icon: 'network', sub: 'spreads requests' },
        {
          id: 'tier',
          label: 'Stateless app tier',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'a1', label: 'app 1', pattern: 'service', icon: 'server' },
            { id: 'a2', label: 'app 2', pattern: 'service', icon: 'server' },
            { id: 'a3', label: 'app 3', pattern: 'service', icon: 'server' },
          ],
          edges: [],
        },
        { id: 'state', label: 'Shared state', pattern: 'storage', icon: 'database', sub: 'sessions · data · cache' },
      ],
      edges: [
        { source: 'lb', target: 'tier' },
        { source: 'tier', target: 'state' },
      ],
    },
      ],
      edges: [],
    },
    {
      id: 'notes',
      label: 'The rest of the model',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'stateless',
          kind: 'list',
          label: 'Stateless vs stateful',
          pattern: 'network',
          framed: true,
          items: ['Stateless: any replica serves any request', 'Stateful: sticky routing, partitioning, replication', 'Push state to a store; keep servers disposable'],
        },
        {
          id: 'elastic',
          kind: 'list',
          label: 'Elasticity',
          pattern: 'service',
          framed: true,
          items: ['Capacity follows load, up and down', 'A new instance takes 1–2 min to be useful', 'Scale on a leading signal, not a crisis'],
        },
        {
          id: 'plan',
          kind: 'list',
          label: 'Capacity planning',
          pattern: 'storage',
          framed: true,
          items: ['N = peak ÷ (per-node × target use) + spare', '58K ÷ (2K × 60%) = 49 servers', 'Survive a zone loss → 75'],
        },
      ],
      edges: [],
    },
    row('sd-scaling-put', 'Putting it to work', [
      card('sd-scaling-w', 'Worked example & failure', 'service', ['Capacity planning: 58K ÷ (2K × 60%) → 49 servers; survive a zone loss → 75', 'Sticky sessions + scale-in = lost logins; a shared DB caps everything', 'Amdahl: 100 machines at 5% serial give only ~17×']),
      card('sd-scaling-t', 'Your turn', 'external', ['21K req/s, 3K/server, 70% target?', 'Design: scale an in-memory-session login']),
    ]),
  ],
  edges: [],
}
