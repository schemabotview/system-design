import type { Scene } from '@graphlearning/flow'
import { sdProblem } from './decomposition'
import { sdFromAccess } from './from-access'
import { sdBottlenecks } from './bottlenecks'
import { sdTradeoffs } from './tradeoffs'
import { sdDesignEvolution } from './evolution-of-design'
import { sdCaseStudies } from './case-studies'
import { sdDefense } from './defense'

// Course 8 (expert) scenes, one per section, mirroring src/content/expert:
// sd-problem · sd-from-access · sd-bottlenecks · sd-tradeoffs · sd-design-evolution · sd-case-studies · sd-defense.
export const expertScenes: Scene[] = [sdProblem, sdFromAccess, sdBottlenecks, sdTradeoffs, sdDesignEvolution, sdCaseStudies, sdDefense]
