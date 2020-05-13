// DO NOT ABUSE SENDING API REQUESTS
const apiKey = `e9ddb24aed6d48c4342303aba5269e28`
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const imgUrl = `http://image.tmdb.org/t/p/w300/`
const castUrl = `https://api.themoviedb.org/3/movie`
const peopleUrl = `https://api.themoviedb.org/3/person`

// DOM elements
const searchForm = document.getElementById('search-form')
const searchInputs = Array.from(document.querySelectorAll('.search-input'))
const movieDisplay = document.getElementById('movies')

const getMovies = (title) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}${title}`)
      .then((res) => {
        resolve(res.data.results[0])
      })
      .catch((err) => reject(err))
  })
}

const getCast = (movie) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${castUrl}/${movie.id}/credits?api_key=${apiKey}`)
      .then((res) => resolve(res.data.cast[0]))
      .catch((err) => reject(err))
  })
}

const getPerson = (person) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${peopleUrl}/${person.id}?api_key=${apiKey}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}

const addMovieToDOM = async (movieTitle) => {
  if (!movieTitle) return

  const movie = await getMovies(movieTitle)
  const cast = await getCast(movie)
  const person = await getPerson(cast)

  if (person) {
    movieDisplay.innerHTML += `<img src="${imgUrl}${person.profile_path}" alt="" />`
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  movieDisplay.innerHTML = ''
  searchInputs.forEach((item) => addMovieToDOM(item.value))
})
