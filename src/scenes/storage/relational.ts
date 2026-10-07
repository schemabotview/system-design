import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.2 — the relational model as running SQL (keys, an index, a join, a transaction), then the four
// ACID guarantees, each with what it costs or what breaks without it.
export const sdRelational: Scene = {
  id: 'sd-relational',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'sql',
      kind: 'code',
      filename: 'schema.sql',
      label: [
        'CREATE TABLE accounts (',
        '  id       BIGINT PRIMARY KEY,',
        '  owner_id BIGINT NOT NULL REFERENCES users(id),   -- foreign key',
        '  balance  BIGINT NOT NULL CHECK (balance >= 0)',
        ');',
        'CREATE INDEX ON posts (author_id, created_at DESC);',
        '',
        '-- a join: each post with its author',
        'SELECT u.name, p.body FROM posts p JOIN users u ON u.id = p.author_id',
        ' WHERE p.author_id = 42 ORDER BY p.created_at DESC LIMIT 20;',
        '',
        '-- a transaction: both updates or neither',
        'BEGIN;',
        '  UPDATE accounts SET balance = balance - 100 WHERE id = 1;',
        '  UPDATE accounts SET balance = balance + 100 WHERE id = 2;',
        'COMMIT;',
      ].join('\n'),
    },
    row('parts', 'The building blocks', [
      card('tables', 'Tables and indexes', 'service', ['Rows in tables; an index makes lookups fast', 'Primary key: unique row identity', 'Foreign key: a checked reference']),
      card('joins', 'SQL and joins', 'network', ['Declarative: say what, not how', 'Inner / left join combine tables', 'Planner picks nested-loop or hash join']),
    ]),
    row('acid', 'ACID', [
      card('a', 'Atomicity', 'warn', ['All or nothing', 'A crash mid-transfer rolls back']),
      card('c', 'Consistency', 'service', ['Constraints always hold', 'No negative balance']),
      card('i', 'Isolation', 'network', ['Concurrent transactions don’t see halves', 'Read committed → serializable']),
      card('d', 'Durability', 'storage', ['Committed = survives a crash', 'Write-ahead log flushed before COMMIT returns']),
    ]),
  ],
  edges: [],
}
