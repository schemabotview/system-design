import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.3 — the three signals on one request: a trace waterfall (where the time went) is the clearest
// picture of why the three exist, since logs and metrics could not have localised the slow span.
export const sdObservability: Scene = {
  id: 'sd-observability',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'trace',
      kind: 'code',
      filename: 'trace_7f3a.txt',
      label: [
        'trace_id=7f3a…  GET /checkout            total 412 ms',
        'gateway        ██                          12 ms',
        'orders         ████████████████████       380 ms',
        '  inventory    ███                          40 ms',
        '  payments     ████████████████           310 ms   ← the slow span',
        '    bank-api   ███████████████            290 ms   ← the cause',
        '',
        'log:    {"ts":"…","trace_id":"7f3a…","svc":"payments","level":"WARN","msg":"bank slow"}',
        'metric: http_request_duration_seconds{svc="payments"}  p99 = 0.31',
      ].join('\n'),
    },
    row('signals', 'Three signals', [
      card('logs', 'Logs', 'service', ['Discrete events, structured (JSON)', 'Rich detail, expensive at volume']),
      card('metrics', 'Metrics', 'network', ['Numbers over time; cheap, aggregable', 'RED: rate · errors · duration', 'USE: utilisation · saturation · errors']),
      card('traces', 'Traces', 'external', ['One request across services', 'Spans with timings', 'Context passed in a header']),
    ]),
    row('practice', 'Making them useful', [
      card('cid', 'Correlation IDs', 'storage', ['One ID on every log line and call', 'Join logs ↔ traces ↔ tickets']),
      card('alert', 'Alerting', 'warn', ['Alert on symptoms users feel', 'Page only for the actionable', 'Everything else is a ticket']),
      card('otel', 'Telemetry pipeline', 'service', ['OpenTelemetry: one vendor-neutral SDK', 'Sample traces; watch metric cardinality']),
    ]),
  ],
  edges: [],
}
