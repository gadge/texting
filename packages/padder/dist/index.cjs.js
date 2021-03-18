'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var charsetAnsi = require('@texting/charset-ansi');
var lange = require('@texting/lange');
var numStrict = require('@typen/num-strict');
var charsetFullwidth = require('@texting/charset-fullwidth');

const ansiPadLength = (tx, pd) => charsetAnsi.hasAnsi(tx) ? tx.length + pd - lange.lange(tx) : pd; // export const lpad = String.prototype.padStart
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

const SP$1 = ' ';

const COMMA = /,/g;
const clean = tx => {
  if (!tx || tx.length <= 4) return tx;
  return tx.replace(COMMA, '');
};

const pad = function (tx, wd, va) {
  const {
    ansi = true,
    fill = SP$1,
    thousand = true
  } = this !== null && this !== void 0 ? this : {};
  const padder = numStrict.isNumeric(va !== null && va !== void 0 ? va : thousand ? clean(tx) : tx) ? lpad : rpad;
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

const SP = '　';

const nullish = x => x === null || x === void 0;

const padFull = function (tx, wd, va) {
  const {
    ansi = true,
    fill = SP
  } = this !== null && this !== void 0 ? this : {};
  const padder = (!nullish(va) ? numStrict.isNumeric(va) : charsetFullwidth.isNumeric(tx)) ? lpad : rpad;
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
  toFull = charsetFullwidth.FullWidth(configFull); // use: ansi lean

  return (text, width, full) => full ? padderFull(toFull(text), width) : padderHalf(text, width);
};

const LEFT = -1;
const RIGHT = 1;
const CENTRE = 0;

exports.CENTRE = CENTRE;
exports.LEFT = LEFT;
exports.LPad = LPad;
exports.Pad = Pad;
exports.PadFull = PadFull;
exports.RIGHT = RIGHT;
exports.RPad = RPad;
