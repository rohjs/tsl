const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie'`,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
})

export default axiosInstance
