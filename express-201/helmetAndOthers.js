const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(helmet())
app.use(express.static('public'))

// Express itself does not create req.body
// Parse requests as JSON object and create req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/ajax', (req, res) => {
  const { name } = req.body
  console.log(name)
  // res.send(name)
  // res.send: default content-type of header is text/html
  // res.json(name)
  // res.json: it will change the content-type of header to application/json
  // Anytime you need to respond with json, use res.json() [xml-http client]
})

app.listen(3000)