import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.6 — ten systems, one card each, in the same three lines: the dominant constraint that shapes the
// design, the design it forces, and the number that justifies it. The point is the repetition: the
// same method (ch. 1 §7) produces ten different answers because the dominant constraint differs.
export const sdCaseStudies: Scene = {
  id: 'sd-case-studies',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    row('a', 'Lookups and limits', [
      card('url', '1 · URL shortener', 'service', ['Constraint: read-heavy key lookup', 'Design: base62 code → KV store + cache', '62⁷ ≈ 3.5 trillion codes']),
      card('rate', '2 · Rate limiter', 'warn', ['Constraint: a decision on every request', 'Design: token bucket, atomic in Redis', '~100K ops/s per node']),
      card('notif', '3 · Notification service', 'network', ['Constraint: fan-out, no duplicates', 'Design: queue per channel, idempotent send', '10M/h ≈ 2.8K/s']),
    ]),
    row('b', 'Real time and ranking', [
      card('chat', '4 · Chat', 'external', ['Constraint: millions of open connections', 'Design: gateways + per-conversation order', '5M conns ÷ 100K = 50 gateways']),
      card('feed', '5 · News feed', 'service', ['Constraint: read latency vs write cost', 'Design: hybrid fan-out, cached timelines', '~200 followers per post']),
      card('search', '6 · Search and autocomplete', 'network', ['Constraint: < 100 ms prefix lookup', 'Design: precomputed top-k, inverted index', 'Top-10 per prefix, offline']),
    ]),
    row('c', 'Media and movement', [
      card('video', '7 · Video platform', 'storage', ['Constraint: bandwidth and storage cost', 'Design: transcode queue → object store → CDN', '10M streams × 5 Mbps = 50 Tbps']),
      card('ride', '8 · Ride-sharing', 'warn', ['Constraint: location write rate + matching', 'Design: in-memory geo-index by cell', '1M drivers ÷ 4 s = 250K/s']),
    ]),
    row('d', 'Correctness and durability', [
      card('pay', '9 · Payment system', 'warn', ['Constraint: correctness above all', 'Design: idempotency, ledger, saga + reconcile', 'Strong consistency, 99.99%']),
      card('file', '10 · Cloud file storage', 'storage', ['Constraint: durability + sync', 'Design: 4 MB chunks, dedupe, change log', '1 TB = 262,144 chunks']),
    ]),
  ],
  edges: [],
}
