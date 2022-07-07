import { strategies }   from '@valjoux/strategies'
import { makeEmbedded } from '@foba/util'
import { decoCrostab }  from '@spare/logger'
import { says }         from '@spare/xr'
import { stringValue }  from '../src/stringValue'

function levenshtein(xt, yt) {
  let t = [], u, i, j
  const h = xt.length, w = yt.length
  if (!h) { return w; }
  if (!w) { return h; }
  for (j = 0; j <= w; j++) { t[j] = j; }
  for (i = 1; i <= h; i++) {
    for (u = [i], j = 1; j <= w; j++) {
      u[j] = xt[i - 1] === yt[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
    }
    t = u;
  }
  return u[w];
}

// Compute the edit distance between the two given strings
function editDist(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = []

  // increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    empty: '',
    shakes: 'chanel',
    shelly: 'chalene',
    challe: 'chelene',
  } |> makeEmbedded,
  methods: {
    bench: x => x & 0x1F,
    value: x => stringValue(x),
    empty: x => levenshtein(x, ''),
    shakes: x => levenshtein(x, 'chanel',),
    shelly: x => levenshtein(x, 'chalene',),
    challe: x => levenshtein(x, 'chelene',),
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']