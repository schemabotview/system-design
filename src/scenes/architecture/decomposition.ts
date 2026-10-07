import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §6.1 — one word, three meanings: "Product" inside three bounded contexts. The boundary is where
// the model changes, which is why contexts (not nouns) are the unit of decomposition. The cards then
// name the measures (coupling, cohesion), the two kinds of boundary, and how dependencies are kept sane.
export const sdDecomposition: Scene = {
  id: 'sd-decomposition',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'contexts',
      label: 'Bounded contexts of an online shop',
      pattern: 'group',
      icon: 'layers',
      flow: 'LR',
      children: [
        {
          id: 'catalog',
          label: 'Catalog',
          pattern: 'service',
          flow: 'TB',
          children: [card('cat-m', 'Product means…', 'service', ['A description, images, attributes', 'Owned by merchandising'])],
          edges: [],
        },
        {
          id: 'ordering',
          label: 'Ordering',
          pattern: 'network',
          flow: 'TB',
          children: [card('ord-m', 'Product means…', 'network', ['A SKU, a quantity, the price paid', 'Owned by checkout'])],
          edges: [],
        },
        {
          id: 'shipping',
          label: 'Shipping',
          pattern: 'storage',
          flow: 'TB',
          children: [card('shp-m', 'Product means…', 'storage', ['A weight, dimensions, a hazard class', 'Owned by logistics'])],
          edges: [],
        },
      ],
      edges: [
        { source: 'catalog', target: 'ordering', label: 'API: price + SKU' },
        { source: 'ordering', target: 'shipping', label: 'event: OrderPlaced' },
      ],
    },
    row('boundaries', 'Boundaries and their quality', [
      card('mod', 'Modules vs services', 'service', ['Module: an in-process boundary (compile time)', 'Service: a network boundary (run time)', 'Decide the boundary first, the deployment second']),
      card('bc', 'Bounded contexts', 'network', ['A model and its language, valid inside one boundary', 'Split where a word changes meaning']),
    ]),
    row('quality', 'Judging a decomposition', [
      card('cc', 'Coupling and cohesion', 'warn', ['High cohesion: things that change together live together', 'Low coupling: few, narrow, stable links between parts']),
      card('dep', 'Dependency management', 'external', ['Depend on contracts, not internals', 'No cycles; arrows point to the stable core', 'Never share a database across boundaries']),
    ]),
  ],
  edges: [],
}
