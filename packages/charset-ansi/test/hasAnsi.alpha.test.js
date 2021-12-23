import { says }       from '@palett/says'
import { logger, Xr } from '@spare/logger'
import { parenth }    from '@texting/bracket/src/br'
import { ANSI_G }     from '@texting/regex-charset'

const ANSI_ALPHA = /(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?)/
const ANSI_BETA = /(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~])/
const ANSI = new RegExp(`[][[\\]()#;?]*(?:${ANSI_ALPHA.source}|${ANSI_BETA.source})`)

export const hasAnsi = tx => ANSI.test(tx)
export const clearAnsi = tx => tx.replace(ANSI_G, '')

const candidates = [
  'tora',
  '\u001B[4mcake\u001B[0m',
  '\u001b[38;2;255;255;85mTolstoy\u001b[0m',
  '\u{1F4A9}',
  '𝐀',
  'I \u2661 STEAK',
  '\u001b[3;4;31mhatsu\u001b[0m',
  '\u001B]8;;https://github.com\u0007hatsu\u001B]8;;\u0007',
  '\u{1F3C3}2\u{1F525}7',
  '\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m🦄bar'
]

Xr("ANSI 1")["source"](ANSI.source.toString()) |> logger


Xr("test") |> says['ansi-1']
for (let ph of candidates) {
  Xr(ph)['ansi-1'](hasAnsi(ph))['clear-ansi'](clearAnsi(ph)) |> logger
}
'' |> logger


Xr("test") |> says['ansi-2']
// chalk/ansi-regex
const ANSI_2 = /[][[\]()#;?]*(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?|(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~])/
const G_ANSI_2 = RegExp(ANSI_2, 'g')
Xr("ANSI 2")["source"](ANSI_2.source.toString()) |> logger
for (let ph of candidates) {
  Xr(ph)['ansi-2'](ANSI_2.test(ph))['clear-ansi'](ph.replace(G_ANSI_2, '')) |> logger
}
'' |> logger

export const regex_analyzer = function (text) {
  const regex = this
  let ms, l = 0, r = 0, sp, ph
  // const vec = []
  while (( ms = regex.exec(text) ) && ( [ ph ] = ms )) {
    r = ms.index
    if (( sp = text.slice(l, r) )) sp |> says['spaced'] // vec.push(sp)
    parenth(`${ ph.toString() }`) |> says['phrase']
    //vec.push(ph)
    l = regex.lastIndex
  }
  if (l < text.length) {
    text.slice(l) |> says['spaced']
    // vec.push(text.slice(l))
  }
  // return vec
}

Xr("test") |> says['ansi-3']
// fis-components/ansi-regex
const ANSI_3 = /[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/
const G_ANSI_3 = RegExp(ANSI_3, 'g')
Xr("ANSI 3")["source"](ANSI_3.source.toString()) |> logger
for (let ph of candidates) {
  Xr(ph)['ansi-3'](ANSI_2.test(ph))['clear-ansi'](ph.replace(G_ANSI_3, '')) |> logger
  regex_analyzer.call(G_ANSI_3, ph)
}
'' |> logger


Xr("test") |> says['ansi-4']
const ANSI_4 = /[][[\]()#;?]*(?:(?:[a-zA-Z\d]*(?:;[a-zA-Z\d]*)*)?|(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PRZcf-ntqry=><~])/
const G_ANSI_4 = RegExp(ANSI_4, 'g')
Xr("ANSI 4")["source"](ANSI_4.source.toString()) |> logger
for (let ph of candidates) {
  Xr(ph)['ansi-4'](ANSI_4.test(ph))['clear-ansi'](ph.replace(G_ANSI_4, '')) |> logger
}
'' |> logger
