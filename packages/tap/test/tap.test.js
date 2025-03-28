import { COSP } from '@texting/enum-chars'
import { test } from 'node:test'
import { tap }  from '../src/tap.js'

test('tap test', () => {
  const title = ''
  const subtitle = 'some'
  const kvp = `[so] (good)`
  const another = ''
  console.log(tap(title, subtitle, kvp, another).join(COSP))
})