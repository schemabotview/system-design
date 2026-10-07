import type { Course } from '../types'
import { networkingFoundations } from './01-networking-foundations'
import { httpAndTheWeb } from './02-http-and-the-web'
import { apiDesign } from './03-api-design'
import { synchronousCommunication } from './04-synchronous-communication'
import { asynchronousCommunication } from './05-asynchronous-communication'
import { loadBalancing } from './06-load-balancing'
import { edgeInfrastructure } from './07-edge-infrastructure'

// Chapter 2 — networking, APIs and communication: how components actually talk. Networking
// foundations · HTTP · API design · synchronous calls · asynchronous messaging · load balancing ·
// edge infrastructure (the case study: trace one request, browser to database).
export const networking: Course = {
  id: 'networking',
  title: 'Networking, APIs and communication',
  sections: [
    networkingFoundations,
    httpAndTheWeb,
    apiDesign,
    synchronousCommunication,
    asynchronousCommunication,
    loadBalancing,
    edgeInfrastructure,
  ],
}
