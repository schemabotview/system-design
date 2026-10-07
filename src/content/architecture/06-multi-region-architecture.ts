import type { Section } from '../types'

export const multiRegionArchitecture: Section = {
  id: 'multi-region-architecture',
  title: 'Multi-region architecture',
  scene: 'sd-multi-region',
  focus: 'topo',
  slide: `## Multi-region architecture

*Serve users near them and survive losing a whole region.*

### Model
- **Active-passive**: standby region; RPO = replication lag. **Active-active**: all serve; handle conflicts
- **Geo-replication** is async (sync adds ~80 ms per write). **Data locality**: a home region per user
- **Global routing**: geo-DNS / anycast. **Regional failure**: survivors carry the load

### Worked example & failure
- Peak 58K req/s: 2 regions → **116K** provisioned (200%); 3 → **87K** (150%); 4 → **77K** (133%)
- Async lag 200 ms → up to 200 ms of writes lost on failover

### Your turn
- 4 regions: capacity per region and total?
- Design: home-region scheme for a chat app`,
  narration:
    "Multi-region architecture has two goals: put your system near users, because the speed of light sets a floor on latency, and survive the loss of an entire region. It also forces you to confront the physics from chapter four. Start with who serves traffic. In active-passive, one region serves everything while a standby region waits, kept in sync by replication. It's simple, but the standby is idle capacity, and on failover you lose whatever hadn't replicated yet, so your recovery point is the replication lag. In active-active, every region serves users. That gives low latency everywhere and no idle region, but now the same data can change in two places, so you need either conflict resolution or, better, data ownership: each record has one home region that handles its writes. Between regions, replication is asynchronous, because a synchronous write would wait for a cross-region round trip, around eighty milliseconds, on every write. The consequence is that a regional failover can lose the last few hundred milliseconds of writes. Data locality means keeping each user's data in a home region, which cuts latency, and in many cases is also required by law, for example European data residency. Global routing sends users to the right region using geo-DNS, latency-based routing or anycast, with health checks to move traffic away from a failed region, though DNS caching limits how quickly. And the cost of regional failure is capacity. If one region fails, the others must carry its traffic. With a peak of fifty-eight thousand requests a second and two active-active regions, each must be sized for the whole load, so you provision a hundred and sixteen thousand, two hundred percent. With three regions, each needs to be sized for half, twenty-nine thousand, so eighty-seven thousand in total, a hundred and fifty percent. With four regions, each carries nineteen thousand three hundred plus, about seventy-seven thousand in total, a hundred and thirty-three percent. More regions cost less in redundancy but more in complexity. Your turn: that last calculation is the exercise answer. And the design problem: design a home-region scheme for a chat app. Decide where a conversation lives when its participants are in different regions, and what users see during a regional failure.",
}
