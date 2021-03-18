import { ASTRAL } from '@texting/regex-charset'

export const hasAstral = tx => ASTRAL.test(tx)
