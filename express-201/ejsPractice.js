const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))


function validateUser (req, res, next) {
  const rand = Math.random() * 1
  res.locals.validated = rand < 0.5
  next()
}

app.use(validateUser)

app.get('/', (req, res, next) => {
  // The data in the 2nd arg is going to be appended to res.locals
  res.render('index', {
    msg: 'Success',
    msg2: 'Failed',
    // HTML came from the DB and we want to render
    htmlMsg: `<p>html paragraph</p>`
  })
})

app.get('/home', (req, res, next) => {
  res.render('home')
})

app.get('/about', (req, res, next) => {
  res.render('about')
})

app.listen(3000)