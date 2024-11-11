import { deco }       from '@spare/deco'
import { logger }     from '@spare/logger'
import { sep }        from '../src/sep.js'
import { candidates } from './candidates.js'

for (let candidate of candidates) {
  const vec = sep.call(/\s?\.\s?/g, candidate)
  logger(deco(vec))
}