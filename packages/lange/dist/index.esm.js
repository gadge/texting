import { ANSI_G, ASTRAL_G } from '@texting/regex-charset';

/**
 *
 * @param {string} tx
 * @returns {number}
 */

const lange = tx => tx.replace(ANSI_G, '').replace(ASTRAL_G, '_').length;
const Lange = ansi => ansi ? lange : x => x.length;

export { Lange, lange };
