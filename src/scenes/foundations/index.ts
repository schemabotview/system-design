import type { Scene } from '@graphlearning/flow'
import { sdLayers } from './what-is-system-design'
import { sdRequirements } from './requirements'
import { sdQuality } from './quality-attributes'
import { sdEstimation } from './estimation'
import { sdLatency } from './latency-throughput'
import { sdScaling } from './scaling'
import { sdMethod } from './method'

// Course 1 (foundations) scenes. One scene per section, mirroring src/content/foundations:
// sd-layers · sd-requirements · sd-quality · sd-estimation · sd-latency · sd-scaling · sd-method.
export const foundationsScenes: Scene[] = [sdLayers, sdRequirements, sdQuality, sdEstimation, sdLatency, sdScaling, sdMethod]
