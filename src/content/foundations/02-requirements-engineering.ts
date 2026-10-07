import type { Section } from '../types'

export const requirementsEngineering: Section = {
  id: 'requirements-engineering',
  title: 'Requirements engineering',
  scene: 'sd-requirements',
  focus: 'prio',
  slide: `## Requirements engineering

*Turn a vague brief into testable, prioritised requirements.*

### Model
- **Functional** (behaviour) · **non-functional** (measurable) · **constraints** (fixed from outside)
- **Assumptions**: beliefs written down so they can be checked
- **Explicit** = stated; **implicit** = unsaid but expected — go and find them
- Testable, or it is a wish. **MoSCoW**, then the **dominant NFR**

### Worked example & failure
- Photo app: feed p95 < 300 ms, 6 engineers, EU data; Won't (v1): video. Dominant: **feed latency**
- Missed implicit need ("delete my data") → late redesign
- Implicit needs surface late: deleted stays deleted, private stays private

### Your turn
- Rewrite "fast and reliable" as 2 measurable NFRs
- Design: ride-hailing — 3 FR, 3 NFR, 2 constraints, 2 implicit`,
  narration:
    "Most failed systems weren't built badly. They were built to the wrong requirements. So before any box gets drawn, we turn a vague brief into a precise list. There are three kinds of statement, and they behave differently. Functional requirements describe behaviour: a user uploads a photo, follows another user, opens a feed. Non-functional requirements describe how well the system does it, and they must be measurable: the feed loads in under three hundred milliseconds at the ninety-fifth percentile, the service is available ninety-nine point nine five percent of the month, an uploaded photo is never lost. Constraints are things fixed from outside: six engineers, four months, user data in the EU must stay in the EU, we already run on AWS. Alongside these sit assumptions, which are beliefs you haven't verified. Write them down, because an assumption on paper can be checked, and one in your head becomes a surprise. Then there is the difference between explicit and implicit requirements. Explicit ones are stated. Implicit ones are things nobody says but everyone expects: a deleted photo stays deleted, a private photo stays private, traffic is encrypted. On the scene they feed the final set by a dashed line, because you don't get them handed to you, you go and find them by asking. The test for any requirement is simple: can you tell whether it was met? Fast cannot be met or missed. Under three hundred milliseconds at p ninety-five can. Next, prioritise. Use MoSCoW: must, should, could, won't this time. In our photo app, upload and feed are musts, comments are a should, and video is a won't for version one. Then do the most useful thing in this whole section: name the dominant non-functional requirement, the one that will shape the architecture more than any other. Here it's feed latency under a read-heavy load, and that single sentence already hints at caching and read replicas. What goes wrong without this? An implicit requirement discovered after launch, like a legal duty to delete a user's data everywhere, can force you to redesign backups and logs you thought were finished. And an unmeasurable requirement means nobody can ever say the system is done. Your turn. Rewrite the sentence, the system must be fast and reliable, as two measurable requirements. Then the design problem: for a ride-hailing app, list three functional requirements, three non-functional, two constraints and two implicit ones, and defend your choice of dominant requirement.",
}
