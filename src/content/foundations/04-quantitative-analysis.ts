import type { Section } from '../types'

export const quantitativeAnalysis: Section = {
  id: 'quantitative-analysis',
  title: 'Quantitative system analysis',
  scene: 'sd-estimation',
  focus: 'sheet',
  slide: `## Quantitative analysis

*Estimate load, storage and bandwidth within 10×.*

### Model
- QPS = DAU × actions ÷ 86,400; **read:write ratio** splits it
- **Peak = 3–10× avg**; **concurrent** = DAU × % online
- Storage = writes × size × retention × **replicas**; bandwidth = QPS × bytes ÷ 8

### Worked example & failure
- 50M DAU × 20 reads → **11.6K/s**, peak **58K/s**; 219 TB at 3 replicas
- DB ~15K/s → 4 nodes, or **80% cache** → ~11.6K/s
- Sizing for average melts at peak; estimates also say when **not** to scale

### Your turn
- 100M URLs/mo, 10:1 reads, 500 B, 5 yr: QPS, storage?
- Design: does it need sharding?`,
  narration:
    "Now we make the course quantitative. Back-of-the-envelope estimation isn't about precision, it's about getting within a factor of ten, fast enough to decide what to build. The method is mechanical. Requests per second equals daily users times actions per user, divided by eighty-six thousand four hundred seconds in a day, and a day is close enough to a hundred thousand seconds to do it in your head. Then peak load: traffic is never flat, so multiply the average by somewhere between three and ten. Storage is writes per day times size times retention times the number of replicas. Bandwidth is requests per second times bytes per request, and remember to divide by eight when you convert to bits. The worksheet on the left runs a full example. Fifty million daily users, twenty reads each, is a billion reads a day, so about eleven thousand six hundred reads per second on average. Assume a five times peak, and that's about fifty-eight thousand a second. Writes are one in ten of that, around eleven hundred a second; that read to write ratio matters, because it decides whether caching or write scaling is your problem. Concurrent users is a separate number: if ten percent of daily users are online at peak, that's five million connections open at once, which drives memory and connection limits, not request rate. Storage: a hundred million writes a day at two kilobytes is two hundred gigabytes a day, seventy-three terabytes a year, and with three replicas, two hundred and nineteen terabytes on disk. Bandwidth: five kilobytes per read at peak is about two hundred and ninety megabytes a second, or two point three gigabits. Finally the question that drives design. If one database comfortably serves fifteen thousand reads a second, peak needs almost four of them. But with an eighty percent cache hit rate, the database sees only about eleven thousand six hundred reads a second at peak, which one node can handle. That is how a number turns into a component. The failure modes are classic. Sizing for the average and melting at peak. Forgetting that replicas multiply storage. Confusing bits and bytes and being off by eight. The least obvious benefit is the opposite of scaling: estimation tells you when you don't need to. Now your turn. A URL shortener creates a hundred million new links a month, with ten reads per write, and stores five hundred bytes per link for five years. Work it out: about forty writes a second, four hundred reads a second, and roughly three terabytes in total. And the design problem follows from that: with those numbers, does it need sharding? It doesn't. Three terabytes and four hundred reads a second fit comfortably on one well-provisioned database, so the real drivers are availability and latency, not size. Compare that with the regret you named in section one.",
}
