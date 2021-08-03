import { deco }       from '@spare/deco'
import { logger }     from '@spare/logger'
import { sep }        from '../src/sep'
import { candidates } from './candidates'

for (let candidate of candidates) {
  const vec = sep.call(/\s?\.\s?/g, candidate)
  vec |> deco |> logger
}