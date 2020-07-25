const http = require('http')

// 1. Create a server
//    http provides a method called: createServer
//      which takes 1 argument called RequestListner: (req, res) => void
//        - req: Request object from the client
//        - res: Response object from moi!
//        and this callback function is going to run whenever http request is made
//      and it returns http server instance
const server = http.createServer((req, res) => {
  console.log('Let\'s handle http request')
  // res: our way to respond to http request
  //      http message consists of
  //      * start line ← Nodejs will take care of it
  //      * header
  //      * body

  // First, we need to write header
  // res.writeHead takes 2 arguments: statusCode<number>, headers<OutgoingHttpHeaders>
  //   - headers obj should have Mime-type
  res.writeHead(200, {
    'content-type': 'text/html'
  })

  // Second, we need to write body
  // res.body: Send whatever body you want
  res.write([
    '<!DOCTYPE html>',
    '<html>',
    '<body>',
    '<h1>Hello World</h1>',
    '</body>',
    '</html>'
  ].join(''))

  // We need to tell server when finishing response
  res.end()
})

// 2. Start listening to a PORT
//    server has listen method
//      which has 1 argument called PORT: number (PORT > 1000)
//        - to listen for http traffic on
//        - meaning whenever a client tries to connect to the server via given PORT
//        - the server will listen to it and handle the request
//      whenever request hits the PORT, req, res objects will be created
//      connection is made,
//      and client will wait for the response from the server
server.listen(3000)


// bash
// curl -v localhost:3000