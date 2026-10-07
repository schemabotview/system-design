import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.4 — the idempotent consumer as code (dedupe check, effect and dedupe record in ONE transaction,
// ack last), beside the three semantics defined by where a crash leaves you.
export const sdDelivery: Scene = {
  id: 'sd-delivery',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'handler',
      kind: 'code',
      filename: 'consumer.py',
      label: [
        'def handle(msg):',
        '    with db.transaction():',
        '        if db.exists("processed", msg.id):   # duplicate? skip',
        '            return ack(msg)',
        '        apply_effect(msg)                    # the business change',
        '        db.insert("processed", msg.id)       # in the SAME transaction',
        '    ack(msg)                                 # crash here → redelivered →',
        '                                             #   the check above skips it',
      ].join('\n'),
    },
    row('semantics', 'Where does a crash leave you?', [
      card('amo', 'At-most-once', 'warn', ['Ack first, then process', 'Crash in between = message lost', 'Never a duplicate']),
      card('alo', 'At-least-once', 'network', ['Process first, then ack', 'Crash in between = redelivered', 'Never lost; duplicates possible']),
      card('eo', 'Exactly-once effect', 'external', ['At-least-once + idempotent consumer', 'Or an atomic read-process-write inside the broker']),
    ]),
    row('dups', 'Duplicates and how to remove them', [
      card('src', 'Where duplicates come from', 'service', ['Producer retry after a lost ack', 'Consumer crash before ack', 'Rebalance mid-processing']),
      card('dd', 'Deduplication', 'storage', ['Key: message id or a natural key', 'Keep ids for a bounded window', '10M/day × 7 days × 16 B ≈ 1.1 GB']),
    ]),
  ],
  edges: [],
}
