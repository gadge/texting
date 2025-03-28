import { CrosTab }                                from '@analys/crostab'
import { makeEmbedded }                           from '@foba/util'
import { delogger }                               from '@spare/deco'
import { decoCrostab, decoSamples, logger, says } from '@spare/logger'
import { strategies }                             from '@valjoux/strategies'
import { dateTime }                               from '@valjoux/timestamp-pretty'
import { candidates }                             from '../candidates.js'
import { foldArc }                                from './src/foldArc.js'
import { foldDev }                                from './src/foldDev.js'
import { foldEdg }                                from './src/foldEdg.js'
import { foldZen }                                from './src/foldZen.js'

const test = () => {
  const { lapse, result } = strategies({
    repeat: 1E+5,
    candidates: candidates|> makeEmbedded,
    methods: {
      foldArc: foldArc,
      foldDev: foldDev,
      foldEdg: foldEdg,
      foldZen: foldZen
    }
  })
  lapse |> decoCrostab |> says['lapse'].p(dateTime())
  '' |> logger
  result |> decoCrostab |> says['result'].p(dateTime())
  CrosTab.from(result).columnwiseSamples(['Modigliani'], true, 'method') |> decoSamples |> delogger
}
test()