import { indexes }      from '@vect/vector-init'
import { strategies }   from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'
import { wind }         from '@vect/object-init'

for (let code of indexes(32)) {
  `[${code}] (${(~~(((code & 0x1F) + 3) * 10 >> 5)) & 9}) ` |> console.log
}

const CODEX = {
  1: 1, // A
  2: 1, // B
  3: 1, // C
  4: 2, // D
  5: 2, // E
  6: 2, // F
  7: 3, // G
  8: 3, // H
  9: 4, // I
  10: 4, // J
  11: 4, // K
  12: 5, // L
  13: 5, // M
  14: 5, // N
  15: 6, // O
  16: 6, // P
  17: 6, // Q
  18: 7, // R
  19: 7, // S
  20: 7, // T
  21: 8, // U
  22: 8, // V
  23: 8, // W
  24: 9, // X
  25: 9, // Y
  26: 9, // Z
}
const { lapse, result } = strategies({
  repeat: 4E+6,
  candidates: wind(indexes(32), indexes(32)) |> makeEmbedded,
  methods: {
    bench: x => ~x,
    dic: x => CODEX[x] ?? 0,
    fut: x => {
      const v = ~~(((x & 0x1F) + 3) * 10 >> 5) // x &= 0x1F, x += 3, x *= 10, x >>= 5
      return v > 9 ? 9 : v
    },
    dev: x => (x &= 0x1F) > 26 ? 0 : ((x + 3) * 10 >> 5),
    // arc: x => ~x,
    // fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']