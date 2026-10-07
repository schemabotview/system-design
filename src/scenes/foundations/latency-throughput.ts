import type { Scene, PlotPoint } from '@graphlearning/flow'

// §1.5 — a real latency distribution: log-normal, median 100 ms, sigma 0.6. The shape is the point:
// a long right tail drags the mean (≈120 ms) above the median and puts p99 four times further out.
// The curve is computed here, in the scene file, because the engine deliberately has no expression
// parser (see PlotSeries). y is "% of requests per ms".
const MU = Math.log(100)
const SIGMA = 0.6
const pdf = (x: number) =>
  (100 * Math.exp(-((Math.log(x) - MU) ** 2) / (2 * SIGMA * SIGMA))) / (x * SIGMA * Math.sqrt(2 * Math.PI))
const quantile = (z: number) => Math.exp(MU + SIGMA * z)

const curve: PlotPoint[] = []
for (let x = 10; x <= 600; x += 5) curve.push([x, pdf(x)])

const p50 = quantile(0)
const p95 = quantile(1.645)
const p99 = quantile(2.326)
const mean = Math.exp(MU + (SIGMA * SIGMA) / 2)

export const sdLatency: Scene = {
  id: 'sd-latency',
  padding: 0.14,
  flow: 'LR',
  nodes: [
    {
      id: 'dist',
      kind: 'plot',
      label: 'One endpoint’s latency, 1M requests',
      plot: {
        x: { min: 0, max: 600, step: 100, label: 'latency (ms)' },
        y: { min: 0, max: 1, step: 0.25, label: '% of requests per ms' },
        axes: 'corner',
        series: [
          { kind: 'area', points: curve, color: 'network' },
          // labelAt is an ABSOLUTE data position (not an offset): each label starts just right of its line's top.
          { kind: 'segment', from: [p50, 0], to: [p50, 0.92], color: 'service', label: 'p50 100 ms', labelAt: [p50 + 6, 0.92] },
          { kind: 'segment', from: [mean, 0], to: [mean, 0.78], color: 'external', dashed: true, label: 'mean 120 ms', labelAt: [mean + 6, 0.78] },
          { kind: 'segment', from: [p95, 0], to: [p95, 0.3], color: 'storage', label: 'p95 268 ms', labelAt: [p95 + 6, 0.3] },
          { kind: 'segment', from: [p99, 0], to: [p99, 0.2], color: 'warn', label: 'p99 403 ms', labelAt: [p99 + 6, 0.2] },
        ],
      },
    },
    {
      id: 'little',
      kind: 'list',
      label: 'Little’s Law · L = λ × W',
      pattern: 'service',
      framed: true,
      items: [
        'L  requests in flight',
        'λ  arrival rate (req/s)',
        'W  time each spends inside (s)',
        '1,000 req/s × 0.2 s = 200 in flight',
        '50 workers ÷ 0.2 s = 250 req/s ceiling',
      ],
    },
  ],
  edges: [],
}
