import { DT, QT }       from '@texting/enum-chars'
import { APOS, DITTO }  from '@texting/enum-quotes'
import { ditto, quote } from './qt'

export const Qt = (mode) => {
  if (mode === APOS || mode === QT) return quote
  if (mode === DITTO || mode === DT) return ditto
  return null
}

// export const Qt = (read, mode) => {
//   if (!mode) return read
//   if (!read) return SelectQt(mode)
//   return x => x |> read |> SelectQt(mode)
// }
