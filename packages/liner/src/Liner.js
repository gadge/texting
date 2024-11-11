import { NONE }             from '@texting/enum-brackets'
import { CO, COLF, LF, TB } from '@texting/enum-chars'

export class Liner {
  /** @type {function([],string):string} */
  static join = Function.prototype.call.bind(Array.prototype.join)

  static hover(xs, de = '', lv) {
    const IND = lv > 0 ? TB.repeat(lv) : ''
    return (`${LF + IND + TB}${xs?.join(de + LF + IND + TB)}${de + LF + IND}`)
  }

  static ensue(xs, de = '', lv) {
    const IND = lv > 0 ? TB.repeat(lv) : ''
    return (`${IND + TB}${xs?.join(de + LF + IND + TB)}${de}`)
  }

  static to(xs, de = COLF, lv = 0, br = NONE) {
    const hi = xs.length
    if (!hi) return []
    return /\n/.test(de)
      ? br
        ? br(Liner.hover(xs, /,/.test(de) ? CO : '', lv), br)
        : Liner.ensue(xs, /,/.test(de) ? CO : '', lv)
      : br
        ? br(Liner.join(xs, de), br)
        : Liner.join(xs, de)
  }

  static entries(ent, de, lv, br) {

  }
}