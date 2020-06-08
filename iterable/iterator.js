const text = 'hello'
const stringIterator = text[Symbol.iterator]()

console.log(stringIterator.next())
console.log(stringIterator.next())
console.log(stringIterator.next())
console.log(stringIterator.next())
console.log(stringIterator.next())
console.log(stringIterator.next())