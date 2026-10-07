import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.7 — six specialised stores, then the chapter's case study: every kind of data in a social
// network assigned to the store whose strengths match how it is accessed.
export const sdSpecialized: Scene = {
  id: 'sd-specialized',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    row('files', 'Files and search', [
      card('obj', 'Object storage', 'storage', ['Immutable objects by key (S3)', '11 nines durable, ≈ $0.02/GB-month', 'Not for low-latency random updates']),
      card('blob', 'Blob storage', 'service', ['Large binary values: images, video', 'Keep bytes out of the DB; store a key']),
      card('search', 'Search engine', 'network', ['Inverted index: term → documents', 'Full-text, relevance, filters', 'A derived copy, never the source of truth']),
    ]),
    row('analytics', 'Analytics and meaning', [
      card('dw', 'Data warehouse', 'external', ['Columnar, SQL, big scans (OLAP)', 'Curated, schema-on-write']),
      card('lake', 'Data lake', 'warn', ['Raw files in object storage (Parquet)', 'Schema-on-read; cheap; needs governance']),
      card('vec', 'Vector database', 'service', ['Embeddings; nearest-neighbour search (ANN)', 'Semantic search, recommendations']),
    ]),
    {
      id: 'case',
      kind: 'list',
      label: 'Case study · choosing the appropriate storage model for a social network',
      pattern: 'group',
      framed: true,
      items: [
        'Profiles, follows → relational, sharded by user_id, leader + replicas',
        'Posts → wide-column, partitioned by author_id, newest first',
        'Home timelines → key-value cache, precomputed per user',
        'Photos, video → object storage behind a CDN',
        'Post search → search engine, fed from a change stream',
        'Analytics → data lake, curated into a warehouse',
        'Recommendations → graph + vector index',
      ],
    },
    row('sd-specialized-put', 'Putting it to work', [
      card('sd-specialized-w', 'Worked example & failure', 'service', ['5M photos/day × 2 MB = 10 TB/day ≈ 3.65 PB/yr ≈ $84K/month at $0.023/GB', 'Search as the source of truth; blobs in the DB; a lake with no governance']),
      card('sd-specialized-t', 'Your turn', 'external', ['Store for: invoices PDF · autocomplete · daily revenue report · "similar posts"', 'Design: place every datum of the social network']),
    ]),
  ],
  edges: [],
}
