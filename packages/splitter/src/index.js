import { LITERAL }  from '@texting/regex-phrasing'
import { splitter } from './splitter.js'

export { splitter } from './splitter.js'

/** @type {function} */
export const splitLiteral = splitter.bind(LITERAL)

export { splitCamel } from './splitCamel.js'
export { splitSnake } from './splitSnake.js'
