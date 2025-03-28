import { deco }       from '@spare/deco'
import { logger }     from '@spare/logger'
import { sepByLast }  from '../src/sepByLast.js'
import { candidates } from './candidates.js'

for (let candidate of candidates) {
  const vec = sepByLast.call(/\s?\.\s?/g, candidate)
  vec |> deco |> logger
}