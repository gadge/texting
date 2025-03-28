import { isNumeric as isNumericFull } from '@texting/charset-fullwidth'
import { HalfToFull }                 from '@texting/charset-halfwidth'
import { SP as SP_FULL }              from '@texting/enum-chars-fullwidth'
import { nullish }                    from '@typen/nullish'
import { isNumeric }                  from '@typen/num-strict'
import { ansiPadLength }  from '../utils/ansiPadLength.js'
import { lpad }           from './LPad.js'
import { rpad }           from './RPad.js'
import { pad as padHalf } from './Pad.js'

export const padFull = function (tx, wd, va) {
  const { ansi = true, fill = SP_FULL } = this ?? {}
  const padder = (nullish(va) ? isNumericFull(tx) : isNumeric(va)) ? lpad : rpad
  return ansi
    ? padder(tx, ansiPadLength(tx, wd), fill)
    : padder(tx, wd, fill)
}

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
export const PadFull = (configHalf = {}, configFull = {}) => {
  const
    padderHalf = padHalf.bind(configHalf), // use: ansi, fill, thousand
    padderFull = padFull.bind(configFull), // use: ansi, fill
    halfToFull = HalfToFull(configFull) // use: ansi lean
  return (text, width, full) => full
    ? padderFull(halfToFull(text), width)
    : padderHalf(text, width)
}
