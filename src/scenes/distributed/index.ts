import type { Scene } from '@graphlearning/flow'
import { sdWhyHard } from './why-hard'
import { sdConsistency } from './consistency'
import { sdCap } from './cap'
import { sdTransactions } from './transactions'
import { sdConsensus } from './consensus'
import { sdTime } from './time'
import { sdFailure } from './failure'

// Course 4 (distributed) scenes, one per section, mirroring src/content/distributed:
// sd-why-hard · sd-consistency · sd-cap · sd-transactions · sd-consensus · sd-time · sd-failure.
export const distributedScenes: Scene[] = [sdWhyHard, sdConsistency, sdCap, sdTransactions, sdConsensus, sdTime, sdFailure]
