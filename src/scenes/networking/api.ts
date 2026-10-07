import type { Scene } from '@graphlearning/flow'
import { card, row } from './kit'

// §2.3 — resources as a code card (REST made concrete), the three styles side by side, then the two
// cross-cutting decisions every API makes: how to page and how to change without breaking callers.
export const sdApi: Scene = {
  id: 'sd-api',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'resources',
      kind: 'code',
      filename: 'photos-api.http',
      label: [
        '# resources are nouns; HTTP methods are the verbs',
        'GET    /users/42/photos?limit=20&after=ph_981',
        'POST   /photos                    # create',
        'GET    /photos/ph_981             # read',
        'PATCH  /photos/ph_981             # update',
        'DELETE /photos/ph_981             # remove',
      ].join('\n'),
    },
    row('styles', 'Three styles', [
      card('rest', 'REST', 'service', ['Resources + HTTP verbs', 'Cacheable, easy to debug', 'Fixed shapes: over- or under-fetching']),
      card('rpc', 'RPC · gRPC', 'network', ['Call a function: CreatePhoto(req)', 'Protobuf, HTTP/2, streaming, generated clients', 'Best between internal services']),
      card('gql', 'GraphQL', 'external', ['One endpoint; client names the fields', 'One round trip, no over-fetch', 'Harder to cache; N+1 and query cost']),
    ]),
    row('decisions', 'Two decisions every API makes', [
      card('page', 'Pagination', 'warn', ['Offset: simple, slow when deep, drifts', 'Cursor / keyset: stable and index-fast', 'Return next_cursor; cap the page size']),
      card('ver', 'Versioning', 'storage', ['Additive changes are safe', 'Breaking → /v2 (or a header)', 'Announce deprecation and a sunset date']),
    ]),
  ],
  edges: [],
}
