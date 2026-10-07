import type { Scene } from '@graphlearning/flow'

// §1.1 — the two altitudes. Top band is the HLD (boxes, boundaries, the contracts between them);
// the lower card is ONE of those boxes opened up, which is the LLD. The dashed edge is the zoom.
export const sdLayers: Scene = {
  id: 'sd-layers',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'hld',
      label: 'High-level design · the system and its subsystems',
      pattern: 'service',
      icon: 'layers',
      flow: 'LR',
      children: [
        { id: 'client', label: 'Client', pattern: 'user', icon: 'user', sub: 'mobile · web' },
        { id: 'upload', label: 'Upload subsystem', pattern: 'service', icon: 'server', sub: 'accepts photos' },
        { id: 'feed', label: 'Feed subsystem', pattern: 'service', icon: 'server', sub: 'builds timelines' },
        { id: 'blobs', label: 'Object store', pattern: 'storage', icon: 'database', sub: 'photo bytes' },
        { id: 'meta', label: 'Metadata DB', pattern: 'storage', icon: 'database', sub: 'users · follows · posts' },
      ],
      edges: [
        { source: 'client', target: 'upload', label: 'POST /photos' },
        { source: 'client', target: 'feed', label: 'GET /feed' },
        { source: 'upload', target: 'blobs' },
        { source: 'upload', target: 'meta' },
        { source: 'feed', target: 'meta' },
      ],
    },
    {
      id: 'lld',
      kind: 'list',
      label: 'Low-level design · inside the feed component',
      pattern: 'network',
      framed: true,
      items: [
        'class FeedBuilder  — merge(followees)',
        'top-K by created_at via a min-heap',
        'photos(id PK, owner_id FK, created_at, blob_key)',
        'index on (owner_id, created_at DESC)',
      ],
    },
  ],
  edges: [{ source: 'hld', target: 'lld', label: 'zoom in', dashed: true }],
}
