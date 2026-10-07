import type { Section } from '../types'

export const reliabilityEngineering: Section = {
  id: 'reliability-engineering',
  title: 'Reliability engineering',
  scene: 'sd-reliability-eng',
  focus: 'domains',
  slide: `## Reliability engineering

*Assume parts fail; make sure failures stay small and the core keeps working.*

### Model
- **Reliability** (correct over time) ≠ **availability** (up). **Fault** ≠ **failure**
- **Redundancy** counts only across independent **failure domains**; **fault tolerance** = detect + fail over
- **Graceful degradation** sheds features, not the core. **Blast radius**: cells limit it
- **Fault tolerance** = detect + redundancy + failover; N+1 or active-active

### Worked example & failure
- 3 replicas in 3 zones at 99.9%: **99.9999999%** — but one shared LB at 99.99% caps the system near **99.99%**
- Replicas in one rack share its power; one bad config hits every cell at once

### Your turn
- 2 replicas in one rack (99.95%) vs two racks: availability?
- Design: place a 5-node database across 3 zones`,
  narration:
    "We begin chapter seven with reliability engineering, which is the discipline of building systems that keep working when their parts don't. First, two words that are often confused. Availability asks whether the system is up. Reliability asks whether it behaves correctly over time. A service that responds to every request with the wrong answer is available, and not reliable. Related is the difference between a fault and a failure. A fault is a component misbehaving: a disk dies, a process crashes. A failure is when the system as a whole stops delivering the service to users. Fault tolerance is the goal of preventing faults from becoming failures, using detection, redundancy and failover. Redundancy is the central tool, but it only works across independent failure domains. The scene lays out the nesting: a host, a rack that shares power and a switch, an availability zone that is a data centre, and a region. A fault at the host level touches a fraction of one service, while a fault at the region level can touch everybody. That's the blast radius of a domain. If two replicas live on the same rack, a single power failure takes both, so the redundancy you paid for didn't exist. Spread replicas across racks, zones, and where it matters, regions. The arithmetic: three replicas in three zones, each ninety-nine point nine percent available, fail together with probability one in a billion, so ninety-nine point nine nine nine nine nine nine nine nine percent. But a single load balancer in front of them, at ninety-nine point nine nine, caps the whole system at about that: redundancy is limited by the weakest part everyone shares. Next, graceful degradation: when something breaks, lose a feature and keep the core. Serve stale data from a cache, hide the recommendations, put the site into read-only mode. Users forgive a missing carousel, but not a failed checkout. And blast radius can be limited by design, using cells: split customers across, say, ten independent copies of the stack, so any one fault, or one bad deployment, hits only a tenth of users. The failure modes are mostly common-cause: replicas in one rack, or one configuration change pushed to every cell at once. Your turn. Two replicas in one rack, where the rack is ninety-nine point nine five percent available, are about ninety-nine point nine five overall, since the rack is shared. In two separate racks the pair is about ninety-nine point nine nine eight. And the design problem: place a five-node database across three availability zones, with two, two and one nodes, and check that losing any single zone still leaves a majority.",
}
