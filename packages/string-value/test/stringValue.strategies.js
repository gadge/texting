import { init }                           from '@vect/vector-init'
import { SP }                             from '@texting/enum-chars'
import { strategies }                     from '@valjoux/strategies'
import { makeEmbedded }                   from '@foba/util'
import { decoCrostab }                    from '@spare/logger'
import { says }                           from '@spare/xr'
import { stringValue }                    from '../src/alpha.js'
import { value as valueBeta, valueGamma } from '../src/beta'
import { value }                          from '../src/value.js'

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: [
    ...init(8, i => 'A'.repeat(i + 1)),
    ...'comprehend how it\'s driven by animal spirits'.split(SP),
    'Warren',
    'WSJ',
    'GlobalTimes',
    'ZZZZ',
    'zzzz',
    'MetalGear 1',
    'MetalGear 2'
  ]|> makeEmbedded,
  methods: {
    bench: x => x,
    cla: x => stringValue(x),
    val: x => value(x),
    fut: x => valueBeta(x),
    arc: x => valueGamma(x),
    // rea: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']