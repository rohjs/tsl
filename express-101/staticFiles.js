const path = require('path')
const express = require('express')

const app = express()

// app comes with a use method
// app.use() → how you invoke most of the middlewares in express
// use takse 1 arg: the middleware you want to run
// and this middleware is going to be used everywhere

// Please just serve anything inside public directory statically (Yay!)
app.use(express.static('public'))

app.get('/', (req, res) => {
  // need to give ABSOLUTE PATH of the file you want to send
  // inside your server machine
  res.sendFile(path.join(__dirname, './index.html'))
})

// if the upper one matches, then this will not run
app.all('*', (req, res) => {
  res.send('<h1>404</h1>')
})

app.listen(3000, () => console.log(`>>> localhost: 3000`))