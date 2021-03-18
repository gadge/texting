import { says }                       from '@palett/says'
import { decoCrostab, logger }        from '@spare/logger'
import { parseNum as parseNumStrict } from '@typen/num-strict'
import { strategies }                 from '@valjoux/strategies'
import { init }                       from '@vect/vector-init'
import { REG_FULL }                   from '../../assets/regex'
import { CharConv, FullToHalf }       from '../../src/FullToHalf'
import { parseNum }                   from '../../src/isNumeric'


class FullToNumParser {
  static cla = text => {
    let l = text?.length, i = 0, t = '', n
    while (i < l && (n = text.charCodeAt(i++)))
      t += String.fromCharCode(0xFF & (n + 0x20))
    return parseNumStrict(t.replace(/,/g, ''))
  }
  static dev = text => {
    let l = text?.length, i = 0, t = '', n
    while (i < l && (n = text.charCodeAt(i++)))
      t += String.fromCharCode(0xFF & (n + 0x20))
    return +t.replace(/,/g, '')
  }
  static fut = text => {
    if (!text) return NaN
    let l = text.length, i = 0, t = '', n
    text = text.trim()
    if (text.length >= 4) text = text.replace(/，/g, '')
    while (i < l && (n = text.charCodeAt(i++)))
      t += String.fromCharCode(0xFF & (n + 0x20))
    return parseNumStrict(t)
  }
  static sta = text => {
    if (!text) return NaN
    let l = text.length, i = text.search(NON_SPACE), t = '', n, v
    while (i < l && (n = text.charCodeAt(i++)))
      if (n !== 0xff0c) {
        v = 0xFF & (n + 0x20)
        t += String.fromCharCode(v < n ? v : n)
      }
    return +t
  }
  static ace = text => {
    function conv(text) {
      let tx = '', i = 0, l = text.length, n
      while (i < l && (n = text.charCodeAt(i++))) tx +=
        CharConv.fullChars(n)
      return tx
    }
    let ms, ph
    let t = ''
    while ((ms = NUM_PATTERN.exec(text)) && ([ph] = ms)) t += conv(ph)
    return parseNumStrict(t)
  }
}

const NON_SPACE = /[^\s]/
const NUM_PATTERN = /[－．０-９]+/g

const { lapse, result } = strategies({
  repeat: 0.5E+6,
  candidates: {
    aeu: [],
    null: ['null'],
    false: ['false'],
    sign: ['－'],
    dot: ['．'],
    zero: ['０'],
    one: ['１'],
    integer: ['６１８'],
    decimal: ['．８９'],
    numeric: ['５６７．８９'],
    spaced: ['         ５６７．８９'],
    negative: ['－１，２３４，５６７．８９０'],
    half: ['567.89']
  },
  methods: {
    bench: x => x,
    cla: FullToNumParser.cla,
    dev: FullToNumParser.dev,
    fut: FullToNumParser.fut,
    sta: FullToNumParser.sta,
    ace: FullToNumParser.ace,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']