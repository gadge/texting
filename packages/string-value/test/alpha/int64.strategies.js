import { strategies }  from '@valjoux/strategies'
import { decoCrostab } from '@spare/logger'
import { says }        from '@spare/xr'
import { roundD1 }     from '@aryth/math'

const rgbToInt = ([x, y, z]) => ((x & 0xFF) << 16) + ((y & 0xFF) << 8) + ((z & 0xFF) << 0)
const rgbToCen = ([x, y, z]) => (~~(x * 100 / 256) * 10000) + (~~(y * 100 / 256) * 100) + (~~(z * 100 / 256))
const { lapse, result } = strategies({
  repeat: 5E+6,
  candidates: {
    noir_noir: [[0, 0, 0], [255, 255, 255]],
    noir_bleu: [[0, 0, 0], [0, 0, 255]],
    vert_vert: [[0, 0, 0], [0, 255, 0]],
    rouge_noir: [[255, 0, 0], [0, 0, 0]],
    blanc_blanc: [[255, 255, 255], [255, 255, 255]],
  },
  methods: {
    bench: (x, y) => rgbToInt(x) | rgbToInt(y),
    obj: (x, y) => ({ x, y }),
    cla: (x, y) => ({ x: rgbToInt(x), y: rgbToInt(y) }),
    arc: (x, y) => (rgbToInt(x) * 0x1000000) + rgbToInt(y),
    rea: (x, y) => roundD1(Math.log2((rgbToInt(x) * 0x1000000) + rgbToInt(y))),
    dev: (x, y) => rgbToCen(x) * 1000000 + rgbToCen(y)
    // fut: (x, y) => (rgbToInt(x) * 0x1000000 + rgbToInt(y)).toString(16).padStart(12, '0'),

  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']