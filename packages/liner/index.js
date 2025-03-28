import { br } from '@texting/bracket';
import { NONE } from '@texting/enum-brackets';
import { TB, LF, CO } from '@texting/enum-chars';

/**
 *
 * @param {string[]} lines - input string[]
 * @param {string} delim - trailing punctuation added to each line
 * @param {number} level - level of indent to each line
 * @param {boolean} hover - first and last line hang up
 * @return {*}
 */
const joinLines = (lines, delim = '', level, hover = true) => {
  const IND = level > 0 ? TB.repeat(level) : '';
  return hover
    ? (`${LF + IND + TB}${lines?.join(delim + LF + IND + TB)}${delim + LF + IND}`)
    : (`${IND + TB}${lines?.join(delim + LF + IND + TB)}${delim}`)
};

const LINEFEED = /\n/;
const COMMA = /,/;

const linesHandler = function (lines) {
  if (this?.discrete) return lines
  const { delim = LF, bracket = NONE, level = 0 } = this;
  const text = lines.length && LINEFEED.test(delim)
    ? joinLines(lines, COMMA.test(delim) ? CO : '', level, !!bracket)
    : lines.join(delim);
  return br(text, bracket)
};

/**
 *
 * @param {string[]} lines - input string[]
 * @param {Object} p
 * @param {boolean|*}       [p.discrete=false] - if true, return the input lines as string[]
 * @param {string|*}        [p.delim=LF] - trailing punctuation added to each line
 * @param {number|string|*} [p.bracket=NONE] - bracket added to the start and end of the entire rendered lines
 * @param {number|*}        [p.level=0] - level of indent to each line
 * @return {string|string[]}
 */
const liner = (lines, p = {}) => linesHandler.call(p, lines);

export { joinLines, liner };
