import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.1 — the funnel an expert runs before drawing anything (prompt → clarified problem → dominant
// constraint), and the system-context diagram that fixes what is inside the design and what is not.
export const sdProblem: Scene = {
  id: 'sd-problem',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'funnel',
      label: 'From a vague prompt to a design problem',
      pattern: 'group',
      icon: 'scroll',
      flow: 'LR',
      children: [
        { id: 'prompt', label: 'Prompt', badge: '1', sub: '“Design a chat system”', pattern: 'warn' },
        { id: 'clar', label: 'Clarified', badge: '2', sub: '1:1 + groups ≤ 500 · 50M DAU · < 200 ms' },
        { id: 'dom', label: 'Dominant constraint', badge: '3', sub: '5M open connections, ordered', pattern: 'service' },
      ],
      edges: [
        { source: 'prompt', target: 'clar', label: 'ask' },
        { source: 'clar', target: 'dom', label: 'rank' },
      ],
    },
    {
      id: 'ctx',
      label: 'System boundary: what is inside, what is not',
      pattern: 'group',
      icon: 'layers',
      flow: 'TB',
      children: [
        { id: 'users', label: 'Users · mobile, web', pattern: 'user', icon: 'user', sub: 'outside' },
        {
          id: 'inside',
          label: 'Chat system (ours)',
          pattern: 'service',
          flow: 'LR',
          children: [
            { id: 'gw', label: 'Connection gateway', pattern: 'network', icon: 'network' },
            { id: 'ms', label: 'Message service', pattern: 'service', icon: 'server' },
            { id: 'st', label: 'Message store', pattern: 'storage', icon: 'database' },
          ],
          edges: [
            { source: 'gw', target: 'ms' },
            { source: 'ms', target: 'st' },
          ],
        },
        { id: 'push', label: 'Push providers · APNs, FCM', pattern: 'external', icon: 'cloud', sub: 'outside' },
      ],
      edges: [
        { source: 'users', target: 'inside', label: 'send / receive' },
        { source: 'inside', target: 'push', label: 'wake offline devices' },
      ],
    },
    row('ask', 'What to pin down', [
      card('q', 'Clarifying questions', 'service', ['Scope: which features, which users?', 'Scale: DAU, peak, growth', 'Latency, consistency, durability targets']),
      card('hid', 'Hidden requirements', 'warn', ['Ordering, offline delivery, receipts', 'Abuse, retention, privacy law']),
      card('sd-problem-w', 'Worked example & failure', 'service', ['Chat: 50M DAU × 40 msgs = 2B/day ≈ 23K msgs/s (116K peak); 10% online = 5M connections ÷ 100K = 50 gateways', 'Designing before clarifying; boundaries that grow to "everything"']),
    ]),
    row('shape', 'What shapes the design', [
      card('dc', 'Dominant constraints', 'external', ['The one or two that bend the architecture', 'Say it in one sentence']),
      card('cp', 'Critical paths', 'network', ['The steps that set latency or correctness', 'send → persist → deliver']),
      card('sd-problem-t', 'Your turn', 'external', ['Ride-hailing: five clarifying questions and the dominant constraint?', 'Design: boundary and critical path for a video upload service']),
    ]),
  ],
  edges: [],
}
