function sep(text) {
  const regex = this;
  let ms, ph, i;
  return (ms = regex.exec(text)) && ([ ph ] = ms)
    ? [ text.slice(0, i = ms.index), text.slice(i + ph.length) ]
    : [ text, '' ]
}

function stub(text) {
  const regex = this;
  if (!regex?.global) return sep.call(regex, text)
  let ms, y = 0, x = 0;
  while ((ms = regex.exec(text))) {
    x = ms.index;
    y = regex.lastIndex;
  }
  return y === 0 ? [ text, '' ] : [ text.slice(0, x), text.slice(y) ]
}

export { sep, stub as sepByLast, stub };
