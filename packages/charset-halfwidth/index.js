import { hasAnsi, clearAnsi } from '@texting/charset-ansi';
import { SP } from '@texting/enum-chars-fullwidth';
import '@texting/regex-charset';

const DELTA_FULL = 0xfee0;

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
const _halfToFullCore = (text) => {
  let l = text?.length, i = 0, t = '', n;
  while (i < l && (n = text.charCodeAt(i))) {
    t += n === 0x20
      ? SP
      : 0x20 < n && n < 0x7f
        ? String.fromCharCode(n + DELTA_FULL)
        : text[i];
    i++;
  }
  return t
};

const _halfToFull = function (tx) {
  const { ansi, lean } = this;
  if (ansi && hasAnsi(tx)) tx = clearAnsi(tx);
  if (lean) tx = tx.replace(LEAN_REG, (_, x) => x);
  return _halfToFullCore(tx)
};

const halfToFull = (text, { ansi = true, lean = true } = {}) =>
  _halfToFull.call({ ansi, lean }, text);

const HalfToFull = ({ ansi = true, lean = true } = {}) =>
  _halfToFull.bind({ ansi, lean });

const COMMA = /,/g;

const isNumeric = x => {
  x = x?.replace(COMMA, '');
  return !isNaN(x - parseFloat(x))
};

const validate = (x, y) => isNaN(x - y) ? NaN : y;

const parseNum = x => {
  x = x?.replace(COMMA, '');
  return validate(x, parseFloat(x))
};

export { HalfToFull, halfToFull, isNumeric, parseNum };
