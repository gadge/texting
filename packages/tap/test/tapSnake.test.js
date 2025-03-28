import { test }                        from 'node:test'
import { tapCamel, tapPascal }         from '../index.js'
import { tapKebab, tapPath, tapSnake } from '../src/tap.js'

const candidates = [
  undefined,
  'the',
  'raging',
  'bull',
]

test('tapSnake test', () => {
  console.log(tapSnake(...candidates))
  console.log(tapKebab(...candidates))
  console.log(tapCamel(...candidates))
  console.log(tapPascal(...candidates))
  console.log(tapPath(...candidates))
})
