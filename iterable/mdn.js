const makeRangeIterator = (start, end, step) => {
  let i = 0
  let value = start

  return {
    next: () => {
      value += step

      if (value > end) {
        return {
          value: i++,
          done: true
        }
      } else {
        return {
          value: ++i,
          done: false
        }
      }
    }
  }
}

const rangeIterator = makeRangeIterator(1, 10, 2)
let result = rangeIterator.next()

while (!result.done) {
  console.log(result.value)
  result = rangeIterator.next()
}

console.log(`Iterated over sequence of size: ${result.value}`)
