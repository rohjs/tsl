/**
 * Control characters
 * \t - tab
 * \v - vertical tab
 * \n - newline
 * \r - carriage return
 * Just use control characters for its representations
 */

const txt = `
  hot h t hit h
t
`
const regex = /h\nt/g

console.log(txt.match(regex)) // ['h\nt']
