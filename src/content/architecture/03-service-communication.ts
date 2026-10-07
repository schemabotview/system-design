import type { Section } from '../types'

export const serviceCommunication: Section = {
  id: 'service-communication',
  title: 'Service communication',
  scene: 'sd-svc-comm',
  focus: 'topology',
  slide: `## Service communication

*Call when you need the answer; publish when you are announcing a fact.*

### Model
- **Sync** for answers needed now; **events** for facts others react to
- **Discovery**: registry of live instances. **Gateway**: front door. **Mesh**: sidecar for mTLS, retries, traffic split
- **Contracts**: schemas + consumer-driven tests; additive change only
- A **mesh** costs a hop and operational weight; a **gateway** can run a BFF per client type

### Worked example & failure
- 5 sync services at 99.9% → **99.5%**; make 3 of them events → **99.8%**
- Renaming a field breaks consumers; a mesh adds a hop and weight

### Your turn
- Which changes are backward-compatible: add field · remove field · rename · change type?
- Design: sync or async for each step of place-order`,
  narration:
    "Once you have several services, how they talk to each other decides how fragile the whole system is. The scene follows a placed order. The request comes in through an API gateway, reaches the orders service, and the orders service needs two different things. It needs to know right now whether stock is available, because the answer determines what happens next, so it makes a synchronous call to inventory, with a short deadline. And it needs to announce that the order was placed, a fact that notifications and shipping will react to in their own time, so it publishes an event on a bus. That's the rule: if you need the answer to continue, call; if you're announcing something that happened, publish an event. The two have different failure behaviour. A chain of synchronous calls multiplies latency and failure: five services at ninety-nine point nine percent availability in a chain give about ninety-nine point five. If three of those become events, the user's path only depends on two, about ninety-nine point eight. Now the supporting machinery. Service discovery is a registry of live instances, so callers find healthy ones without hard-coded addresses, done by the client or by a server-side balancer. The API gateway is the single front door for external clients, handling authentication, routing and aggregation, often with a separate backend-for-frontend per client type. A service mesh puts a sidecar proxy beside every service instance to handle mutual TLS, retries, timeouts, traffic splitting and telemetry without application code, at the price of an extra hop and operational weight. And the part that most often gets neglected: contract management. A service's API is a contract with its consumers. Describe it with OpenAPI or protobuf, run consumer-driven contract tests in your build, so a provider can't break a consumer unnoticed, and make changes additively, deprecating rather than breaking. Your turn: which changes are backward-compatible? Adding an optional field, yes. Removing a field, no. Renaming a field, no. Changing a type, no. And the design problem: for a place-order flow, decide for each step, check stock, charge payment, send confirmation, update analytics, whether it's synchronous or asynchronous, and justify each choice by whether the order flow needs the answer to continue.",
}
