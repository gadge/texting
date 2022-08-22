import { DecoString, ros, says } from '@spare/logger'
import { parenth }               from '@texting/bracket'
import { SP }                    from '@texting/enum-chars'
import { Fold }                  from '../src/fold'
import { candidates }            from './candidates'

const codes = word => Array.from(word).map(x => ros(String(x.charCodeAt(0)))).join('')

const fold = Fold({ width: 64, pull: 25 })
const HEAD = '#'.repeat(24)

const decoString = DecoString()
for (let [ key, candidate ] of Object.entries(candidates)) {
  HEAD + SP + (candidate |> fold |> decoString |> parenth) |> says[key]
}