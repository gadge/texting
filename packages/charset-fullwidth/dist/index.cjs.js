'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var numStrict = require('@typen/num-strict');
var enumChars = require('@texting/enum-chars');

const CJK_PUNCS = '\u3000-\u303f';
const CJK_LETTERS = '\u4e00-\u9fbf';
const FULL_CHARS = '\uff00-\uffef'; // full letters + full puncs
const FULL_NUM = '０-９'; // 0xff10 - 0xff19

const HAN = new RegExp(`[${CJK_PUNCS}${CJK_LETTERS}${FULL_CHARS}]`); // HAN ideographs

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

const REG_NUM_FULL = new RegExp(`^\s*[－＋]?(?:，*[${FULL_NUM}]+)*．?[${FULL_NUM}]+\s*$`);

/**
 *
 * @param {string} tx
 * @returns {boolean}
 */

const isNumeric = tx => REG_NUM_FULL.test(tx);

const NON_SPACE = /[^\s]/;
const parseNum = text => {
  if (!text) return NaN;
  let l = text.length,
      i = text.search(NON_SPACE),
      t = '',
      n,
      v;

  while (i < l && (n = text.charCodeAt(i++))) if (n !== 0xff0c) {
    v = 0xFF & n + 0x20;
    t += String.fromCharCode(v < n ? v : n);
  }

  return numStrict.parseNum(t);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Full-angle string -> Half-angle string
 * 全角转换为半角
 * @param {string} text
 * @returns {string}
 * @constructor
 */

function _fullToHalfCore(text) {
  const {
    conv
  } = this;
  let ms,
      l = 0,
      r = 0,
      sp,
      ph,
      body = '';

  while ((ms = REG_FULL.exec(text)) && ([ph] = ms)) {
    r = ms.index;
    if (l !== r && (sp = text.slice(l, r))) body += sp;
    body += conv(ph);
    l = REG_FULL.lastIndex;
  }

  if (l < (text === null || text === void 0 ? void 0 : text.length)) body += text.slice(l);
  return body;
}
class Conv {}

_defineProperty(Conv, "cjkAndFullChars", text => {
  let tx = '',
      i = 0,
      l = text.length,
      n;

  while (i < l && (n = text.charCodeAt(i++))) tx += n < 0xff00 ? CharConv.cjkPunc(n) : CharConv.fullChars(n);

  return tx;
});

_defineProperty(Conv, "fullChars", text => {
  let tx = '',
      i = 0,
      l = text.length,
      n;

  while (i < l && (n = text.charCodeAt(i++))) tx += CharConv.fullChars(n);

  return tx;
});

class CharConv {
  static cjkPunc(charCode) {
    if (charCode === 0x3000) return enumChars.SP;
    if (charCode === 0x3001) return enumChars.CO;
    if (charCode === 0x3002) return enumChars.DOT;
    if (charCode === 0x3010) return '[';
    if (charCode === 0x3011) return ']';
    return String.fromCharCode(charCode);
  }

  static fullChars(charCode) {
    return String.fromCharCode(0xFF & charCode + 0x20);
  }

}
/**
 *
 * @param {boolean} [cjk=true]
 * @returns {any}
 * @constructor
 */

const FullToHalf = ({
  cjk = true
} = {}) => {
  const conv = cjk ? Conv.cjkAndFullChars : Conv.fullChars;
  return _fullToHalfCore.bind({
    conv
  });
};
/**
 *
 * @param {string} [text]
 * @param {boolean} [cjk=true]
 * @returns {string}
 */

const fullToHalf = (text, {
  cjk = true
} = {}) => {
  const conv = cjk ? Conv.cjkAndFullChars : Conv.fullChars;
  return _fullToHalfCore.call({
    conv
  }, text);
};

exports.FullToHalf = FullToHalf;
exports.fullToHalf = fullToHalf;
exports.hasFull = hasFull;
exports.isNumeric = isNumeric;
exports.parseNum = parseNum;
