const controlledGenerator = function* () {
  let i = 0
  let end = true

  while (end) {
    const dataFromNext = yield i++
    if (typeof dataFromNext === 'boolean' && !dataFromNext) {
      end = false
    }
  }
}

const gen = controlledGenerator()

gen.next()
gen.next()
gen.next()
gen.next()
gen.next()
gen.next(false)