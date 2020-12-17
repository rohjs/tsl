// ^ $ . * + ? = ! : | \ / ( ) [ ] { }
/**
 * . - wildcard
 * represents a single character which can be almost anything
 * except non-printable characters (ex. \n)
 */
const txt = 'What was that all about? It was so hot!'
const regex1 = /.t/g
const regex2 = /h.t/g

console.log(txt.match(regex1)) // ['at', ' t', 'at', 'ut', 'It, 'ot']
console.log(txt.match(regex2)) // ['hat', 'hat', 'hot']
console.log('h t'.match(regex2)) // ['h t']
console.log('h@t'.match(regex2)) // ['h@t']
console.log('h🌷t'.match(regex2)) // null

/**
 * \ - escaping metacharacters
 * backslash + metacharacter = the following metacharacter of backslash should be interpreted as a literal string
 */
const txt2 = 'This could be the final word.'
const regex3 = /d./g
const regex4 = /d\./g

console.log(txt2.match(regex3)) // ['d ', 'd.']
console.log(txt2.match(regex4)) // ['d.']
