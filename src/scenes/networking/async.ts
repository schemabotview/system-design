import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §2.5 — one upload event fanning out through a queue and a topic (the producers/consumers and
// pub/sub shapes drawn), then what the broker promises: delivery semantics and what to expect.
export const sdAsync: Scene = {
  id: 'sd-async',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'Event-driven: a photo is uploaded',
      pattern: 'network',
      icon: 'repeat',
      flow: 'LR',
      children: [
        { id: 'prod', label: 'Upload service', pattern: 'service', icon: 'server', sub: 'producer · emits PhotoUploaded' },
        { id: 'queue', label: 'Thumbnail queue', pattern: 'storage', icon: 'database', sub: 'each message → ONE worker' },
        { id: 'workers', label: 'Thumbnail workers', pattern: 'service', icon: 'server', sub: 'consumers · scale independently' },
        { id: 'topic', label: 'photo-events topic', pattern: 'storage', icon: 'database', sub: 'each subscriber gets a COPY' },
        { id: 'feed', label: 'Feed fan-out', pattern: 'service', icon: 'server', sub: 'subscriber' },
        { id: 'notify', label: 'Notifier', pattern: 'service', icon: 'server', sub: 'subscriber' },
      ],
      edges: [
        { source: 'prod', target: 'queue', label: 'publish' },
        { source: 'queue', target: 'workers', label: 'pull · ack' },
        { source: 'prod', target: 'topic', label: 'publish' },
        { source: 'topic', target: 'feed' },
        { source: 'topic', target: 'notify' },
      ],
    },
    row('semantics', 'What the broker promises', [
      card('amo', 'At-most-once', 'warn', ['Send and forget; no redelivery', 'May lose messages', 'OK for metrics and logs']),
      card('alo', 'At-least-once', 'network', ['Redeliver until acked', 'May deliver duplicates', 'The usual default']),
      card('eo', 'Exactly-once effect', 'external', ['= at-least-once + idempotent consumer', 'Dedupe on a message id', 'True exactly-once delivery doesn’t exist']),
    ]),
    row('shape', 'Queue vs publish/subscribe', [
      card('q', 'Queue', 'service', ['Work distribution', 'One consumer per message', 'Absorbs bursts; depth = backlog']),
      card('ps', 'Publish/subscribe', 'storage', ['Broadcast of facts', 'Many independent subscribers', 'Producer doesn’t know who listens']),
    ]),
  ],
  edges: [],
}
