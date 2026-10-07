import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §5.1 — cache-aside as running code (the read path, the write path, the TTL), then the three other
// write policies, and the two things every cache has to answer: what to evict, and when it is wrong.
export const sdCaching: Scene = {
  id: 'sd-caching',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'aside',
      kind: 'code',
      filename: 'cache_aside.py',
      label: [
        'def get_user(id):',
        '    v = cache.get(f"user:{id}")',
        '    if v is not None: return v              # hit',
        '    v = db.query(id)                        # miss: go to the source',
        '    cache.set(f"user:{id}", v, ttl=300)     # populate; expires in 5 min',
        '    return v',
        '',
        'def update_user(id, data):',
        '    db.update(id, data)                     # the database is the truth',
        '    cache.delete(f"user:{id}")              # invalidate; next read repopulates',
      ].join('\n'),
    },
    row('policies', 'Four ways to wire a cache', [
      card('ca', 'Cache-aside', 'service', ['App checks the cache, then the DB', 'App fills the cache', 'Default; tolerates cache loss']),
      card('rt', 'Read-through', 'network', ['Cache loads from the DB itself', 'App only talks to the cache']),
      card('wt', 'Write-through', 'storage', ['Write cache and DB together', 'Always fresh, slower writes']),
      card('wb', 'Write-back', 'warn', ['Write the cache; flush later', 'Fast writes, but a crash loses data']),
    ]),
    row('keep', 'Keeping it small and right', [
      card('ttl', 'TTL', 'external', ['Every entry expires', 'The backstop against stale data']),
      card('evict', 'Eviction', 'service', ['Full? drop something: LRU, LFU, FIFO', 'LRU = least recently used']),
      card('inval', 'Invalidation', 'warn', ['Delete on write', 'Race: a reader can re-cache the OLD value', 'TTL bounds the damage']),
    ]),
  ],
  edges: [],
}
