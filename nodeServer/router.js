const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(`A request was made from: ${req.url}`)

  if (req.url === '/') {
    const file = fs.readFileSync('./nodeServer/index.html')
    if (file) {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(file)
      res.end()
    }

    // Async way
    // fs.readFile('./nodeServer/index.html', 'utf-8', (err, file) => {
    //   if (file) {
    //     res.write(file)
    //     res.end()
    //   }
    // })

  } else if (req.url === '/avatar.jpg') {
    const image = fs.readFileSync('./nodeServer/avatar.jpg')
    if (image) {
      res.writeHead(200, { 'content-type': 'image/jpg' })
      res.write(image)
      res.end()
    }
  } else if (req.url === '/style.css') {
    const stylesheet = fs.readFileSync('./nodeServer/style.css')
    if (stylesheet) {
      res.writeHead(200, { 'content-type': 'text/css' })
      res.write(stylesheet)
      res.end()
    }
  } else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h4>404</h4>')
    res.end()
  }
})

server.listen(3000)