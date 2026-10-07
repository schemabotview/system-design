import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.2 — the spectrum as three deployments of the SAME modules, then the trap between the ends: the
// distributed monolith, which has the network costs of microservices and the coupling of a monolith.
export const sdMonolithMicro: Scene = {
  id: 'sd-monolith-micro',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'spectrum',
      label: 'The same modules, deployed three ways',
      pattern: 'group',
      icon: 'layers',
      flow: 'LR',
      children: [
        { id: 'mono', label: 'Monolith', badge: '1', sub: 'one deployable, tangled modules' },
        { id: 'modular', label: 'Modular monolith', badge: '2', sub: 'one deployable, enforced boundaries', pattern: 'service' },
        { id: 'micro', label: 'Microservices', badge: '3', sub: 'many deployables, own data' },
      ],
      edges: [
        { source: 'mono', target: 'modular', label: 'draw boundaries' },
        { source: 'modular', target: 'micro', label: 'only if needed' },
      ],
    },
    row('forms', 'What each costs and buys', [
      card('mm', 'Modular monolith', 'service', ['In-process calls, one transaction', 'One deploy, one debugger', 'Boundaries by discipline and tooling']),
      card('ms', 'Microservices', 'network', ['Independent deploy and scale', 'Each owns its data', 'Every call crosses a network']),
      card('dm', 'Distributed monolith', 'warn', ['Services that must deploy together', 'Shared database, chatty sync calls', 'All the cost, none of the benefit']),
    ]),
    row('moves', 'Choosing and moving', [
      card('bound', 'Service boundaries', 'external', ['One per bounded context', 'Things that change together stay together', 'Own your data; expose a contract']),
      card('ops', 'Operational complexity', 'warn', ['Per service: pipeline, dashboards, alerts, on-call', 'Needs tracing, discovery, versioning']),
      card('mig', 'Migration strategies', 'storage', ['Modularise first', 'Extract the cleanest, least-entangled module', 'Never a big-bang rewrite']),
    ]),
  ],
  edges: [],
}
