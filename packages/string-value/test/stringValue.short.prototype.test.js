import { strategies }   from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'
import { lim0up }       from '@aryth/math'

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: [
    'A',
    'AA',
    'aaa',
    'WSJ',
    '1',
    '11',
    '111',
  ]|> makeEmbedded,
  methods: {
    bench: x => x,
    cla: x => {
      x = x.toLowerCase()
      return (((x.charCodeAt(0) & 0x7F) << 14) + ((x.charCodeAt(1) & 0x7F) << 7) + ((x.charCodeAt(2) & 0x7F) << 0))
    },
    fut: x => (((x.charCodeAt(0) & 0x1F) << 10) + ((x.charCodeAt(1) & 0x1F) << 5) + ((x.charCodeAt(2) & 0x1F) << 0)),
    arc: (word, lo = 0) => {
      const hi = word?.length ?? 0
      let span = hi - lo, val = 0, at = 30;
      if (span <= 0) return NaN
      if (span > 3) span = 3
      while (span-- > 0) val += (word.charCodeAt(lo++) & 0x1f) << (at -= 5)
      return val
    },
    dev: (word, lo = 0) => {
      function dec(w, i) {
        let n = word.charCodeAt(i)
        const p = n >> 5
        if (p === 1) return n & 0xF
        if (p === 2 || p === 3) return (n &= 0x1F) > 26 ? 0 : ((n + 3) * 10 >> 5)
        return 0
      }
      const hi = word?.length ?? 0
      let span = lim0up(hi - lo, 3), val = 0, at = 3;
      while (span-- > 0) {
        const d = dec(word, lo++), cur = ~~d * 10 ** (--at);
        val += cur
      }
      return val
    },
    rea: (word, lo = 0) => {
      const hi = word?.length ?? 0
      let span = hi - lo, val = 0, at = 15;
      if (span <= 0) return NaN
      if (span > 3) span = 3
      while (span-- > 0) val += (word.charCodeAt(lo++) & 0x1f) << (at -= 5)
      return val
    }
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']