const express = require('express')
const app = express()

// all: all is a method and it takes 2 args
// 1. route
// 2. callback to run if the route is requested
app.all('*', (req, res) => {
  // Express handles the basic headers (no more statusCode, res.writeHead())
  // 여기서 무슨 일이 일어나는 지 생각만 하면 됌
  res.send(`<h1>This is the HomePage</h1>`)
  // Express handles the end (no more res.end())
})

app.listen(3000, () => {
  console.log('>>>> The server is listening on port 3000...')
})