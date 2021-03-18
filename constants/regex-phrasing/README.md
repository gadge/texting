## @texting/regex-phrasing

A function returning string length, s.t. skipping ansi (escape) codes, correcting length of astral symbols.

[![npm version][npm-image]][npm-url]
[![npm quality][quality-image]][quality-url]
[![npm download][download-image]][npm-url]
[![npm total-download][total-download-image]][npm-url]
[![size][size]][size-url]
[![github commit activity][commit-image]][github-url]
[![npm license][license-image]][npm-url]

## Features

- ES2015 syntax

## Install

```console
$ npm install @texting/regex-phrasing
```

## Usage

```js
import { lange } from '@texting/assets-phrasing'
const list = [
  'tolstoy',
  '\u001b[3;4;31mhatsu\u001b[0m',
  '\u{1F3C3}2\u{1F525}7',
]
for (let tx of list) {
  console.log(`[${tx}] [length] (${tx.length}) [lange] (${lange(tx)})`)
}
```

## Meta

[LICENSE (MIT)](/LICENSE)

Copyright (c) 2019-present, Haoyang (Vincent) Wang

[//]: <> (Shields)

[npm-image]: https://img.shields.io/npm/v/@texting/regex-phrasing.svg?style=flat-square

[quality-image]: http://npm.packagequality.com/shield/@texting/regex-phrasing.svg?style=flat-square

[download-image]: https://img.shields.io/npm/dm/@texting/regex-phrasing.svg?style=flat-square

[total-download-image]:https://img.shields.io/npm/dt/@texting/regex-phrasing.svg?style=flat-square

[license-image]: https://img.shields.io/npm/l/@texting/regex-phrasing.svg?style=flat-square

[commit-image]: https://img.shields.io/github/commit-activity/y/hoyeungw/spare/regex-phrasing?style=flat-square

[size]: https://flat.badgen.net/packagephobia/install/@texting/regex-phrasing

[//]: <> (Link)

[npm-url]: https://npmjs.org/package/@texting/regex-phrasing

[quality-url]: http://packagequality.com/#?package=@texting/regex-phrasing

[github-url]: https://github.com/hoyeungw/@texting/regex-phrasing

[size-url]: https://packagephobia.now.sh/result?p=@texting/regex-phrasing
