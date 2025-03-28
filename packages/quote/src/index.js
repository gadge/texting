import { DT, QT }      from '@texting/enum-chars'
import { APOS, DITTO } from '@texting/enum-quotes'
import { isString }    from '@typen/literal'
import { nullish }     from '@typen/nullish'

export const quote = x => QT + x + QT
export const ditto = x => DT + x + DT

export const qt = (x, mode) => {
  if (mode === APOS || mode === QT) return quote(x)
  if (mode === DITTO || mode === DT) return ditto(x)
  if (!nullish(mode) && isString(mode)) return mode + x + mode
  return x
}

export const Qt = (mode) => {
  if (mode === APOS || mode === QT) return quote
  if (mode === DITTO || mode === DT) return ditto
  return null
}

const VERGE_QUOTE = /^'(.*)'$/
const QUOTE = /'/g
const BACKSLASH_QUOTE = '\\\''

export const tenseQuote = x => VERGE_QUOTE.test(x)
  ? x.replace(VERGE_QUOTE, (_, x) => quote(x.replace(QUOTE, BACKSLASH_QUOTE)))
  : quote(x.replace(QUOTE, BACKSLASH_QUOTE))

