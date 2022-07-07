import { zipper } from '@vect/vector-zipper'

function main() {
  const ks = ['Solomon', 'Jason', 'Errol', 'Garry', 'Bernard', 'Barry', 'Stephen',],
        vs = [44, 42, 42, 41, 41, 41, 39,];
  const sorted = zipper(ks, vs, (name, score) => ({ name, score }))
    .sort((a, b) => {
      const c = b.score - a.score;
      return c ? c : a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

  const names    = sorted.map(x => x.name),
        scores   = sorted.map(x => x.score),
        reversed = scores.slice(0).reverse(),
        unique   = scores.filter((x, i) => scores.indexOf(x) === i);

  // RANKINGS AS FUNCTIONS OF SCORES: SORTED, REVERSED AND UNIQUE

// rankings :: Int -> Int -> Dictonary
  function rankings(score, index) {
    return {
      name: names[index],
      score,
      Ordinal: index + 1,
      Standard: scores.indexOf(score) + 1,
      Modified: reversed.length - reversed.indexOf(score),
      Dense: unique.indexOf(score) + 1,
      Fractional: (n => (
        (scores.indexOf(n) + 1) +
        (reversed.length - reversed.indexOf(n))
      ) / 2)(score)
    }
  }

  // tbl :: [[[a]]]
  const tbl = ['Name Score Standard Modified Dense Ordinal Fractional'.split(' ')].concat(scores.map(rankings)
    .reduce((a, x) => a.concat([
      [x.name, x.score,
        x.Standard, x.Modified, x.Dense, x.Ordinal, x.Fractional
      ]
    ]), []));

  // wikiTable :: [[[a]]] -> Bool -> String -> String
  const wikiTable = (lstRows, blnHeaderRow, strStyle) =>
    `{| class="wikitable" ${strStyle ? 'style="' + strStyle + '"' : ''}
        ${lstRows.map((lstRow, iRow) => {
      const strDelim = ((blnHeaderRow && !iRow) ? '!' : '|');

      return '\n|-\n' + strDelim + ' ' + lstRow
        .map(v => typeof v === 'undefined' ? ' ' : v)
        .join(' ' + strDelim + strDelim + ' ');
    }).join('')}\n|}`;

  const text = wikiTable(tbl, true, 'text-align:center');
  text |> console.log
}

main()