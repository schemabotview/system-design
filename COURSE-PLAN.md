The course would use one recurring principle: do not memorize architectures; learn to derive them from requirements, constraints, and trade-offs.
System Design: From Foundations to Expert Practice
Target: Beginner → capable of designing and defending production-scale distributed systems
Structure: 8 chapters × approximately 7 sections
Method: Theory → quantitative reasoning → component analysis → design patterns → case studies → design exercises
Chapter 1 — Foundations of System Design
Objective: Build the conceptual and quantitative foundation required to reason about systems rather than immediately jumping to technologies.
1.1 What Is System Design?
- System, subsystem, component, interface
- Architecture vs. detailed design
- System design vs. software design
- High-Level Design (HLD) and Low-Level Design (LLD)
1.2 Requirements Engineering
- Functional requirements
- Non-functional requirements
- Constraints and assumptions
- Explicit vs. implicit requirements
- Requirement prioritization
1.3 Quality Attributes
- Availability
- Reliability
- Scalability
- Performance
- Durability
- Maintainability
- Security
1.4 Quantitative System Analysis
- Requests per second
- Read/write ratios
- Storage estimation
- Bandwidth estimation
- Concurrent users
- Peak vs. average load
- Back-of-the-envelope calculations
1.5 Latency and Throughput
- Latency distributions
- Throughput
- Percentiles: p50, p95, p99
- Tail latency
- Bottlenecks
- Little's Law
1.6 Scaling Fundamentals
- Vertical scaling
- Horizontal scaling
- Stateless vs. stateful systems
- Scale-up vs. scale-out
- Elasticity
- Capacity planning
1.7 A Systematic Design Method
We establish the framework used throughout the rest of the course:
Requirements → Estimation → API → Data Model → Architecture → Bottlenecks → Scaling → Reliability → Trade-offs
Chapter 2 — Networking, APIs, and Communication
Objective: Understand how distributed components actually communicate.
2.1 Networking Foundations
- IP
- TCP
- UDP
- Ports and sockets
- DNS
- TLS
- Connection establishment
2.2 HTTP and the Web
- HTTP request/response model
- HTTP methods
- Status codes
- Headers
- HTTP/1.1, HTTP/2, HTTP/3
- Persistent connections
2.3 API Design
- Resources
- REST
- RPC
- gRPC
- GraphQL
- Pagination
- Versioning
2.4 Synchronous Communication
- Request-response
- Timeouts
- Retries
- Exponential backoff
- Idempotency
- Connection pooling
2.5 Asynchronous Communication
- Events
- Message queues
- Publish/subscribe
- Event-driven systems
- Producers and consumers
- Delivery semantics
2.6 Load Balancing
- Layer 4 vs. Layer 7
- Round robin
- Least connections
- Weighted routing
- Health checks
- Consistent hashing
- Global load balancing
2.7 Edge Infrastructure
- Reverse proxies
- API gateways
- CDNs
- Edge caching
- Rate limiting
- Service discovery
- Traffic management
Case study: Trace a request from a user's browser through DNS → CDN → load balancer → application → database.
Chapter 3 — Data Storage and Data Modeling
Objective: Learn how storage choices determine much of a system's architecture.
3.1 Data Modeling
- Entities and relationships
- Access patterns
- Normalization
- Denormalization
- Schema design
- Query-driven modeling
3.2 Relational Databases
- Tables and indexes
- Primary/foreign keys
- SQL
- Joins
- Transactions
- ACID
3.3 NoSQL Databases
- Key-value
- Document
- Wide-column
- Graph
- Time-series
- When NoSQL is appropriate
3.4 Indexing and Query Performance
- B-trees
- Hash indexes
- Composite indexes
- Covering indexes
- Query planning
- Read/write trade-offs
3.5 Replication
- Leader-follower
- Multi-leader
- Leaderless replication
- Replication lag
- Read replicas
- Failover
3.6 Partitioning and Sharding
- Horizontal partitioning
- Range partitioning
- Hash partitioning
- Shard keys
- Hot partitions
- Rebalancing
- Consistent hashing
3.7 Specialized Storage
- Object storage
- Search engines
- Blob storage
- Data warehouses
- Data lakes
- Vector databases
- Choosing the appropriate storage model
Case study: Design the storage layer for a social network.
Chapter 4 — Distributed Systems Fundamentals
Objective: Develop the theoretical foundation needed to understand why distributed systems behave the way they do.
4.1 Why Distributed Systems Are Difficult
- Partial failure
- Network failure
- Clock uncertainty
- Concurrent execution
- Unreliable communication
- Failure detection
4.2 Consistency Models
- Strong consistency
- Eventual consistency
- Causal consistency
- Read-your-writes
- Monotonic reads
- Linearizability
4.3 CAP and PACELC
- Consistency
- Availability
- Network partitions
- CAP theorem
- Common CAP misconceptions
- PACELC
4.4 Distributed Transactions
- Local vs. distributed transactions
- Two-phase commit
- Saga pattern
- Compensating transactions
- Transactional outbox
- Eventual consistency
4.5 Consensus
- Consensus problem
- Quorums
- Leader election
- Raft
- Paxos conceptually
- Split brain
4.6 Time and Ordering
- Physical clocks
- Clock drift
- Logical clocks
- Lamport timestamps
- Vector clocks
- Ordering events
4.7 Failure Models
- Crash failures
- Network partitions
- Byzantine failures
- Heartbeats
- Failure detectors
- Recovery strategies
Key transition: At this point, we stop thinking primarily about machines and begin reasoning about distributed state.
Chapter 5 — Scaling Patterns and Distributed Infrastructure
Objective: Learn the reusable building blocks behind large-scale systems.
5.1 Caching
- Cache-aside
- Read-through
- Write-through
- Write-back
- TTL
- Eviction
- Cache invalidation
5.2 Distributed Caching
- Cache clusters
- Partitioning
- Replication
- Hot keys
- Cache stampedes
- Distributed cache consistency
5.3 Messaging Systems
- Queues
- Streams
- Consumer groups
- Partitioning
- Ordering
- Backpressure
- Dead-letter queues
5.4 Delivery Semantics
- At-most-once
- At-least-once
- Exactly-once
- Duplicate processing
- Idempotent consumers
- Deduplication
5.5 Rate Limiting
- Fixed window
- Sliding window
- Token bucket
- Leaky bucket
- Distributed rate limiting
- Quotas
5.6 Distributed Coordination
- Distributed locks
- Leases
- Leader election
- Coordination services
- Fencing tokens
- Distributed counters
5.7 Data Processing Architectures
- Batch processing
- Stream processing
- Event sourcing
- CQRS
- Materialized views
- Lambda/Kappa architectures
Case study: Build a scalable event-processing pipeline.
Chapter 6 — Architecture and Service Design
Objective: Learn how individual infrastructure components become coherent production architectures.
6.1 Architectural Decomposition
- Modules
- Services
- Bounded contexts
- Coupling
- Cohesion
- Dependency management
6.2 Monoliths and Microservices
- Modular monolith
- Microservices
- Service boundaries
- Distributed monoliths
- Operational complexity
- Migration strategies
6.3 Service Communication
- Synchronous calls
- Event-driven communication
- Service discovery
- API gateways
- Service mesh
- Contract management
6.4 Common Architecture Patterns
- Layered architecture
- Hexagonal architecture
- Event-driven architecture
- CQRS
- Event sourcing
- Pipes and filters
6.5 Workflow and Business Processes
- Orchestration
- Choreography
- State machines
- Workflow engines
- Long-running transactions
- Saga orchestration
6.6 Multi-Region Architecture
- Active-passive
- Active-active
- Geo-replication
- Data locality
- Global routing
- Regional failure
6.7 Evolutionary Architecture
- Migration
- Backward compatibility
- Schema evolution
- API evolution
- Strangler pattern
- Technical debt
- Designing for change
Case study: Evolve a startup monolith into a globally distributed architecture.
Chapter 7 — Reliability, Security, and Operations
Objective: Move from systems that work to systems that can safely operate in production.
7.1 Reliability Engineering
- Reliability vs. availability
- Fault tolerance
- Redundancy
- Graceful degradation
- Failure domains
- Blast radius
7.2 Resilience Patterns
- Timeout
- Retry
- Exponential backoff
- Jitter
- Circuit breaker
- Bulkhead
- Load shedding
7.3 Observability
- Logs
- Metrics
- Traces
- Distributed tracing
- Correlation IDs
- Alerting
- Telemetry
7.4 SRE Fundamentals
- SLA
- SLO
- SLI
- Error budgets
- Incident management
- Postmortems
7.5 Security Architecture
- Authentication
- Authorization
- OAuth/OIDC
- Encryption
- Secrets
- Zero trust
- Principle of least privilege
7.6 Disaster Recovery
- Backups
- Restore testing
- RTO
- RPO
- Regional failover
- Disaster scenarios
7.7 Production Operations
- Deployment strategies
- Rolling deployments
- Blue-green deployment
- Canary releases
- Feature flags
- Configuration management
- Capacity management
Case study: A production service begins failing under 10× traffic; diagnose and redesign it.
Chapter 8 — Expert System Design and Case Studies
Objective: Integrate everything into a repeatable expert-level design process.
Instead of introducing many new components, this chapter develops architectural judgment.
8.1 Problem Decomposition
- Clarifying ambiguous requirements
- Identifying dominant constraints
- Finding critical paths
- Recognizing hidden requirements
- Defining system boundaries
8.2 Architecture from Access Patterns
Derive architecture from:
Users → Operations → Access patterns → Data model → Traffic → Components
rather than starting with technologies.
8.3 Bottleneck Analysis
- CPU
- Memory
- Disk
- Network
- Database
- Lock contention
- Hot partitions
- Downstream dependencies
8.4 Trade-off Analysis
We explicitly evaluate:
Consistency ↔ Availability
Latency ↔ Durability
Read optimization ↔ Write optimization
Simplicity ↔ Scalability
Cost ↔ Reliability
8.5 Design Evolution
Design the same system at:
1,000 → 100,000 → 10 million → 1 billion users
The objective is to understand when architectural complexity becomes justified.
8.6 Major Design Case Studies
We would progressively design systems such as:
- URL shortener
- Rate limiter
- Notification service
- Chat system
- News feed
- Search/autocomplete
- Video platform
- Ride-sharing platform
- Payment system
- Cloud file storage
8.7 Architecture Defense
For every final design, you must be able to answer:
Why this component?
Why this database?
What fails first?
What happens during a network partition?
How does it scale 10×?
What consistency guarantee exists?
What does this architecture cost?
The learning progression
The chapters deliberately follow this dependency chain:
Foundations
↓
Networking & APIs
↓
Data & Storage
↓
Distributed Systems Theory
↓
Scaling Infrastructure
↓
Architecture
↓
Reliability & Operations
↓
Expert Design & Trade-offs
I would also make the course quantitative rather than purely diagrammatic. For example, instead of merely saying "use a cache," you would eventually be expected to reason:
50M DAU × 20 reads/day ≈ 1B reads/day
≈ 11.6K average reads/sec
Assume 5× peak → ≈58K reads/sec.
If the database sustainably handles ~15K reads/sec for this workload, we need to reduce DB traffic or horizontally distribute it.
With an 80% effective cache hit rate, DB reads fall to ~11.6K/sec at peak.

That style of reasoning is what separates knowing system-design vocabulary from being able to design systems.
For teaching, I would make every section follow the same academic sequence: learning objectives → theory → formal concepts/models → worked example → architecture analysis → failure analysis → exercises → design problem. This gives us a consistent path from beginner material to expert-level architectural reasoning.
