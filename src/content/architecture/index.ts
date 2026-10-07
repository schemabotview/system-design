import type { Course } from '../types'
import { architecturalDecomposition } from './01-architectural-decomposition'
import { monolithsAndMicroservices } from './02-monoliths-and-microservices'
import { serviceCommunication } from './03-service-communication'
import { commonArchitecturePatterns } from './04-common-architecture-patterns'
import { workflowAndBusinessProcesses } from './05-workflow-and-business-processes'
import { multiRegionArchitecture } from './06-multi-region-architecture'
import { evolutionaryArchitecture } from './07-evolutionary-architecture'

// Chapter 6 — architecture and service design: how components become coherent production systems.
// Decomposition · monoliths and microservices · service communication · patterns · workflows ·
// multi-region · evolutionary architecture (the case study: a startup monolith, globally distributed).
export const architecture: Course = {
  id: 'architecture',
  title: 'Architecture and service design',
  sections: [
    architecturalDecomposition,
    monolithsAndMicroservices,
    serviceCommunication,
    commonArchitecturePatterns,
    workflowAndBusinessProcesses,
    multiRegionArchitecture,
    evolutionaryArchitecture,
  ],
}
