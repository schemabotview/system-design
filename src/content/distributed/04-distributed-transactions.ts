import type { Section } from '../types'

export const distributedTransactions: Section = {
  id: 'distributed-transactions',
  title: 'Distributed transactions',
  scene: 'sd-transactions',
  focus: 'saga',
  slide: `## Distributed transactions

*One business action across services, without a shared database.*

### Model
- **Local** transaction: one database, ACID free. **Distributed**: build atomicity from messages
- **2PC**: prepare (vote) → commit; atomic, but **blocks** if the coordinator dies
- **Saga**: local steps + **compensating** transactions; **outbox** publishes reliably

### Worked example & failure
- 2PC needs all participants up: 3 × 99.9% → **99.7%**; locks held while blocked
- Saga fails at ship → run refund, then release stock; a compensation can fail too

### Your turn
- Trip booking: flight, hotel, car — compensations, and if one fails?
- Design: place-order flow; outbox schema`,
  narration:
    "In chapter three we saw that a single database gives you ACID transactions for free. But a real business action, placing an order, touches several services, each with its own database: inventory, payments, shipping. There is no shared log and no shared lock. How do you get all or nothing? The classic answer is two-phase commit. A coordinator asks every participant to prepare: each makes its change durable but not visible, and votes yes or no. If everyone votes yes, the coordinator tells them all to commit, and if anyone votes no, it tells them all to abort. It gives real atomicity, but it has a famous flaw. If the coordinator crashes after participants have voted yes, they're stuck: they can neither commit nor abort without it, and they hold their locks until it recovers. Two-phase commit is blocking. It also needs every participant available, so three services at ninety-nine point nine percent each give about ninety-nine point seven overall, the series rule from chapter one. The alternative, used across service boundaries, is the saga. A saga breaks the action into a sequence of local transactions, each committing immediately, and for each step defines a compensating transaction that semantically undoes it. Reserve stock, charge the card, ship the order. If shipping fails, run the undos in reverse: refund the card, release the stock. A saga doesn't give isolation, since between steps other users can see partial state, so the system is eventually consistent, and you must design for that. A compensation can fail too, so compensations must be retried idempotently until they succeed, with a human alert as the last resort. Both patterns hit a practical trap: the dual write. A service updates its database and then publishes an event, and if it crashes between the two, the database says the order exists but nobody was ever told. The transactional outbox fixes this. The service writes the business row and an event row to an outbox table in one local transaction. A separate relay then reads the outbox and publishes, retrying until acknowledged, so an event is published if and only if the change committed, with at-least-once delivery, which consumers handle with idempotency. Your turn: for trip booking, the steps are book flight, book hotel, book car, with compensations cancel car, cancel hotel, cancel flight. If a compensation fails, retry it idempotently, and escalate to a person if it keeps failing. And the design problem: design the place-order flow, decide between saga and two-phase commit, and sketch the outbox table's columns: an id, the aggregate id, an event type, a payload, and a published flag.",
}
