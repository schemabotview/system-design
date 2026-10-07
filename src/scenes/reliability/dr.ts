import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.6 — RPO and RTO as one picture on a timeline (data you can lose before; time to recover after),
// the four DR tiers that trade money for those two numbers, and what actually fails in practice.
export const sdDr: Scene = {
  id: 'sd-dr',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'code',
      filename: 'rpo_rto.txt',
      label: [
        '        last good copy                 disaster                   service restored',
        '  ──────────●──────────────────────────✗──────────────────────────────●────────►  time',
        '            │◄────────── RPO ──────────►│◄─────────── RTO ───────────►│',
        '            data you can afford to lose   detect → decide → fail over → verify',
      ].join('\n'),
    },
    row('tiers', 'DR tiers: money buys smaller RPO and RTO', [
      card('bk', 'Backup and restore', 'storage', ['RTO hours · RPO hours', 'Cheapest; slowest']),
      card('pl', 'Pilot light', 'service', ['Core data live; compute off', 'RTO tens of minutes']),
      card('ws', 'Warm standby', 'network', ['Scaled-down copy running', 'RTO minutes · RPO seconds']),
      card('mr', 'Active-active', 'external', ['RTO ≈ 0 · RPO ≈ 0', '≈ 2× the cost']),
    ]),
    row('practice', 'What makes it real', [
      card('back', 'Backups', 'service', ['3-2-1: 3 copies, 2 media, 1 offsite', 'Immutable; point-in-time recovery from the log']),
      card('rest', 'Restore testing', 'warn', ['An untested backup is a hope', 'Drill restores; measure the real RTO']),
      card('fo', 'Regional failover', 'network', ['A runbook: detect, promote, repoint DNS, verify', 'Practise failback too']),
    ]),
    card('scen', 'Disaster scenarios', 'warn', ['Region outage · bad deploy · data corruption (replication copies it!)', 'Accidental delete · ransomware · compromised credentials']),
  ],
  edges: [],
}
