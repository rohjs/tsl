const path = require('path')

const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res, next) => {
  res.send(`Sanity check`)
})

app.get('/login', (req, res, next) => {
  res.render('login')
})

app.post('/process_login', (req, res, next) => {
  // req.body was made by urlencoded, which parses HTTP message to data
  const { username, password } = req.body
  // Check db credentials whether user data is valid
  // If they are valid,
  // 1. send username in a cookie (entiredly save on browser)
  // 2. and send them to welcome page

  if (password === 'x') {
    // res.cookie takes at least 2 arg
    // 1. name of the variable
    // 2. value to set it to
    res.cookie('username', username)
    // res.redirect takes 1 arg: where to redirect
    res.redirect('/welcome')
  } else {
    res.redirect('/login?msg=fail')
  }
})

app.get('/welcome', (req, res, next) => {
  // req.cookies object will have a property for every named cookie that has been set
  res.render('welcome', {
    username: req.cookies.username,
  })
})

app.get('/logout', (req, res) => {
  // res.clearCookie takes 1 arg:
  // 1. cookie to clear (by name)
  res.clearCookie('username')
  res.redirect('/login')
})

app.listen(3000, () => {
  console.log(`>>> Server listening on port 3000`)
})
