import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §2.1 — the four steps before the first useful byte (the connection-establishment story, as a chain
// of cards with their round-trip cost), then one card per networking primitive from the plan.
export const sdNetStack: Scene = {
  id: 'sd-net-stack',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'open',
      label: 'Opening a connection to api.example.com',
      pattern: 'network',
      icon: 'network',
      flow: 'LR',
      children: [
        { id: 'dns', label: 'DNS lookup', badge: '1', sub: 'name → IP · 0 RTT if cached' },
        { id: 'tcp', label: 'TCP handshake', badge: '2', sub: 'SYN · SYN-ACK · ACK = 1 RTT' },
        { id: 'tls', label: 'TLS handshake', badge: '3', sub: 'certificate + keys = 1 RTT (1.3)' },
        { id: 'http', label: 'HTTP request', badge: '4', sub: 'first byte back = 1 RTT' },
      ],
      edges: [
        { source: 'dns', target: 'tcp' },
        { source: 'tcp', target: 'tls' },
        { source: 'tls', target: 'http' },
      ],
    },
    row('layer-a', 'Addressing and transport', [
      card('ip', 'IP', 'service', ['Delivers a packet host to host, best effort', 'IPv4 32-bit (4.3 billion), IPv6 128-bit', 'Packets may be lost, duplicated or reordered']),
      card('ports', 'Ports and sockets', 'storage', ['A 16-bit port picks the process (443 = HTTPS)', 'Socket = IP + port', 'Connection = source and destination IP + port']),
      card('tcpudp', 'TCP vs UDP', 'warn', ['TCP: connection, ordered, reliable, congestion-controlled', 'UDP: independent datagrams, no guarantees', 'UDP: DNS, video, games · TCP: web, databases']),
    ]),
    row('layer-b', 'Naming and trust', [
      card('dnsc', 'DNS', 'network', ['Hierarchy: root → .com → example.com', 'Answers cached for a TTL at every layer', 'Records: A, AAAA, CNAME, NS']),
      card('tlsc', 'TLS', 'external', ['Encrypts, proves the server’s identity, detects tampering', 'TLS 1.3 = 1 round trip; resumed sessions can send 0-RTT data']),
    ]),
  ],
  edges: [],
}
