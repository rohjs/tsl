/**
 * Excluding characters in Character Set: ^
 *
 * ^ SHOULD ALWAYS BE THE FIRST CHARACTER OF A CHARACTER SET
 */

const txt = 'Exception 0x1F89F'
const txt2 = 'Exception 0x F89F'

const regexTest1 = /0x[^G-Z]/g // The next character of 0x cannot be G-Z
const regexTest2 = /0x[^0-9A-Z]/g // The next character of 0x cannot be A-Z nor 0-9

console.log(txt.match(regexTest1)) // '0x1'
console.log(txt.match(regexTest2)) // null
console.log(txt2.match(regexTest2)) // '0x '

const txt3 = 'abcdefghijklmnopqrstuvwzyz^'

const regexTest3 = /[^a-z]/g
const regexTest4 = /[\^a-z]/g

console.log(txt3.match(regexTest3)) // '^'
console.log(txt3.match(regexTest4)) // All the characters match
