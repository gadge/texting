import { delogger } from '@spare/deco'
import { COSP }     from '@texting/enum-chars'
import { tap }      from '../src/tap.js'

const test = () => {
  const title = ''
  const subtitle = 'some'
  const kvp = `[so] (good)`
  const another = ''
  tap(title, subtitle, kvp, another).join(COSP) |> delogger
}

test()
