import { VectorCollection } from '@foba/vector-string'
import { BRACKET }          from '@texting/enum-brackets'
import { COLF, COSP }       from '@texting/enum-chars'
import { Liner }            from '../index.js'


const lines = VectorCollection.armDealers.slice(0, 20)

const CONFIG = { brac: BRACKET, delim: COLF }

lines |> console.log

Liner.collect.call(CONFIG, lines) |> console.log