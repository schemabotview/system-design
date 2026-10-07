import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.1 — entities and relationships drawn as schema tables (the join table is what makes
// follows many-to-many), then the four ideas that turn a diagram into a design: access patterns
// first, normalise to keep truth in one place, denormalise where a read can't afford the join.
export const sdDataModel: Scene = {
  id: 'sd-data-model',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'er',
      label: 'Entities and relationships · a social network',
      pattern: 'network',
      icon: 'database',
      flow: 'LR',
      children: [
        {
          id: 'users',
          kind: 'table',
          label: 'users',
          columns: [
            { name: 'id', type: 'bigint', key: 'PK' },
            { name: 'name', type: 'text' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
        {
          id: 'follows',
          kind: 'table',
          label: 'follows',
          columns: [
            { name: 'follower_id', type: 'bigint', key: 'FK' },
            { name: 'followee_id', type: 'bigint', key: 'FK' },
          ],
        },
        {
          id: 'posts',
          kind: 'table',
          label: 'posts',
          columns: [
            { name: 'id', type: 'bigint', key: 'PK' },
            { name: 'author_id', type: 'bigint', key: 'FK' },
            { name: 'body', type: 'text' },
            { name: 'created_at', type: 'timestamp' },
          ],
        },
      ],
      edges: [
        { source: 'users', target: 'follows', label: 'M : N via a join table' },
        { source: 'users', target: 'posts', label: '1 : N writes' },
      ],
    },
    row('design', 'From diagram to design', [
      card('access', 'Access patterns first', 'warn', ['List them, rank by frequency', 'Open feed: 95% of reads', 'Post: 1 write per 10 reads', 'The schema serves these, not the nouns']),
      card('qdm', 'Query-driven modeling', 'external', ['One table per query shape', 'Choose the key from the lookup', 'Duplicate data to avoid joins']),
    ]),
    row('shape', 'Normalise, then denormalise on purpose', [
      card('norm', 'Normalization', 'service', ['Each fact stored once', 'No update anomalies', 'Cost: joins on every read']),
      card('denorm', 'Denormalization', 'storage', ['Copy a fact to where it is read', 'Fast reads, fewer joins', 'Cost: every copy must be updated']),
    ]),
  ],
  edges: [],
}
