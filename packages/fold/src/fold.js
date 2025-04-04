import { LF } from '@texting/enum-chars'

export const RSP = /\s+/g
export const RLF = /\r?\n/
const FAKE = {}

export function foldToVector(text) {
  const ctx = this ?? FAKE
  const wd = ctx.wd ?? ctx.width ?? 80
  const reg = ctx.reg ?? ctx.regex ?? RSP
  const dep = ctx.dep ?? ctx.firstLineIndent ?? 0
  const lines = []
  let ms, ph, pr = 0, cu = 0, la = 0, nx = 0, th = pr + wd - dep // threshold
  // if (dep) text = SP.repeat(dep) + text
  while ((ms = reg.exec(text)) && ([ ph ] = ms)) {
    nx = ms.index
    if (nx > th) lines.push(text.slice(pr, cu)), pr = la, th = pr + wd
    if (RLF.test(ph)) lines.push(text.slice(pr, nx)), pr = reg.lastIndex, th = pr + wd
    cu = nx
    la = reg.lastIndex
  }
  if (text.length > th) lines.push(text.slice(pr, cu)), pr = la
  if (pr < text.length) lines.push(text.slice(pr))
  // if (dep) lines[0] = lines[0].slice(dep)
  return lines
}

// export const

export function fold(text) { return foldToVector.call(this, text).join(this?.delim ?? LF) }

// { width, delim, regex, firstLineIndent }

/**
 * @param {number} [config.width=80]
 * @param {RegExp} [config.regex=RSP]
 * @param {number} [config.firstLineIndent=0]
 * @returns {function(string):string[]}
 * @constructor
 */
export const FoldToVector = (config) => foldToVector.bind(config)

/**
 * @param {number} [config.width=80]
 * @param {string} [config.delim=LF]
 * @param {RegExp} [config.regex=RSP]
 * @param {number} [config.firstLineIndent]
 * @returns {function(string):string}
 * @constructor
 */
export const Fold = (config) => fold.bind(config)