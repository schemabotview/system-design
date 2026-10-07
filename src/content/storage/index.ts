import type { Course } from '../types'
import { dataModeling } from './01-data-modeling'
import { relationalDatabases } from './02-relational-databases'
import { nosqlDatabases } from './03-nosql-databases'
import { indexingQueryPerformance } from './04-indexing-query-performance'
import { replication } from './05-replication'
import { partitioningAndSharding } from './06-partitioning-and-sharding'
import { specializedStorage } from './07-specialized-storage'

// Chapter 3 — data storage and data modeling: how storage choices determine the architecture.
// Data modeling · relational · NoSQL · indexing · replication · partitioning · specialised stores
// (the case study: the storage layer of a social network).
export const storage: Course = {
  id: 'storage',
  title: 'Data storage and data modeling',
  sections: [
    dataModeling,
    relationalDatabases,
    nosqlDatabases,
    indexingQueryPerformance,
    replication,
    partitioningAndSharding,
    specializedStorage,
  ],
}
