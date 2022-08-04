import { Padder } from '../src/Padder.js'

const candidates = [
  [ '', NaN ],
  [ '-', NaN ],
  [ 'shakes', NaN ],
  [ '1E+5', 1E+5 ],
  [ '255', 0xFF ]
]

const padder = new Padder(6, ' ', false)
for (let [ x, n ] of candidates) {
  `[${x}, ${n}] (${padder.render(x, n)})` |> console.log
}