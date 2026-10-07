import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.7 — the chapter's case study as the scene: an event pipeline from producers through a durable
// log and a stream processor to a serving store, with the same log feeding a warehouse. The cards
// are the architectural vocabulary the pipeline is built from.
export const sdProcessing: Scene = {
  id: 'sd-processing',
  padding: 0.17,
  flow: 'TB',
  nodes: [
    {
      id: 'pipe',
      label: 'Case study · a scalable event-processing pipeline',
      pattern: 'group',
      icon: 'repeat',
      flow: 'TB',
      children: [
        {
          id: 'ingest',
          label: 'Ingest · 100K events/s',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'src', label: 'Producers', pattern: 'user', icon: 'user', sub: 'keyed events' },
            { id: 'log', label: 'Durable log', pattern: 'storage', icon: 'database', sub: 'partitioned · 7 days retained' },
          ],
          edges: [{ source: 'src', target: 'log' }],
        },
        {
          id: 'readers',
          label: 'Independent readers of the same log',
          pattern: 'service',
          flow: 'LR',
          children: [
            { id: 'proc', label: 'Stream processor', pattern: 'service', icon: 'server', sub: 'windows · joins · state' },
            { id: 'view', label: 'Materialized view', pattern: 'storage', icon: 'database', sub: 'serves dashboards' },
            { id: 'wh', label: 'Warehouse / lake', pattern: 'external', icon: 'cloud', sub: 'batch analytics · replay' },
          ],
          edges: [{ source: 'proc', target: 'view' }],
        },
      ],
      edges: [{ source: 'ingest', target: 'readers', label: 'each reader tracks its own offset' }],
    },
    row('modes', 'Batch, stream, and combining them', [
      card('batch', 'Batch', 'service', ['Bounded data, high throughput', 'Latency: minutes to hours']),
      card('stream', 'Stream', 'network', ['Unbounded data, low latency', 'Windows, late data, watermarks']),
      card('lk', 'Lambda · Kappa', 'external', ['Lambda: batch + speed layer, two code paths', 'Kappa: one stream path; reprocess by replaying the log']),
    ]),
    row('state', 'Events as the source of truth', [
      card('es', 'Event sourcing', 'warn', ['Store the events, not the state', 'State = fold over events; replayable; auditable']),
      card('cqrs', 'CQRS', 'service', ['Separate write model and read models', 'Read side is denormalised, eventually consistent']),
      card('mv', 'Materialized views', 'storage', ['Query results precomputed and kept current', 'Fast reads, paid for at write time']),
    ]),
  ],
  edges: [],
}
