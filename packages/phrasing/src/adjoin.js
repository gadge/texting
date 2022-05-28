import { SP } from '@texting/enum-chars'

const presetAdjoin = p => {
  p = p ?? {}
  p.delim = p.delim ?? SP
  return p
}

/**
 *
 * @param words
 * @return {string}
 * @deprecated use adjoin in @texting/tap
 */
export const adjoin = function (...words) {
  const ve = [], config = presetAdjoin(this)
  for (let word of words)
    if (word?.length)
      ve.push(word)
  return ve.join(config.delim)
}

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
export const Adjoin = (p = {}) => adjoin.bind(p)
