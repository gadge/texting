import { ANSI } from '@texting/regex-charset'

export const hasAnsi = tx => ANSI.test(tx)
