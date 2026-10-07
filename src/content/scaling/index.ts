import type { Course } from '../types'
import { caching } from './01-caching'
import { distributedCaching } from './02-distributed-caching'
import { messagingSystems } from './03-messaging-systems'
import { deliverySemantics } from './04-delivery-semantics'
import { rateLimiting } from './05-rate-limiting'
import { distributedCoordination } from './06-distributed-coordination'
import { dataProcessingArchitectures } from './07-data-processing-architectures'

// Chapter 5 — scaling patterns and distributed infrastructure: the reusable building blocks.
// Caching · distributed caching · messaging · delivery semantics · rate limiting · coordination ·
// data-processing architectures (the case study: a scalable event-processing pipeline).
export const scaling: Course = {
  id: 'scaling',
  title: 'Scaling patterns and distributed infrastructure',
  sections: [
    caching,
    distributedCaching,
    messagingSystems,
    deliverySemantics,
    rateLimiting,
    distributedCoordination,
    dataProcessingArchitectures,
  ],
}
