import { says }        from '@spare/logger'
import { SP }          from '@texting/enum-chars'
import { init }        from '@vect/vector-init'
import { stringValue } from '../src/stringValue.js'

export const test = () => {
  const candidates = [
    ...init(8, i => 'A'.repeat(i + 1)),
    ...'comprehend how it\'s driven by animal spirits'.split(SP),
    'Warren',
    'WSJ',
    'GlobalTimes',
    'ZZZZ',
    'zzzz',
    'MetalGear 1',
    'MetalGear 2'
  ]
  for (let candidate of candidates) {
    String(stringValue(candidate)).padStart(10, ' ') |> says[candidate]
  }
}

test()


