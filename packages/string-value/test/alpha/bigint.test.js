const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER)
// ↪ 9007199254740991n

const maxPlusOne = previousMaxSafe + 1n
// ↪ 9007199254740992n

const theFuture = previousMaxSafe + 2n
// ↪ 9007199254740993n, this works now!

const multi = previousMaxSafe * 2n
// ↪ 18014398509481982n

const subtr = multi - 10n
// ↪ 18014398509481972n

const mod = multi % 10n
// ↪ 2n

const bigN = 2n ** 54n
// ↪ 18014398509481984n

bigN * -1n
// ↪ -18014398509481984n


;`[maxPlusOne] (${maxPlusOne}) ` |> console.log

const a = [0, 0, 255]
const b = [255, 0, 0]
const dualXYZ = (triA, triB) => {
  const [a, b, c] = triA
  const [d, e, f] = triB

}
const n2 = 1 << 30;
n2 |> console.log
1n << 30n |> console.log
1n << 31n |> console.log
1n << 32n |> console.log
1n << 33n |> console.log
1n << 34n |> console.log
1n << 35n |> console.log