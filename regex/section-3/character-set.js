/**
 * Find Gray or Grey
 * EACH CHARACTER INSIDE CHARACTER SET INDICATES INDIVIDUAL CHARACTER MATCH (except -)
 */

const txt =
  'Make the outline for the square gray and the fill for the 3 circle grey. gra 1234 '

const regexGray = /gr[ae]y/gi // A or E could produce a match
const regexNumber = /[1234]\scircle/g
const regexNumber2 = /[1234]/g
const regex = /e[ ]/g
const regexWithWildcard = /gr[ae]y[ .]/g // ' ' or '.', it's not a wildcard!
const regexWithWildcard2 = /gr[ae]y[.]/g

console.log(txt.match(regexGray)) // 'gray', 'grey'
console.log(txt.match(regexNumber)) // '3 circle'
console.log(txt.match(regexNumber2)) // '3', '1', '2', '3', '4'
console.log(txt.match(regex)) // '3', '1', '2', '3', '4'
console.log(txt.match(regexWithWildcard)) // 'gray ', 'grey.' Space or anything
console.log(txt.match(regexWithWildcard2)) // 'grey.'
