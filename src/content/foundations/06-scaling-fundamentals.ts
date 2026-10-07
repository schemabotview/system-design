import type { Section } from '../types'

export const scalingFundamentals: Section = {
  id: 'scaling-fundamentals',
  title: 'Scaling fundamentals',
  scene: 'sd-scaling',
  focus: 'out',
  slide: `## Scaling fundamentals

*Choose scale up or out; size a tier with headroom.*

### Model
- **Scale up** (vertical): simple, but a ceiling and one point of failure
- **Scale out** (horizontal): needs **stateless** servers; **stateful** needs sticky routing or partitioning
- **Elasticity**: capacity follows load · **Amdahl**: 5% serial → max **20×**

### Worked example & failure
- **Capacity planning**: 58K ÷ (2K × 60%) → **49** servers; survive a zone loss → **75**
- Sticky sessions + scale-in = lost logins; a shared DB caps everything

### Your turn
- 21K req/s, 3K/server, 70% target?
- Design: scale an in-memory-session login`,
  narration:
    "When load grows, there are two ways to respond. Scaling up, or vertical scaling, means a bigger machine: more cores, more memory. It's simple, since your code doesn't change, but it has a ceiling, because the biggest instance you can buy is finite, the price climbs faster than the capacity, and one machine is a single point of failure. Scaling out, or horizontal scaling, means more machines behind a load balancer. That has no hard ceiling, but it demands something of your design: the servers must be stateless. A stateless server keeps nothing about a user between requests, so any server can handle any request, and any of them can be removed without losing anything. The state hasn't disappeared, it's moved to a shared store such as a database, a cache or a session store, and in the diagram you can see all the state sits in one box on the right. Stateful systems can scale too, but they need partitioning and replication, which is the subject of later chapters. A related word is elasticity: it's the ability to add and remove capacity automatically as load changes, so cost follows demand. Be aware that new instances take a minute or two to become useful, so you scale on a leading signal rather than waiting for a crisis. Now capacity planning. The recipe: peak load divided by what one node can do at your target utilisation, plus spare. In our running example, peak is about fifty-eight thousand requests a second. A server can do two thousand flat out, but we plan for sixty percent, so twelve hundred effective. That's forty-nine servers. But what if a whole availability zone fails? With three zones, the other two must carry the full load, so each zone needs about twenty-five servers, seventy-five in total. Notice that the redundancy is where most of the cost goes. There's also a hard limit worth knowing. Amdahl's Law says that if a fraction s of the work is serial, the speed-up from N machines can never exceed one over s. With five percent serial work, the maximum is twenty times, and a hundred machines only give you about seventeen. Here is how scale-out fails. Sticky sessions stored in a server's memory are lost when autoscaling removes that server. And adding application servers does nothing if they all share one database that's already the bottleneck. Your turn: the load is twenty-one thousand requests a second, each server does three thousand, and you target seventy percent. Twenty-one thousand over twenty-one hundred is ten servers, and eleven with one spare. For the design problem, a login service keeps sessions in process memory. Make it horizontally scalable, and compare a shared session store with signed tokens held by the client.",
}
