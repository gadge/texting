import { ANSI_G, ASTRAL_G } from '@texting/regex-charset'

/**
 *
 * @param {string} tx
 * @returns {number}
 */
export const lange = tx => tx
  .replace(ANSI_G, '')
  .replace(ASTRAL_G, '_')
  .length

export const length = x => x.length

export const Lange = ansi => ansi ? lange : length


