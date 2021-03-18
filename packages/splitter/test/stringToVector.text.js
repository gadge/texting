import { decoFlat }       from '@spare/deco-flat'
import { logger }         from '@spare/logger'
import { LF }             from '@texting/enum-chars'
import { stringToVector } from '@texting/phrasing/src/vectorize'

const text = 'Now is the winter of our discontent' + LF + 'Made glorious summer by this sun of York.'
stringToVector(text, /\w+('\w+)?/g) |> decoFlat |> logger
