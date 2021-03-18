import { ASTRAL_G, ASTRAL } from '@texting/regex-charset';

const clearAstral = tx => tx.replace(ASTRAL_G, '_');

const hasAstral = tx => ASTRAL.test(tx);

export { clearAstral, hasAstral };
