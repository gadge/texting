import { makeEmbedded }     from '@foba/util'
import { VectorCollection } from '@foba/vector-string'
import { BRACKET, NONE }    from '@texting/enum-brackets'
import { CO, COLF, LF, TB } from '@texting/enum-chars'
import { strategies }       from '@valjoux/strategies'
import { br as brac }       from '@texting/bracket'

const VECTORS = {
  empty: [],
  // arithmetic: NumberVectorCollection.fibonacci(12),
  stringed: VectorCollection.megaCities.slice(0, 7),
  // textNum: NumberVectorCollection.primes(7).map(String),
  // nums: [ 1, 2, 3, 0, -1, -2, -3 ],
  alpha: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n' ],
  // misc: [ null, undefined, NaN, 'Infinity', '+', 1.2E+1, 1.2E+2, 1.2E+3, 1.2E+4 ],
  combo: [ 'kfc', 'starbucks', 'pepsi', '', '1', -12, '-36', 0, 500 ]
}



VECTORS |> console.log

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: VECTORS|> makeEmbedded,
  methods: {
    ben: x => x,
    cla: vec => vec.join(','),
    join: vec => Iter.join(vec[Symbol.iterator](), ','),
    to: vec => Iter.to(vec[Symbol.iterator](), COLF, 1, BRACKET)
  },
  showPretty: false,
})


for (let side of result.side)
  result.cell(side, 'to') |> console.log

lapse |> console.log