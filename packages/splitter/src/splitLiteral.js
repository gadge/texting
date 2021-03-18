import { LITERAL }  from '@texting/regex-phrasing'
import { splitter } from './splitter'

/**
 * @type {Function|function(string):string[]}
 * @function
 */
export const splitLiteral = splitter.bind(LITERAL)
