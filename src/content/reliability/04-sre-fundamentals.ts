import type { Section } from '../types'

export const sreFundamentals: Section = {
  id: 'sre-fundamentals',
  title: 'SRE fundamentals',
  scene: 'sd-sre',
  focus: 'chain',
  slide: `## SRE fundamentals

*Turn "reliable enough" into a number, and spend the slack on purpose.*

### Model
- **SLI** (measure) → **SLO** (internal target) → **SLA** (external contract, looser)
- **Error budget** = 1 − SLO. **Burn rate** says how fast it is spent
- **Incident management**: roles, severity, mitigate first. **Postmortem**: blameless, with owners

### Worked example & failure
- 99.9% → **43.2 min** / 30 days; 99.99% → **4.3 min**. 14.4× burn for 1 h = 2% of the month
- 100% SLO: no change allowed, no budget; blame-based reviews hide causes

### Your turn
- SLO 99.9% on 10M requests: how many bad requests are allowed?
- Design: SLOs for the checkout API`,
  narration:
    "Site reliability engineering gives reliability a measurable shape, so that arguments about whether a system is reliable enough become arguments about numbers. There are three related terms. A service level indicator, an SLI, is a measurement of how the service is doing: typically the fraction of good events out of valid ones, such as requests that returned without a server error in under three hundred milliseconds, out of all valid requests. A service level objective, an SLO, is the target you set for that indicator, such as ninety-nine point nine percent over thirty days. It's an internal promise. A service level agreement, an SLA, is the contractual version, with penalties, and it's deliberately looser than the SLO, so you notice and fix problems before you owe anyone money. The SLO leads to the most useful idea in the practice, the error budget. The budget is one minus the SLO: the amount of unreliability you're allowed. At ninety-nine point nine percent over thirty days, that's forty-three point two minutes of badness. At ninety-nine point nine five, twenty-one point six minutes, and at ninety-nine point nine nine, only four point three minutes. Why is a budget helpful? Because reliability and speed of change pull against each other, and the budget is a neutral way to balance them. While there's budget left, ship features and take risks. When it's spent, freeze risky launches and invest in reliability. A budget of zero, a hundred percent SLO, would mean never changing anything, and isn't a real goal. Burn rate tells you how fast the budget is being consumed: a burn rate of fourteen point four sustained for an hour uses two percent of the month's budget, which is a reasonable condition to page someone. When things break, incident management supplies structure: an incident commander who coordinates, operators who investigate, someone responsible for communication, severity levels that set the response, and a firm rule to mitigate first and diagnose later. Afterwards, a postmortem is written blamelessly, with a timeline, root and contributing causes, and action items with owners and dates. Blameless matters, because if people are punished for incidents they'll hide the details you need. Your turn. A ninety-nine point nine percent SLO on ten million requests allows ten thousand bad requests. And the design problem: choose SLIs and SLOs for the checkout API, say what's measured, over what window, and what you will do when the budget runs out.",
}
