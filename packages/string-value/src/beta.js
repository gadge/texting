const v1 = (word, lo) => {
  return ((word.charCodeAt(lo) & 0x1f) << 15)
}
const v2 = (word, lo) => {
  return ((word.charCodeAt(lo) & 0x1f) << 15) + ((word.charCodeAt(++lo) & 0x1f) << 10)
}
const v3 = (word, lo) => {
  return ((word.charCodeAt(lo) & 0x1f) << 15) + ((word.charCodeAt(++lo) & 0x1f) << 10) + ((word.charCodeAt(++lo) & 0x1f) << 5)
}
const v4 = (word, lo) => {
  return ((word.charCodeAt(lo) & 0x1f) << 15) + ((word.charCodeAt(++lo) & 0x1f) << 10) + ((word.charCodeAt(++lo) & 0x1f) << 5) + ((word.charCodeAt(++lo) & 0x1f) << 0)
}

export const value = (word, lo = 0) => {
  const hi = word?.length ?? 0
  const gap = hi - lo
  if (gap <= 0) return NaN
  if (gap >= 8) return v4(word, lo)
  if (gap === 7) return v4(word, lo)
  if (gap === 6) return v4(word, lo)
  if (gap === 5) return v4(word, lo)
  if (gap === 4) return v4(word, lo)
  if (gap === 3) return v3(word, lo)
  if (gap === 2) return v2(word, lo)
  if (gap === 1) return v1(word, lo)
}

export const valueGamma = (word, lo = 0) => {
  const hi = word?.length ?? 0
  let gap = hi - lo
  if (gap <= 0) return NaN
  if (gap > 6) gap = 6
  let val = 0, mov = 30;
  while (gap-- > 0) {
    mov -= 5;
    const code = word.charCodeAt(lo), loc = code & 0x1f, curr = loc << mov;
    // `[char] (${word[lo]}) [code] (${code}) [mov] (${mov}) [loc] (${loc}) [curr] (${curr})` |> console.log
    val += curr
  }
  return val
}

export const valueDelta = (word, lo = 0) => {
  const hi = word?.length ?? 0
  let gap = hi - lo
  if (gap <= 0) return NaN
  if (gap > 6) gap = 6
  let val = 0, mov = 30;
  while (gap-- > 1) {
    val += (word.charCodeAt(lo++) & 0x1f) << (mov -= 5)
  }
  return val
}