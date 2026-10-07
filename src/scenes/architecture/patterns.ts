import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.4 — the two structural patterns drawn, because their difference is geometric: layers point one
// way (down), a hexagon puts the domain in the middle and everything else outside, behind ports.
// The other four patterns are cards: they are about flow, which ch. 5 already drew.
export const sdPatterns: Scene = {
  id: 'sd-patterns',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      label: 'Two ways to arrange one application',
      pattern: 'group',
      icon: 'layers',
      flow: 'LR',
      children: [
        {
          id: 'layered',
          label: 'Layered',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'ui', label: 'Presentation', pattern: 'user', icon: 'user', sub: 'HTTP, views' },
            { id: 'biz', label: 'Business logic', pattern: 'service', icon: 'server', sub: 'rules' },
            { id: 'data', label: 'Data access', pattern: 'storage', icon: 'database', sub: 'SQL' },
          ],
          edges: [
            { source: 'ui', target: 'biz' },
            { source: 'biz', target: 'data' },
          ],
        },
        {
          id: 'hex',
          label: 'Hexagonal (ports and adapters)',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'in', label: 'Driving adapters', pattern: 'user', icon: 'user', sub: 'HTTP · queue consumer · CLI' },
            { id: 'core', label: 'Domain core', pattern: 'warn', icon: 'layers', sub: 'rules + ports it defines' },
            { id: 'out', label: 'Driven adapters', pattern: 'storage', icon: 'database', sub: 'SQL · payment gateway · SMTP' },
          ],
          edges: [
            { source: 'in', target: 'core' },
            { source: 'out', target: 'core', label: 'implements ports' },
          ],
        },
      ],
      edges: [],
    },
    row('flow', 'Patterns about flow', [
      card('eda', 'Event-driven', 'service', ['Components react to events', 'Loose coupling in time']),
      card('cq', 'CQRS', 'network', ['Separate write and read models']),
      card('es', 'Event sourcing', 'external', ['Events are the stored truth']),
      card('pf', 'Pipes and filters', 'storage', ['parse → filter → enrich → sink', 'Each stage independent and reusable']),
    ]),
    row('use', 'Choosing', [
      card('lay', 'Layered', 'warn', ['Simple, familiar', 'Risk: layers leak, or only pass data through']),
      card('hx', 'Hexagonal', 'service', ['Domain tests run in memory, in milliseconds', 'Swap a database or gateway without touching rules']),
    ]),
  ],
  edges: [],
}
