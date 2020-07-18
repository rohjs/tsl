// one returns a promise
function one(text) {
  return new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
      resolve(text)
    }, 1000)
  })
}

// asynchronous two
// two waits one to be resolved
// it acts as if it is synchronous
// it returns a promise
async function two() {
  console.log(2)
  const oneResponse = await one('hello')
  return oneResponse
}

// three is just silly
function three() {
  console.log(3)
  const result = two()
  return result
}

// four knows what it's doing
function four() {
  two().then((msg) => console.log(msg))
}

three()
four()
