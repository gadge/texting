export const sepByLast = function (text) {
  const regex = this
  let ms, l = 0, r = 0
  while (( ms = regex.exec(text) )) {
    r = ms.index
    l = regex.lastIndex
  }
  return l === 0 ? [ text, '' ] : [ text.slice(0, r), text.slice(l) ]
}