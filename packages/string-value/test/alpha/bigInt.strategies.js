import { strategies }               from '@valjoux/strategies'
import { DecoCrostab, decoCrostab } from '@spare/logger'
import { says }                     from '@spare/xr'

const bigToInt = ([x, y, z]) => ((x & 0xFFn) << 16n) + ((y & 0xFFn) << 8n) + ((z & 0xFFn) << 0n)

const { lapse, result } = strategies({
  repeat: 2E+5,
  candidates: {
    noir_noir_noir: [[0n, 0n, 0n], [0n, 0n, 0n], [0n, 0n, 0n]],
    noir_noir_bleu: [[0n, 0n, 0n], [0n, 0n, 0n], [0n, 0n, 255n]],
    rouge_vert_bleu: [[255n, 0n, 0n], [0n, 255n, 0n], [0n, 0n, 255n]],
    rouge_noir_noir: [[255n, 0n, 0n], [0n, 0n, 0n], [0n, 0n, 0n]],
    blanc_blanc_blanc: [[255n, 255n, 255n], [255n, 255n, 255n], [255n, 255n, 255n]],
  },
  methods: {
    bench: (x, y, z) => ({ x, y, z }),
    cla: (x, y, z) => (bigToInt(x) << 48n) + (bigToInt(x) << 24n) + bigToInt(x),
    // rea: (x, y, z) => ((BigInt(x) & 0xFFn) << 16n) + ((BigInt(y) & 0xFFn) << 8n) + ((BigInt(z) & 0xFFn) << 0n),
    // arc: (x, y, z) => ((x & 255) * 0x100000000) + ((y & 0xFF) * 0x1000000) + ((z & 0xFF) * 0x10000),
    // dev: (x, y, z) => (((x & 255) << 16) + ((y & 0xFF) << 8) + ((z & 0xFF) << 0)) * 16777216,
    // fut: (x, y, z) => (((x & 255) << 16) + ((y & 0xFF) << 8) + ((z & 0xFF) << 0)) * 16777216 / 16777216,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> DecoCrostab({ read: x => x.toString() }) |> says['result']