import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { LITERAL }           from '@texting/regex-phrasing'
import { strategies }        from '@valjoux/strategies'
import { splitter }          from '../../../index.js'
import { candidates }        from '../candidates.js'
import { decoStringIter }    from './iterate.js'
import { WORDREG }           from './regexps.js'

const SPLIT_REG = /(?<=\W+|_+)|(?=\W+|_+)/g

const { lapse, result } = strategies({
  repeat: 1E+5,
  candidates: candidates|> makeEmbedded,
  methods: {
    bench: x => x.split(/\W+|_+/g),
    literal: x => splitter(x, LITERAL),
    wordReg: x => splitter(x, WORDREG),
    native: x => x.split(SPLIT_REG),
    iterate: x => decoStringIter(x),
  }
})

lapse|> decoCrostab |> says['lapse']
result|> decoCrostab |> says['result']