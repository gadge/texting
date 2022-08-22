import { NONE }             from '@texting/enum-brackets'
import { CO, COLF, LF, TB } from '@texting/enum-chars'
import { br as brac }       from '@texting/bracket'

export const Br = [
  [ '', '' ], // NONE = 0
  [ '(', ')' ], // PARENTH = 1
  [ '[', ']' ], // BRACKET = 2
  [ '{', '}' ], // BRACE = 3
  [ '<', '>' ], // ANGLEBR = 4
]

export class Iter {
  static join(iter, de) {
    let t, d, v;
    ({ done: d, value: v } = iter.next())
    t = d ? '' : v
    for (let x of iter) t += de + x
    return t
  }

  static hover2(iter, de, lv) {

  }

  static hover(iter, tr = '', lv) {
    const IND = lv > 0 ? TB.repeat(lv) : ''
    return `${LF + IND + TB}${Iter.join(iter, tr + LF + IND + TB)}${tr + LF + IND}`
  }

  static ensue(iter, tr = '', lv) {
    const IND = lv > 0 ? TB.repeat(lv) : ''
    return `${IND + TB}${Iter.join(iter, tr + LF + IND + TB)}${tr}`
  }

  static to(iter, de = COLF, lv = 0, br = NONE) {
    return /\n/.test(de)
      ? br
        ? brac(Iter.hover(iter, /,/.test(de) ? CO : '', lv), br)
        : Iter.ensue(iter, /,/.test(de) ? CO : '', lv)
      : br
        ? brac(Iter.join(iter, de), br)
        : Iter.join(iter, de)
  }

  static entries(iter, de, lv, br) {

  }
}