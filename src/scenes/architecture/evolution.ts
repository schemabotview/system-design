import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.7 — the case study as the scene: four stages a system grows through, each triggered by a
// measurable pressure, joined by the strangler pattern. The cards are the techniques that make each
// move safe (migrate, stay compatible, evolve schemas and APIs, manage debt, design for change).
export const sdEvolution: Scene = {
  id: 'sd-evolution',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'journey',
      label: 'Case study · a startup monolith grows up',
      pattern: 'group',
      icon: 'layers',
      flow: 'TB',
      children: [
        {
          id: 'early',
          label: 'Find the product',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'st1', label: 'Monolith', badge: '1K users', sub: 'one app, one Postgres' },
            { id: 'st2', label: 'Modular + replicas', badge: '100K', sub: 'modules, read replicas, cache' },
          ],
          edges: [{ source: 'st1', target: 'st2', label: 'DB CPU > 60%' }],
        },
        {
          id: 'late',
          label: 'Scale the product',
          pattern: 'service',
          flow: 'LR',
          children: [
            { id: 'st3', label: 'Services + queue', badge: '10M', sub: 'extract hot contexts, shard' },
            { id: 'st4', label: 'Multi-region', badge: '1B', sub: 'regional cells, geo-routing' },
          ],
          edges: [{ source: 'st3', target: 'st4', label: 'far users' }],
        },
      ],
      edges: [{ source: 'early', target: 'late', label: 'strangler: route, replace, retire' }],
    },
    row('safe', 'Making each move safe', [
      card('mig', 'Migration', 'warn', ['Expand → dual-write → backfill → switch reads → contract', '1B rows ÷ 20K/s ≈ 14 h of backfill']),
      card('compat', 'Backward compatibility', 'service', ['Old clients keep working', 'Tolerant reader; additive changes only']),
    ]),
    row('contracts', 'Schemas and APIs', [
      card('schema', 'Schema evolution', 'storage', ['Add nullable → backfill → enforce', 'Protobuf field numbers are never reused']),
      card('api', 'API evolution', 'network', ['Version, deprecate, announce a sunset', 'Consumer-driven contract tests']),
    ]),
    row('mind', 'Over time', [
      card('debt', 'Technical debt', 'warn', ['Deliberate vs accidental', 'Interest = slower change; pay at the seams']),
      card('dfc', 'Designing for change', 'external', ['Narrow interfaces, clear data ownership', 'Reversible decisions, feature flags']),
    ]),
  ],
  edges: [],
}
