function stub(text) {
  const regex = this;
  let ms, l = 0, r = 0;
  while ((ms = regex.exec(text))) {
    r = ms.index;
    l = regex.lastIndex;
  }
  return l === 0 ? [ text, '' ] : [ text.slice(0, r), text.slice(l) ]
}

function sep(text) {
  const regex = this;
  let ms, l = 0;
  return (ms = regex.exec(text)) && (l = regex.lastIndex)
    ? [ text.slice(0, ms.index), text.slice(l) ]
    : [ text, '' ]
}

export { sep, stub as sepByLast, stub };
