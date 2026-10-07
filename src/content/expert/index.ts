import type { Course } from '../types'
import { problemDecomposition } from './01-problem-decomposition'
import { architectureFromAccessPatterns } from './02-architecture-from-access-patterns'
import { bottleneckAnalysis } from './03-bottleneck-analysis'
import { tradeOffAnalysis } from './04-trade-off-analysis'
import { designEvolution } from './05-design-evolution'
import { majorDesignCaseStudies } from './06-major-design-case-studies'
import { architectureDefense } from './07-architecture-defense'

// Chapter 8 — expert system design and case studies: judgement rather than new components.
// Decomposition · architecture from access patterns · bottlenecks · trade-offs · design evolution ·
// ten major case studies · architecture defence.
export const expert: Course = {
  id: 'expert',
  title: 'Expert system design and case studies',
  sections: [
    problemDecomposition,
    architectureFromAccessPatterns,
    bottleneckAnalysis,
    tradeOffAnalysis,
    designEvolution,
    majorDesignCaseStudies,
    architectureDefense,
  ],
}
