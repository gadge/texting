import { INILOW, CAPWORD, WORD } from '@texting/regex-phrasing';
export { CAMEL, CAPREST, CAPWORD, DASH_CAPREST, INILOW, INIWORD, WORD } from '@texting/regex-phrasing';
import { mutate } from '@vect/vector-mapper';
import { SP } from '@texting/enum-chars';

/**
 * @param {string} word
 * @returns {string}
 */
const capitalize = word => word[0].toUpperCase() + word.substring(1).toLowerCase();

/**
 * @param {string} word
 * @returns {string}
 */
const toUpper = word => word.toUpperCase();

/**
 * @param {string} word
 * @returns {string}
 */
const toLower = word => word.toLowerCase();

/**
 * Camel/pascal case phrase -> Lowercase dashed phrase, snake or kebab.
 * Snake: fox_jumps_over_dog
 * Kebab: fox-jumps-over-dog
 * @example 'TheCyberPunk2077Cdpr' -> 'the-cyber-punk-2077nd-cdpr'
 * @param {string} phrase camel/pascal-case phrase
 * @param {string} de
 * @returns {string} lowercase dashed phrase
 */
function camelToSnake(phrase, de = '-') {
  let ms, wd, ph = '';
  if (((ms = INILOW.exec(phrase)) || (ms = CAPWORD.exec(phrase))) && ([ wd ] = ms)) ph = wd.toLowerCase();
  while ((ms = CAPWORD.exec(phrase)) && ([ wd ] = ms)) ph += de + wd.toLowerCase();
  return ph
}

/**
 * snake or kebab phrase -> camel-case phrase
 * @example 'THE_CYBER-PUNK.2077 cdpr' -> 'theCyberPunk2077Cdpr'
 * @param {string} dashed dashed phrase
 * @param {string} de
 * @returns {string} camel phrase
 */
const snakeToCamel = (dashed, de = '') => {
  let ms, wd, ph = '';
  if ((ms = WORD.exec(dashed)) && ([ wd ] = ms)) ph = wd.toLowerCase();
  while ((ms = WORD.exec(dashed)) && ([ wd ] = ms)) ph += de + capitalize(wd);
  return ph
};

/**
 * snake/kebab phrase -> pascal-case phrase
 * @example 'THE_CYBER-PUNK.2077 cdpr' -> 'TheCyberPunk2077Cdpr'
 * @param {string} dashed dashed phrase
 * @param {string} de
 * @returns {string} camel phrase
 */
const snakeToPascal = (dashed, de = '') => {
  let ms, wd, ph = '';
  if ((ms = WORD.exec(dashed)) && ([ wd ] = ms)) ph = capitalize(wd);
  while ((ms = WORD.exec(dashed)) && ([ wd ] = ms)) ph += de + capitalize(wd);
  return ph
};

/**
 *
 * @param word
 * @return {string}
 * @deprecated use capitalize instead
 */
const wordToCap = word => word[0].toUpperCase() + word.substring(1).toLowerCase();

const wordsToCamel = words => {
  let i = 0, l = words?.length;
  if (l) words[i] = words[i].toLowerCase();
  while (++i < l) words[i] = capitalize(words[i]);
  return words
};

const wordsToPascal = words => mutate(words, capitalize);

/**
 * Camel/pascal case phrase -> split vector
 * Snake: fox_jumps_over_dog
 * Kebab: fox-jumps-over-dog
 * @param {string} phrase camel/pascal-case phrase
 * @returns {string[]}
 * @deprecated use splitCamel in @texting/splitter
 */
function camelToVector(phrase) {
  let ms, wd, ve = [];
  if ((ms = INILOW.exec(phrase)) && ([wd] = ms)) ve.push(wd);
  while ((ms = CAPWORD.exec(phrase)) && ([wd] = ms)) ve.push(wd);
  return ve
}

/**
 * snake or kebab phrase -> split vector
 * @param {string} phrase - dashed phrase
 * @returns {string[]}
 * @deprecated use splitSnake in @texting/splitter
 */
const snakeToVector = (phrase) => phrase.split(/\W/g);

const presetAdjoin = p => {
  p = p ?? {};
  p.delim = p.delim ?? SP;
  return p
};

/**
 *
 * @param words
 * @return {string}
 * @deprecated use adjoin in @texting/tap
 */
const adjoin = function (...words) {
  const ve = [], config = presetAdjoin(this);
  for (let word of words)
    if (word?.length)
      ve.push(word);
  return ve.join(config.delim)
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
 * @deprecated use Adjoin in @texting/tap
 */
const Adjoin = (p = {}) => adjoin.bind(p);

export { Adjoin, adjoin, camelToSnake, camelToVector, capitalize, snakeToCamel, snakeToPascal, snakeToVector, toLower, toUpper, wordToCap, wordsToCamel, wordsToPascal };
