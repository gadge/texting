import { decoPale, logger } from '@spare/logger'
import { sep }              from '../src/index.js'

export const candidates = [
  'a.b.c',
  'N . P . C',
  'USA',
  ' .net',
  'done.',
  '-',
  '',
]

for (let candidate of candidates) {
  const pair = sep.call(/\s?\.\s?/, candidate)
  logger(decoPale(pair))
}