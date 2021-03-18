'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regexCharset = require('@texting/regex-charset');

const clearAstral = tx => tx.replace(regexCharset.ASTRAL_G, '_');

const hasAstral = tx => regexCharset.ASTRAL.test(tx);

exports.clearAstral = clearAstral;
exports.hasAstral = hasAstral;
