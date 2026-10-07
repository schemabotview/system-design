import type { Section } from '../types'

export const disasterRecovery: Section = {
  id: 'disaster-recovery',
  title: 'Disaster recovery',
  scene: 'sd-dr',
  focus: 'timeline',
  slide: `## Disaster recovery

*Decide how much data and time you can lose, then prove you can meet it.*

### Model
- **RPO**: data you can lose. **RTO**: time to be back. Four **tiers**: backup · pilot light · warm standby · active-active
- **3-2-1 backups**, point-in-time recovery. **Restore testing**. **Regional failover** runbook

### Worked example & failure
- RPO 5 min ⇒ copy every ≤ 5 min; nightly backups = up to **24 h** lost
- Restore 5 TB at 200 MB/s = **6.9 h** — not a 1-hour RTO. Replication copies corruption

### Your turn
- Payments DB: RPO 1 min, RTO 15 min — which tier?
- Design: DR tiers for each part of the social network`,
  narration:
    "Disaster recovery is the plan for when something so large goes wrong that normal fault tolerance isn't enough: a region disappears, data is corrupted, or someone deletes the wrong thing. It begins with two numbers, drawn on the timeline in the scene. The recovery point objective, RPO, is how much data you can afford to lose, measured as time: if your RPO is five minutes, your last good copy must be no older than five minutes at the moment of disaster. The recovery time objective, RTO, is how long you can be down: the time from the disaster until the service is restored, including detecting the problem, deciding, failing over, and verifying. Both are business decisions, not technical ones, because smaller numbers cost money. That's what the four tiers are. Backup and restore is the cheapest: you keep backups and rebuild when needed, with an RTO and RPO of hours. A pilot light keeps the core data live and the compute switched off, giving an RTO of tens of minutes. A warm standby runs a scaled-down copy continuously, with an RTO of minutes and an RPO of seconds. And active-active runs everywhere, with both near zero, at about twice the cost. Practices make the plan real. Backups follow the three-two-one rule: three copies, on two kinds of media, with one off-site, and immutable so ransomware can't delete them, with point-in-time recovery built on the write-ahead log. The most important rule is that an untested backup is a hope. Schedule restore drills, and measure the real recovery time. Do the arithmetic: restoring five terabytes at two hundred megabytes a second takes about twenty-five thousand seconds, nearly seven hours, so a one-hour RTO can't be met by restoring from backup. You need a replica. And a regional failover needs a runbook: detect, promote the replica, repoint traffic, verify, and later, fail back. Think carefully about scenarios. A region outage is the obvious one, but a bad deployment or a software bug that corrupts data is more common, and replication faithfully copies the corruption to every replica, so you need point-in-time recovery from before the damage. Also consider accidental deletion, ransomware, and compromised credentials. Your turn. A payments database with a one-minute RPO and a fifteen-minute RTO needs a warm standby with near-synchronous replication; restoring from backup is far too slow. And the design problem: assign a tier to each part of the social network, with the numbers that justify each choice.",
}
