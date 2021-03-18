'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var charsetAnsi = require('@texting/charset-ansi');
var enumFullAngleChars = require('@texting/enum-full-angle-chars');

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

const DELTA_FULL = 0xfee0; // export const REG_NUM_FULL = /^\s*[－＋]?(?:，*[０-９]+)*．?[０-９]+\s*$/

const REG_NUM_FULL = new RegExp(`^\s*[－＋]?(?:，*[${FULL_NUM}]+)*．?[${FULL_NUM}]+\s*$`);

const LEAN_REG = /(\W)\s+/g;
/**
 * Half-angle string -> Full-angle string
 * 半角转化为全角
 * a.全角空格为12288，半角空格为32
 * b.其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
 * @param {string} text
 * @returns {string}
 * @constructor
 */

const _halfToFullCore = text => {
  let l = text === null || text === void 0 ? void 0 : text.length,
      i = 0,
      t = '',
      n;

  while (i < l && (n = text.charCodeAt(i))) {
    t += n === 0x20 ? enumFullAngleChars.SP : 0x20 < n && n < 0x7f ? String.fromCharCode(n + DELTA_FULL) : text[i];
    i++;
  }

  return t;
};
const _halfToFull = function (tx) {
  const {
    ansi,
    lean
  } = this;
  if (ansi && charsetAnsi.hasAnsi(tx)) tx = charsetAnsi.clearAnsi(tx);
  if (lean) tx = tx.replace(LEAN_REG, (_, x) => x);
  return _halfToFullCore(tx);
};
const halfToFull = (text, {
  ansi = true,
  lean = true
} = {}) => _halfToFull.call({
  ansi,
  lean
}, text);
const FullWidth = ({
  ansi = true,
  lean = true
} = {}) => _halfToFull.bind({
  ansi,
  lean
});

/**
 *
 * @param {string} tx
 * @returns {boolean}
 */

const isNumeric = tx => REG_NUM_FULL.test(tx);

exports.FullWidth = FullWidth;
exports.halfToFull = halfToFull;
exports.hasFull = hasFull;
exports.isNumeric = isNumeric;
