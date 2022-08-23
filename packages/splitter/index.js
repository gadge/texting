import { LITERAL }  from '@texting/regex-phrasing'
import { splitter } from './src/splitter.js'

export { splitter } from './src/splitter'

/** @type {function} */
export const splitLiteral = splitter.bind(LITERAL)

export { splitCamel } from './src/splitCamel'
export { splitSnake } from './src/splitSnake'
