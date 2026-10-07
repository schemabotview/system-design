import type { Section } from '../types'

export const dataProcessingArchitectures: Section = {
  id: 'data-processing-architectures',
  title: 'Data processing architectures',
  scene: 'sd-processing',
  focus: 'pipe',
  slide: `## Data processing architectures

*Case study: a scalable event-processing pipeline.*

### Model
- **Batch** (bounded, high throughput) vs **stream** (unbounded, low latency, windows, late data)
- **Lambda**: batch + speed layer. **Kappa**: one stream path; replay the log
- **Event sourcing**: events are the truth. **CQRS**: separate write/read models. **Materialized views**
- **Lambda** = two code paths that drift · **Kappa** = replay the log · late events need **watermarks**

### Worked example & failure
- 100K events/s × 1 KB = **8.6 TB/day**; 7 days = 60 TB; replay at 2 GB/s ≈ **8.4 h**
- Two code paths drift; a view lags its log; late events miscounted
- Late event: drop, allow lateness, or route to a side output

### Your turn
- An event arrives 90 s late for a 1-min window: options?
- Design: ingest, partition, process, serve, replay`,
  narration:
    "The last section of the chapter assembles these building blocks into data-processing architectures, and ends with the chapter's case study: an event-processing pipeline that scales. Start with two modes. Batch processing works on bounded data, a day's files, say, and is very efficient, but its latency is minutes or hours. Stream processing works on unbounded data as it arrives, so latency is seconds or less, and it brings its own problems: you group events into windows, and events arrive late, so the processor tracks a watermark, an estimate of how far event time has progressed, and decides how long to wait for stragglers. Lambda architecture combines them: a batch layer computes accurate results over all history, a speed layer provides approximate real-time results, and a query merges them. It works, but it means writing and maintaining the same logic twice, and the two paths drift apart. Kappa architecture simplifies: keep one stream-processing path, and when you need to reprocess, replay the retained log through a new version of the job. Now the idea underneath. In event sourcing, you store the sequence of events as the source of truth, rather than the current state. State is derived by folding over the events, which gives you a full audit trail, the ability to rebuild state at any time, and the ability to fix a bug and replay. CQRS, command query responsibility segregation, goes with it: the write side accepts commands and appends events, and separate read models are built from those events, each shaped for its queries, denormalised, and eventually consistent. A materialized view is exactly such a read model: a query result precomputed and kept current, trading work at write time for fast reads. The pipeline in the scene puts it together. Producers publish a hundred thousand events a second into a partitioned, durable log. A stream processor consumes it, computing windows and joins, and maintains a materialized view that serves dashboards, while the same log also feeds a warehouse for batch analytics. Size it: a hundred thousand events a second at a kilobyte each is a hundred megabytes a second, eight point six terabytes a day, and seven days of retention is about sixty terabytes. Replaying all of that at two gigabytes a second takes about eight and a half hours, which is the real cost of a mistake. Your turn. An event that arrives ninety seconds late for a one-minute window can be dropped, can be accepted within an allowed lateness and the window result updated, or can go to a side output for correction. The design problem is the whole case study: decide how you'd ingest, partition by key, process, serve, and replay, and say what happens when a consumer falls behind. That completes chapter five. Next, putting these components together into whole architectures.",
}
