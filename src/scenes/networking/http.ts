import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §2.2 — one real exchange as a code card (the request/response model, headers, a status line), then
// the vocabulary around it: methods, status classes, and what HTTP/1.1 → 2 → 3 each fixed.
export const sdHttp: Scene = {
  id: 'sd-http',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'exchange',
      kind: 'code',
      filename: 'exchange.http',
      label: [
        'GET /feed?limit=20 HTTP/1.1',
        'Host: api.example.com',
        'Authorization: Bearer eyJhbGciOi…',
        'Accept: application/json',
        'If-None-Match: "v42"',
        '',
        'HTTP/1.1 200 OK',
        'Content-Type: application/json',
        'Cache-Control: private, max-age=30',
        'ETag: "v43"',
        'Connection: keep-alive',
      ].join('\n'),
    },
    row('vocab', 'The vocabulary', [
      card('methods', 'Methods', 'service', ['GET: read — safe, idempotent', 'POST: create — not idempotent', 'PUT: replace · DELETE: remove — idempotent', 'PATCH: partial update']),
      card('status', 'Status codes', 'warn', ['2xx ok · 3xx redirect or 304 not modified', '4xx your fault: 400 401 403 404 409 429', '5xx our fault: 500 502 503 504']),
    ]),
    row('versions', 'HTTP/1.1 → 2 → 3', [
      card('h1', 'HTTP/1.1', 'storage', ['Text; persistent connections', 'One request in flight per connection', 'Browsers open ~6 connections']),
      card('h2', 'HTTP/2', 'network', ['Binary, header compression', 'Many streams on one TCP connection', 'One lost packet stalls all streams']),
      card('h3', 'HTTP/3', 'external', ['QUIC over UDP', 'Loss stalls only its own stream', 'Faster setup; survives IP changes']),
    ]),
  ],
  edges: [],
}
