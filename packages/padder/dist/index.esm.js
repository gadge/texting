import { hasAnsi } from '@texting/charset-ansi';
import { lange } from '@texting/lange';
import { isNumeric } from '@typen/num-strict';
import { isNumeric as isNumeric$1 } from '@texting/charset-fullwidth';
import { HalfToFull } from '@texting/charset-halfwidth';
import { SP as SP$1 } from '@texting/enum-chars-fullwidth';

const ansiPadLength = (tx, pd) => hasAnsi(tx) ? tx.length + pd - lange(tx) : pd; // export const lpad = String.prototype.padStart
// export const rpad = String.prototype.padEnd

const lpad = Function.prototype.call.bind(String.prototype.padStart);
const LPad = ({
  ansi = true,
  fill
} = {}) => ansi ? (tx, pd) => lpad(tx, ansiPadLength(tx, pd), fill) : (tx, pd) => lpad(tx, pd, fill);

const rpad = Function.prototype.call.bind(String.prototype.padEnd);
const RPad = ({
  ansi = true,
  fill
} = {}) => ansi ? (tx, pd) => rpad(tx, ansiPadLength(tx, pd), fill) : (tx, pd) => rpad(tx, pd, fill);

const SP = ' ';

const COMMA = /,/g;
const clean = tx => {
  if (!tx || tx.length <= 4) return tx;
  return tx.replace(COMMA, '');
};

const pad = function (tx, wd, va) {
  const {
    ansi = true,
    fill = SP,
    thousand = true
  } = this !== null && this !== void 0 ? this : {};
  const padder = isNumeric(va !== null && va !== void 0 ? va : thousand ? clean(tx) : tx) ? lpad : rpad;
  return ansi ? padder(tx, ansiPadLength(tx, wd), fill) : padder(tx, wd, fill);
};
/**
 *
 * @param {object}  [config]
 * @param {boolean} [config.ansi]
 * @param {string}  [config.fill]
 * @param {boolean} [config.thousand]
 * @returns {function(string,number,any?):string}
 * @constructor
 */

const Pad = (config = {}) => pad.bind(config);

const nullish = x => x === null || x === void 0;

const padFull = function (tx, wd, va) {
  const {
    ansi = true,
    fill = SP$1
  } = this !== null && this !== void 0 ? this : {};
  const padder = (nullish(va) ? isNumeric$1(tx) : isNumeric(va)) ? lpad : rpad;
  return ansi ? padder(tx, ansiPadLength(tx, wd), fill) : padder(tx, wd, fill);
};
/**
 * @param {object}  [configHalf]
 * @param {boolean} [configHalf.ansi=true]
 * @param {string}  [configHalf.fill=' ']
 * @param {boolean} [configHalf.thousand=true]
 *
 * @param {object}  [configFull]
 * @param {boolean} [configFull.ansi=true]
 * @param {string}  [configFull.fill='　']
 * @param {boolean} [configFull.lean=true]
 *
 * @returns {function(*=, *=, *, *=): *}
 * @constructor
 */

const PadFull = (configHalf = {}, configFull = {}) => {
  const padderHalf = pad.bind(configHalf),
        // use: ansi, fill, thousand
  padderFull = padFull.bind(configFull),
        // use: ansi, fill
  halfToFull = HalfToFull(configFull); // use: ansi lean

  return (text, width, full) => full ? padderFull(halfToFull(text), width) : padderHalf(text, width);
};

const LEFT = -1;
const RIGHT = 1;
const CENTRE = 0;

export { CENTRE, LEFT, LPad, Pad, PadFull, RIGHT, RPad };
