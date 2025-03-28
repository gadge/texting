import { HAN, FULL_NUM, CJK_PUNCS, FULL_CHARS } from '@texting/regex-charset';
import { parseNum as parseNum$1 } from '@typen/num-strict';
import { SP, CO, DOT } from '@texting/enum-chars';

/**
 * Return if a string contains Chinese character.
 * halfAng = str.match(/[\u0000-\u00ff]/g) || [] //半角
 * chinese = str.match(/[\u4e00-\u9fa5]/g) || [] //中文
 * fullAng = str.match(/[\uff00-\uffff]/g) || [] //全角
 * @param {string} str
 * @returns {boolean}
 */
const hasFull = str => HAN.test(str);

const REG_FULL = new RegExp(`[${CJK_PUNCS}${FULL_CHARS}]+`, 'g'); // /[\uff01-\uff5e|\u3000]+/g
// export const REG_NUM_FULL = /^\s*[－＋]?(?:，*[０-９]+)*．?[０-９]+\s*$/
const REG_NUM_FULL = new RegExp(`^\s*[－＋]?(?:，*[${FULL_NUM}]+)*．?[${FULL_NUM}]+\s*$`);

/**
 *
 * @param {string} tx
 * @returns {boolean}
 */
const isNumeric = tx => REG_NUM_FULL.test(tx);

const NON_SPACE = /[^\s]/;
const parseNum = text => {
  if (!text) return NaN
  let l = text.length, i = text.search(NON_SPACE), t = '', n, v;
  while (i < l && (n = text.charCodeAt(i++)))
    if (n !== 0xff0c) {
      v = 0xFF & (n + 0x20);
      t += String.fromCharCode(v < n ? v : n);
    }
  return parseNum$1(t)
};

/**
 * Full-angle string -> Half-angle string
 * 全角转换为半角
 * @param {string} text
 * @returns {string}
 * @constructor
 */
function _fullToHalfCore(text) {
  const { conv } = this;
  let ms, l = 0, r = 0, sp, ph, body = '';
  while ((ms = REG_FULL.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (l !== r && (sp = text.slice(l, r))) body += sp;
    body += conv(ph);
    l = REG_FULL.lastIndex;
  }
  if (l < text?.length) body += text.slice(l);
  return body
}

class Conv {
  static cjkAndFullChars = text => {
    let tx = '', i = 0, l = text.length, n;
    while (i < l && (n = text.charCodeAt(i++))) tx +=
      n < 0xff00 ? CharConv.cjkPunc(n) : CharConv.fullChars(n);
    return tx
  }
  static fullChars = text => {
    let tx = '', i = 0, l = text.length, n;
    while (i < l && (n = text.charCodeAt(i++))) tx +=
      CharConv.fullChars(n);
    return tx
  }
}

class CharConv {
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

/**
 *
 * @param {boolean} [cjk=true]
 * @returns {any}
 * @constructor
 */
const FullToHalf = ({ cjk = true } = {}) => {
  const conv = cjk ? Conv.cjkAndFullChars : Conv.fullChars;
  return _fullToHalfCore.bind({ conv })
};

/**
 *
 * @param {string} [text]
 * @param {boolean} [cjk=true]
 * @returns {string}
 */
const fullToHalf = (text, { cjk = true } = {}) => {
  const conv = cjk ? Conv.cjkAndFullChars : Conv.fullChars;
  return _fullToHalfCore.call({ conv }, text)
};

export { FullToHalf, fullToHalf, hasFull, isNumeric, parseNum };
