import type { Section } from '../types'

export const specializedStorage: Section = {
  id: 'specialized-storage',
  title: 'Specialized storage',
  scene: 'sd-specialized',
  focus: 'case',
  slide: `## Specialized storage

*Case study: the storage layer of a social network.*

### Model
- **Object / blob**: big immutable files by key. **Search engine**: inverted index, derived copy
- **Warehouse**: columnar SQL. **Lake**: raw files. **Vector DB**: nearest-neighbour on embeddings
- Choose by **how the data is accessed**
- Choose by access pattern: object/blob (key → bytes) · search (term → docs) · warehouse (scans) · lake (raw files) · vector (nearest neighbour)

### Worked example & failure
- 5M photos/day × 2 MB = **10 TB/day** ≈ 3.65 PB/yr ≈ **$84K/month** at $0.023/GB
- Search as the source of truth; blobs in the DB; a lake with no governance

### Your turn
- Store for: invoices PDF · autocomplete · daily revenue report · "similar posts"
- Design: place every datum of the social network`,
  narration:
    "The last storage section covers specialised stores, and ends the chapter with a case study: choosing where each kind of data lives. Start with files. Object storage, like Amazon S3, holds immutable objects addressed by key. It's cheap, roughly two cents per gigabyte-month, and extremely durable, eleven nines, and it scales without limit, but it isn't built for low-latency random updates. Blob storage is the same family, for large binary values such as images and video, and the rule is to keep the bytes out of your database: store them in object storage and put only the key in a row. Putting blobs in the relational database bloats it and every backup. Let's size one: five million photos a day at two megabytes is ten terabytes a day, three point six five petabytes after a year, and at about two point three cents per gigabyte-month that's roughly eighty-four thousand dollars a month. A search engine, like Elasticsearch, builds an inverted index mapping each term to the documents containing it, which gives full-text search, relevance ranking, and filters. It's a derived copy of your data, fed from the real database, and it is never the source of truth. A data warehouse stores data in columns and is tuned for scanning huge volumes with SQL for analytics, with curated schemas on write. A data lake keeps raw files, often Parquet, in object storage with the schema applied on read. It's cheap and flexible, and without governance it turns into a swamp nobody can trust. A vector database stores embeddings, lists of numbers representing meaning, and finds nearest neighbours approximately and fast, which powers semantic search and recommendations. The skill is choosing by access pattern. The case study at the bottom of the scene does that for a social network. Profiles and follows are relational, sharded by user id, with a leader and replicas. Posts are wide-column, partitioned by author, newest first. Home timelines are a key-value cache, precomputed per user. Photos and video go to object storage behind a CDN. Post search uses a search engine fed from a change stream. Analytics lands in a lake, curated into a warehouse. Recommendations use a graph plus a vector index. Failures: using the search engine as your primary database, and letting a lake grow without ownership. Your turn: invoice PDFs go in object storage, autocomplete in a search engine, a daily revenue report in the warehouse, and similar posts in a vector index. The design problem: take every piece of data in the social network, and for each write the access pattern, the store, and what you'd lose if that store were unavailable. That completes chapter three. Next, the theory of why distributed systems are hard.",
}
