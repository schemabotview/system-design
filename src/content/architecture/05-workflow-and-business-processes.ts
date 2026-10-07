import type { Section } from '../types'

export const workflowAndBusinessProcesses: Section = {
  id: 'workflow-and-business-processes',
  title: 'Workflow and business processes',
  scene: 'sd-workflow',
  focus: 'ways',
  slide: `## Workflow and business processes

*Make a multi-step, multi-service process explicit, durable, and recoverable.*

### Model
- **Orchestration**: a conductor owns the sequence. **Choreography**: peers react to events
- **State machine**: explicit states, legal transitions, timeouts
- **Workflow engine** persists state and timers; **saga orchestration** adds compensations

### Worked example & failure
- Order: PLACED → STOCK_RESERVED → PAID → SHIPPED; payment fails → release stock; 15 min timeout → cancel
- Choreography across 6 services: the flow exists only in everyone's head

### Your turn
- Model a refund as a state machine
- Design: orchestrate or choreograph a 3-step vs a 12-step process?`,
  narration:
    "Many business processes span several services and take time: place an order, reserve stock, charge a card, ship, and handle every way that can go wrong. There are two ways to coordinate such a process, and the scene shows both. In orchestration, a conductor, an order workflow, owns the sequence. It tells inventory to reserve, waits, tells payments to charge, waits, tells shipping to ship, and handles failures itself. The whole process lives in one place, so it's easy to read, change and monitor. In choreography, there's no conductor: inventory reacts to an order-placed event and emits stock reserved, payments reacts to that and emits payment captured, and shipping reacts to that. It's very decoupled, and no service is a bottleneck. But the process exists only implicitly, spread across the services, so understanding it means reading every one of them, and cycles and missing steps are easy to introduce. A useful rule: choreograph short, simple flows, and orchestrate processes with more than a few steps, with branches, timeouts or compensations. Whichever style you use, model the process as an explicit state machine, as the code card shows. It lists the states, the events that cause legal transitions, and what happens on failure: if payment fails, cancel and release the stock, and if payment doesn't arrive within fifteen minutes, cancel. Any event that isn't a legal transition from the current state is an error rather than a silent corruption. Now durability. A process that lasts hours or days, waiting for a human approval or a payment, can't live in memory. A workflow engine, such as Temporal, AWS Step Functions or Camunda, persists the state, timers, retries and full history, so a crashed process resumes where it left off. These are long-running transactions, where every step must be idempotent and resumable. And saga orchestration, from chapter four, is exactly this: the orchestrator runs the steps and, on failure, runs the compensations. Your turn. Model a refund as states: requested, approved, refund issued, completed, with rejected and failed paths and a timeout for approval. And the design problem: for a three-step process and for a twelve-step process with branches and a human approval, decide between orchestration and choreography, and say how you'd make the twelve-step flow observable.",
}
