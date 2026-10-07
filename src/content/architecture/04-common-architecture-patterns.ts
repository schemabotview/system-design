import type { Section } from '../types'

export const commonArchitecturePatterns: Section = {
  id: 'common-architecture-patterns',
  title: 'Common architecture patterns',
  scene: 'sd-patterns',
  focus: 'shapes',
  slide: `## Common architecture patterns

*Patterns are named trade-offs: choose by the pressure you face.*

### Model
- **Layered**: presentation → logic → data, one direction. **Hexagonal**: domain in the middle, adapters outside behind **ports**
- **Pipes and filters**: independent stages in a chain
- **Layered**: simple, but layers leak · **hexagonal**: the core defines ports, adapters implement them
- **Event-driven** (loose in time) · **CQRS** · **event sourcing** · **pipes and filters** (parse → filter → enrich → sink)

### Worked example & failure
- Hexagonal: test the domain with in-memory adapters in **milliseconds**, not seconds
- Layers leak (UI → DB) or pass data through unchanged

### Your turn
- Where does "send email" go in a hexagonal design?
- Design: patterns for a notification service`,
  narration:
    "Architecture patterns are named, reusable trade-offs. None is best; each answers a particular pressure. Two of them are about how to arrange the inside of one application, and the scene draws them because their difference is a matter of geometry. In layered architecture, you stack presentation, business logic and data access, and dependencies point one way, down. It's simple and familiar. Its failure modes are layers that leak, such as a view that talks to the database directly, and layers that merely pass data through without adding anything, which adds ceremony and no value. Hexagonal architecture, also called ports and adapters, turns the picture inside out. The domain core sits in the middle and defines ports, interfaces for what it needs from the outside. Driving adapters, an HTTP controller, a queue consumer, a command-line tool, call into the core. Driven adapters, such as a SQL repository, a payment gateway or an email sender, implement the ports the core defined. Dependencies point inward, toward the domain. That has two big consequences. You can test the business rules with in-memory adapters in milliseconds, with no database or network, and you can swap a database or a vendor without touching the rules. The other four patterns are about flow, and we've met them. Event-driven architecture has components react to events, which gives loose coupling in time. CQRS separates the write model from the read models. Event sourcing stores the events as the source of truth. Pipes and filters chains independent stages, such as parse, filter, enrich and write in a log pipeline, where each stage has one job and can be reused or reordered. Most real systems combine several: a hexagonal core, exposed over an event-driven interface, with CQRS on the read path. Your turn: where does send email go in a hexagonal design? The core defines a Notifier port, and an SMTP or email-service adapter outside the core implements it, so the rules never know how mail is sent. And the design problem: choose patterns for a notification service that accepts events, applies user preferences, and delivers across email, push and SMS, and say which pressure each pattern answers.",
}
