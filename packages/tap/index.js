import { decoVector } from '@spare/deco-vector';
import { SP } from '@texting/enum-chars';
import { wordsToCamel, wordsToPascal } from '@texting/phrasing';

function xy(a, b, de = SP) {
  return a?.length
    ? b?.length ? a + de + b : a
    : b?.length ? b : ''
}

function xyz(a, b, c, de = SP) {
  return a?.length
    ? b?.length
      ? c?.length
        ? a + de + b + de + c : a + de + b
      : c?.length
        ? a + de + c : a
    : b?.length
      ? c?.length
        ? b + de + c : b
      : c?.length
        ? c : ''
}

const tap = (...words) => {
  const ve = [];
  for (let word of words)
    if (word?.length)
      ve.push(word);
  return ve
};

const tapBy = function (delim = SP, ...words) {
  const ve = tap.apply(null, words);
  return ve.join(delim)
};

const tapDot = function (...words) {
  const delim = this?.delim ?? '.';
  const ve = tap.apply(null, words);
  return ve.join(delim)
};

const tapSnake = function (...words) {
  const delim = this?.delim ?? '_';
  const ve = tap.apply(null, words);
  return ve.join(delim)
};

const tapCamel = function (...words) {
  const ve = tap.apply(null, words);
  return wordsToCamel(ve).join('')
};

const tapPascal = function (...words) {
  const ve = tap.apply(null, words);
  return wordsToPascal(ve).join('')
};

const presetAdjoin = p => {
  p = p ?? {};
  p.delim = p.delim ?? SP;
  return p
};

const adjoin = function (...words) {
  const
    ve = tap.apply(null, words),
    config = presetAdjoin(this);
  return decoVector(ve, config)
};

/**
 *
 * @param {Object} p
 *
 * @param {string} [p.delim=',\n']
 * @param {boolean|number} [p.bracket=true] - BRK = 1
 * @param {Function} [p.read]
 * @param {Object|Object[]} [p.presets=[FRESH, JUNGLE]]
 *
 * @returns {Function}
 */
const Adjoin = (p = {}) => adjoin.bind(p);

export { Adjoin, adjoin, tap, tapBy, tapCamel, tapDot, tapPascal, tapSnake, xy, xyz };
