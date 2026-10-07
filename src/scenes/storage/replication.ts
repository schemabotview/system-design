import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §3.5 — leader–follower drawn as the system it is (writes to the leader, the log flowing down,
// reads fanned out to followers), then the other two topologies and the three things that go wrong:
// lag, quorum arithmetic and failover.
export const sdReplication: Scene = {
  id: 'sd-replication',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'topo',
      label: 'Leader–follower replication',
      pattern: 'network',
      icon: 'database',
      flow: 'LR',
      children: [
        { id: 'app', label: 'Application', pattern: 'service', icon: 'server', sub: 'writes → leader · reads → followers' },
        { id: 'leader', label: 'Leader', pattern: 'storage', icon: 'database', sub: 'accepts every write' },
        {
          id: 'followers',
          label: 'Read replicas',
          pattern: 'storage',
          flow: 'TB',
          children: [
            { id: 'f1', label: 'Follower 1', pattern: 'storage', icon: 'database', sub: 'lag ≈ 50 ms' },
            { id: 'f2', label: 'Follower 2', pattern: 'storage', icon: 'database', sub: 'lag ≈ 120 ms' },
          ],
          edges: [],
        },
      ],
      edges: [
        { source: 'app', target: 'leader', label: 'write' },
        { source: 'leader', target: 'f1', label: 'replication log' },
        { source: 'leader', target: 'f2' },
      ],
    },
    row('others', 'Other topologies', [
      card('ml', 'Multi-leader', 'external', ['A leader per region: local writes', 'Conflicts when two regions edit one row', 'Resolve: last-write-wins, merge, or app logic']),
      card('ll', 'Leaderless', 'warn', ['Write to W of N, read from R of N', 'W + R > N ⇒ the sets overlap', 'N=3, W=2, R=2 is the classic']),
    ]),
    row('risks', 'What goes wrong', [
      card('lag', 'Replication lag', 'service', ['Async followers are behind', 'You post, refresh, and it’s gone', 'Fix: read your own writes from the leader']),
      card('rr', 'Read replicas', 'network', ['Scale reads, not writes', '58K reads/s ÷ 15K per node = 4 replicas']),
      card('fo', 'Failover', 'warn', ['Detect → promote → repoint', 'Async: the newest writes can be lost', 'Two leaders at once = split brain']),
    ]),
  ],
  edges: [],
}
