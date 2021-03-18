import { CAPWORD, INILOW } from '@texting/regex-phrasing'

/**
 * Camel/pascal case phrase -> split vector
 * Snake: fox_jumps_over_dog
 * Kebab: fox-jumps-over-dog
 * @param {string} phrase camel/pascal-case phrase
 * @returns {string[]}
 * @deprecated use splitCamel in @texting/splitter
 */
export function camelToVector(phrase) {
  let ms, wd, ve = []
  if ((ms = INILOW.exec(phrase)) && ([wd] = ms)) ve.push(wd)
  while ((ms = CAPWORD.exec(phrase)) && ([wd] = ms)) ve.push(wd)
  return ve
}

/**
 * snake or kebab phrase -> split vector
 * @param {string} phrase - dashed phrase
 * @returns {string[]}
 * @deprecated use splitSnake in @texting/splitter
 */
export const snakeToVector = (phrase) => phrase.split(/\W/g)
