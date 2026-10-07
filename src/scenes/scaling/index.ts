import type { Scene } from '@graphlearning/flow'
import { sdCaching } from './caching'
import { sdDistCache } from './distributed-cache'
import { sdMessaging } from './messaging'
import { sdDelivery } from './delivery'
import { sdRateLimit } from './rate-limit'
import { sdCoordination } from './coordination'
import { sdProcessing } from './processing'

// Course 5 (scaling) scenes, one per section, mirroring src/content/scaling:
// sd-caching · sd-dist-cache · sd-messaging · sd-delivery · sd-rate-limit · sd-coordination · sd-processing.
export const scalingScenes: Scene[] = [sdCaching, sdDistCache, sdMessaging, sdDelivery, sdRateLimit, sdCoordination, sdProcessing]
