import { SP } from '@texting/enum-chars'

export function xy(a, b, de = SP) {
  return a?.length
    ? b?.length ? a + de + b : a
    : b?.length ? b : ''
}

export function xyz(a, b, c, de = SP) {
  return a?.length
    ? b?.length
      ? c?.length
        ? a + de + b + de + c : a + de + b
      : c?.length
        ? a + de + c : a
    : b?.length
      ? c?.length
        ? b + de + c : b
      : c?.length
        ? c : ''
}