## @texting/charset-astral

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
$ npm install @texting/charset-astral
```

## Usage

```js
import { lange } from '@texting/charset-ansi'
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

[npm-image]: https://img.shields.io/npm/v/@texting/charset-astral.svg?style=flat-square

[quality-image]: http://npm.packagequality.com/shield/@texting/charset-astral.svg?style=flat-square

[download-image]: https://img.shields.io/npm/dm/@texting/charset-astral.svg?style=flat-square

[total-download-image]:https://img.shields.io/npm/dt/@texting/charset-astral.svg?style=flat-square

[license-image]: https://img.shields.io/npm/l/@texting/charset-astral.svg?style=flat-square

[commit-image]: https://img.shields.io/github/commit-activity/y/hoyeungw/spare/charset?style=flat-square

[size]: https://flat.badgen.net/packagephobia/install/@texting/charset-astral

[//]: <> (Link)

[npm-url]: https://npmjs.org/package/@texting/charset-astral

[quality-url]: http://packagequality.com/#?package=@texting/charset-astral

[github-url]: https://github.com/hoyeungw/@texting/charset-astral

[size-url]: https://packagephobia.now.sh/result?p=@texting/charset-astral
