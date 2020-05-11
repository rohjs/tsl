const one = () => {
  console.log(111111)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Done!')
      resolve('2 seconds have passed')
    }, 2000)
  })
}

const two = () => {
  console.log(222222)
  const oneResponse = one()
  console.log(oneResponse)
}

const three = async () => {
  console.log(333333)
  const oneResponse = await one()
  console.log(oneResponse)
}

two()
three()

console.log('Last line of the code')
