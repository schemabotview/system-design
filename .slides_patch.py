import re,glob,json,sys
# id -> list of (slot, bullet); slot M = first h3 list, W = second h3 list
A={
'foundations/requirements-engineering':[('M',"**Prioritization**: Must · Should · Could · Won't — video is a v1 *won't*; implicit needs (deleted stays deleted, private stays private) get found by asking")],
'foundations/quality-attributes':[('M',"**Durability**: yearly loss probability (11 nines) · **performance**: latency percentiles · **security**: threat model, least privilege · **maintainability**: lead time, time to restore"),('W',"Attributes pull against each other: durability ↔ write latency, security ↔ performance, availability ↔ cost")],
'foundations/quantitative-analysis':[('M',"**Requests per second**, **read/write ratio** (10:1) and **concurrent users** (10% of DAU = 5M online)"),('M',"**Storage estimation** 200 GB/day → 73 TB/yr; **bandwidth estimation** 5 KB × 58K/s ≈ 290 MB/s ≈ 2.3 Gbit/s"),('M',"Method: state assumptions · round to powers of ten · average, then peak · sanity-check against one box")],
'foundations/latency-throughput':[('M',"**Throughput** = completed req/s; the slowest stage is the **bottleneck**: LB 5,000 → app 2,000 → DB 800 ⇒ **800**"),('M',"Tail is ~4× the median: p50 100 ms · p95 268 · p99 403"),('W',"1,000 req/s × 0.2 s = **200** in flight; 50 workers ⇒ **250 req/s** ceiling"),('W',"Queue wait ≈ service ÷ (1 − utilisation): 50% busy → 2×, 99% → **100×**")],
'foundations/scaling-fundamentals':[('M',"**Stateless**: any replica serves any request; **stateful** needs sticky routing, partitioning, replication"),('M',"**Elasticity**: scale on a leading signal — a new instance takes 1–2 min to be useful"),('W',"**Amdahl**: 100 machines at 5% serial work give only **~17×**")],
'foundations/design-method':[('M',"Three movements: **understand** (1–2) · **shape** (3–5) · **defend** (6–9)"),('M',"Artifacts: scoped requirements · numbers · endpoints · schema · diagram · ranked bottlenecks · scaling plan · failure modes · decisions"),('W',"Walked through: redirect p99 < 50 ms · 40 writes/s · POST /urls + GET /{code} · key-value · cache + replicas · multi-AZ")],
'networking/api-design':[('M',"**gRPC**: protobuf over HTTP/2, streaming, generated clients · **GraphQL**: one endpoint, but caching and N+1 are harder"),('W',"Return a **next_cursor** and cap the page size (e.g. ≤ 100)")],
'networking/synchronous-communication':[('M',"**Timeouts**: connect ≠ read; pass the **remaining budget** downstream"),('W',"Jitter: wait random(0, min(cap, base × 2ⁿ)) so 10,000 clients stop retrying in lockstep"),('W',"PUT/DELETE are idempotent already; POST needs a client-supplied key")],
'networking/asynchronous-communication':[('M',"**Queue**: work distribution, one consumer per message · **pub/sub**: broadcast, every subscriber gets a copy"),('M',"**Delivery semantics**: at-most-once · at-least-once (default) · exactly-once *effect*"),('W',"Dead-letter queue after N failed tries; alert on queue depth and age")],
'networking/load-balancing':[('M',"**Weighted routing** matches capacity: 8-core : 4-core = 2 : 1"),('M',"**Health checks**: probe every 5 s, 2 fails out, 2 passes in; the balancer itself must be redundant")],
'networking/edge-infrastructure':[('M',"**Reverse proxy**: TLS, compression, hides topology · **CDN**: copies near users, the metric is hit ratio"),('M',"**Service discovery**: instances heartbeat into a registry; stale ones expire"),('W',"Token bucket refills r/s up to burst b; reject with **429 + Retry-After**")],
'storage/data-modeling':[('M',"Access patterns first: feed = 95% of reads, post = 1 write per 10 reads"),('M',"**Query-driven modeling**: one table per query shape; duplicate rather than join on the hot path")],
'storage/relational-databases':[('M',"**Isolation** levels run from read committed to serializable — stronger costs concurrency"),('W',"Lost update fixed by atomic UPDATE … SET balance = balance − 80, SELECT FOR UPDATE, or serializable + retry"),('W',"WAL flushed at commit (~1 ms); group commit batches fsyncs")],
'storage/nosql-databases':[('M',"**Wide-column**: partition + clustering key · **graph**: multi-hop traversals · **time-series**: append, downsample"),('W',"Stay relational unless the pattern is narrow, scale outgrows one node, or the data is a graph/series")],
'storage/indexing-query-performance':[('M',"**Leftmost prefix**: index (a, b) serves a, or a + b — not b alone; **covering** → Index Only Scan")],
'storage/replication':[('M',"**Lag** → read-your-writes: route the author to the leader for a few seconds"),('M',"**Leaderless**: write W of N, read R of N, W + R > N — N=3, W=2, R=2 tolerates one failure")],
'storage/partitioning-and-sharding':[('M',"**Range** keeps scans on one shard but a timestamp key piles on the last; **hash** spreads evenly"),('W',"Hot partition: salt or split the key, or cache it"),('W',"1,024 fixed partitions over 64 nodes = 16 each")],
'storage/specialized-storage':[('M',"Choose by access pattern: object/blob (key → bytes) · search (term → docs) · warehouse (scans) · lake (raw files) · vector (nearest neighbour)"),('W',"Keep bytes out of the DB — store a key, not the blob"),('W',"Search engine = derived copy, never the source of truth; a lake without governance becomes a swamp")],
'distributed/why-distributed-systems-are-difficult':[('W',"The four explanations need opposite responses: retry is right for 1–2, repeats the work in 3, adds load in 4")],
'distributed/consistency-models':[('M',"**Causal**: cause before effect, for everyone · **monotonic reads**: time never goes backwards"),('W',"Unique usernames need linearizability; like counts can be eventual")],
'distributed/cap-and-pacelc':[('M',"**CAP theorem**: during a partition a replica must refuse (C) or answer, possibly stale (A)"),('M',"Misconceptions: not \"pick two\" · C ≠ ACID · A ≠ high uptime"),('W',"Cassandra PA/EL · Spanner PC/EC")],
'distributed/distributed-transactions':[('M',"**Transactional outbox**: business row + event row in ONE local tx; a relay publishes at-least-once"),('W',"A compensation can fail too: retry idempotently, then alert a person")],
'distributed/consensus':[('M',"**Quorum** ⌊N/2⌋ + 1: N=3 tolerates 1 · 5 → 2 · 7 → 3; four nodes are no better than three"),('M',"Raft election timeout 150–300 ms, random; **terms** fence off old leaders"),('W',"The minority side can read stale data but never commit")],
'distributed/time-and-ordering':[('M',"**Wall clocks**: NTP ms–tens of ms off, can jump backwards — never order events across machines with them"),('W',"Lamport: receive → max(t, m.t) + 1; A sends 5, B at 3 → **6**"),('W',"Vectors [2,1] vs [1,2] are **concurrent**")],
'distributed/failure-models':[('M',"**Network partitions** are omission failures: healthy nodes that cannot talk"),('W',"Phi-accrual detectors adapt the timeout; false suspicion → split brain")],
'scaling/caching':[('M',"**Cache-aside** survives cache loss; **write-back** can lose data on a crash"),('W',"Invalidate-on-write race: a reader re-caches the OLD value; TTL bounds the damage")],
'scaling/distributed-caching':[('M',"Redis cluster: **16,384 hash slots** map to shards; consistent hashing moves few keys"),('M',"Stampede fixes: **single-flight**, jittered TTL, serve-stale-while-refreshing"),('W',"Hot key → copy as key#1…#8, or add a local L1 cache")],
'scaling/messaging-systems':[('M',"**DLQ**: park a poison message after N tries; alert, inspect, replay")],
'scaling/delivery-semantics':[('M',"Duplicates come from producer retry, consumer crash before ack, and rebalance"),('W',"Dedupe record goes in the **same transaction** as the effect")],
'scaling/rate-limiting':[('M',"**Token bucket**: refill r/s, burst b → 429 + Retry-After"),('W',"Shared Redis counter ≈ 100K ops/s per node; local shares drift when load is uneven")],
'scaling/distributed-coordination':[('M',"**ZooKeeper · etcd · Consul**: small, strongly consistent (Raft); a single Redis node is not enough for locks"),('W',"Counter: shard the hot key into N sub-counters, sum on read")],
'scaling/data-processing-architectures':[('M',"**Lambda** = two code paths that drift · **Kappa** = replay the log · late events need **watermarks**"),('W',"Late event: drop, allow lateness, or route to a side output"),('W',"Materialized view: work at write time, fast reads")],
'architecture/architectural-decomposition':[('M',"**Bounded context**: split where a word changes meaning (Product in Catalog / Ordering / Shipping)"),('W',"A shared table is a hidden contract — never share a database across boundaries")],
'architecture/monoliths-and-microservices':[('M',"**Migration**: modularise first → extract the cleanest module; never a big-bang rewrite"),('W',"Each service adds a pipeline, dashboards, alerts, on-call and tracing"),('W',"Ten sequential calls at 99.9% each → **99.0%**")],
'architecture/service-communication':[('M',"**API gateway** (+ a BFF per client) · **mesh**: sidecar with mTLS, retries, traffic split"),('W',"Contract tests in CI: add field ✓ · remove ✗ · rename ✗ · change type ✗")],
'architecture/common-architecture-patterns':[('M',"**Layered**: simple, but layers leak · **hexagonal**: the core defines ports, adapters implement them"),('M',"**Event-driven** (loose in time) · **CQRS** · **event sourcing** · **pipes and filters** (parse → filter → enrich → sink)"),('W',"Combine: hexagonal core, event-driven edge, CQRS on the read path")],
'architecture/multi-region-architecture':[('M',"**Data locality**: a home region per user (and residency law) · **global routing**: DNS TTL limits failover speed"),('W',"Active-passive RPO = replication lag; active-active needs conflict handling or data ownership"),('W',"A synchronous cross-region write adds ≈ **80 ms**")],
'architecture/evolutionary-architecture':[('M',"**Strangler pattern**: facade → route a slice → verify → retire the old piece")],
'reliability/reliability-engineering':[('M',"**Fault tolerance** = detect + redundancy + failover; N+1 or active-active"),('W',"Cells: 10 independent copies → one fault or bad deploy hits 10% of users")],
'reliability/resilience-patterns':[('M',"**Exponential backoff** with **jitter**: random(0, min(cap, base × 2ⁿ))"),('W',"Half-open sends ONE probe; retry budget ≤ 10% extra load")],
'reliability/observability':[('M',"**Distributed tracing**: spans + a context header; sample ~1% of traces"),('M',"**Telemetry**: OpenTelemetry; watch metric cardinality"),('W',"Page only for an actionable symptom; the rest is a ticket")],
'reliability/sre-fundamentals':[('M',"**Burn rate** 14.4× for 1 h = 2% of a 30-day budget → page"),('W',"Budget spent → freeze risky launches; 99.95% = 21.6 min")],
'reliability/security-architecture':[('M',"OAuth flow: sign in at the IdP → code + PKCE → ID + access token → Bearer to the API"),('W',"401 = unknown caller · 403 = known, not allowed")],
'reliability/disaster-recovery':[('M',"**Tiers**: backup & restore (hours) · pilot light · warm standby (min / s) · active-active (≈ 0, ≈ 2× cost)"),('M',"**3-2-1**: 3 copies, 2 media, 1 offsite; immutable; point-in-time recovery from the log"),('W',"Scenarios: region outage · bad deploy · corruption (replication copies it) · delete · ransomware · stolen credentials"),('W',"Restore drills measure the REAL RTO")],
'reliability/production-operations':[('M',"**Rolling** (mixed versions) · **blue-green** (instant rollback, 2× capacity) · **canary** 1 → 10 → 50 → 100%"),('W',"Mitigation: shed 30% low-priority, roll back the key change, cap retries")],
'expert/architecture-from-access-patterns':[('M',"Chat: send / load history / mark read → append by conversation, last 50 → messages(conversation_id, seq)"),('W',"Traffic 23K writes/s (116K peak), reads 5× — only then: gateway, queue, wide-column store, cache"),('W',"Habits: read/write skew · one table per query")],
'expert/bottleneck-analysis':[('M',"Four per machine (CPU · memory · disk · network) and four across the system"),('W',"Fixes: profile/cache · bound caches · index/SSD · compress/CDN · index/replicas/shard · partition the lock · salt the key · breaker/bulkhead"),('W',"Low CPU + low throughput = something is waiting")],
'expert/trade-off-analysis':[('M',"Decision record: decision · context · options · chosen · price paid · revisit-if"),('W',"Hybrid feed: push for normal users, pull for celebrities; revisit if they exceed 5% of posts")],
'expert/design-evolution':[('M',"1K one box · 100K one DB + replica · 10M cache, replicas, queue · 1B shards, regions, cells"),('W',"A 15K reads/s database saturates at peak at ≈ **13M** users")],
'expert/major-design-case-studies':[('M',"Numbers that justify: 62⁷ ≈ 3.5T codes · 100K ops/s · 2.8K notifs/s · 50 gateways · ~200 followers · 250K updates/s · 50 Tbps · 262,144 chunks")],
'expert/architecture-defense':[('M',"Principle: every part has a reason, every failure a plan, every promise a boundary")],
}
def patch(path,items):
    s=open(path).read()
    m=re.search(r"slide: `(.*?)`,\n",s,re.S); body=m.group(1)
    parts=re.split(r'(?m)^(?=### )',body)  # head, h3 blocks
    head,blocks=parts[0],parts[1:]
    for slot,b in items:
        i=0 if slot=='M' else 1
        if i>=len(blocks): i=len(blocks)-1
        blk=blocks[i].rstrip('\n')+'\n- '+b.replace('`','\\`')+'\n'
        blocks[i]=blk+('\n' if i<len(blocks)-1 else '')
    # ensure blank line between blocks
    out=head+''.join(x if x.endswith('\n\n') or j==len(blocks)-1 else x.rstrip('\n')+'\n\n' for j,x in enumerate(blocks))
    s=s[:m.start(1)]+out.rstrip('\n')+s[m.end(1):]
    open(path,'w').write(s)
files={}
for f in glob.glob('src/content/*/[0-9]*.ts'):
    cid=f.split('/')[2]; sid=re.search(r"id: '([^']+)'",open(f).read()).group(1); files[f'{cid}/{sid}']=f
bad=[k for k in A if k not in files]; print('unknown',bad)
for k,items in A.items(): patch(files[k],items)
print('patched',len(A))
