import type { Section } from '../types'

export const indexingQueryPerformance: Section = {
  id: 'indexing-query-performance',
  title: 'Indexing and query performance',
  scene: 'sd-indexing',
  focus: 'plan',
  slide: `## Indexing and query performance

*Make reads fast, and know exactly what each index costs.*

### Model
- **B-tree**: sorted, ~500 children per node; **hash**: equality only
- **Composite**: equality column first, then range; **leftmost prefix**. **Covering**: all columns in the index
- The **planner** costs plans from statistics; \`EXPLAIN\` shows its choice
- **Every index slows every write**
- **Leftmost prefix**: index (a, b) serves a, or a + b — not b alone; **covering** → Index Only Scan

### Worked example & failure
- 1B rows: B-tree **4 page reads** vs scanning 100 GB ≈ **100 s**
- Wrong column order, stale statistics, five indexes on a hot write path

### Your turn
- Index for \`WHERE status='open' ORDER BY created_at\`? Does (a, b) serve \`WHERE b=5\`?
- Design: indexes for 3 queries on posts`,
  narration:
    "An index is a separate, sorted structure that lets the database find rows without reading the whole table. It's the single most effective performance tool you have, and it has a price on every write. The workhorse is the B-tree. It keeps keys sorted in a balanced tree whose nodes are disk pages, each holding hundreds of keys, say five hundred children per node. That fan-out is why the tree is so shallow: a billion rows need only about four levels, since five hundred to the power of three is a hundred and twenty-five million and the fourth level covers the rest. So a lookup costs about four page reads, and the top levels are cached in memory. Compare that with scanning a hundred-gigabyte table at a gigabyte a second, a hundred seconds. A B-tree also serves ranges and ORDER BY, because the keys are sorted. A hash index gives constant-time equality lookups but nothing else, no ranges and no ordering. Now design. A composite index covers several columns, and column order matters: put the equality columns first, then the range or sort column. It follows the leftmost-prefix rule: an index on a and b serves queries on a, or on a and b, but not on b alone, which answers the exercise. A covering index includes every column the query needs, so the database answers from the index alone and never touches the table, shown here as Index Only Scan. Then there's the query planner. The database estimates the cost of each possible plan from statistics about your data, and chooses, sometimes preferring a full scan when most rows match anyway. Use EXPLAIN to see what it chose, and keep statistics fresh, because stale ones make bad plans. And the trade-off, the thing to remember: every index speeds reads and slows every write, since each insert or update must maintain all of them, and indexes take disk and memory. A table with five secondary indexes does six structure updates per insert. So you index the queries you actually run, found from your access patterns. Your turn. For where status equals open ordered by created at, the index is status then created at. And no, an index on a and b does not serve a filter on b alone. The design problem: take the posts table with three queries, feed by author, recent posts overall, and lookup by id, and decide the smallest set of indexes that serves all three.",
}
