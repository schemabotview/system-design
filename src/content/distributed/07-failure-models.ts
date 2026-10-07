import type { Section } from '../types'

export const failureModels: Section = {
  id: 'failure-models',
  title: 'Failure models',
  scene: 'sd-failure',
  focus: 'models',
  slide: `## Failure models

*State what can go wrong, then detect and recover from exactly that.*

### Model
- **Crash** → **crash-recovery** → **omission / partition** → **Byzantine** (lying nodes)
- **Heartbeats**: detection ≈ interval × misses. **Detectors** can't tell slow from dead
- **Recovery**: replay log, fail over, idempotent retry, rebuild from peers

### Worked example & failure
- 1 s beat, 3 misses → **~3–4 s** to notice; a 5 s GC pause is falsely declared dead
- Byzantine needs **3f + 1** nodes; false suspicion → split brain

### Your turn
- 500 ms beats, suspect after 4 misses: detection time? A 3 s pause?
- Design: a detector for a leader with a 10 s RTO`,
  narration:
    "We close the chapter by naming what can go wrong, because you can't design for failures you haven't defined. A failure model is an assumption about how nodes and links misbehave, and the weaker the assumption, the harder and costlier the protocol. The scene shows four, from mildest to worst. In the crash model a node simply stops and never returns. In crash-recovery, a node stops, restarts, and loses its memory but keeps what it wrote to disk, which is the realistic case for servers. In the omission or partition model, nodes keep running but messages are dropped or delayed, and groups of healthy nodes can't talk. And the Byzantine model: a node can behave arbitrarily, lie, send different answers to different peers, or act maliciously. Byzantine fault tolerance needs at least three f plus one nodes to survive f traitors, and it's used where participants may be malicious, such as blockchains and aircraft control, while most data-centre systems assume it away and trust their own machines. Now, how do we notice a failure? The standard tool is the heartbeat: each node periodically announces it's alive, say every second, and a monitor suspects the node after k missed beats. Detection takes about the interval times the number of misses: one second and three misses is three to four seconds. But the deep problem is that a failure detector can't distinguish a dead node from a slow one, or a partitioned one. So the timeout is a trade-off. Short timeouts detect quickly but raise false alarms: a five-second garbage-collection pause makes a healthy node look dead. Long timeouts are accurate but slow your failover. Adaptive detectors, like phi-accrual, learn the normal variation and adjust. A false alarm is dangerous: if the old leader is declared dead but is merely paused, you may have two leaders, split brain from the last chapter, which is why we use consensus and fencing. Once a failure's detected, recovery strategies depend on the model. Restart the node and replay its write-ahead log. Fail over to a replica. Retry the operation, idempotently. Or rebuild a lost node from its peers and repair differences. Your turn. With heartbeats every five hundred milliseconds and suspicion after four misses, detection takes two to two and a half seconds, so a three-second pause triggers a false alarm. The design problem: configure a detector for a database leader with a ten-second recovery-time objective. Budget detection, election, and client retry within ten seconds, with margin. That ends chapter four, and with it a shift in thinking: from here we stop reasoning mainly about machines and begin reasoning about distributed state.",
}
