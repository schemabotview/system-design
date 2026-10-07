import type { Section } from '../types'

export const networkingFoundations: Section = {
  id: 'networking-foundations',
  title: 'Networking foundations',
  scene: 'sd-net-stack',
  focus: 'open',
  slide: `## Networking foundations

*Know what happens, and what it costs, before the first byte.*

### Model
- **IP** routes packets host to host, best effort. **Ports** pick the process; a **socket** = IP + port
- **TCP**: reliable, ordered. **UDP**: fast datagrams, no guarantees
- **DNS** turns names into IPs, cached by TTL. **TLS** encrypts and authenticates
- A new connection costs **round trips**: DNS, TCP, TLS, then the request

### Worked example & failure
- RTT 50 ms: DNS 20 + TCP 50 + TLS 50 + request 50 = **170 ms**; reused: **50 ms**
- Long DNS TTL slows failover; no connect timeout hangs callers; one TCP loss stalls the stream

### Your turn
- RTT 80 ms, DNS cached, new TLS 1.3 connection: time to first response?
- Design: protocol for a live video call vs a bank transfer`,
  narration:
    "Every distributed system is, at the bottom, machines sending bytes to each other, so we start with what that costs. The bottom layer is IP, the Internet Protocol. It delivers a packet from one host to another on a best-effort basis. Packets can be lost, duplicated, or arrive out of order, and IP makes no promise either way. IP version four uses thirty-two-bit addresses, about four point three billion of them, and version six uses a hundred and twenty-eight bits. An address finds a machine, but a machine runs many programs, so a port, a sixteen-bit number, picks the process: port four four three is HTTPS. An IP address plus a port is a socket, and a connection is identified by the source and destination address and port together. On top of IP sit two transport protocols. TCP gives you a connection, ordered and reliable delivery, and congestion control, at the price of a handshake and of stalling the whole stream when one packet is lost. UDP just sends independent datagrams with no handshake and no guarantees, which is why DNS, video calls and games use it, while the web and databases use TCP. Then names and trust. DNS maps a name like api dot example dot com to an address, through a hierarchy: the root servers point to dot com, which points to example dot com. Answers are cached at every layer for a time-to-live. TLS sits above TCP, encrypting traffic, proving the server's identity with a certificate, and detecting tampering. Now put these together, as the top of the scene does: opening a fresh connection takes four steps. A DNS lookup, then the TCP handshake, SYN, SYN-ACK, ACK, which costs one round trip. Then TLS, one more round trip in version one point three. Only then does your HTTP request go out and the first byte come back, another round trip. If the server is fifty milliseconds away and the resolver twenty, that's twenty plus fifty, plus fifty, plus fifty: a hundred and seventy milliseconds before the first useful byte. Reuse the connection and the same request takes fifty. That's why connection reuse shows up in every later section. The failure modes follow from the costs: a long DNS TTL means a failover takes minutes to reach users; a call with no connect timeout can hang forever; and because TCP delivers in order, one lost packet stalls everything behind it. Your turn. A client eighty milliseconds away opens a new TLS one point three connection with DNS cached: that's three round trips, two hundred and forty milliseconds. Reuse it, and it's eighty. And the design problem: choose a transport for a live video call and for a bank transfer, and defend each choice by what you can afford to lose.",
}
