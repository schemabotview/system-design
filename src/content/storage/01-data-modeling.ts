import type { Section } from '../types'

export const dataModeling: Section = {
  id: 'data-modeling',
  title: 'Data modeling',
  scene: 'sd-data-model',
  focus: 'er',
  slide: `## Data modeling

*Model the data from how it will be read, not from how it looks.*

### Model
- **Entities** and **relationships** (1:1, 1:N, M:N via a join table); a **schema** fixes tables, keys, types
- List **access patterns** first; **query-driven modeling** shapes tables around them
- **Normalize**: each fact once. **Denormalize**: copy a fact to where it is read

### Worked example & failure
- Feed from 3 normalized tables ≈ **200 lookups** (one per followee); precomputed timeline = **1 read**
- Denormalized copies drift; over-normalized reads drown in joins

### Your turn
- Model orders: entities, relationships, what to copy onto an order line
- Design: a chat app from its access patterns`,
  narration:
    "Chapter three is about storage, and it starts with a rule that saves more projects than any technology choice: model your data from how it will be read, not from how it looks. The first step is entities and relationships. Entities are the nouns: users, posts, follows. Relationships connect them. One user writes many posts, one-to-many, and a post row carries the author's id as a foreign key. A user follows many users and is followed by many, many-to-many, which can only be stored with a third table, a join table, that holds pairs of ids. That's the picture at the top, and it's a schema: tables, columns, types, and keys. But a diagram of nouns doesn't tell you how to build the schema, access patterns do. Before you design anything, list the operations, rank them by frequency, and note which are reads and which are writes. For our social network, opening a feed is ninety-five percent of reads, and a post is one write per ten reads. That list is what the schema has to serve. This is query-driven modeling: you shape tables, choose keys, and decide what to duplicate by looking at each query. Now the central trade-off. Normalization means each fact is stored exactly once. Change a user's name in one place, and it's correct everywhere, and there are no update anomalies. The price is that reads must join tables to reassemble the picture. Denormalization copies a fact to where it's read, so a read becomes one lookup, but every copy must now be kept in step. Look at the feed. Built from normalized tables, you fetch the followee list and then query posts for each of, say, two hundred followees, and merge: two hundred lookups for every feed open, at fifty-eight thousand opens a second. A precomputed timeline per user turns that into one read, and you pay at write time, when a new post is added to followers' timelines. Neither extreme is right: normalise by default, then denormalise deliberately, for a named read that can't afford the join. The failures are mirror images. Denormalised copies drift apart when one update is missed, and an over-normalised schema makes your hottest query a six-table join. Your turn. First, model an orders system: a customer has many orders, an order has many products through an order-line table, and the thing to copy onto the order line is the unit price at purchase time, because the product's price will change, and an old order must keep what the customer actually paid. Then the design problem: design the storage for a chat app starting from its access patterns, list conversations, load the last fifty messages, count unread, and derive the tables from those.",
}
