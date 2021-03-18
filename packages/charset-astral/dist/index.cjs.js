'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regexCharset = require('@texting/regex-charset');

const hasAnsi = tx => regexCharset.ANSI.test(tx);

const hasAstral = tx => regexCharset.ASTRAL.test(tx);

exports.hasAnsi = hasAnsi;
exports.hasAstral = hasAstral;
