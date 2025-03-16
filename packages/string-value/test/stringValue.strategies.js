import { init }                           from '@vect/vector-init'
import { SP }                             from '@texting/enum-chars'
import { strategies }                     from '@valjoux/strategies'
import { makeEmbedded }                   from '@foba/util'
import { decoCrostab }                    from '@spare/logger'
import { says }                           from '@spare/xr'
import { stringValue }                    from '../src/alpha.js'
import { value as valueBeta, valueGamma } from '../src/beta.js'
import { value }                          from '../src/value.js'

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: makeEmbedded([
    ...init(8, i => 'A'.repeat(i + 1)),
    ...'comprehend how it\'s driven by animal spirits'.split(SP),
    'Warren',
    'WSJ',
    'GlobalTimes',
    'ZZZZ',
    'zzzz',
    'MetalGear 1',
    'MetalGear 2'
  ]),
  methods: {
    bench: x => x,
    cla: x => stringValue(x),
    val: x => value(x),
    fut: x => valueBeta(x),
    arc: x => valueGamma(x),
    // rea: x => x,
  }
})
says['lapse'](decoCrostab(lapse))
says['result'](decoCrostab(result))