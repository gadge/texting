import { logger, Xr } from '@spare/logger'
import { clearAnsi }  from '../src/clearAnsi.js'
import { hasAnsi }    from '../src/hasAnsi.js'

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

Xr("ANSI")["source"](ANSI.source.toString()) |> logger

for (let w of candidates) {
  Xr(w).hasAnsi(hasAnsi(w)).clearAnsi(clearAnsi(w)) |> logger
}