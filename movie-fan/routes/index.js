const express = require('express')
const router = express.Router()

const axios = require('../apis/axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  axios
    .get('/search/movie', {
      params: {
        query: `Lord`,
      },
    })
    .then((res) => console.log(111, res))
    .catch((err) => console.log(222, err))
  res.render('index', { title: 'Express' })
})

module.exports = router
