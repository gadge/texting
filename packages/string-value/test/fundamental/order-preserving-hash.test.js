import { test }             from 'node:test'
import { strval, valToVec } from './strval.js'

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

const nexo = (list) => {
  let max = null, min = null
  for (let t of list) {
    if (max === null) max = min = t
    else compare(t, min) < 0 ? (min = t) : compare(t, max) > 0 ? (max = t) : t
  }
  return { max, min }
}

const velo = (list) => {
  let max = null, min = null
  const bin = {}
  let v
  for (let t of list) {
    v = strval(t, 5)
    bin[v] = t
    console.log(t, v, valToVec(v))
    if (max === null) max = min = v
    if (v > max) max = v
    if (v < min) min = v
  }
  // return { max, min }
  console.log(bin)
  return { max: bin[max], min: bin[min] }
}

const loom = (list) => {
  function hash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0  // Convert to 32-bit integer
    }
    return hash
  }
  let max = null, min = null
  // const bin = {}
  let v
  for (let t of list) {
    v = hash(t)
    // bin[v] = t
    if (max === null) max = min = v
    if (v > max) max = v
    if (v < min) min = v
  }
  return { max, min }
  // return { max: bin[max], min: bin[min] }
}

const pier = (list) => {
  function hash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash >>> 0 // Convert to unsigned
  }
  let max = null, min = null
  // const bin = {}
  let v
  for (let t of list) {
    v = hash(t)
    // bin[v] = t
    if (max === null) max = min = v
    if (v > max) max = v
    if (v < min) min = v
  }
  // console.log(bin)
  return { max, min }
  // return { max: bin[max], min: bin[min] }
}

const pedl = (list) => {
  function opHash(str) {
    let hash = 0.0          // Initialize hash as a floating-point number
    const frac = 1.0 / 255 // Scale factor based on 8-bit character range
    let hi = str.length
    for (--hi; hi > 0; hi--) {
      const v = str.charCodeAt(hi)        // Get Unicode code point of the character
      const sv = (v & 0xFF) * frac // Use only the lower 8 bits and scale it
      hash *= frac
      hash += sv
      // hash = hash * scale + scaledValue         // Update hash value
    }
    // Iterate through each character in the string
    // for (let i = 0; i < str.length; i++) {
    //   const charCode = str.charCodeAt(i)        // Get Unicode code point of the character
    //   const scaledValue = (charCode & 0xFF) * scale // Use only the lower 8 bits and scale it
    //   hash = hash * scale + scaledValue         // Update hash value
    // }
    return hash // Return the final hash value
  }
  let max = null, min = null
  // const bin = {}
  let v
  for (let t of list) {
    v = opHash(t)
    // bin[v] = t
    if (max === null) max = min = v
    if (v > max) max = v
    if (v < min) min = v
  }
  // console.log(bin)
  return { max, min }
  // return { max: bin[max], min: bin[min] }
}


test('findMaxMin', () => {
  // expect(findMaxMin(LIST)).toStrictEqual({ max: 'Zimbabwe', min: 'Afghanistan' })
  const result = nexo(LIST)
  console.log(result)
})

test('string value benchmark', () => {

  const EPIC = 'nexo'
  const VELO = 'velo'
  const LOOM = 'loom'
  const PIER = 'pier'
  const PEDL = 'pedl'

  const quant = 1e5
  console.log(EPIC, nexo(LIST))
  console.log(VELO, velo(LIST))
  console.log(LOOM, loom(LIST))
  console.log(PIER, pier(LIST))
  console.log(PEDL, pedl(LIST))

  console.time(EPIC)
  for (let i = 0; i < quant; i++) nexo(LIST)
  console.timeEnd(EPIC)

  console.time(VELO)
  // for (let i = 0; i < quant; i++) velo(LIST)
  console.timeEnd(VELO)

  console.time(LOOM)
  for (let i = 0; i < quant; i++) loom(LIST)
  console.timeEnd(LOOM)

  console.time(PIER)
  for (let i = 0; i < quant; i++) pier(LIST)
  console.timeEnd(PIER)

  console.time(PEDL)
  for (let i = 0; i < quant; i++) pedl(LIST)
  console.timeEnd(PEDL)

})