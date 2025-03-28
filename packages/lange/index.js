import { ANSI_G, ASTRAL_G } from '@texting/regex-charset';

/**
 *
 * @param {string} tx
 * @returns {number}
 */
const lange = tx => tx
  .replace(ANSI_G, '')
  .replace(ASTRAL_G, '_')
  .length;

const length = x => x.length;

const Lange = ansi => ansi ? lange : length;

export { Lange, lange, length };
