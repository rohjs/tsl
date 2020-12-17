/**
 * Flags: flags effect the way pattern is matched
 * g: global - find muliple matches
 * i: case insensitive - ignores case
 * m: multi-line - finds matches in multi-line text
 * i.e. gi: global + case insensitive
 */
const txt = `Programming courses alwayS starts with a hello world example.`
const regex1 = /s\s/gim

console.log(regex1.exec(txt))
console.log(regex1.exec(txt))
console.log(regex1.exec(txt))
console.log(regex1.exec(txt)) // null (exec loops infinitely when it meets `null`)
console.log(txt.match(regex1)) // ['s ', 's ', 's ']
