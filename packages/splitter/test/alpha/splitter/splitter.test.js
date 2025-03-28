import { deco }         from '@spare/deco'
import { says }         from '@spare/logger'
import { splitLiteral } from '../../../src/splitLiteral.js'
import { candidates }   from '../candidates.js'

for (let [key, word] of Object.entries(candidates)) {
  splitLiteral(word) |> deco |> says[key]
}



