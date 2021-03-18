import { ASTRAL_G } from '@texting/regex-charset'


export const clearAstral = tx => tx.replace(ASTRAL_G, '_')