function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}
function str2ab(text) {
  const buf = new ArrayBuffer(text.length * 2) // 2 bytes for each char
  const bufView = new Uint16Array(buf)
  for (let i = 0, hi = text.length; i < hi; i++) {
    bufView[i] = text.charCodeAt(i)
  }
  return buf
}