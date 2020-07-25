const express = require('express')
const app = express()

// app obj has a few methods = HTTP verbs!
//  (mainly we use REST verbs)
// 1. get - READ
// - Default for all browsers get
// 2. post - CREATE
// 3. delete - DELETE
// 4. put - UPDATE
// - Update
// 5. all - I will accept any method

// They take 2 args
// 1. path
// 2. a callback to run if an HTTP request that matches THIS verb is made to the path in arg 1

app.get('/', (req, res) => {
  console.log(req)
  res.send(`<h1>HomePage GET</h1>`)
})

// This will never get run
// Once the response is sent, express doesn't give a shit
app.get('/', (req, res) => {
  console.log(req)
  res.send(`<h1>HomePage GET 2</h1>`)
})

app.post('/', (req, res) => {
  res.send(`<h1>HomePage POST</h1>`)
})

app.delete('/', (req, res) => {

})

app.put('/', (req, res) => {

})

app.listen(3000, () => console.log(`>>> Server is listening to port 3000`))