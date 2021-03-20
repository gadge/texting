import { COMMA } from './comma'

export const isNumeric = x => {
  x = x?.replace(COMMA, '')
  return !isNaN(x - parseFloat(x))
}