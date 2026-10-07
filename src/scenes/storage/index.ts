import type { Scene } from '@graphlearning/flow'
import { sdDataModel } from './data-model'
import { sdRelational } from './relational'
import { sdNosql } from './nosql'
import { sdIndexing } from './indexing'
import { sdReplication } from './replication'
import { sdSharding } from './sharding'
import { sdSpecialized } from './specialized'

// Course 3 (storage) scenes, one per section, mirroring src/content/storage:
// sd-data-model · sd-relational · sd-nosql · sd-indexing · sd-replication · sd-sharding · sd-specialized.
export const storageScenes: Scene[] = [sdDataModel, sdRelational, sdNosql, sdIndexing, sdReplication, sdSharding, sdSpecialized]
