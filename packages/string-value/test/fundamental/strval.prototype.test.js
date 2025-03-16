import { test } from 'node:test'

const LIST = [
  'A1',
  'Dallas',
  'Zealand',
  'New York',
  'Chicago Naperville Elgin',
  'Los Angeles Long Beach Anaheim',
]

function val(x, i) {
  let n = x.charCodeAt(i)
  const p = n >> 5
  if (p === 0) return 0
  if (p === 1) return n & 0xF
  return n & 0x1F
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

export function strval(str, psl) {
  function val(x, i) {
    let n = x.charCodeAt(i)
    const p = n >> 5
    if (p === 0) return 0
    if (p === 1) return n & 0xF
    return n & 0x1F
  }
  // Process first part (head) - up to 6 chars
  const lh = Math.min(6, psl)
  let nh = 0, nt = 0

  // Calculate head value
  for (let i = 0; i < lh && i < str.length; i++) {
    nh = (nh << 5) | val(str, i)
  }

  // Align nh bits to (psl * 5 bits) space
  // If string is shorter than lh, left-shift to align properly
  if (str.length < lh) {
    const missingChars = lh - str.length
    nh <<= (missingChars * 5)
  }

  // If we need to process tail (psl > 6)
  if (psl > 6 && str.length > 6) {
    // Calculate tail value from the end of string
    const lt = Math.min(psl - 6, str.length - 6)
    const lo = str.length - lt

    for (let i = lo; i < str.length; i++) {
      nt = (nt << 5) | val(str, i)
    }
  }

  return [ nh, nt ]
}

test('strval', () => {
  for (let t of LIST) {
    const [ nh, nt ] = strval(t, 9)
    console.log(t, nh, nt, `head [ ${valToVec(nh).join(' ')} ]`, `tail [ ${valToVec(nt).join(' ')} ]`)
  }
})