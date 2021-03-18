import { StringVectorCollection } from '@foba/vector'
import { delogger }               from '@spare/deco'
import { logger }                 from '@spare/logger'
import { COSP }                   from '@texting/enum-chars'
import { joinLines }              from '../src/liner'


const lines = StringVectorCollection.flopShuffle()

lines |> delogger

'result: ' + '[' + joinLines(lines, COSP, 0, true) + ']'|> logger
