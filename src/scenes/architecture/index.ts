import type { Scene } from '@graphlearning/flow'
import { sdDecomposition } from './decomposition'
import { sdMonolithMicro } from './monolith-micro'
import { sdSvcComm } from './svc-comm'
import { sdPatterns } from './patterns'
import { sdWorkflow } from './workflow'
import { sdMultiRegion } from './multi-region'
import { sdEvolution } from './evolution'

// Course 6 (architecture) scenes, one per section, mirroring src/content/architecture:
// sd-decomposition · sd-monolith-micro · sd-svc-comm · sd-patterns · sd-workflow · sd-multi-region · sd-evolution.
export const architectureScenes: Scene[] = [sdDecomposition, sdMonolithMicro, sdSvcComm, sdPatterns, sdWorkflow, sdMultiRegion, sdEvolution]
