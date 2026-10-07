import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.4 — one query and the indexes that serve it, as SQL with the plan the database would show
// (a composite + covering index → "Index Only Scan"), then the index families and the planner.
export const sdIndexing: Scene = {
  id: 'sd-indexing',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'code',
      filename: 'indexes.sql',
      label: [
        '-- composite: equality column first, then the sort column',
        'CREATE INDEX idx_feed ON posts (author_id, created_at DESC);',
        '',
        '-- covering: the query is answered from the index alone',
        'CREATE INDEX idx_cov  ON posts (author_id, created_at DESC) INCLUDE (id);',
        '',
        'EXPLAIN SELECT id FROM posts',
        ' WHERE author_id = 42 ORDER BY created_at DESC LIMIT 20;',
        '-- Index Only Scan using idx_cov on posts  (rows=20)',
        '-- without it: Seq Scan on posts  (rows=1_000_000_000)',
      ].join('\n'),
    },
    row('kinds', 'Index structures', [
      card('btree', 'B-tree', 'service', ['Sorted, balanced, ~500 children per node', '1B rows ≈ 4 levels = 4 page reads', 'Serves =, ranges, ORDER BY']),
      card('hash', 'Hash index', 'storage', ['O(1) equality lookups', 'No ranges, no ordering']),
    ]),
    row('design', 'Designing and choosing', [
      card('comp', 'Composite · covering', 'network', ['Leftmost-prefix rule: (a, b) serves a, or a + b', 'Covering: all needed columns are in the index']),
      card('qp', 'Query planning', 'external', ['The planner costs plans from table statistics', 'EXPLAIN shows the choice; stale stats mislead it']),
      card('rw', 'Read/write trade-off', 'warn', ['Every index speeds reads, slows every write', 'Plus disk and memory', 'Index the queries you actually run']),
    ]),
  ],
  edges: [],
}
