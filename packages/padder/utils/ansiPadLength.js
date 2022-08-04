import { hasAnsi } from '@texting/charset-ansi'
import { lange }   from '@texting/lange'


export const ansiPadLength = (tx, pd) => hasAnsi(tx) ? tx.length + pd - lange(tx) : pd
export { ansiPadLength as fix }
// export const lpad = String.prototype.padStart
// export const rpad = String.prototype.padEnd
