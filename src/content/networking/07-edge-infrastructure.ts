import type { Section } from '../types'

export const edgeInfrastructure: Section = {
  id: 'edge-infrastructure',
  title: 'Edge infrastructure',
  scene: 'sd-edge',
  focus: 'trace',
  slide: `## Edge infrastructure

*Case study: trace one request from browser to database.*

### Model
- **Reverse proxy** and **API gateway** (auth, quotas, routing) sit in front of your code
- **CDN** + **edge caching**: answer near the user; measure the **hit ratio**
- **Rate limiting** (token bucket) · **service discovery** · **traffic management** (canary, weights)
- **Reverse proxy**: TLS, compression, hides topology · **CDN**: copies near users, the metric is hit ratio

### Worked example & failure
- 95% hit at 20 ms, misses 150 ms → mean **26.5 ms**; origin load 58K → **2.9K** req/s
- Cookie in the cache key → hit ratio 0; stale registry → traffic to dead instances

### Your turn
- 50K req/s: origin load at 90% vs 99% hit?
- Design: mark each cache, timeout and failure point on the trace`,
  narration:
    "This section is the case study for the chapter: follow one request all the way from a user's browser to the database, and see what each hop can do for it. The browser already helps, caching responses and keeping connections open. First it needs an address, and DNS answers with the nearest edge location. The request lands on a CDN, a content delivery network, which is a worldwide set of caches. If the edge has the response, it answers from a few milliseconds away and the request ends there. That's edge caching, and the number to watch is the hit ratio. Take a ninety-five percent hit ratio, with twenty milliseconds from the edge and a hundred and fifty from the origin. The average is point nine five times twenty plus point oh five times a hundred and fifty, about twenty-six and a half milliseconds, and the origin sees five percent of fifty-eight thousand requests a second, about twenty-nine hundred. On a miss, the request goes to the origin, where a load balancer terminates TLS and spreads it. Next, the API gateway: a reverse proxy that understands APIs. A plain reverse proxy sits in front of your servers so clients never talk to them directly, handling TLS, compression and buffering and hiding your topology. The gateway adds authentication, quotas, routing and request shaping. Then the app service, and the cache and database behind it, as in chapter one. Three more control functions run along the path. Rate limiting protects you from overload and abuse. The classic token bucket refills at a fixed rate with a limit on burst size, and when the bucket is empty you return four-two-nine with a Retry-After header. Service discovery answers where the live instances are: instances register and send heartbeats to a registry, stale ones expire, and callers look instances up either through the client or through a server-side balancer. Traffic management shifts load deliberately: weighted routing sends one percent of traffic to a new version, then ten, then everything, which is a canary release, and the same machinery drains a region. These can fail too. If the cache key includes a cookie that varies per user, the hit ratio drops to nearly zero. A gateway is a single choke point and must itself be redundant. And a registry that is slow to expire dead instances sends traffic to servers that no longer exist. Your turn. At fifty thousand requests a second, a ninety percent hit ratio leaves five thousand on the origin, and ninety-nine percent leaves five hundred, ten times less, so the last few points of hit ratio matter most. The design problem: copy the trace onto paper, and mark every cache, every timeout, and every point where something can fail, with what the user sees when it does. That completes chapter two. Next, how data is stored.",
}
