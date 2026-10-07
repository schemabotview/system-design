import type { Section } from '../types'

export const observability: Section = {
  id: 'observability',
  title: 'Observability',
  scene: 'sd-observability',
  focus: 'trace',
  slide: `## Observability

*Be able to ask new questions of a running system without shipping new code.*

### Model
- **Logs** (events) · **metrics** (numbers over time; RED, USE) · **traces** (a request across services)
- **Correlation ID** joins them. **Telemetry**: OpenTelemetry, with sampling
- **Alert** on symptoms users feel; page only the actionable
- **Distributed tracing**: spans + a context header; sample ~1% of traces
- **Telemetry**: OpenTelemetry; watch metric cardinality

### Worked example & failure
- Waterfall: 412 ms total, **bank-api 290 ms** → the cause is found in seconds
- 10K req/s × 1 KB = **864 GB/day** of logs; a \`user_id\` metric label = **1M** series

### Your turn
- In the waterfall, where would you look first, and why?
- Design: alerts for checkout`,
  narration:
    "Observability is the ability to understand what a system is doing from the outside, well enough to answer questions you didn't anticipate. It rests on three kinds of signal, and the scene shows one slow request through all three. Logs are discrete events, best written as structured JSON, with a timestamp, a severity, the service, and the identifiers of the request. They carry rich detail, and they're expensive at volume: ten thousand requests a second at one kilobyte of logs each is ten megabytes a second, eight hundred and sixty-four gigabytes a day. Metrics are numbers over time: counters, gauges, histograms. They're cheap and aggregate well, and they're what dashboards and alerts use. Two checklists help you choose them. RED for services: request rate, error rate, duration. USE for resources: utilisation, saturation, errors. The danger is cardinality: a label such as user id on a metric creates a separate time series for each of a million users. Traces follow one request across services. Each service records a span, with its start and duration, and passes the trace context on in a header, so the spans assemble into the waterfall you see. Look at it: the whole request took four hundred and twelve milliseconds. Orders took three hundred and eighty, payments three hundred and ten, and inside that, the bank API took two hundred and ninety. Neither a log nor a metric alone could have located that so fast. The glue is the correlation ID: one identifier, here the trace ID, put on every log line and every outgoing call, so you can jump from a trace to the logs of the slow span, and from a customer's ticket to their request. Telemetry is the pipeline that collects all of it. OpenTelemetry provides a vendor-neutral way to produce all three, and you sample traces, keeping perhaps one percent, to control cost. Last, alerting. Alert on symptoms users feel, such as error rate and latency at the edge, rather than on every possible cause. Page a human only for something urgent and actionable, and route everything else to a ticket, because a pager that rings for noise gets ignored. Your turn: in the waterfall, look first at the bank API span, because it's the longest and sits inside the payments span, the longest child. And the design problem: write the alerts for checkout, with a symptom alert on error rate and latency, a threshold, a duration, and what the on-call person is told to do.",
}
