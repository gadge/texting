import { ANSI_G } from '@texting/regex-charset'

export const clearAnsi = tx => tx.replace(ANSI_G, '')