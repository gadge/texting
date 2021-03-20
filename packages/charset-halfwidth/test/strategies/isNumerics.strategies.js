import { makeEmbedded } from '@foba/util'
import { says }         from '@palett/says'
import { decoCrostab }  from '@spare/logger'
import { strategies }   from '@valjoux/strategies'

const candidates = {
  null: null,
  undefined: undefined,
  // boolean: false,
  // numNaN: NaN,
  'str NaN': 'NaN',
  'str null': 'null',
  'str undefined': 'undefined',
  'str true': 'true',
  'str false': 'false',
  'str 0': '0',
  'str -1': '-1',
  'str -1.5': '-1.5',
  'str 0.42': '0.42',
  'str .42': '.42',
  'str 99,999': '99,999',
  'str 1.2E+9': '1.2E+9',
  'str 0xFF': '0xFF',
  'str Inf..': 'Infinity',
  'str empty': '',
  'str space': ' ',
  'str [Ob]': '[object Object]',
  'str dot': '.',
  'str +': '+',
  'str -': '-',
  'str date': '2077-06-04',
  'str #abcdef': '#abcdef',
  'str 1.2.3': '1.2.3',
  'str blah': 'blah',
}

const COMMA = /,/g
const { lapse, result } = strategies({
    repeat: 1E+6,
    candidates: candidates |> makeEmbedded,
    methods: {
      cla: x => (x = x?.replace(COMMA, ''), !isNaN(x - parseFloat(x))),
      some: x => !isNaN(parseFloat(x?.replace(COMMA, ''))),
      dev: x => (x = +x) || x === 0,
      fut: x => !isNaN(+x),
      edge: x => /^[\s+-]*\d*\.?\d+$/.test(x)
    }
  }
)
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']