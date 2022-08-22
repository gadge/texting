import { VectorCollection } from '@foba/vector-string'
import { delogger }         from '@spare/deco'
import { logger }           from '@spare/logger'
import { COSP }      from '@texting/enum-chars'
import { joinLines } from '../src/linesHandler.js'


const lines = VectorCollection.armDealers

lines |> delogger

'result: ' + '[' + joinLines(lines, COSP, 0, true) + ']'|> logger
