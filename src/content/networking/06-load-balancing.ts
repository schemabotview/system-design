import type { Section } from '../types'

export const loadBalancing: Section = {
  id: 'load-balancing',
  title: 'Load balancing',
  scene: 'sd-lb',
  focus: 'path',
  slide: `## Load balancing

*Spread requests, notice failures, and move traffic without remapping everything.*

### Model
- **L4**: routes on IP + port, very fast. **L7**: reads HTTP, routes on path/host, terminates TLS
- **Round robin · weighted · least connections**; **consistent hashing** for key affinity
- **Health checks** remove bad backends; **global** balancing picks a region

### Worked example & failure
- Mod-N hashing, 5 → 6 servers: **~83%** of keys move; consistent hashing: **~17%**
- Shallow health check passes a broken app; a deep one can eject every backend at once

### Your turn
- Backends with 10, 40, 25 open connections: least-connections picks?
- Design: balancing for WebSocket chat vs an image CDN`,
  narration:
    "Once you run more than one copy of a service, something has to decide which copy gets each request. That's the load balancer, and it also hides failures from clients. In the scene, many clients talk to one balancer, which picks a backend from the pool. First question: how much does it look at? A layer-four balancer sees only IP addresses, ports, and TCP. It's very fast, works for any protocol, and can pass encrypted traffic straight through. A layer-seven balancer understands HTTP, so it can route on host or path, send slash API to one pool and slash static to another, terminate TLS, and retry a failed request, for more CPU per request. Second: how does it choose? Round robin takes turns, and it's fine when backends and requests are alike. Weighted round robin adjusts for unequal machines: an eight-core server and a four-core server get a two-to-one weight. Least connections sends each request to the backend with the fewest open ones, which copes with uneven request cost. Consistent hashing sends the same key to the same backend, which is what you want when backends hold cache or state for that key. Why consistent hashing instead of hash modulo N? With five servers and a modulo hash, adding a sixth changes the answer for about five-sixths of all keys, eighty-three percent, so nearly every cached item is suddenly on the wrong server. With consistent hashing, only about one in six keys moves. That's the whole point. Third: staying correct. Health checks probe each backend, say every five seconds, remove one after two failures, and bring it back after two successes. But a check that only tests whether the process is alive will pass a service whose database connection is broken, while a check that tests everything can mark every backend unhealthy at once when a shared dependency blips and take the whole service down. And the balancer itself must not be a single point of failure, so you run it as a pair or a managed service. Finally global balancing: geo-DNS or anycast sends users to the nearest region, and fails a whole region over, though DNS caching limits how fast. Your turn. With backends holding ten, forty and twenty-five open connections, least connections picks the first. For the design problem, compare balancing for a WebSocket chat service, where connections last hours, with an image CDN where requests are short and cacheable. Which algorithm and layer do you choose for each, and why?",
}
