import type { Section } from '../types'

export const apiDesign: Section = {
  id: 'api-design',
  title: 'API design',
  scene: 'sd-api',
  focus: 'styles',
  slide: `## API design

*Choose a style, then page and version it so callers never break.*

### Model
- **Resources** are nouns; methods are the verbs
- **REST**: cacheable, simple. **RPC / gRPC**: functions, protobuf, streaming. **GraphQL**: client picks fields
- **Pagination**: offset vs **cursor**. **Versioning**: additive is free; breaking → new version
- **gRPC**: protobuf over HTTP/2, streaming, generated clients · **GraphQL**: one endpoint, but caching and N+1 are harder

### Worked example & failure
- \`OFFSET 1000000\` scans a million rows; \`WHERE id < :cursor LIMIT 20\` uses the index
- Renaming a field breaks every old mobile app; an unbounded list takes the service down

### Your turn
- Name the resources and endpoints for comments on photos
- Design: pick the style for a mobile app and for internal services`,
  narration:
    "An API is the interface from section one, made concrete, and a poor one is expensive because other people's code depends on it. Start with resources. A good API is organised around nouns, the things in your system, and uses HTTP methods as the verbs. In the card at the top, photos are resources: you GET a list, POST to create, GET one by id, PATCH to update and DELETE to remove, and the nesting expresses ownership. Now three styles. REST is that resource-and-verb model over HTTP. It's easy to debug, it works with caches and proxies, but its shapes are fixed, so a client either fetches too much or has to make several calls. RPC, and gRPC in particular, models calls as functions, such as CreatePhoto. gRPC uses protobuf, a compact binary format, on HTTP two with streaming and generated client code, so it's a strong choice between internal services, though less friendly to browsers. GraphQL exposes one endpoint where the client names exactly the fields it wants, which removes over-fetching and many round trips, at the cost of harder caching and the risk of expensive queries and the N plus one problem. Then two decisions every API faces. Pagination: you must never return an unbounded list. Offset pagination, skip a million and take twenty, is simple, but the database still scans the million rows, and results drift if data changes between pages. Cursor, or keyset, pagination says give me twenty items after this id, which uses an index and stays stable, and you return the next cursor with each page. Versioning: adding a field or an endpoint is safe, and renaming or removing one is a breaking change. Put breaking changes in a new version, in the path or a header, announce the deprecation, and publish a sunset date. The failure modes are mostly about callers you can't see. Rename a field, and every old mobile app still installed on someone's phone breaks, and you can't force an update. Leave a list unbounded, and one big customer takes the service down. Your turn. For comments on photos, the resources are photos and comments, with endpoints like GET photos slash id slash comments with a cursor, and POST to the same path to add one. And the design problem: choose the API style for your mobile app and for the calls between your internal services, and say what each choice costs.",
}
