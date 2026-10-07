import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §8.7 — the seven questions every final design must survive, each with the form a strong answer
// takes. The URL shortener's answers are on the slide; here each card says what the answer must contain.
export const sdDefense: Scene = {
  id: 'sd-defense',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    row('first', 'Justify the parts', [
      card('c', 'Why this component?', 'service', ['The requirement or number it satisfies', 'What happens if you remove it']),
      card('d', 'Why this database?', 'storage', ['The access pattern it matches', 'What it is bad at, and why that is OK']),
      card('f', 'What fails first?', 'warn', ['Name the weakest part and the signal', 'What the user sees when it does']),
    ]),
    row('second', 'Stress the design', [
      card('p', 'What happens in a partition?', 'network', ['Which side refuses or diverges', 'What reconciles afterwards']),
      card('x', 'How does it scale 10×?', 'external', ['The next bottleneck, in numbers', 'The change that moves it']),
    ]),
    row('third', 'State the promises and the price', [
      card('k', 'What consistency exists?', 'warn', ['Per operation, in words a user would use', 'Where it is weaker, and why']),
      card('m', 'What does it cost?', 'service', ['Compute, storage, bandwidth, people', 'The cheaper design and what it would give up']),
    ]),
  ],
  edges: [],
}
