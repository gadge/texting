const X32VAL = {
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
};

function val$1(x, i) {
  let n = x.charCodeAt(i), p = n >> 5;
  if (p === 1) return n & 0xF
  if (p === 2 || p === 3) return X32VAL[n & 0x1F]
  return 0
}

function head(x, lo, hi) {
  let i = (hi - lo) << 2, n = 0;
  if (hi > x.length) hi = x.length;
  if (hi <= lo) return n
  while (lo < hi) n += val$1(x, lo++) << (i -= 4);
  return n
}

function tail(x, lo, hi) {
  if (hi > x.length) hi = x.length;
  if (hi <= lo) return 0
  let i = 28, n = 0;
  while (lo < hi) n += val$1(x, lo++) << (i -= 4);
  return n
}

// each char conv to 16
const B28 = 0x10000000;

function value(x, hi) {
  if (hi <= 7) return head(x, 0, hi)
  if (hi <= 14) return head(x, 0, 7) * B28 + tail(x, 7, hi)
  return head(x, 0, 7) * B28 + tail(x, hi - 7, hi)
}

function values(xs) {
  let hi = 0, sz = xs.length, cu;
  for (let i = 0; i < sz; i++) if ((cu = xs[i].length) > hi) { hi = cu; }
  return xs.map(x => value(x, hi))
}

// if (hi === 1) return xs.map(valFF1)
// if (hi === 2) return xs.map(valFF2)
// if (hi === 3) return xs.map(valFF3)
// if (hi === 4) return xs.map(valFF4)

const val = (x, i) => {
  const n = x.charCodeAt(i);
  return n < 32 ? 0 : n < 64 ? n & 0xF : n & 0x1F
};

const hash = (str, psl) => {
  const length = str.length;
  const hThres = Math.min(6, psl);
  const hLen = Math.min(hThres, length);

  let hVal = 0;
  for (let i = 0; i < hLen; i++) {
    hVal = (hVal << 5) | val(str, i);
  }
  hVal <<= (hThres - hLen) * 5;

  let tVal = 0;
  if (psl > 6 && length > 6) {
    const tLen = Math.min(psl, length) - 6;
    const tLo = length - tLen;
    for (let i = tLo; i < length; i++) {
      tVal = (tVal << 5) | val(str, i);
    }
    hVal += tVal / (1 << tLen * 5);
  }

  return hVal
};

export { hash, hash as stringValue, hash as value, values };
