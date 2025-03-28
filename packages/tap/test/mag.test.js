import { test } from 'node:test'
import { mag }  from '../src/tap.js'

test('mag test', () => {
  const beta = null
  const title = ''
  const year = '1915'
  const entry = `[Kafka] (Metamorphosis)`
  const info = ''
  const result = mag(beta, title, year, entry, info)
  console.log(result)
})