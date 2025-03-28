import { SP }                                   from '@texting/enum-chars'
import { toLower, wordsToCamel, wordsToPascal } from '@texting/phrasing'

export function tap(...words) {
  const vec = []
  for (let word of words) if (word?.length) vec.push(word)
  return vec
}

export function mag(...words) {
  const de = this ?? SP, hi = words?.length
  let tx, ph, i = 0
  while (i < hi) if ((ph = words[i++])?.length) {
    tx = ph
    break
  }
  while (i < hi) if ((ph = words[i++])?.length) {
    tx += de + ph
  }
  return tx
}

export function tapBy(de = SP, ...words) {
  const vec = tap.apply(null, words)
  return vec.join(de)
}

export function tapDot(...words) { return mag.apply(this ?? '.', words) }

export function tapPath(...words) { return mag.apply(this ?? '\\', words) }

export function tapSnake(...words) { return mag.apply(this ?? '_', words) }

export function tapKebab(...words) { return tap.apply(null, words).map(toLower).join(this ?? '-') }

export function tapCamel(...words) { return wordsToCamel(tap.apply(null, words)).join('') }

export function tapPascal(...words) { return wordsToPascal(tap.apply(null, words)).join('') }


