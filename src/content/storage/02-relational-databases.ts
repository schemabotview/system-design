import type { Section } from '../types'

export const relationalDatabases: Section = {
  id: 'relational-databases',
  title: 'Relational databases',
  scene: 'sd-relational',
  focus: 'acid',
  slide: `## Relational databases

*Use tables, keys and transactions to keep data correct.*

### Model
- **Tables** of rows; **primary key** identifies a row; **foreign key** references another and is checked
- **SQL** is declarative; **joins** combine tables; **indexes** make lookups fast
- **ACID**: **A**tomic · **C**onsistent · **I**solated · **D**urable
- **Isolation** runs from read committed to serializable — stronger costs concurrency

### Worked example & failure
- Transfer: debit, crash, no credit → **atomicity** rolls both back
- Commit waits for the log flush (~1 ms) → **group commit**
- Lost update at read committed; missing index → full scan

### Your turn
- Two concurrent withdrawals of 80 from a balance of 100: what goes wrong, and the fix?
- Design: isolation for seat booking`,
  narration:
    "Relational databases are the default for a reason: they give you correctness mechanisms that you'd otherwise build yourself, badly. The model is simple. Data lives in tables of rows. A primary key uniquely identifies a row. A foreign key is a column that refers to another table's key, and the database checks it, so you can't have an account whose owner doesn't exist. You query with SQL, which is declarative: you describe the result, and the planner decides how to compute it. A join combines tables on a condition, such as each post with its author, using a nested loop or a hash join. And indexes, which we study in section four, make lookups fast. The code card shows all of it, the schema, the index, a join and a transaction. The big idea is the transaction, a group of operations treated as one unit, with four guarantees summed up as ACID. Atomicity: all or nothing. If the server crashes between debiting one account and crediting the other, the whole transfer rolls back, so money isn't created or destroyed. Consistency: declared rules always hold, like balance never goes below zero. Isolation: concurrent transactions don't see each other's half-finished work. It comes in levels, from read committed up to serializable, and stronger levels cost concurrency. Durability: once COMMIT returns, the data survives a crash, because the database writes its changes to a write-ahead log and flushes it to disk before it answers. That flush costs about a millisecond on an SSD, so one connection manages roughly a thousand commits a second, and databases use group commit to batch many transactions into one flush. What goes wrong? Take lost updates. At read committed, two transactions can both read a balance of a hundred, each subtract eighty in application code, and each write back twenty, so you've paid out a hundred and sixty from a hundred. Your turn: that's exactly the exercise. The fixes are to make the update itself atomic, UPDATE accounts SET balance equals balance minus eighty WHERE balance is at least eighty, or to lock the row with SELECT FOR UPDATE, or to run at serializable and retry on conflict. Another failure: a query with no index on its filter column scans the whole table, which is fine at ten thousand rows and a disaster at a billion. For the design problem, think of a seat-booking system where two people click the same seat. Which isolation level, or which constraint, guarantees only one wins? A unique constraint on show and seat is the simplest and strongest answer, so state what happens to the loser.",
}
