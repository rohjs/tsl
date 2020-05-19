/* Call by value */
let a = 5
let b = 5
b = b + 10
console.log(a, b) // 5 15

/* Understand scope */
let x = 5
function sum(x, y) {
  x = x + y
}
sum(x, 10)
console.log(x) // 5

/* Call by reference */
let arr = [1, 2, 3]
let secondArr = [1, 2, 3]
console.log(arr === secondArr) // false

let person = {
  name: `Woohyeon`,
  birth: {
    year: 1993,
    month: 5,
    day: 26
  }
}
let woohyeon = person
woohyeon.hometown = `Ulsan`
console.log(person)
// {
//   name: `Woohyeon`,
//   birth: {
//     year: 1993,
//     month: 5,
//     day: 26
//   },
//   hometown: `Ulsan`
// }
