import { ANSI, ASTRAL } from '@texting/regex-charset';

const hasAnsi = tx => ANSI.test(tx);

const hasAstral = tx => ASTRAL.test(tx);

export { hasAnsi, hasAstral };
