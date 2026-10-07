import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.3 — a placed order crossing the system: one synchronous call where an answer is needed now, one
// event where a fact merely needs to be published. The registry, gateway and mesh are the supporting
// cast; the cards say what each is for and what contracts keep the whole thing from breaking.
export const sdSvcComm: Scene = {
  id: 'sd-svc-comm',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'topology',
      label: 'Placing an order',
      pattern: 'network',
      icon: 'network',
      flow: 'LR',
      children: [
        { id: 'gw', label: 'API gateway', pattern: 'network', icon: 'shield', sub: 'auth · routing' },
        { id: 'orders', label: 'Orders', pattern: 'service', icon: 'server', sub: 'sidecar proxy beside it' },
        { id: 'inv', label: 'Inventory', pattern: 'service', icon: 'server', sub: 'needed NOW → sync' },
        { id: 'bus', label: 'Event bus', pattern: 'storage', icon: 'database', sub: 'OrderPlaced' },
        { id: 'note', label: 'Notifications · Shipping', pattern: 'service', icon: 'server', sub: 'react later → async' },
      ],
      edges: [
        { source: 'gw', target: 'orders', label: 'REST' },
        { source: 'orders', target: 'inv', label: 'gRPC · 50 ms' },
        { source: 'orders', target: 'bus', label: 'publish' },
        { source: 'bus', target: 'note' },
      ],
    },
    row('calls', 'How services talk', [
      card('sync', 'Synchronous vs event-driven', 'service', ['Need the answer to continue? Call.', 'Publishing a fact? Emit an event.', 'Sync chains multiply latency and failure']),
      card('disc', 'Service discovery', 'storage', ['A registry of live instances', 'Client-side or server-side lookup']),
    ]),
    row('infra', 'The supporting cast', [
      card('gwc', 'API gateway', 'network', ['One front door: auth, routing, aggregation', 'A BFF per client type']),
      card('mesh', 'Service mesh', 'external', ['A sidecar proxy per instance', 'mTLS, retries, timeouts, traffic split — no app code', 'Costs a hop and operational weight']),
      card('contract', 'Contract management', 'warn', ['OpenAPI / protobuf schemas', 'Consumer-driven contract tests in CI', 'Additive change only; deprecate, don’t break']),
    ]),
  ],
  edges: [],
}
