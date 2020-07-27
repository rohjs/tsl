const path = require('path')

const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// key - value (Settings)
// app.set(name, value)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))

// 1. Express happens.
// 2. We define a VIEW ENGINE
// - ejs, mustache, handlebars, jade/pug
// 3. Inside one of our routes, we have a res.render
// 4. We pass that res.render 2 things
// - the FILE we want to use
// - the DATA we want to send: so that template engine can fill out the missing data
// 5. Express uses the node module(=view engine) and parses the file
// - that means, it takes HTML, CSS, JS  and combines it with whatever 'node' there is in the file
// 6. The final result of this process is a compiled product of the things the browser can read (HTML, CSS, JS)

app.get('/', (req, res, next) => {
  res.render('index', { msg: 'hello' })
  // it will going to look for index.ejs
})

app.listen(3000)