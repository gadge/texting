import { decoSamples, logNeL, says }                 from '@spare/logger'
import { camelToSnake, snakeToCamel, snakeToPascal } from '../src/phrasing.js'
import { candidates }                                from './candidates.js'

says['snake -> pascal -> snake']('below are tests')
logNeL(decoSamples(Object.entries(candidates).map(([ key, phrase ]) => {
  const pascal = snakeToPascal(phrase)
  return { value: phrase, pascal, snake: camelToSnake(pascal) }
})))

says['snake -> camel -> snake']('below are tests')
logNeL(decoSamples(Object.entries(candidates).map(([ key, phrase ]) => {
  const camel = snakeToCamel(phrase)
  return { value: phrase, camel, snake: camelToSnake(camel) }
})))

says['camel -> snake -> camel']('below are tests')
logNeL(decoSamples(Object.entries(candidates).map(([ key, phrase ]) => {
  const snake = camelToSnake(phrase)
  return { value: phrase, snake, camel: snakeToCamel(snake) }
})))
