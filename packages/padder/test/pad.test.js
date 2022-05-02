import { logger } from '@spare/logger'
import { Pad }    from '../src/Pad'

const candidates = [
  'foo',
  '123',
  '123,123',
  '123.0'
]

const pad = Pad({ ansi: false, thousand: true, })
for (let value of candidates) {
  pad(value, 8, value)|> logger
}