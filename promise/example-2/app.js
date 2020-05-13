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

const getMovies = (movieTitle) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}${movieTitle}`)
      .then((res) => {
        resolve(res.data.results[0])
      })
      .catch((err) => reject(err))
  })
}

const getCast = (movieData) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${castUrl}/${movieData.id}/credits?api_key=${apiKey}`)
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

const getActor = (movieTitle) => {
  return new Promise((resolve, reject) => {
    const moviePromise = getMovies(movieTitle)

    moviePromise
      .then((movieData) => {
        return getCast(movieData)
      })
      .then((castData) => {
        return getPerson(castData)
      })
      .then((personInfo) => {
        resolve(personInfo)
      })
      .catch((err) => reject(err))
  })
}

const showPersonImage = (imageUrl) => {
  movieDisplay.innerHTML += `<img src="${imgUrl}${imageUrl}" alt="" />`
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  movieDisplay.innerHTML = ''

  const promises = searchInputs.map((item) => getActor(item.value))

  Promise.all(promises)
    .then((actors) => {
      actors.forEach((actor) => showPersonImage(actor.profile_path))
    })
    .catch((err) => console.log(err))
})
