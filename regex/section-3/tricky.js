const txt = 'How do we capture 13 - 20?'

const regexTest1 = /[10-20]/g // Finds ['1', '0-2', '0']

console.log(txt.match(regexTest1)) // '1', '2', '0'
