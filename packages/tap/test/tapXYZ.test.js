import { xyz } from '../src/tap.js'

const A = 'a', B = 'b', C = 'c', _ = ''

const pd = x => x.padStart(1);
`[${pd(A)}, ${pd(B)}, ${pd(C)}] -> (${xyz(A, B, C)})` |> console.log;
`[${pd(A)}, ${pd(B)}, ${pd(_)}] -> (${xyz(A, B, _)})` |> console.log;
`[${pd(A)}, ${pd(_)}, ${pd(C)}] -> (${xyz(A, _, C)})` |> console.log;
`[${pd(A)}, ${pd(_)}, ${pd(_)}] -> (${xyz(A, _, _)})` |> console.log;
`[${pd(_)}, ${pd(B)}, ${pd(C)}] -> (${xyz(_, B, C)})` |> console.log;
`[${pd(_)}, ${pd(B)}, ${pd(_)}] -> (${xyz(_, B, _)})` |> console.log;
`[${pd(A)}, ${pd(_)}, ${pd(C)}] -> (${xyz(A, _, C)})` |> console.log;
`[${pd(_)}, ${pd(_)}, ${pd(_)}] -> (${xyz(_, _, _)})` |> console.log
