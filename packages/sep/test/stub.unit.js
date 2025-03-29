import { decoPale, logger } from '@spare/logger'
import { stub }             from '../src/index.js'

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
  const pair = stub.call(/\s?\.\s?/g, candidate)
  logger(decoPale(pair))
}