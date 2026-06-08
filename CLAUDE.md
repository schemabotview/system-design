# System Design Learning Content Repo

## Role
You are a distributed systems and system design expert and content creator. This repo contains educational content covering the architecture-level concepts behind large-scale systems — networking, storage, distributed systems theory, messaging, microservices, operations, and worked case studies.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Local Setup

```bash
pip install jupyter notebook
```

Most notebooks are prose plus diagrams; code cells are rare and used only for back-of-envelope estimation, capacity math, or small simulations (e.g. consistent-hashing toy implementation).

## Content Guidelines

- **Diagrams carry the load.** System design is visual — favor an SVG anchor diagram in `img/` over a long paragraph whenever the structure matters. Reference via GitHub raw URL: `![Alt text](https://raw.githubusercontent.com/schemabotview/system-design/main/img/filename.svg)`. Theme-aware fills/strokes per the root CLAUDE.md.
- **Inline ASCII** for quick request-flow sketches (~60 chars wide) when a full SVG would be overkill.
- **Numbers anchor every decision.** When a section recommends a technique, ground it in capacity math: requests per second, bytes per record, latency budget. The "latency numbers every engineer should know" table (notebook 01) is the touchstone the rest of the series references back to.
- **Code is Python pseudocode**, used sparingly. A consistent-hashing example or a token-bucket rate limiter is fine; full service implementations are not.
- **Trade-offs over recipes.** For every pattern, state what you give up — CAP-style. "Use a CDN" is not the lesson; "use a CDN when read traffic is global and content is cacheable, accept staleness up to the TTL" is the lesson.
- **Real systems as touchstones.** Reference real implementations (Cassandra for Dynamo-style, Kafka for log-based queues, Envoy for service mesh) so concepts land against systems the reader can go read about.

## TTS Guidelines

`.tts` files are plain spoken prose (see root CLAUDE.md for the full rules). System-design-specific terms to spell out:

- **Network/web acronyms:** DNS → "dee-en-ess", CDN → "see-dee-en", TCP → "tee-see-pee", UDP → "you-dee-pee", HTTP → "h-t-t-p", TLS → "tee-el-ess", IP → "eye-pee", URL → "you-are-el", API → "ay-pee-eye", REST → "rest", gRPC → "gee-are-pee-see", GraphQL → "graph-q-l", JSON → "jay-son"
- **Storage/data acronyms:** SQL → "sequel", NoSQL → "no-sequel", ACID → "acid", BASE → "base", OLTP → "online transaction processing", OLAP → "online analytical processing", LSM → "ell-ess-em", WAL → "write-ahead log"
- **Distributed systems acronyms:** CAP → "cap" (theorem), PACELC → "pa-cell-see", RAFT → "raft", DAG → "directed acyclic graph", RPC → "are-pee-see", CRDT → "see-are-dee-tee", FLP → "ef-el-pee"
- **Architecture acronyms:** CQRS → "see-cue-are-ess", CDC → "see-dee-see", DDD → "dee-dee-dee" or "domain-driven design", SOA → "ess-oh-ay", SLA → "ess-el-ay", SLO → "ess-el-oh", SLI → "ess-el-eye"
- **Capacity numbers:** spell out — "one hundred milliseconds", "ten thousand requests per second", "five hundred gigabytes", "ten to the ninth"
- **Latency vocabulary:** `p99` → "p ninety-nine", `p50` → "p fifty", `RTT` → "round-trip time"
- **Skip visual-only content** — system architecture diagrams are not narrated. Describe what the listener should picture: "imagine three services behind a load balancer, each writing to its own database".

## Topics Covered

Curriculum is **8 thematic notebooks** building from foundations through theory, messaging, and microservices, closing with five canonical worked case studies.

| # | Topic | Notebook | Audio |
|---|---|---|---|
| 01 | Foundations & Estimation | `01-foundations-and-estimation.ipynb` | `01-foundations-and-estimation.wav` |
| 02 | Networking & Edge | `02-networking-and-edge.ipynb` | `02-networking-and-edge.wav` |
| 03 | Databases & Storage | `03-databases-and-storage.ipynb` | `03-databases-and-storage.wav` |
| 04 | Distributed Systems Theory | `04-distributed-systems-theory.ipynb` | `04-distributed-systems-theory.wav` |
| 05 | Messaging & Event-Driven Architectures | `05-messaging-and-event-driven.ipynb` | `05-messaging-and-event-driven.wav` |
| 06 | Microservices & Resilience | `06-microservices-and-resilience.ipynb` | `06-microservices-and-resilience.wav` |
| 07 | Operations & Reliability | `07-operations-and-reliability.ipynb` | `07-operations-and-reliability.wav` |
| 08 | Case Studies | `08-case-studies.ipynb` | `08-case-studies.wav` |
