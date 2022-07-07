import { indexes } from '@vect/vector-init'

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

const candidates = indexes(32)
for (let n of candidates) {
  `[${String.fromCharCode(n + 64)}] (${n}) [n & 7] (${n & 7}) [n >> 2] (${n >> 2})` |> console.log
}
export const valueX = word => {
  const hi = word?.length ?? 0
  if (hi === 0) return NaN
  if (hi === 1) return v1(word)
  if (hi === 2) return v2(word)
  if (hi === 3) return v3(word)
  if (hi === 4) return v4(word)
  if (hi === 5) return v1(word)
  if (hi === 6) return v2(word)
  if (hi === 7) return v3(word)
  if (hi === 8) return v4(word)
  if (hi === 9) return v1(word)
  if (hi === 10) return v2(word)
  if (hi === 3) return v3(word)
  if (hi === 4) return v4(word)

}