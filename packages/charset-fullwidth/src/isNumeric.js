import { REG_NUM_FULL } from '../assets/regex'

/**
 *
 * @param {string} tx
 * @returns {boolean}
 */
export const isNumeric = tx => REG_NUM_FULL.test(tx)

