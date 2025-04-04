import { SP }                   from '@texting/enum-chars-fullwidth'
import { DELTA_FULL, REG_HALF } from '../../assets/regex.js'

/**
 * Half-angle string -> Full-angle string
 * 半角转化为全角
 * a.全角空格为12288，半角空格为32
 * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
 * @param {string} body
 * @returns {string}
 * @constructor
 */
export const halfToFullEdge = body => {
  let ms, prev = 0, curr = 0, block, match, text = ''
  while ((ms = REG_HALF.exec(body)) && ([match] = ms)) {
    curr = ms.index
    if (prev !== curr && (block = body.slice(prev, curr))) text += block
    text += fullWidth(match)
    prev = REG_HALF.lastIndex
  }
  return text
}

const fullWidth = hw => {
  let tx = '', i = 0, l = hw.length, n
  while (i < l && (n = hw.charCodeAt(i++))) {
    tx += n === 0x20 ? SP : String.fromCharCode(n + DELTA_FULL)
  }
  return tx
}
