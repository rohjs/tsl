/**
 * Specifying a Range
 * - is a meta character in Character set
 * [1-4] any number from 1 to 4
 * [-.] if - doesn't indicates 'range', it doesn't need to be escaped
 * range includes: number, alphabets
 */

const txt =
  'There have been 4 - 15 times I have tried, but I will try it again.'

const regexTest1 = /[0-9]\s-\s[0-9][0-9]/g // '4 - 15'
const regexTest2 = /[0-9][0-9]/g // '15'
const regexTest3 = /[0-9]/g // '4', '1', '5'
const regexTest4 = /[0-9a-zA-Z]/g
const regexTest5 = /[1-4 \-1]/g // '4 -1'
const regexTest6 = /[-,.]/g // all hypens, commas and dots

console.log(txt.match(regexTest1))
console.log(txt.match(regexTest2))
console.log(txt.match(regexTest3))
console.log(txt.match(regexTest4)) // Almost everything except spaces and commas
console.log(txt.match(regexTest5))
console.log(txt.match(regexTest6))
