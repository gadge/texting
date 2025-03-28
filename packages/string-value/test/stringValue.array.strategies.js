import { init }                     from '@vect/vector-init'
import { DecoCrostab, decoCrostab } from '@spare/logger'
import { says }                     from '@spare/xr'
import { makeEmbedded }             from '@foba/util'
import { strategies }               from '@valjoux/strategies'
import { stringValue }              from '../src/alpha.js'
import { mapper }                   from '@vect/vector-mapper'
import { value }                    from '../src/value.js'
import { values }                   from '../src/values.js'

const { lapse, result } = strategies({
  repeat: 3E+5,
  candidates: {
    As: init(8, i => 'A'.repeat(i + 1)),
    upTo4: [ 'A', 'AB', 'ABC', 'ABCD' ],
    upTo5: [ '0', '01', '012', '0123', '01234' ],
    dates: [ '2022-01-31', '2022-02-28', '2022-03-31', '2022-06-30', '2022-09-30', '2022-12-31' ],
    words: [ 'Alexander', 'Caesar', 'Putin', 'Hannibal', 'Farnese', 'Charles', 'Frederick', 'Napoleon' ]
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    cla: xs => xs.map(stringValue),
    rea: xs => {
      const sorted = xs.slice().sort()
      return mapper(xs, x => sorted.indexOf(x))
    },
    hex: xs => {
      let wd = 0, ind = 0, size = xs.length
      for (let i = 0, cu; i < size; i++) if ((cu = xs[i].length) > wd) { wd = cu, ind = i }
      if (wd === 1) { return xs.map(x => x.charCodeAt(0))}
      if (wd === 2) { return xs.map(x => ((x.charCodeAt(0) & 0xFF) << 8) + ((x.charCodeAt(1) & 0xFF) << 0))}
      if (wd === 3) { return xs.map(x => ((x.charCodeAt(0) & 0xFF) << 16) + ((x.charCodeAt(1) & 0xFF) << 8) + ((x.charCodeAt(2) & 0xFF) << 0))}
      return xs.map(x => value(x, wd))
    },
    fut: values,
    arc: xs => {
      let wd = 0, ind = 0, size = xs.length
      for (let i = 0, cu; i < size; i++) if ((cu = xs[i].length) > wd) { wd = cu, ind = i }
      if (wd === 1) { return xs.map(x => x.charCodeAt(0))}
      if (wd === 2) { return xs.map(x => ((x.charCodeAt(0) & 0xFF) << 8) + ((x.charCodeAt(1) & 0xFF) << 0))}
      if (wd === 3) { return xs.map(x => ((x.charCodeAt(0) & 0xFF) << 16) + ((x.charCodeAt(1) & 0xFF) << 8) + ((x.charCodeAt(2) & 0xFF) << 0))}
      function relVal(tx, ty) {
        const hi = Math.min(tx.length, ty.length)
        let v = 0, p = 30
        for (let i = 0, cx, cy; i < hi; i++) {
          cx = tx.charCodeAt(i), cy = ty.charCodeAt(i)
          if (cx > cy) {v += (cx << p)}
          else if (cx < cy) {v -= (cx << p)}
          p--
        }
        return v
      }
      const ns = Array(size)
      for (let i = 0; i < size; i++) ns[i] = relVal(xs[ind], xs[i])
      return ns
    },
    // dev: xs => {},

  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']
const result2 = result.slice()
result2.headward.select([ 'fut' ])
result2 |> DecoCrostab({ read: xs => xs.map(x => x.toString(16).toUpperCase()) }) |> console.log

