import type { Section } from '../types'

export const partitioningAndSharding: Section = {
  id: 'partitioning-and-sharding',
  title: 'Partitioning and sharding',
  scene: 'sd-sharding',
  focus: 'cluster',
  slide: `## Partitioning and sharding

*Split one dataset across nodes when it or its writes outgrow one.*

### Model
- **Range**: ordered, good scans, hot tail. **Hash**: even spread, scattered ranges
- **Shard key**: high cardinality, even, in every hot query
- **Rebalancing**: many fixed partitions; **consistent hashing**
- **Range** keeps scans on one shard but a timestamp key piles on the last; **hash** spreads evenly

### Worked example & failure
- 219 TB ÷ ~4 TB/node → **64 shards**; 1,024 partitions → 16 each; a new node takes **~16**
- Hot key (celebrity) overloads one shard; cross-shard joins and transactions
- Hot partition: salt or split the key, or cache it

### Your turn
- 10 TB, 20K writes/s; node = 2 TB, 5K writes/s: how many shards?
- Design: shard key for messaging — conversation_id or user_id?`,
  narration:
    "Replication copies the whole dataset. Partitioning, also called sharding, splits it, so that each node holds only a slice. You do it when the data no longer fits on one machine or the write rate exceeds what one machine can take. A router sends each request to the shard that owns the key. There are two ways to split. Range partitioning gives each shard a contiguous slice of the key space, users zero to thirty-three million on shard one, and so on. Range scans stay on one shard, but a monotonic key such as a timestamp sends every new write to the last shard, creating a hot spot. Hash partitioning applies a hash to the key to choose the shard, spreading load evenly, but a range query must now ask every shard. The most important decision is the shard key. A good key has high cardinality, spreads load evenly, and appears in your hottest queries, so most requests touch a single shard. For user-centric data, user id is the natural choice. A bad choice leaves most queries scatter-gathering across every shard, and cross-shard joins and transactions are costly or impossible. Sizing: our storage estimate from chapter one was two hundred and nineteen terabytes. If a node comfortably holds about four, that's at least fifty-five shards, so plan sixty-four, around three and a half terabytes each. How do you move data when you add nodes? Don't map keys to nodes directly. Create many fixed partitions, say one thousand and twenty-four, and assign them to nodes. With sixty-four nodes each holds sixteen. Add a sixty-fifth node and it takes about sixteen whole partitions from the others, a small fraction of the data, and consistent hashing, from section 2.6, achieves the same effect, moving about one in N plus one keys. The characteristic failure is the hot partition. Even with a good hash, one key can get a disproportionate share, a celebrity with fifty million followers. The shard holding that key is overloaded while others sit idle. Fixes are to split the key across several shards with a salt, to cache it, or to treat it specially. Your turn. With ten terabytes and twenty thousand writes a second, and nodes limited to two terabytes and five thousand writes, size needs five nodes and writes need four, so you need five, plus headroom. And the design problem: for a messaging system, compare sharding by conversation id with sharding by user id. Consider which makes loading a conversation a single-shard read, and which makes listing a user's conversations cheap.",
}
