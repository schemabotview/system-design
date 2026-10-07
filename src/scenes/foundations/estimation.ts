import type { Scene } from '@graphlearning/flow'

// §1.4 — the estimate as an executable-looking worksheet (a code card, so every line is a number
// the narration can point at), beside the handful of constants worth knowing cold.
export const sdEstimation: Scene = {
  id: 'sd-estimation',
  padding: 0.14,
  flow: 'LR',
  nodes: [
    {
      id: 'sheet',
      kind: 'code',
      filename: 'estimate.py',
      label: [
        '# 50M daily users, 20 reads each, 1 write per 10 reads',
        'dau        = 50_000_000',
        'reads_day  = dau * 20            # 1_000_000_000',
        'read_qps   = reads_day / 86_400  # ~11_600 /s average',
        'peak_qps   = read_qps * 5        # ~58_000 /s peak',
        'write_qps  = read_qps / 10       # ~1_160 /s',
        '',
        '# storage: 100M writes/day x 2 KB, kept 1 year, 3 replicas',
        'per_day    = 100_000_000 * 2_000     # 200 GB',
        'per_year   = per_day * 365           # 73 TB',
        'on_disk    = per_year * 3            # 219 TB',
        '',
        '# bandwidth: 5 KB per read at peak',
        'egress     = peak_qps * 5_000        # ~290 MB/s',
        'egress_bps = egress * 8              # ~2.3 Gbit/s',
        '',
        '# can one DB (~15_000 reads/s) take it?',
        'need_nodes = peak_qps / 15_000       # 3.9 -> cache it',
        'db_reads   = peak_qps * (1 - 0.80)   # ~11_600 /s at 80% hits',
      ].join('\n'),
    },
    {
      id: 'consts',
      kind: 'list',
      label: 'Constants worth knowing cold',
      pattern: 'network',
      framed: true,
      items: [
        '1 day = 86,400 s ≈ 10⁵ s',
        '1 month ≈ 2.6 million s',
        '1 KB = 10³ B · 1 GB = 10⁹ B',
        '1 Gbit/s ≈ 125 MB/s',
        'peak ≈ 3–10× the average',
        'bits ≠ bytes: ÷ 8',
      ],
    },
  ],
  edges: [],
}
