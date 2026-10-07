import type { Scene } from '@graphlearning/flow'
import { sdReliabilityEng } from './reliability-eng'
import { sdResilience } from './resilience'
import { sdObservability } from './observability'
import { sdSre } from './sre'
import { sdSecurity } from './security'
import { sdDr } from './dr'
import { sdOperations } from './operations'

// Course 7 (reliability) scenes, one per section, mirroring src/content/reliability:
// sd-reliability-eng · sd-resilience · sd-observability · sd-sre · sd-security · sd-dr · sd-operations.
export const reliabilityScenes: Scene[] = [sdReliabilityEng, sdResilience, sdObservability, sdSre, sdSecurity, sdDr, sdOperations]
