import { COMMA } from './comma.js'

export const isNumeric = x => {
  x = x?.replace(COMMA, '')
  return !isNaN(x - parseFloat(x))
}