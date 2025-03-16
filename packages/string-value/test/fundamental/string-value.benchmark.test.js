import { test }  from 'node:test'
import { value } from '../../index.js'

const LIST = [
  'Bhutan',
  'Libya',
  'Myanmar',
  'Cote D\'ivore',
  'India',
  'Lao P.D.R.',
  'Mozambique',
  'Cambodia',
  'Senegal',
  'Rwanda',
  'Bangladesh',
  'Ethiopia',
  'Niger',
  'Tanzania',
  'Djibouti',
  'Kenya',
  'Panama',
  'Philippines',
  'Vietnam',
  'China',
  'Brunei',
  'Ghana',
  'Uganda',
  'Burkina Faso',
  'Uzbekistan',
]

export const compare = Function.prototype.call.bind(String.prototype.localeCompare)

function val(x, i) {
  let n = x.charCodeAt(i)
  const p = n >> 5
  if (p === 0) return 0
  if (p === 1) return n & 0xF
  return n & 0x1F
}

// DSV3
const nexo = (str, psl) => {
  const lh = Math.min(6, psl)
  const lt = Math.min(psl - 6, str.length - 6)
  let nh = 0, nt = 0

  for (let i = 0; i < str.length; i++) {
    const value = val(str, i)
    if (i < lh) {
      nh = (nh << 5) | value
    } else if (i >= str.length - lt) {
      nt = (nt << 5) | value
    }
  }

  if (str.length < lh) {
    nh <<= (lh - str.length) * 5
  }
  if (nt) nt /= (1 << (lt * 5))
  return nh + nt
  // return [ nh, nt ]
}

// DSR1
const velo = (str, psl) => {
  const val = (x, i) => {
    const n = x.charCodeAt(i)
    const p = n >> 5
    return p === 0 ? 0 : p === 1 ? n & 0xF : n & 0x1F
  }
  const length = str.length
  const headHi = Math.min(6, psl)
  let headHash = 0, tailHash = 0

  // Process first segment
  for (let i = 0; i < headHi && i < length; i++) {
    headHash = (headHash << 5) | val(str, i)
  }
  headHash <<= (headHi - Math.min(headHi, length)) * 5

  // Process tail segment if needed
  const thres = psl - 6
  if (thres > 0 && length > 6) {
    const tailLen = Math.min(thres, length - 6)
    const tailLo = length - tailLen
    for (let i = tailLo; i < length; i++) {
      tailHash = (tailHash << 5) | val(str, i)
    }
    tailHash /= (1 << (tailLen * 5))
  }
  return headHash + tailHash
}

// Grok3
const loom = (str, psl) => {
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


// C37S
export const pier = (str, psl) => {
  // Calculate how many characters to process from the head
  const headLen = Math.min(6, psl, str.length)
  let headHash = 0

  // Process head characters
  for (let i = 0; i < headLen; i++) {
    headHash = (headHash << 5) | val(str, i)
  }

  // Handle case when string is shorter than expected head length
  if (headLen < Math.min(6, psl)) {
    headHash <<= (Math.min(6, psl) - headLen) * 5
  }

  // Initialize tail hash
  let tailHash = 0

  // Process tail characters only if needed
  if (psl > 6 && str.length > 6) {
    // Calculate how many characters to process from the tail
    const tailLen = Math.min(psl - 6, str.length - 6)
    const tailLo = str.length - tailLen

    // Process tail characters
    for (let i = tailLo; i < str.length; i++) {
      tailHash = (tailHash << 5) | val(str, i)
    }
    tailHash /= (1 << (tailLen * 5))
  }
  return headHash + tailHash
  //return [ headHash, tailHash ]
}

const pedl = (str, psl) => {
  return value(str, psl)
}


test('string-value benchmark', () => {
  // expect(findMaxMin(LIST)).toStrictEqual({ max: 'Zimbabwe', min: 'Afghanistan' })
  const result = nexo(LIST)
  console.log(result)
})

test('string value benchmark', () => {
  const value = 'New York'
  const PSL = 8
  const EPIC = 'nexo'
  const VELO = 'velo'
  const LOOM = 'loom'
  const PIER = 'pier'
  const PEDL = 'pedl'

  const quant = 1e7
  console.log(EPIC, nexo(value, PSL))
  console.log(VELO, velo(value, PSL))
  console.log(LOOM, loom(value, PSL))
  console.log(PIER, pier(value, PSL))
  console.log(PEDL, pedl(value, PSL))

  console.time(EPIC)
  for (let i = 0; i < quant; i++) nexo(value, PSL)
  console.timeEnd(EPIC)

  console.time(VELO)
  for (let i = 0; i < quant; i++) velo(value, PSL)
  console.timeEnd(VELO)

  console.time(LOOM)
  for (let i = 0; i < quant; i++) loom(value, PSL)
  console.timeEnd(LOOM)

  console.time(PIER)
  for (let i = 0; i < quant; i++) pier(value, PSL)
  console.timeEnd(PIER)

  console.time(PEDL)
  for (let i = 0; i < quant; i++) pedl(value, PSL)
  console.timeEnd(PEDL)

})