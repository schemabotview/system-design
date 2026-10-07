import type { Course } from '../types'
import { reliabilityEngineering } from './01-reliability-engineering'
import { resiliencePatterns } from './02-resilience-patterns'
import { observability } from './03-observability'
import { sreFundamentals } from './04-sre-fundamentals'
import { securityArchitecture } from './05-security-architecture'
import { disasterRecovery } from './06-disaster-recovery'
import { productionOperations } from './07-production-operations'

// Chapter 7 — reliability, security and operations: from systems that work to systems that can
// safely operate in production. Reliability · resilience patterns · observability · SRE · security ·
// disaster recovery · production operations (the case study: a service failing under 10x traffic).
export const reliability: Course = {
  id: 'reliability',
  title: 'Reliability, security and operations',
  sections: [
    reliabilityEngineering,
    resiliencePatterns,
    observability,
    sreFundamentals,
    securityArchitecture,
    disasterRecovery,
    productionOperations,
  ],
}
