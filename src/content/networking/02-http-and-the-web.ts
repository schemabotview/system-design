import type { Section } from '../types'

export const httpAndTheWeb: Section = {
  id: 'http-and-the-web',
  title: 'HTTP and the web',
  scene: 'sd-http',
  focus: 'exchange',
  slide: `## HTTP and the web

*Read an exchange, pick the right method and status, choose a version.*

### Model
- **Request → response**; the server never calls the client first
- **Methods**: GET safe · POST creates · PUT/DELETE idempotent · PATCH partial
- **Status**: 2xx ok · 3xx redirect · 4xx client · 5xx server. **Headers** carry caching, auth, type
- **1.1** persistent, one request at a time → **2** multiplexed → **3** QUIC over UDP

### Worked example & failure
- 60 assets, RTT 50 ms: 1.1 over 6 connections ≈ 10 rounds ≈ **500 ms**; HTTP/2 ≈ **1–2 rounds**
- 5xx for a client mistake makes callers retry forever; retried POST = duplicate

### Your turn
- Status for: not logged in · forbidden · duplicate create · rate limited · upstream timeout?
- Design: cache headers for a feed endpoint`,
  narration:
    "HTTP is the language almost every system on the internet speaks, so it's worth reading one exchange closely. The code card on the left shows a request and its response. HTTP is a request-response protocol: the client sends a method, a path and headers, and the server answers with a status line, headers, and usually a body. The server never starts a conversation. The method says what you want. GET reads, and it's safe and idempotent, meaning repeating it changes nothing. POST creates something and isn't idempotent, so repeating it can create two. PUT replaces a resource and DELETE removes one, and both are idempotent. PATCH changes part of a resource. The status code says what happened, in classes. Two hundred means success. Three hundred means look elsewhere, including three-oh-four, not modified, which saves bandwidth. Four hundred means the client got it wrong: bad request, unauthenticated, forbidden, not found, conflict, too many requests. Five hundred means the server got it wrong: internal error, bad gateway, unavailable, gateway timeout. Headers carry the rest: who you are with Authorization, what you accept, how long a response may be cached with Cache-Control, and an ETag so a client can ask whether it changed. Now the versions, because they decide how many requests fit on a connection. HTTP one point one made connections persistent, so you stop paying a handshake per request, but it still allows only one request in flight per connection, so browsers open about six. HTTP two is binary, compresses headers, and multiplexes many streams over a single connection, but since it all rides on one TCP connection, a single lost packet stalls every stream. HTTP three moves to QUIC over UDP, so a loss stalls only its own stream, setup is faster, and a connection survives a phone changing networks. A concrete comparison: a page with sixty assets and a fifty-millisecond round trip. Over HTTP one point one with six connections you need about ten rounds, around five hundred milliseconds of waiting. HTTP two sends them all at once, in one or two rounds. The failures are about semantics. Returning a five hundred for something the client did wrong makes well-behaved clients retry a request that can never succeed. And retrying a POST that timed out may create a duplicate, which is the problem idempotency keys solve in section four. Your turn: choose the status for these five cases. Not logged in is four-oh-one. Logged in but not allowed is four-oh-three. Creating something that already exists is four-oh-nine. Too many requests is four-two-nine with a Retry-After header. A timeout talking to an upstream service is five-oh-four. Then the design problem: write the cache headers for a personalised feed endpoint, and decide what to put in Cache-Control and the ETag.",
}
