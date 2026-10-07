import type { Section } from '../types'

export const architecturalDecomposition: Section = {
  id: 'architectural-decomposition',
  title: 'Architectural decomposition',
  scene: 'sd-decomposition',
  focus: 'contexts',
  slide: `## Architectural decomposition

*Cut the system where meaning changes, not where nouns appear.*

### Model
- **Module**: in-process boundary. **Service**: network boundary. **Bounded context**: a model valid inside one boundary
- **Cohesion**: what changes together lives together. **Coupling**: keep links few, narrow, stable
- **Dependencies**: on contracts, acyclic, never a shared database
- **Bounded context**: split where a word changes meaning (Product in Catalog / Ordering / Shipping)

### Worked example & failure
- "Product" differs in Catalog, Ordering, Shipping → three contexts, not one model
- n services allow n(n−1)/2 links: 8 → **28**, 50 → **1,225**

### Your turn
- Where does "Customer" differ across billing, support, marketing?
- Design: split the social network into ≤ 6 services`,
  narration:
    "Architecture starts with decomposition: deciding what the parts are. The most common mistake is to cut along nouns, a user service, an order service, a product service, because that mirrors the database tables. A better guide is meaning. Look at the scene. In an online shop, the word product means three different things. To the catalog team it's a description, images and attributes. To ordering it's a SKU, a quantity and the price paid. To shipping it's a weight, dimensions and a hazard class. Trying to build one shared Product model forces everyone to agree on all of it, and every change touches every team. The better design is three bounded contexts, each with its own model and its own language, communicating through narrow contracts: an API to fetch a price, an event when an order is placed. A bounded context is a boundary inside which a model and its words mean one thing. Now, two kinds of boundary. A module is a boundary inside one process, enforced by the compiler or by tooling. A service is a boundary across a network, enforced by the network. Decide the boundary first and the deployment second: a good module boundary can later become a service. How do you judge a decomposition? With two measures. Cohesion: things that change together should live together, so a typical feature change touches one part. Coupling: connections between parts should be few, narrow and stable. Dependencies must be managed deliberately: depend on contracts, not on internals, avoid cycles, point the arrows toward the stable core, and never share a database between boundaries, since a shared table is a hidden contract that nobody can change. Why does this matter so much? Because links multiply. With n services, there are n times n minus one over two possible pairs: eight services allow twenty-eight, fifty services allow twelve hundred and twenty-five. Every link you don't need is a cost. Your turn. The word customer differs across billing, where it's a payer with an address and a tax status, support, where it's a person with a history of tickets, and marketing, where it's a segment with preferences, so those are three contexts that share an identifier, not a model. And the design problem: split the social network from earlier chapters into no more than six services, and for each, write its model, the data it owns, and its interface. If two services always change together, merge them.",
}
