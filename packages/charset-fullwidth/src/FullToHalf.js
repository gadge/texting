import { CO, DOT, SP } from '@texting/enum-chars'
import { REG_FULL }    from '../assets/regex'

/**
 * Full-angle string -> Half-angle string
 * 全角转换为半角
 * @param {string} text
 * @returns {string}
 * @constructor
 */
export const _fullToHalfCore = text => {
  let ms, l = 0, r = 0, sp, ph, body = ''
  while ((ms = REG_FULL.exec(text)) && ([ph] = ms)) {
    r = ms.index
    if (l !== r && (sp = text.slice(l, r))) body += sp
    body += _fullToHalfInclCjk(ph)
    l = REG_FULL.lastIndex
  }
  if (l < text?.length) body += text.slice(l)
  return body
}

const _fullToHalfInclCjk = text => {
  let tx = '', i = 0, l = text.length, n
  while (i < l && (n = text.charCodeAt(i++))) tx +=
    n < 0xff00 ? CharCodeToHalf.cjkPunc(n) : CharCodeToHalf.fullChars(n)
  return tx
}

const _fullToHalf = text => {
  let tx = '', i = 0, l = text.length, n
  while (i < l && (n = text.charCodeAt(i++))) tx +=
    n < 0xff00 ? CharCodeToHalf.cjkPunc(n) : CharCodeToHalf.fullChars(n)
  return tx
}

export class CharCodeToHalf {
  static cjkPunc(charCode) {
    if (charCode === 0x3000) return SP
    if (charCode === 0x3001) return CO
    if (charCode === 0x3002) return DOT
    if (charCode === 0x3010) return '['
    if (charCode === 0x3011) return ']'
    return String.fromCharCode(charCode)
  }
  static fullChars(charCode) {
    return String.fromCharCode(0xFF & (charCode + 0x20))
  }
}
