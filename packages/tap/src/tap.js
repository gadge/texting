import { SP }                          from '@texting/enum-chars'
import { wordsToCamel, wordsToPascal } from '@texting/phrasing'

export function xy(a, b, de = SP) {
  return a?.length
    ? b?.length ? a + de + b : a
    : b?.length ? b : ''
}

export function xyz(a, b, c, de = SP) {
  return a?.length
    ? b?.length
      ? c?.length
        ? a + de + b + de + c : a + de + b
      : c?.length
        ? a + de + c : a
    : b?.length
      ? c?.length
        ? b + de + c : b
      : c?.length
        ? c : ''
}

export const tap = (...words) => {
  const ve = []
  for (let word of words)
    if (word?.length)
      ve.push(word)
  return ve
}

export const tapBy = function (delim = SP, ...words) {
  const ve = tap.apply(null, words)
  return ve.join(delim)
}

export const tapDot = function (...words) {
  const delim = this?.delim ?? '.'
  const ve = tap.apply(null, words)
  return ve.join(delim)
}

export const tapSnake = function (...words) {
  const delim = this?.delim ?? '_'
  const ve = tap.apply(null, words)
  return ve.join(delim)
}

export const tapCamel = function (...words) {
  const ve = tap.apply(null, words)
  return wordsToCamel(ve).join('')
}

export const tapPascal = function (...words) {
  const ve = tap.apply(null, words)
  return wordsToPascal(ve).join('')
}


