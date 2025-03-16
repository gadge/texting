import { DecoString, decoVector, ros, says } from '@spare/logger'
import { parenth }                           from '@texting/bracket'
import { SP }                                from '@texting/enum-chars'
import { FoldToVector }                      from '../src/fold.js'
import { candidates }                        from './candidates.js'

const codes = word => Array.from(word).map(x => ros(String(x.charCodeAt(0)))).join('')

const fold = FoldToVector({ width: 64, firstLineIndent: 25 })
const HEAD = '-'.repeat(24)

const decoString = DecoString()
// const decoVector = DecoVector()
for (let [ key, candidate ] of Object.entries(candidates)) {
  const foldedList = fold(candidate)
  says[key].br(foldedList.length)(HEAD + SP + (parenth(decoVector(foldedList))))
  // says[key](parenth(decoString(fold(candidate))))
}