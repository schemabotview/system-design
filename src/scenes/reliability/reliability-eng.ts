import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.1 — failure domains as the geometry of reliability: the same fault is a nuisance at host level and
// an outage at region level, and redundancy only counts when replicas sit in DIFFERENT domains. The
// cards give the vocabulary the section defines.
export const sdReliabilityEng: Scene = {
  id: 'sd-reliability-eng',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'domains',
      label: 'Failure domains and their blast radius',
      pattern: 'group',
      icon: 'layers',
      flow: 'TB',
      children: [
        {
          id: 'small',
          label: 'Small blast radius',
          pattern: 'service',
          flow: 'LR',
          children: [
            { id: 'host', label: 'Host', badge: '1', sub: 'one machine: a fraction of one service' },
            { id: 'rack', label: 'Rack', badge: '2', sub: 'shared power + switch: dozens of hosts' },
          ],
          edges: [{ source: 'host', target: 'rack' }],
        },
        {
          id: 'large',
          label: 'Large blast radius',
          pattern: 'warn',
          flow: 'LR',
          children: [
            { id: 'az', label: 'Availability zone', badge: '3', sub: 'a data centre: a third of capacity' },
            { id: 'region', label: 'Region', badge: '4', sub: 'everyone, if you live in one' },
          ],
          edges: [{ source: 'az', target: 'region' }],
        },
      ],
      edges: [{ source: 'small', target: 'large', label: 'redundancy must span domains' }],
    },
    row('vocab', 'The vocabulary', [
      card('rel', 'Reliability vs availability', 'service', ['Availability: is it up?', 'Reliability: is it correct, over time?', 'Up but wrong = available, not reliable']),
      card('ft', 'Fault tolerance', 'network', ['A fault (a part misbehaves) must not become a failure (users hurt)', 'Needs detection + redundancy + failover']),
    ]),
    row('tools', 'The tools', [
      card('red', 'Redundancy', 'external', ['N+1, or active-active', 'Counts only across independent domains', 'Capped by shared parts (one LB, one DB)']),
      card('gd', 'Graceful degradation', 'storage', ['Lose a feature, keep the core', 'Serve stale cache, hide recommendations, go read-only']),
      card('br', 'Blast radius', 'warn', ['Limit how much one fault can break', 'Cells: split customers into N independent copies']),
    ]),
  ],
  edges: [],
}
