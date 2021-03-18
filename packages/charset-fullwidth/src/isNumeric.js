import { REG_NUM_FULL } from '../assets/regex'

/**
 *
 * @param {string} tx
 * @returns {boolean}
 */
export const isNumeric = tx => REG_NUM_FULL.test(tx)

const COMMA = /，/g
const NUM_FULL = /[\uff0b-\uff19]/
export const parseNum = text => {
  let l = text?.length, i = 0, t = '', n
  while (i < l && (n = text.charCodeAt(i++)))
    t += String.fromCharCode(0xFF & (n + 0x20))
  return t
}