import { init }       from '@vect/vector-init'
import { SP }         from '@texting/enum-chars'
import { decoMatrix } from '@spare/logger'

const candidates = [
  ...init(8, i => 'A'.repeat(i + 1)),
  ...'comprehend how it\'s driven by animal spirits'.split(SP),
  'Warren',
  'WSJ',
  'GlobalTimes',
  'ZZZZ',
  'zzzz',
  'MetalGear 1',
  'MetalGear 2',
  '2022-06-01',
  '2022-06-02',
  '2022-06-03'
]

const values = words => {
  function maxLength(vec) {
    let max = 0, ind = 0
    for (let i = 0, len; i < vec.length; i++) if ((len = vec[i].length) > max) {max = len, ind = i}
    return { max, ind, word: vec[ind] }
  }
  let { max, ind, word } = maxLength(words)
  if (max > 30) max = 30
  const matrix = Array(words.length)
  for (let i = 0; i < words.length; i++) {
    const row = matrix[i] = Array(max)
    for (let j = 0, word = words[i], code; j < max; j++) {
      row[j] = isNaN(code = word.charCodeAt(j)) ? code : code & 0x1F
    }
  }
  return matrix
}

const valuesBeta = words => {
  function lengthBound(vec) {
    let lo = 0, hi = 0, ht = vec.length
    for (let i = 0, wd; i < ht; i++) if ((wd = vec[i].length) > hi) { hi = wd } else if (wd < lo) { lo = wd }
    return { lo, hi }
  }
  const { lo, hi } = lengthBound(words)
  if (hi <= 6) {

  }
  if (hi <= 30) {

  }
  if (hi > 30) {

  }
  if (lo < hi) {
  } else {

  }
}

values(candidates) |> decoMatrix |> console.log