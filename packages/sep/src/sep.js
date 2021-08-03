export const sep = function (text) {
  const regex = this
  let ms, l = 0
  return ( ms = regex.exec(text) ) && ( l = regex.lastIndex )
    ? [ text.slice(0, ms.index), text.slice(l) ]
    : [ text, '' ]
}