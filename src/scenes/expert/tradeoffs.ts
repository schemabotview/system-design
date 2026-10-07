import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.4 — the five trade-offs, each stated as the choice and what each side buys; the decision record
// beside them is how an expert makes the choice durable: the options, the pick, the price, and the
// condition under which to change it.
export const sdTradeoffs: Scene = {
  id: 'sd-tradeoffs',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    row('five', 'Five trade-offs, said out loud', [
      card('ca', 'Consistency ↔ Availability', 'warn', ['During a partition: refuse or diverge', 'Bank: refuse · cart: merge']),
      card('ld', 'Latency ↔ Durability', 'network', ['Ack after memory vs after fsync / replica', 'Sync replica adds a round trip']),
      card('rw', 'Read ↔ Write optimisation', 'service', ['Precompute for reads, pay at write', 'Index, denormalise, materialise']),
    ]),
    row('two', 'And two more', [
      card('ss', 'Simplicity ↔ Scalability', 'external', ['Every distributed part is a cost', 'Add it only when a number demands it']),
      card('cr', 'Cost ↔ Reliability', 'storage', ['Each extra nine costs more than the last', '2 regions 200% · 3 regions 150%']),
    ]),
    {
      id: 'adr',
      kind: 'code',
      filename: 'decision-record.md',
      label: [
        'Decision:   serve the feed from precomputed timelines',
        'Context:    95% reads · p95 < 300 ms · 50M DAU',
        'Options:    A fan-out on read · B fan-out on write · C hybrid',
        'Chosen:     C — on write for normal users, on read for celebrities',
        'Price paid: write amplification (~200 followers each) for read latency',
        'Revisit if: celebrity share of posts > 5%, or timeline storage cost doubles',
      ].join('\n'),
    },
    row('sd-tradeoffs-put', 'Putting it to work', [
      card('sd-tradeoffs-w', 'Worked example & failure', 'service', ['Sync replica adds a ~80 ms round trip; 3 regions at 150% vs 2 at 200%', 'Choosing a side silently; scaling before a number demands it']),
      card('sd-tradeoffs-t', 'Your turn', 'external', ['Name the trade-off in: sync replication · denormalised timelines · a second region', 'Design: a decision record for chat message storage']),
    ]),
  ],
  edges: [],
}
