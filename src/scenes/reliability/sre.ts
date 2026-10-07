import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.4 — the chain that turns "reliable enough" into numbers: an indicator you measure, an objective
// you promise internally, an agreement you promise externally (looser). Then what to do with the gap
// (the error budget) and how to behave when it is spent (incidents, postmortems).
export const sdSre: Scene = {
  id: 'sd-sre',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'From measurement to promise',
      pattern: 'group',
      icon: 'scroll',
      flow: 'LR',
      children: [
        { id: 'sli', label: 'SLI', badge: '1', sub: 'what you measure: good ÷ valid requests' },
        { id: 'slo', label: 'SLO', badge: '2', sub: 'the target: 99.9% over 30 days', pattern: 'service' },
        { id: 'sla', label: 'SLA', badge: '3', sub: 'the contract: looser, with penalties', pattern: 'warn' },
      ],
      edges: [
        { source: 'sli', target: 'slo' },
        { source: 'slo', target: 'sla' },
      ],
    },
    row('budget', 'Error budget', [
      card('eb', 'The budget', 'service', ['Budget = 1 − SLO', '99.9% → 43.2 min per 30 days', '99.95% → 21.6 min · 99.99% → 4.3 min']),
      card('burn', 'Burn rate', 'warn', ['How fast the budget is consumed', '14.4× for 1 h = 2% of the month gone → page', 'Spent? freeze risky launches']),
    ]),
    row('people', 'When it breaks', [
      card('inc', 'Incident management', 'network', ['Roles: commander, ops, comms', 'Severity levels set the response', 'Mitigate first, diagnose later']),
      card('pm', 'Postmortems', 'external', ['Blameless: fix systems, not people', 'Timeline, causes, contributing factors', 'Actions with owners and dates']),
    ]),
  ],
  edges: [],
}
