import { fix } from './ansiPadLength'


export const lpad = Function.prototype.call.bind(String.prototype.padStart)

export const LPad = ({ ansi = true, fill } = {}) => {
  return ansi
    ? (tx, pd) => lpad(tx, fix(tx, pd), fill)
    : (tx, pd) => lpad(tx, pd, fill)
}
