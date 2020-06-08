const str = new String('hello')

const strIterator = function () {
  let i = 0
  let text = str

  return {
    next: function () {
      if (i < text.length) {
        return {
          value: text[i++],
          done: false
        }
      } else {
        return {
          value: text[i],
          done: true
        }
      }
    }
  }
}

str[Symbol.iterator] = strIterator

for (let s of str) {
  console.log(s)
}
