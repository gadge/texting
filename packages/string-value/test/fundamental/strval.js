export const X32VAL = {
  0: 0,
  1: 0, // A
  2: 1, // B
  3: 2, // C
  4: 3, // D
  5: 3, // E
  6: 4, // F
  7: 4, // G
  8: 5, // H
  9: 5, // I
  10: 6, // J
  11: 6, // K
  12: 7, // L
  13: 7, // M
  14: 8, // N
  15: 8, // O
  16: 9, // P
  17: 9, // Q
  18: 10, // R
  19: 10, // S
  20: 11, // T
  21: 11, // U
  22: 12, // V
  23: 12, // W
  24: 13, // X
  25: 14, // Y
  26: 15, // Z
  27: 0,
  28: 0,
  29: 0,
  30: 0,
  31: 0,
}

function val(x, i) {
  let n = x.charCodeAt(i)
  return n >> 5 ? n & 0x1F : 0
}

// function val(x, i) {
//   let n = x.charCodeAt(i)
//   return n & 0x1f
//   // const p = n >> 5
//   // if (p === 1) return n & 0xF
//   // n &= 0x1F
//   // n /= 2
//   // return n
//   // if (p === 2 || p === 3) return X32VAL[n & 0x1F]
//   // return 0
// }

function val2(x, i) {
  let n = x.charCodeAt(i)
  n &= 0x1F
  n >>= 1
  return n
}

export function head_prev(x, hi) {
  let bit = hi << 2, n = 0
  let lo = 0
  while (lo < hi) n += val(x, lo++) << (bit -= 4)
  return n
}


const B30 = 0x80000000 // 2 ^ 30
const FB30 = 4.656612873077393E-10
export const valToVec = num => {
  const vec = []
  while (num > 0) {
    vec.unshift(num & 0x1F)
    num >>= 5
  }
  return vec
}
export function strval(x, hi) {
  function head(x, hi) {
    let n = 0
    for (let i = 0, v; i < hi; i++) {
      n = (n << 5) | val(x, i)
      console.log(i, val(x, i), n)
    }
    return n
  }
  function tail(x, n) {
    const hi = x.length
    const lo = Math.max(0, hi - Math.min(n, hi))
    let tv = 0
    for (let i = lo; i < hi; i++) {
      tv = (tv << 5) | val(x, i)
    }
    return tv
  }
  if (hi <= 6) return head(x, hi)
  if (hi <= 12) return head(x, 6) + tail(x, hi - 6) * FB30
  return head(x, 6) + tail(x, 6) * FB30
}