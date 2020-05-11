const one = () => {
  return new Promise((resolve) => {
    console.log(111111)

    setTimeout(() => {
      console.log('setTimeout in 1')
      resolve('Apple')
    }, 5000)
  })
}

const two = () => {
  return new Promise((resolve) => {
    console.log(222222)

    setTimeout(() => {
      console.log('setTimeout in 2')
      resolve('Banana')
    }, 1000)
  })
}

const onePromise = one()
const twoPromise = two()

setTimeout(() => {
  onePromise.then((msg) => console.log(msg))
  twoPromise.then((msg) => console.log(msg))
}, 6000)
