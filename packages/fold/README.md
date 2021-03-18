## @texting/fold

Split one line of words into lines

[![npm version][npm-image]][npm-url]
[![npm quality][quality-image]][quality-url]
[![npm download][download-image]][npm-url]
[![npm total-download][total-download-image]][npm-url]
[![size][size]][size-url]
[![github commit activity][commit-image]][github-url]
[![npm license][license-image]][npm-url]

## Features

- Split one line of words into lines

## Install

```console
$ npm install @texting/fold
```

## Usage

```js
import { fold } from '@texting/fold'

const quoteByModigliani= `What is the "cost of capital" to a, firm in a world in which funds are used to acquire assets whose yields are uncertain; and in which capital can be obtained by many different media, ranging from pure debt instruments, representing money-fixed claims, to pure equity issues, giving holders only the right to a pro-rata share in the uncertain venture? This question has vexed at least three classes of economists: (1) the corporation finance specialist concerned with the techniques of financing firms so as to ensure their survival and growth; (2) the managerial economist concerned with capital budgeting; and (3) the economic theorist concerned with explaining investment behavior at both the micro and macro levels.`
const folded=fold(quoteByModigliani)
console.log(folded)

```

## Meta

[LICENSE (MIT)](/LICENSE)

Copyright (c) 2019-present, Haoyang (Vincent) Wang

[//]: <> (Shields)

[npm-image]: https://img.shields.io/npm/v/@texting/fold.svg?style=flat-square

[quality-image]: http://npm.packagequality.com/shield/@texting/fold.svg?style=flat-square

[download-image]: https://img.shields.io/npm/dm/@texting/fold.svg?style=flat-square

[total-download-image]:https://img.shields.io/npm/dt/@texting/fold.svg?style=flat-square

[license-image]: https://img.shields.io/npm/l/@texting/fold.svg?style=flat-square

[commit-image]: https://img.shields.io/github/commit-activity/y/hoyeungw/spare/bracket?style=flat-square

[size]: https://flat.badgen.net/packagephobia/install/@texting/fold

[//]: <> (Link)

[npm-url]: https://npmjs.org/package/@texting/fold

[quality-url]: http://packagequality.com/#?package=@texting/fold

[github-url]: https://github.com/hoyeungw/@texting/fold

[size-url]: https://packagephobia.now.sh/result?p=@texting/fold
