const txt = 'Programming courses always starts with a hello world example.'

// 1. Create RegExp object by constructor
const regex1 = new RegExp('hello')
// 2. Literal
const regex2 = /world/

// RegExp.prototype.test - Returns true when pattern is found and vice versa.
// Create a RegExp, and pass text you want to evaluate
console.log(regex1.test(txt)) // true
console.log(regex2.test(txt)) // true

// RegExp.prototype.exec - Returns an array of the matches
console.log(regex1.exec(txt))
console.log(regex2.exec(txt))

// RegExp.prototype.toString - Returns stringified regExp
console.log(regex1.toString(txt))

// String.prototype.match === RegExp.prototype.exec
console.log(txt.match(regex1))
console.log(txt.match(regex2))

// String.prototype.search - return index only
console.log(txt.search(regex1))
console.log(txt.search(regex2))

// String.prototype.replace
console.log(txt.replace(regex1, 'hi🌷'))

// String.prototype.replace
console.log(txt.split(regex1))

let spaceRegExp = /\s/ // 's'pace
console.log(txt.split(spaceRegExp))
