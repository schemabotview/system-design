import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.2 — the derivation chain from the plan, run once on the chat system so each arrow is a visible
// artifact: a technology appears only at the last step, and only because the earlier ones forced it.
export const sdFromAccess: Scene = {
  id: 'sd-from-access',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'Users → operations → access patterns → data model → traffic → components',
      pattern: 'group',
      icon: 'repeat',
      flow: 'TB',
      children: [
        {
          id: 'what',
          label: 'What people do',
          pattern: 'network',
          flow: 'LR',
          children: [
            { id: 'u', label: 'Users', badge: '1', sub: 'senders, recipients' },
            { id: 'o', label: 'Operations', badge: '2', sub: 'send · load history · mark read' },
            { id: 'a', label: 'Access patterns', badge: '3', sub: 'append by conversation; last 50 by conversation' },
          ],
          edges: [
            { source: 'u', target: 'o' },
            { source: 'o', target: 'a' },
          ],
        },
        {
          id: 'how',
          label: 'What the system must be',
          pattern: 'service',
          flow: 'LR',
          children: [
            { id: 'd', label: 'Data model', badge: '4', sub: 'messages(conversation_id, seq) by conversation' },
            { id: 't', label: 'Traffic', badge: '5', sub: '23K writes/s · 116K peak · reads 5×' },
            { id: 'c', label: 'Components', badge: '6', sub: 'gateway · queue · wide-column store · cache', pattern: 'warn' },
          ],
          edges: [
            { source: 'd', target: 't' },
            { source: 't', target: 'c' },
          ],
        },
      ],
      edges: [{ source: 'what', target: 'how', label: 'derive, never recall' }],
    },
    row('traps', 'Habits that keep it honest', [
      card('tech', 'The technology-first trap', 'warn', ['“Use Kafka and Cassandra” before the patterns are known', 'The tool becomes the requirement']),
      card('skew', 'Read/write skew', 'service', ['Ratio decides which side to optimise', 'Hot vs cold data decides what to cache']),
      card('q', 'One table per query', 'network', ['A lookup shape → a key', 'Duplicate rather than join on the hot path']),
    ]),
  ],
  edges: [],
}
