const express = require('express')
const app = express()

// Express = 2 things
// 1. Router
// 2. Series of middlewares that comprises a web framework

// Req ----MIDDLEWARE---> Res
// Hijack the process in between Req and Res, which means we do something before we send out response object
// Middlewares are all the things that happens in between the actual NETWORKING stuffs

// In Express specifically: Middleware function is ANY function that has access to req, res, next object

// e.g.
// Req ----MIDDLEWARE---> Res
// 1. A request comes in
// 2. [MID] We need to validate the user, sometimes
// 3. [MID] We need to store some data into the DB
// 4. [MID] If there is data from the user, we need to parse and store it.
// 5. Respond

function validateUser(req, res, next) {
  // req, res, next makes MIDDLEWARE
  // Get info out of the request object
  // Do some stuffs with the DB
  // res.locals: it will live in the response object for the life ot the very response
  // so that every middleware can access to it
  res.locals.validated = true
  console.log(`VALIDATED`)
  next()
  // If there is no next method being called
  // Then the whole process of middleware is over and there won't be any other middleware to run
}

// OUTSOURCING a single function to middleware
app.use(validateUser)
// This will run ALL paths, all methods!

app.get('/', validateUser)
// Restricts using the middleware to GET request of '/'
// === EXACTLY THE SAME WITH
// app.get('/', (req, res, next) => {
//   res.locals.validated = true
//   console.log(`VALIDATED`)
//   next()
// })
app.use('/admin', validateUser)
// Restricts using the middleware to all HTTP request of '/admin'

// I want to validateUser in application level
// So every time when HTTP request is made,this middleware will run

app.get('/', (req, res, next) => {
  // The callback passed here is actually a middleware
  // The very last middleware to run before it sends response and close the request-response cycle
  res.send(`<h1>Main Page</h1>`)
  console.log(res.locals.validated)
})

app.get('/admin', (req, res) => {
  res.send(`<h1>Admin Page</h1>`)
})

app.listen(3000)