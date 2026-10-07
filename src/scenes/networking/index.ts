import type { Scene } from '@graphlearning/flow'
import { sdNetStack } from './net-stack'
import { sdHttp } from './http'
import { sdApi } from './api'
import { sdSync } from './sync'
import { sdAsync } from './async'
import { sdLb } from './lb'
import { sdEdge } from './edge'

// Course 2 (networking) scenes, one per section, mirroring src/content/networking:
// sd-net-stack · sd-http · sd-api · sd-sync · sd-async · sd-lb · sd-edge.
export const networkingScenes: Scene[] = [sdNetStack, sdHttp, sdApi, sdSync, sdAsync, sdLb, sdEdge]
