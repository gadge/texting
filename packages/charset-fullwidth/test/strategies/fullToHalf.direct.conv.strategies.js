import { says }        from '@palett/says'
import { decoCrostab } from '@spare/logger'
import { strategies }  from '@valjoux/strategies'
import { init }        from '@vect/vector-init'
import { REG_FULL }    from '../../assets/regex.js'
import { FullToHalf }  from '../../src/FullToHalf.js'
import { parseNum }    from '../../src/isNumeric.js'

const NUM_FULL = /[\uff0b-\uff19]/g
const NUM_FULL_G = /[\uff0b-\uff19]+/g
const DELTA = 0xFEE0 // 65248
const fullToHalf = FullToHalf({ cjk: false })

class FullToNumParser {
  static simplistic = text => text
    ?.replace(NUM_FULL, s => String.fromCharCode(s.charCodeAt(0) - DELTA))
  static classic = text => {
    let l = text?.length, i = 0, t = '', n
    while (i < l && (n = text.charCodeAt(i++)))
      t += String.fromCharCode(0xFF & (n + 0x20))
    return t
  }
  static dev = text => {
    let ms, l = 0, r = 0, sp, ph, t = ''
    while ((ms = NUM_FULL_G.exec(text)) && ([ph] = ms)) {
      r = ms.index
      if (l !== r && (sp = text.slice(l, r))) t += sp
      t += FullToNumParser.classic(ph)
      l = REG_FULL.lastIndex
    }
    if (l > 0 && l < text?.length) t += text.slice(l)
    return t
  }
  static fut = text => {
    if (!text) return text
    const vec = Array.from(text, x => 0xFF & (x.charCodeAt(0) + 0x20))
    return String.fromCharCode.apply(null, vec)
  }
  static edge = text => {
    if (!text) return text
    const vec = init(text?.length, i => 0xFF & (text.charCodeAt(i) + 0x20))
    return String.fromCharCode.apply(null, vec)
  }
  static byArrayBuffer = text => {
    const hi = text?.length
    const buff = new ArrayBuffer(hi * 2) // 2 bytes for each char
    const view = new Uint16Array(buff)
    for (let i = 0; i < hi; i++) view[i] = 0xFF & (text.charCodeAt(i) + 0x20)
    return String.fromCharCode.apply(null, view)
  }
  static fullToHalf = fullToHalf
  static parseNum = parseNum
}

const { lapse, result } = strategies({
  repeat: 3E+5,
  candidates: {
    aeu: [],
    num_full_a: ['６１８'],
    num_full_b: ['．８９'],
    num_full_c: ['５６７．８９'],
    num_full_d: ['－１，２３４，５６７．８９０'],
  },
  methods: {
    bench: x => x,
    simplistic: FullToNumParser.simplistic,
    classic: FullToNumParser.classic,
    dev: FullToNumParser.dev,
    fut: FullToNumParser.fut,
    edge: FullToNumParser.edge,
    byArrayBuffer: FullToNumParser.byArrayBuffer,
    fullToHalf: FullToNumParser.fullToHalf,
    parseNum: parseNum
  }
})
lapse |> decoCrostab |> says['lapse']
// CrosTab.from(result).transpose().rowwiseSamples(['chs'], true, 'fn')
//   |> decoSamples
//   |> says['result']
result |> decoCrostab |> says['result']