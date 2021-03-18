const COMMA = /,/g
export const clean = tx => {
  if (!tx || tx.length <= 4) return tx
  return tx.replace(COMMA, '')
}