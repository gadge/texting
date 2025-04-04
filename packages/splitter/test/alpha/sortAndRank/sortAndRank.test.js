import { NUM_DESC, STR_DESC } from '@aryth/comparer'
import { rank }               from '@aryth/rank-vector'
import { fluoVector }         from '@palett/fluo-vector'
import { DecoMatrix, says }   from '@spare/logger'
import { isNumeric }          from '@typen/num-loose'
import { splitter }           from '../../../dist/index.esm'
import { candidates }         from '../candidates.js'
import { LITERAL }            from '../splitter/regexps.js'

for (let [key, value] of Object.entries(candidates)) {
  const vec = splitter(value, LITERAL)
  const rankStr = rank(vec, STR_DESC, x => /[A-Za-z0-9]+/.test(x))
  const rankNum = rank(vec, NUM_DESC, isNumeric)
  const rows = [
    vec,
    rankStr,
    rankNum,
    fluoVector(vec),
    // fluoVector(rankNum)
  ]
  rows |> DecoMatrix({ delim: ' | ' }) |> says[key]
}
