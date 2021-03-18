import { HAN } from '@texting/regex-charset'

export const hasHan = x => HAN.test(x)