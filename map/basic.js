const keyFunction = () => {
  console.log('Hello World!\n')
}

// Create a Map
const myContacts = new Map()

// Set & Get methods
myContacts.set('Rob', '010-1234-5678')
myContacts.set(keyFunction, 'Whoa, I just used a function as a key')
const rob = myContacts.get('Rob')
const wow = myContacts.get(keyFunction)
console.log(rob)
console.log(wow)

// Size property
console.log(myContacts.size)

// Iterable
for (value of myContacts) {
  console.log(value)
}

// Clear the Map
// myContacts.clear()
// console.log(myContacts)

// Entries method (Entries are iterable)
console.log(myContacts.entries())
