import { deco }       from '@spare/deco'
import { logger }     from '@spare/logger'
import { sepByLast }  from '../src/sepByLast'
import { candidates } from './candidates'

for (let candidate of candidates) {
  const vec = sepByLast.call(/\s?\.\s?/g, candidate)
  vec |> deco |> logger
}