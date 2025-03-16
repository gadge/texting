import { test } from 'node:test'

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

// DSR1 Official
const nexo = (arr) => {
  const sorted = [ ...arr ].sort()
  const rankMap = {}
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] in rankMap) continue
    rankMap[sorted[i]] = i
  }
  return arr.map(element => rankMap[element])
}

// Grok3
const velo = (array) => {

  // Step 1 & 2: Get unique strings and sort them
  const uniqueSorted = [ ...new Set(array) ].sort()

  // Step 3: Create a rank map
  const rankMap = new Map(uniqueSorted.map((str, index) => [ str, index + 1 ]))

  // Step 4: Map each element in the original array to its rank
  return array.map(str => rankMap.get(str))

}

// Claude
const loom = arr => {
  // Create a copy of the array with their original indices
  const indexed = arr.map((value, index) => ({ value, index }))

  // Sort the indexed array by values
  indexed.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })

  // Create an array to store ranks
  const ranks = new Array(arr.length)

  // Assign ranks to each element
  for (let i = 0; i < indexed.length; i++) {
    // Handle ties by assigning the same rank
    if (i > 0 && indexed[i].value === indexed[i - 1].value) {
      ranks[indexed[i].index] = ranks[indexed[i - 1].index]
    } else {
      ranks[indexed[i].index] = i + 1 // +1 to make ranks 1-based instead of 0-based
    }
  }

  return ranks
}

// volcengine
const pier = arr => {
  // 1. Create array with original indices
  const indexed = arr.map((str, index) => ({ str, index }))

  // 2. Sort by string value (lexicographic order)
  indexed.sort((a, b) => a.str.localeCompare(b.str))

  // 3. Assign ranks
  const ranks = new Array(arr.length)
  let currentRank = 1
  for (let i = 0; i < indexed.length; i++) {
    if (i > 0 && indexed[i].str !== indexed[i - 1].str) {
      currentRank = i + 1 // Competition ranking (no ties)
    }
    ranks[indexed[i].index] = currentRank
  }

  return ranks
}


test('findMaxMin', () => {
  // expect(findMaxMin(LIST)).toStrictEqual({ max: 'Zimbabwe', min: 'Afghanistan' })
  const result = nexo(LIST)
  console.log(result)
})

test('string value benchmark', () => {

  const EPIC = 'nexo'
  const EDGE = 'velo'
  const LOOM = 'loom'
  const PIER = 'pier'

  const quant = 1e5
  console.log(EPIC, nexo(LIST))
  console.log(EDGE, velo(LIST))
  console.log(LOOM, loom(LIST))
  console.log(PIER, pier(LIST))

  console.time(EPIC)
  for (let i = 0; i < quant; i++) nexo(LIST)
  console.timeEnd(EPIC)

  console.time(EDGE)
  for (let i = 0; i < quant; i++) velo(LIST)
  console.timeEnd(EDGE)

  console.time(LOOM)
  for (let i = 0; i < quant; i++) loom(LIST)
  console.timeEnd(LOOM)

  console.time(PIER)
  for (let i = 0; i < quant; i++) pier(LIST)
  console.timeEnd(PIER)

})