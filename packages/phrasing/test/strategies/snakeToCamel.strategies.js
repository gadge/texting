import { makeEmbedded }                 from '@foba/util'
import { decoCrostab, says }            from '@spare/logger'
import { DASH_CAPREST, INIWORD, WORD }  from '@texting/regex-phrasing'
import { strategies } from '@valjoux/strategies'
import { capitalize } from '../../src/case.js'
import { candidates } from '../candidates.js'
import { byReplace, classic, mutative } from './functions/dashedToCamel.js'

const { lapse, result } = strategies({
  repeat: 2E+5,
  candidates: candidates |> makeEmbedded,
  methods: {
    bench: x => '',
    classic,
    mutative,
    iter: dashed => {
      let ms, wd, ph = ''
      if ((ms = WORD.exec(dashed)) && ([wd] = ms)) ph = wd.toLowerCase()
      while ((ms = WORD.exec(dashed)) && ([wd] = ms)) ph += capitalize(wd)
      return ph
    },
    iterCapRest: dashed => {
      let ms, cap, wd, ph = ''
      if ((ms = INIWORD.exec(dashed)) && ([wd] = ms)) ph = wd.toLowerCase()
      while ((ms = DASH_CAPREST.exec(dashed)) && ([, cap, wd] = ms)) ph += (cap.toUpperCase() + wd.toLowerCase())
      return ph
    },
    byReplace,
    // _: x => '',
  },
  showParams: false
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
