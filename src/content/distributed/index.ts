import type { Course } from '../types'
import { whyDistributedSystemsAreDifficult } from './01-why-distributed-systems-are-difficult'
import { consistencyModels } from './02-consistency-models'
import { capAndPacelc } from './03-cap-and-pacelc'
import { distributedTransactions } from './04-distributed-transactions'
import { consensus } from './05-consensus'
import { timeAndOrdering } from './06-time-and-ordering'
import { failureModels } from './07-failure-models'

// Chapter 4 — distributed systems fundamentals: why they behave as they do. Why it is hard ·
// consistency models · CAP and PACELC · distributed transactions · consensus · time and ordering ·
// failure models. The turn: from reasoning about machines to reasoning about distributed state.
export const distributed: Course = {
  id: 'distributed',
  title: 'Distributed systems fundamentals',
  sections: [
    whyDistributedSystemsAreDifficult,
    consistencyModels,
    capAndPacelc,
    distributedTransactions,
    consensus,
    timeAndOrdering,
    failureModels,
  ],
}
