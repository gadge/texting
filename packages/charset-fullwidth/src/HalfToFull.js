import { clearAnsi, hasAnsi } from '@texting/charset-ansi'
import { SP }                 from '@texting/enum-full-angle-chars'
import { DELTA_FULL }         from '../assets/regex'


const LEAN_REG = /(\W)\s+/g

/**
 * Half-angle string -> Full-angle string
 * 半角转化为全角
 * a.全角空格为12288，半角空格为32
 * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
 * @param {string} text
 * @returns {string}
 * @constructor
 */
export const _halfToFullCore = (text) => {
  let l = text?.length, i = 0, t = '', n
  while (i < l && (n = text.charCodeAt(i))) {
    t += n === 0x20
      ? SP
      : 0x20 < n && n < 0x7f
        ? String.fromCharCode(n + DELTA_FULL)
        : text[i]
    i++
  }
  return t
}

export const _halfToFull = function (tx) {
  const { ansi, lean } = this
  if (ansi && hasAnsi(tx)) tx = clearAnsi(tx)
  if (lean) tx = tx.replace(LEAN_REG, (_, x) => x)
  return _halfToFullCore(tx)
}

export const halfToFull = (text, { ansi = true, lean = true } = {}) =>
  _halfToFull.call({ ansi, lean }, text)

export const FullWidth = ({ ansi = true, lean = true } = {}) =>
  _halfToFull.bind({ ansi, lean })
