import type { Section } from '../types'

export const architectureFromAccessPatterns: Section = {
  id: 'architecture-from-access-patterns',
  title: 'Architecture from access patterns',
  scene: 'sd-from-access',
  focus: 'chain',
  slide: `## Architecture from access patterns

*Derive the design from what people do; technologies come last.*

### Model
- **Users → operations → access patterns → data model → traffic → components**
- Each arrow produces an artifact the next step needs; technology appears only at the end
- Chat: send / load history / mark read → append by conversation, last 50 → messages(conversation_id, seq)

### Worked example & failure
- URL shortener: create + resolve → lookup by code only → key-value; 40 w/s, 400 r/s → app + KV + cache
- "Use Kafka and Cassandra" first; ignoring read/write skew and hot data
- Traffic 23K writes/s (116K peak), reads 5× — only then: gateway, queue, wide-column store, cache

### Your turn
- Derive the components for autocomplete
- Design: derive a news feed from its access patterns`,
  narration:
    "The principle that has run through this whole course is that you derive an architecture rather than recall it. This section makes the derivation explicit, as a chain with six links: users, operations, access patterns, data model, traffic, components. We run it once on the chat system, and the scene shows each link as an artifact. Users: senders and recipients. Operations, the things they do: send a message, load history, mark as read. Access patterns, which is those operations restated as how the data is touched: append a message to a conversation, and read the last fifty messages of a conversation, and count unread messages for a user. This is the pivotal link, because access patterns, not entities, decide the data model. So the data model is messages keyed by conversation id and a sequence number, partitioned by conversation, so that a conversation's messages sit together and in order. Next, traffic, from our estimate: twenty-three thousand writes a second on average, a hundred and sixteen thousand at peak, with reads about five times writes. And only now do components appear: a connection gateway, a queue to decouple delivery, a wide-column store that fits a partition-by-conversation, ordered-by-sequence model, and a cache of recent messages. Notice what happened: no technology was chosen first, and each was forced by something earlier. Compare the URL shortener. The operations are create a short link and resolve one. The only access pattern is lookup by code, so a key-value store is the natural fit. Traffic is forty writes and four hundred reads a second, so one cluster plus a cache is enough. Same method, a very different and much smaller answer. Three habits keep you honest. Avoid the technology-first trap, announcing Kafka and Cassandra before you know a single access pattern, so the tool becomes the requirement. Look at read and write skew, because the ratio tells you which side to optimise, and which data is hot decides what to cache. And model one table per query, duplicating data rather than joining on a hot path. Your turn. For autocomplete: the operation is get the top ten completions for a prefix, so the access pattern is a lookup by prefix, read-dominated. That points to precomputed top-ten lists per prefix, built offline from query logs, served from an in-memory key-value store or trie behind a cache. And the design problem: derive a news feed starting from its operations, and show where the data model comes from.",
}
