'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regexCharset = require('@texting/regex-charset');

const clearAnsi = tx => tx.replace(regexCharset.ANSI_G, '');

const hasAnsi = tx => regexCharset.ANSI.test(tx);

exports.clearAnsi = clearAnsi;
exports.hasAnsi = hasAnsi;
