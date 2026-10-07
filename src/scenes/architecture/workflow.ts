import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.5 — the same order process coordinated two ways (a conductor sending commands vs peers reacting
// to events), then the thing both need underneath: an explicit state machine with timeouts.
export const sdWorkflow: Scene = {
  id: 'sd-workflow',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'ways',
      label: 'One process, two coordination styles',
      pattern: 'group',
      icon: 'repeat',
      flow: 'LR',
      children: [
        {
          id: 'orch',
          label: 'Orchestration',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'conductor', label: 'Order workflow', pattern: 'service', icon: 'server', sub: 'owns the sequence' },
            {
              id: 'steps',
              label: 'Commands',
              pattern: 'group',
              flow: 'LR',
              children: [
                { id: 'o1', label: 'Reserve', pattern: 'network' },
                { id: 'o2', label: 'Charge', pattern: 'network' },
                { id: 'o3', label: 'Ship', pattern: 'network' },
              ],
              edges: [],
            },
          ],
          edges: [{ source: 'conductor', target: 'steps', label: 'commands, in turn' }],
        },
        {
          id: 'chor',
          label: 'Choreography',
          pattern: 'network',
          flow: 'TB',
          children: [
            { id: 'c1', label: 'Inventory', pattern: 'service', icon: 'server', sub: 'on OrderPlaced → reserves' },
            { id: 'c2', label: 'Payments', pattern: 'service', icon: 'server', sub: 'on StockReserved → charges' },
            { id: 'c3', label: 'Shipping', pattern: 'service', icon: 'server', sub: 'on PaymentCaptured → ships' },
          ],
          edges: [
            { source: 'c1', target: 'c2', label: 'event' },
            { source: 'c2', target: 'c3', label: 'event' },
          ],
        },
      ],
      edges: [],
    },
    {
      id: 'sm',
      kind: 'code',
      filename: 'order_state_machine.py',
      label: [
        'TRANSITIONS = {',
        '  ("PLACED",         "StockReserved"):   "STOCK_RESERVED",',
        '  ("STOCK_RESERVED", "PaymentCaptured"): "PAID",',
        '  ("PAID",           "Shipped"):         "SHIPPED",',
        '  ("PLACED",         "StockFailed"):     "CANCELLED",',
        '  ("STOCK_RESERVED", "PaymentFailed"):   "CANCELLED",   # run: release stock',
        '  ("STOCK_RESERVED", "Timeout(15m)"):    "CANCELLED",',
        '}',
        'def on_event(order, event):',
        '    order.state = TRANSITIONS[(order.state, event.type)]   # illegal move → error',
      ].join('\n'),
    },
    row('engines', 'Making it durable', [
      card('eng', 'Workflow engines', 'storage', ['Temporal, Step Functions, Camunda', 'Persist state, timers, retries and history']),
      card('ltx', 'Long-running transactions', 'warn', ['Hours or days; human steps; timeouts', 'Every step idempotent and resumable']),
      card('so', 'Saga orchestration', 'external', ['The orchestrator runs the steps', 'And their compensations on failure']),
    ]),
  ],
  edges: [],
}
