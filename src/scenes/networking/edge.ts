import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §2.7 — the case study as the scene: the request's whole path through the edge, each hop labelled
// with what it can do for the request, then one card per edge component from the plan.
export const sdEdge: Scene = {
  id: 'sd-edge',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      label: 'A request, browser to database',
      pattern: 'group',
      icon: 'network',
      flow: 'TB',
      children: [
        {
          id: 'nearby',
          label: 'Near the user',
          pattern: 'network',
          icon: 'cloud',
          flow: 'LR',
          children: [
            { id: 'browser', label: 'Browser', pattern: 'user', icon: 'user', sub: 'caches · keeps connections' },
            { id: 'dns', label: 'DNS', pattern: 'external', icon: 'cloud', sub: 'picks the nearest edge' },
            { id: 'cdn', label: 'CDN edge', pattern: 'network', icon: 'cloud', sub: 'hit → answer here' },
          ],
          edges: [
            { source: 'browser', target: 'dns' },
            { source: 'dns', target: 'cdn' },
          ],
        },
        {
          id: 'origin',
          label: 'At the origin',
          pattern: 'service',
          icon: 'server',
          flow: 'LR',
          children: [
            { id: 'lb', label: 'Load balancer', pattern: 'network', icon: 'network', sub: 'terminates TLS' },
            { id: 'gw', label: 'API gateway', pattern: 'service', icon: 'shield', sub: 'auth · rate limit · route' },
            { id: 'app', label: 'App service', pattern: 'service', icon: 'server', sub: 'business logic' },
            { id: 'db', label: 'Cache + database', pattern: 'storage', icon: 'database', sub: 'the data' },
          ],
          edges: [
            { source: 'lb', target: 'gw' },
            { source: 'gw', target: 'app' },
            { source: 'app', target: 'db' },
          ],
        },
      ],
      edges: [{ source: 'nearby', target: 'origin', label: 'cache miss' }],
    },
    row('proxies', 'In front of your code', [
      card('rp', 'Reverse proxy', 'service', ['Clients talk to it, never to the app', 'TLS, compression, buffering, hides topology']),
      card('agw', 'API gateway', 'network', ['A reverse proxy that knows APIs', 'Auth, quotas, routing, request shaping']),
      card('cdnc', 'CDN · edge caching', 'external', ['Copies near users; hit ratio is the metric', 'Cache key must exclude cookies it needn’t vary on']),
    ]),
    row('control', 'Controlling traffic', [
      card('rl', 'Rate limiting', 'warn', ['Token bucket: refill r/s, burst b', 'Return 429 + Retry-After', 'Per key, per IP, per route']),
      card('sd', 'Service discovery', 'storage', ['Registry of live instances', 'Instances heartbeat in; stale ones expire', 'Client-side or server-side lookup']),
      card('tm', 'Traffic management', 'service', ['Weighted routing: canary 1% → 10% → 100%', 'Timeouts, retries, circuit breaking', 'Shift or drain by region']),
    ]),
  ],
  edges: [],
}
