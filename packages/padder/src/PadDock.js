import { ansiPadLength } from '../utils/ansiPadLength'
import { lpad }          from './LPad.js'
import { rpad }          from './RPad.js'
import { pad }           from './Pad'

export const padDock = function (tx, wd) {
  let ansi, fill, dock
  if (this) ({ ansi, fill, dock } = this)
  const padder = dock < 0 ? lpad : rpad
  return ansi
    ? padder(tx, ansiPadLength(tx, wd), fill)
    : padder(tx, wd, fill)
}

export const PadDock = ({ dock, ansi = true, fill } = {}) =>
  pad.bind({ ansi, fill, dock })