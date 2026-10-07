import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.1 — the one situation that makes everything hard: the caller gets silence. The picture is a
// request whose response never arrives; the cards beneath are the six reasons that silence is
// unreadable, as the plan lists them.
export const sdWhyHard: Scene = {
  id: 'sd-why-hard',
  padding: 0.17,
  flow: 'TB',
  nodes: [
    {
      id: 'view',
      label: 'The caller’s view: a timeout',
      pattern: 'network',
      icon: 'network',
      flow: 'TB',
      children: [
        { id: 'client', label: 'Caller', pattern: 'user', icon: 'user', sub: 'waited 300 ms, heard nothing' },
        { id: 'server', label: 'Callee', pattern: 'service', icon: 'server', sub: 'up? slow? crashed? done?' },
      ],
      edges: [{ source: 'client', target: 'server', dashed: true, label: 'request sent · no response ever arrives' }],
    },
    card('silence', 'Silence has four explanations', 'warn', [
      '1  The request never arrived',
      '2  The server crashed before doing the work',
      '3  The server did the work; the response was lost',
      '4  The server is only slow — it will finish',
    ]),
    row('a', 'Why it is hard', [
      card('partial', 'Partial failure', 'service', ['Some parts fail while others run', 'At scale it is the normal state', 'No single “up” or “down”']),
      card('net', 'Network failure', 'network', ['Messages are lost, delayed, duplicated, reordered', 'A partition splits live nodes']),
      card('unrel', 'Unreliable communication', 'storage', ['No guaranteed delivery or order', 'Retrying creates duplicates']),
    ]),
    row('b', 'And three more', [
      card('clock', 'Clock uncertainty', 'external', ['Clocks differ by ms to seconds', 'Timestamps can order events wrongly']),
      card('conc', 'Concurrent execution', 'warn', ['Many nodes act at once', 'No global “now” to order them']),
      card('fd', 'Failure detection', 'service', ['Slow looks the same as dead', 'Every detector can be wrong']),
    ]),
  ],
  edges: [],
}
