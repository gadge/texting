import { COMMA } from './comma.js'

const validate = (x, y) => isNaN(x - y) ? NaN : y

export const parseNum = x => {
  x = x?.replace(COMMA, '')
  return validate(x, parseFloat(x))
}