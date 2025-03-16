import { value } from './value.js'

const B24 = 0x1000000
const valFF1 = x => x.charCodeAt(0)
const valFF2 = x => ((x.charCodeAt(0) & 0xFF) << 8) + ((x.charCodeAt(1) & 0xFF) << 0)
const valFF3 = x => ((x.charCodeAt(0) & 0xFF) << 16) + ((x.charCodeAt(1) & 0xFF) << 8) + ((x.charCodeAt(2) & 0xFF) << 0)
const valFF4 = x => ((x.charCodeAt(0) & 0xFF) * B24) + ((x.charCodeAt(1) & 0xFF) << 16) + ((x.charCodeAt(2) & 0xFF) << 8) + ((x.charCodeAt(3) & 0xFF) << 0)

export function values(xs) {
  let hi = 0, sz = xs.length, cu
  for (let i = 0; i < sz; i++) if ((cu = xs[i].length) > hi) { hi = cu }
  return xs.map(x => value(x, hi))
}

// if (hi === 1) return xs.map(valFF1)
// if (hi === 2) return xs.map(valFF2)
// if (hi === 3) return xs.map(valFF3)
// if (hi === 4) return xs.map(valFF4)