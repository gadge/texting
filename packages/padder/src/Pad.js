import { SP }        from '@texting/enum-chars'
import { isNumeric } from '@typen/num-strict'
import { fix }   from '../utils/ansiPadLength.js'
import { lpad }  from './LPad.js'
import { clean } from '../utils/clean'
import { rpad }  from './RPad.js'

export const pad = function (tx, wd, va) {
  const { ansi = true, fill = SP, thousand = true } = this ?? {}
  const padder = (isNumeric(va ?? (thousand ? clean(tx) : tx)) ? lpad : rpad)
  return ansi
    ? padder(tx, fix(tx, wd), fill)
    : padder(tx, wd, fill)
}

/**
 *
 * @param {object}  [config]
 * @param {boolean} [config.ansi]
 * @param {string}  [config.fill]
 * @param {boolean} [config.thousand]
 * @returns {function(string,number,any?):string}
 * @constructor
 */
export const Pad = (config = {}) => pad.bind(config)


