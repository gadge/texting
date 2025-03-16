import { test } from 'node:test'

const LIST = [
  '',
  'A1',
  'Dallas',
  'Zealand',
  'New York',
  'Chicago Naperville Elgin',
  'Los Angeles Long Beach Anaheim',
]

export const valToVec = num => {
  const vec = []
  while (num > 0) {
    vec.unshift(num & 0x1F)
    num >>= 5
  }
  return vec
}

const strval = (str, psl) => {
  const val = (x, i) => {
    const n = x.charCodeAt(i)
    return n < 32 ? 0 : n < 64 ? n & 0xF : n & 0x1F
  }

  const length = str.length
  const headHi = Math.min(6, psl)
  const headLen = Math.min(headHi, length)

  let headHash = 0
  for (let i = 0; i < headLen; i++) {
    headHash = (headHash << 5) | val(str, i)
  }
  headHash <<= (headHi - headLen) * 5

  let tailHash = 0
  if (psl > 6 && length > 6) {
    const tailLen = Math.min(psl - 6, length - 6)
    const tailStart = length - tailLen
    for (let i = tailStart; i < length; i++) {
      tailHash = (tailHash << 5) | val(str, i)
    }
    return headHash + tailHash / (1 << tailLen * 5)
  }

  return headHash
}
test('strval', () => {
  for (let t of LIST) {
    const value = strval(t, 9)
    console.log(t,value, `head [ ${valToVec(value).join(' ')} ]`, `tail [ ${valToVec(value).join(' ')} ]`)
  }
})