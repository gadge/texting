'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regexCharset = require('@texting/regex-charset');

/**
 *
 * @param {string} tx
 * @returns {number}
 */

const lange = tx => tx.replace(regexCharset.ANSI_G, '').replace(regexCharset.ASTRAL_G, '_').length;
const Lange = ansi => ansi ? lange : x => x.length;

exports.Lange = Lange;
exports.lange = lange;
