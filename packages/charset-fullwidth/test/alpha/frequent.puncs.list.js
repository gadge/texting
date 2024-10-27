import { says }              from '@palett/says'
import { Xr }                from '@spare/logger'
import { range }             from '@vect/vector-init'
import { codeToHex, toCode } from '../utils/toChar'

const special = [
  ['　', ' ',],
  ['、', ',',],
  ['。', '.',],
  ['【', '[',],
  ['】', ']',],

  ['——', '-',],
  ['‘', '\'',],
  ['’', '\'',],
  ['“', '\"',],
  ['”', '\"',],

  ['，', ',',],
  ['；', ';',],
  ['！', '!',],
  ['？', '?',],
  ['－', '-',],
  ['＿', '_',],
  ['＼', '\\',],
  ['／', '/',],
  ['（', '(',],
  ['）', ')',],
  ['｛', '{',],
  ['｝', '}',],
  ['＜', '<',],
  ['＞', '>',],
  ['', '',],
]

for (let [full, half] of special) {
  const codes = {
    full: toCode(full),
    half: toCode(half),
  }
  Xr()
    [codes.full + ':' + (codes.full|> codeToHex)](full)
    .p(' -> ')
    [codes.half + ':' + (codes.half|> codeToHex)](half)
    |> says[codes.full - codes.half]
}

export class FullToHalf {
  static punc(x) {

  }
  static num(x) {

  }
}

for (let n of range(8200, 8300)) {
  // Xr()[n](n |> toChar) |> says[n]
}