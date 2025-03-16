const val = (x, i) => {
  const n = x.charCodeAt(i)
  return n < 32 ? 0 : n < 64 ? n & 0xF : n & 0x1F
}

export const hash = (str, psl) => {
  const length = str.length
  const hThres = Math.min(6, psl)
  const hLen = Math.min(hThres, length)

  let hVal = 0
  for (let i = 0; i < hLen; i++) {
    hVal = (hVal << 5) | val(str, i)
  }
  hVal <<= (hThres - hLen) * 5

  let tVal = 0
  if (psl > 6 && length > 6) {
    const tLen = Math.min(psl, length) - 6
    const tLo = length - tLen
    for (let i = tLo; i < length; i++) {
      tVal = (tVal << 5) | val(str, i)
    }
    hVal += tVal / (1 << tLen * 5)
  }

  return hVal
}