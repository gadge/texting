function splitByLastOccurrence(str) {
  const regex = this
  if (str === '') { return [ '', '' ] }
  let index = -1, delta = 0
  for (let i = 0; i < str.length; i++) {
    const slice = str.slice(i)  // Create a slice from current position to end of string
    const match = slice.match(regex) // Test for match at current position
    if (!match || match.index !== 0) continue // If no match found at this position, continue
    index = i // Found a match, update the last match index and length
    delta = match[0].length
    i += match[0].length - 1 // Move i forward by match length - 1 (the loop will increment i by 1)
  }
  return index < 0 ? [ str, '' ] : [ str.slice(0, index), str.slice(index + delta) ] // If no match was found, return the whole string as first element and empty string as second
}

// Example usage
const str = 'one,two,three,four'
const result = splitByLastOccurrence(str, /,/)
console.log(result) // ['one,two,three', 'four']

// Works with regex patterns too
const paths = 'users/profile/settings/preferences'
const pathResult = splitByLastOccurrence(paths, /\/[^\/]+$/)
console.log(pathResult) // ['users/profile/settings', 'preferences']