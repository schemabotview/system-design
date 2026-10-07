import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §4.5 — a five-node Raft cluster at the moment that matters: one leader replicating to a majority
// while a partition leaves two nodes outvoted. The cards define the problem and the machinery.
export const sdConsensus: Scene = {
  id: 'sd-consensus',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'cluster',
      label: 'Five nodes, one partition: 3 | 2',
      pattern: 'network',
      icon: 'network',
      flow: 'LR',
      children: [
        {
          id: 'majority',
          label: 'Majority side · can commit',
          pattern: 'service',
          flow: 'TB',
          children: [
            { id: 'n1', label: 'Node 1 · leader', pattern: 'service', icon: 'server', sub: 'term 7' },
            { id: 'n2', label: 'Node 2', pattern: 'storage', icon: 'database', sub: 'follower · acked' },
            { id: 'n3', label: 'Node 3', pattern: 'storage', icon: 'database', sub: 'follower · acked' },
          ],
          edges: [
            { source: 'n1', target: 'n2', label: 'AppendEntries' },
            { source: 'n1', target: 'n3' },
          ],
        },
        {
          id: 'minority',
          label: 'Minority side · cannot commit',
          pattern: 'warn',
          flow: 'TB',
          children: [
            { id: 'n4', label: 'Node 4', pattern: 'warn', icon: 'database', sub: 'times out, asks for votes' },
            { id: 'n5', label: 'Node 5', pattern: 'warn', icon: 'database', sub: '2 of 5 is not a majority' },
          ],
          edges: [],
        },
      ],
      edges: [{ source: 'n1', target: 'n4', dashed: true, label: 'partition' }],
    },
    row('ideas', 'The problem and its tools', [
      card('prob', 'The consensus problem', 'service', ['Nodes must agree on one value (or log)', 'Agreement · validity · termination', 'Despite crashes and delays']),
      card('quorum', 'Quorums', 'network', ['Majority = ⌊N/2⌋ + 1', 'Tolerates f = (N−1)/2 crashes', 'N=3 → 1 · N=5 → 2 · N=7 → 3', 'Any two majorities overlap']),
    ]),
    row('algos', 'How', [
      card('elect', 'Leader election', 'external', ['Follower times out (150–300 ms, random)', 'Becomes candidate in a new term', 'A majority of votes wins']),
      card('raft', 'Raft', 'storage', ['Leader appends to its log, replicates', 'Committed once a majority stored it', 'Terms fence off old leaders']),
      card('paxos', 'Paxos, conceptually', 'warn', ['Proposers and acceptors', 'Prepare/promise, then accept', 'Same majority idea as Raft']),
    ]),
    card('split', 'Split brain, prevented', 'warn', ['Two leaders need two disjoint majorities — impossible', 'The minority side can read stale data but never commit']),
  ],
  edges: [],
}
