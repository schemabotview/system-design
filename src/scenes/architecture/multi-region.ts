import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.6 — two regions both serving users, joined by asynchronous replication, behind a global router.
// The cards cover the choices this implies: who serves, how data crosses, where data lives, and what
// a regional failure costs in capacity.
export const sdMultiRegion: Scene = {
  id: 'sd-multi-region',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'topo',
      label: 'Active-active across two regions',
      pattern: 'network',
      icon: 'cloud',
      flow: 'TB',
      children: [
        { id: 'router', label: 'Global router', pattern: 'external', icon: 'cloud', sub: 'geo-DNS / anycast · health-checked' },
        {
          id: 'regions',
          label: 'Regions',
          pattern: 'group',
          flow: 'LR',
          children: [
            {
              id: 'eu',
              label: 'Region EU',
              pattern: 'service',
              flow: 'TB',
              children: [
                { id: 'eu-app', label: 'App tier', pattern: 'service', icon: 'server', sub: 'serves EU users' },
                { id: 'eu-db', label: 'EU data', pattern: 'storage', icon: 'database', sub: 'home of EU users' },
              ],
              edges: [{ source: 'eu-app', target: 'eu-db' }],
            },
            {
              id: 'us',
              label: 'Region US',
              pattern: 'service',
              flow: 'TB',
              children: [
                { id: 'us-app', label: 'App tier', pattern: 'service', icon: 'server', sub: 'serves US users' },
                { id: 'us-db', label: 'US data', pattern: 'storage', icon: 'database', sub: 'home of US users' },
              ],
              edges: [{ source: 'us-app', target: 'us-db' }],
            },
          ],
          edges: [{ source: 'eu-db', target: 'us-db', bidirectional: true, label: 'async geo-replication' }],
        },
      ],
      edges: [{ source: 'router', target: 'regions' }],
    },
    row('modes', 'Who serves traffic', [
      card('ap', 'Active-passive', 'service', ['One region serves; one waits', 'Simple; standby is idle capacity', 'RPO = replication lag']),
      card('aa', 'Active-active', 'network', ['Every region serves', 'Low latency everywhere', 'Needs conflict handling or data ownership']),
    ]),
    row('data', 'Data across regions', [
      card('geo', 'Geo-replication', 'external', ['Async: a write returns locally', 'Sync would add a ~80 ms round trip to every write']),
      card('loc', 'Data locality', 'storage', ['Keep a user’s data in a home region', 'Latency and residency law (e.g. GDPR)']),
      card('grt', 'Global routing', 'warn', ['Geo, latency-based, or anycast', 'DNS TTL limits failover speed']),
    ]),
    card('fail', 'Regional failure', 'warn', ['Survivors must carry the lost region’s traffic', '2 regions → 200% provisioned · 3 regions → 150% · 4 → 133%']),
  ],
  edges: [],
}
