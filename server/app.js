const app = require('express')()
const faker = require('faker')
const fs = require('fs')
const PORT = 8080

// generate random for single user
const generateRandomUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress()
  }
}
// generate 1000 items to single array
const initialItems = [...Array(1000)].map(() => generateRandomUser());

app.get('/', (_, res) => {
  const html = fs.readFileSync('public/index.html').toString('utf-8')
  res.write(html)
  res.end()
})

app.get('/api/users', (req, res) => {
  const query = req.query.q

  if (!query) {
    return res.json(initialItems)
  }

  const filteredUsers = initialItems.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
  return res.json(filteredUsers)
})

app.listen(PORT)