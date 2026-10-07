import type { Section } from '../types'

export const monolithsAndMicroservices: Section = {
  id: 'monoliths-and-microservices',
  title: 'Monoliths and microservices',
  scene: 'sd-monolith-micro',
  focus: 'spectrum',
  slide: `## Monoliths and microservices

*Distribution is a cost you pay for independence — pay it only when you need to.*

### Model
- **Modular monolith**: one deployable, enforced boundaries, in-process calls
- **Microservices**: independent deploy and scale, own data, network calls
- **Distributed monolith**: must deploy together, shared DB — all the cost, no benefit
- **Migration**: modularise first → extract the cleanest module; never a big-bang rewrite

### Worked example & failure
- In-process ~100 ns vs network ~1 ms: **10,000×**; 10 sequential calls at 99.9% → **99.0%**
- Per service: pipeline, dashboards, alerts, on-call
- Each service adds a pipeline, dashboards, alerts, on-call and tracing

### Your turn
- A 6-engineer startup: how many services?
- Design: choose for 6 people vs an 80-person org`,
  narration:
    "The monolith versus microservices debate is usually framed as a choice of fashion. It's really a question of cost and benefit, and the scene shows the same modules deployed three ways. A monolith is one deployable unit. A well-structured one is a modular monolith: still one deployable, but with enforced boundaries between modules, so each owns its data and exposes an interface, and the calls between them are in-process. That gives you one transaction, one deploy, and one place to debug, and it's the right answer for most teams most of the time. Microservices split those modules into separately deployed services, each owning its data. The benefits are real: teams deploy independently, services scale independently, and a failure can be contained. But every call that used to be a function call is now a network call. In-process, a call takes around a hundred nanoseconds. Over a network, around a millisecond: ten thousand times slower. Ten sequential calls add roughly ten milliseconds, and since each service at ninety-nine point nine percent availability is in series, ten of them give about ninety-nine percent, the series rule from chapter one. Beyond latency and availability, each service needs its own pipeline, dashboards, alerts and on-call rotation, plus tracing, discovery and versioning. That's the operational complexity you take on. The worst outcome is the distributed monolith: services that must be deployed together, share a database, and call each other in chatty synchronous chains. You pay for the network and get none of the independence. Boundaries should follow bounded contexts: things that change together stay together, and each service owns its data and exposes a contract. How do you get there from where you are? With migration strategies that are incremental. First make the monolith modular. Then extract the module with the cleanest boundary and the least data entanglement. Never attempt a big-bang rewrite, which stops delivering value and often never finishes. Your turn. A six-engineer startup should have one modular monolith: zero services beyond maybe a separate worker. Reasons to split later are team count, when teams keep tripping over each other's deploys, differing scaling needs, or a need for independent release cadence. And the design problem: choose an architecture for a six-person team and for an eighty-person organisation, and write down the signals that would make you change your mind.",
}
