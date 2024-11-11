import { init }  from '@vect/vector-init'
import { SP }    from '@texting/enum-chars'
import { value } from '../src/value.js'

const candidates = [
  ...init(8, i => 'A'.repeat(i + 1)),
  ...'comprehend how it\'s driven by animal spirits'.split(SP),
  'Warren',
  'WSJ',
  'GlobalTimes',
  'ZZZZ',
  'zzzz',
  'zzzz0000',
  'MetalGear 1',
  'MetalGear 2',
  '2022-01-31',
  '2022-02-28',
  '2022-03-31',
  '2022-06-30',
  '2022-09-30',
  '2022-12-31',
]


const decode = (code) => {
  return code.toString(16).split('')
}

for (let x of candidates) {
  const val = value(x, x.length);
  console.log(`[${x}] (${val}) (${decode(val)})`)
}

