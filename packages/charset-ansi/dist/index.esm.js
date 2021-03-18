import { ANSI, ANSI_G } from '@texting/regex-charset'

const clearAnsi = tx => tx.replace(ANSI_G, '');

const hasAnsi = tx => ANSI.test(tx);

export { clearAnsi, hasAnsi };
