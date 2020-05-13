const fs = require('fs')
const baseUrl = `./data`

const countGotYa = (data) => {
  const matches = [...data.matchAll(/gotYa/g)]
  return matches.length
}

fs.readdir(baseUrl, (err, files) => {
  if (err) throw err

  const outcome = {}
  const promiseArr = files.map((file) => {
    return new Promise((resolve, reject) => {
      const filePath = `${baseUrl}/${file}`

      fs.readFile(filePath, (err, data) => {
        if (err) reject(err)

        const response = [filePath, String(data)]
        resolve(response)
      })
    })
  })

  Promise.all(promiseArr).then((promiseDataArr) => {
    promiseDataArr.forEach((promiseData) => {
      const [key, value] = promiseData
      outcome[key] = countGotYa(value)
    })

    console.log(outcome)
  })

  Promise.race(promiseArr).then((promiseData) => {
    console.log(promiseData[0])
  })
})
