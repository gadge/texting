import { StringVectorCollection } from '@foba/vector'
import { delogger }               from '@spare/deco'
import { logger }                 from '@spare/logger'
import { BRACKET }                from '@texting/enum-brackets'
import { COSP }                   from '@texting/enum-chars'
import { liner }                  from '../src/liner'


const lines = StringVectorCollection.flopShuffle()

lines |> delogger

liner(lines, { bracket: BRACKET, delim: COSP }) |> logger
