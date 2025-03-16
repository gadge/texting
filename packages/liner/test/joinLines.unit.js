import { VectorCollection } from '@foba/vector-string'
import { deco }             from '@spare/deco'
import { logger }           from '@spare/logger'
import { COSP }             from '@texting/enum-chars'
import { joinLines }        from '../src/linesHandler.js'

const lines = VectorCollection.armDealers

logger(deco(lines))

logger('result: ' + '[' + joinLines(lines, COSP, 0, true) + ']')
