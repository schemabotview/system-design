import type { Section } from '../types'

export const nosqlDatabases: Section = {
  id: 'nosql-databases',
  title: 'NoSQL databases',
  scene: 'sd-nosql',
  focus: 'rule',
  slide: `## NoSQL databases

*Pick a data model that matches the access pattern.*

### Model
- **Key-value** (get/put) · **document** (nested JSON) · **wide-column** (partition + sorted key)
- **Graph** (traversals) · **time-series** (append, range, downsample)
- Each gives up joins or flexible queries to gain **scale or shape**
- **Wide-column**: partition + clustering key · **graph**: multi-hop traversals · **time-series**: append, downsample

### Worked example & failure
- Cart as key-value: **1 read** by user; "revenue by product" means scanning everything
- Document store then needing joins and multi-document transactions

### Your turn
- Pick a store: session tokens · product catalog · sensor readings · friends-of-friends · 1M writes/s messages
- Design: stores for a ride-hailing app`,
  narration:
    "NoSQL is a family of databases that trade some of the relational model's power for scale or for a better fit with certain data. There are five families worth knowing, and each is best understood by the shape of the data, what it answers well, and what it answers badly. A key-value store maps a key to an opaque value. It does one thing, get and put by key, at enormous scale and speed. Redis and DynamoDB are examples, and sessions and shopping carts are the classic uses. It can't answer anything except by key. A document store keeps a nested JSON document under a key, so one read returns everything about an entity, a product with all of its varying attributes, say. MongoDB is the usual example. It's weaker at joins across documents and at transactions spanning several. A wide-column store, like Cassandra or Bigtable, partitions data by a partition key and keeps rows sorted within a partition by a clustering key. It handles enormous write rates and range reads by time, which suits messages and events, but it's poor at ad-hoc queries. A graph database stores nodes and edges and is good at multi-hop questions, friends of friends, fraud rings, recommendations, and bad at bulk scans and at being sharded. A time-series database is built for append-only data indexed by time: metrics and sensor readings. It's good at ranges, downsampling and retention, and bad at updating the past. Now the decision rule at the bottom of the scene. NoSQL fits when the access pattern is narrow and known, when scale or write rate outgrows one relational node, or when the data's shape is varying, a graph, or a series. Otherwise stay relational, where joins and transactions are free. Example: a shopping cart as a key-value entry is one read by user id, instead of a three-table join. But ask for total revenue by product and the key-value store has to scan every cart. The common failure is picking a document store for its flexibility, and later needing joins and multi-document transactions. Schema-less doesn't mean no schema, it means the application owns the schema. Your turn. Session tokens: key-value. A product catalogue with varied attributes: document. Sensor readings: time-series. Friends of friends: graph. A million message writes a second: wide-column. And the design problem: for a ride-hailing app, choose stores for driver locations, trips, and payments. Notice that payments probably end up relational, and say why.",
}
