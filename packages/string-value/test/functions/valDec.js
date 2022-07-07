function valDec(x, i) {
  let n = x.charCodeAt(i), p = n >> 5
  if (p === 1) return n & 0xF
  if (p === 2 || p === 3) return (n &= 0x1F) > 26 ? 0 : ((n + 3) * 10 >> 5)
  return 0
}