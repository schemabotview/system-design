import type { Course } from '../types'
import { whatIsSystemDesign } from './01-what-is-system-design'
import { requirementsEngineering } from './02-requirements-engineering'
import { qualityAttributes } from './03-quality-attributes'
import { quantitativeAnalysis } from './04-quantitative-analysis'
import { latencyThroughput } from './05-latency-throughput'
import { scalingFundamentals } from './06-scaling-fundamentals'
import { designMethod } from './07-design-method'

// Chapter 1 — foundations. The conceptual and quantitative base: what a system is · requirements ·
// quality attributes · estimation · latency & throughput · scaling · the nine-step method.
// Every section follows the course template: objective → model → worked example → architecture &
// failure analysis → exercise → design problem. The slide carries each beat tersely; the narration
// carries them in full, and gives the answer to the exercise.
export const foundations: Course = {
  id: 'foundations',
  title: 'Foundations of system design',
  sections: [
    whatIsSystemDesign,
    requirementsEngineering,
    qualityAttributes,
    quantitativeAnalysis,
    latencyThroughput,
    scalingFundamentals,
    designMethod,
  ],
}
