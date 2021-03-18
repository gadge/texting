const NON_SPACE = /[^\s]/
export const parseNum = text => {
  if (!text) return NaN
  let l = text.length, i = text.search(NON_SPACE), t = '', n, v
  while (i < l && (n = text.charCodeAt(i++)))
    if (n !== 0xff0c) {
      v = 0xFF & (n + 0x20)
      t += String.fromCharCode(v < n ? v : n)
    }
  return +t
}