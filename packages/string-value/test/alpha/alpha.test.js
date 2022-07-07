import { strategies }   from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'

const candidates = [
  'A',
  'B',
  'Z',
  'a',
  'b',
  'z',
]

for (let letter of candidates) {
  const code = letter.charCodeAt(0);
  `[${letter}] (${code}) [code >> 5] (${code >> 5}) [code & 0x1f] (${code & 0x1f})` |> console.log
}

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
    a: 'a'.charCodeAt(0),
    z: 'z'.charCodeAt(0),
    0: '0'.charCodeAt(0),
    9: '9'.charCodeAt(0),
  } |> makeEmbedded,
  methods: {
    group32: x => x >> 5,
    index32: x => x & 0x1F,
    value32: x => (x & 0x1F) / 32,
    group16: x => x >> 4,
    index16: x => x & 0xF,
    value16: x => (x & 0xF) / 16,
    arc: x => x - 'A',
    dev: x => x,
    fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']