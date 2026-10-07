import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.3 — the eight places a bottleneck lives, each as symptom → how to see it → what to do. The
// method card on top is the loop that ties them: find the saturated resource, fix it, and expect the
// next one to appear.
export const sdBottlenecks: Scene = {
  id: 'sd-bottlenecks',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    row('method', 'The loop: measure, find, fix, repeat', [
      card('m1', '1 · Measure', 'network', ['Every resource: utilisation, saturation, errors (USE)']),
      card('m2', '2 · Find', 'warn', ['The saturated one — the slowest stage caps throughput']),
      card('m3', '3 · Fix, then re-measure', 'service', ['Expect the next bottleneck to appear']),
    ]),
    row('local', 'On one machine', [
      card('cpu', 'CPU', 'service', ['Symptom: high CPU, slow responses', 'Fix: profile, cache, scale out']),
      card('mem', 'Memory', 'network', ['Symptom: swapping, GC pauses, OOM', 'Fix: bound caches, shrink objects']),
      card('disk', 'Disk', 'storage', ['Symptom: high I/O wait', 'Fix: index, SSD, batch, move reads to cache']),
      card('net', 'Network', 'external', ['Symptom: saturated NIC, retransmits', 'Fix: compress, CDN, co-locate']),
    ]),
    row('shared', 'Across the system', [
      card('db', 'Database', 'warn', ['Symptom: pool full, slow queries', 'Fix: index, replicas, cache, shard']),
      card('lock', 'Lock contention', 'warn', ['Symptom: low CPU but low throughput', 'Fix: shorter critical sections, partition the lock']),
      card('hot', 'Hot partitions', 'service', ['Symptom: one shard overloaded', 'Fix: split or salt the key, cache']),
      card('dep', 'Downstream dependencies', 'network', ['Symptom: we are slow when they are', 'Fix: timeout, breaker, bulkhead, async']),
    ]),
  ],
  edges: [],
}
