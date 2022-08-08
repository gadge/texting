import { fix } from '../utils/ansiPadLength.js'

/** @type {function(string,number,string):string} */
export const rpad = Function.prototype.call.bind(String.prototype.padEnd)

export const RPad = ({ ansi = true, fill } = {}) =>
  ansi
    ? (tx, pd) => rpad(tx, fix(tx, pd), fill)
    : (tx, pd) => rpad(tx, pd, fill)


