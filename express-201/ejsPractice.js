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

app.get('/', (req, res, next) => {
  res.render('index', { msg: 'hello' })
})

app.listen(3000)