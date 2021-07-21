const app = require('express')()
const faker = require('faker')
const fs = require('fs')
const PORT = 8080

const generateRandomUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress()
  }
}

app.get('/', (_, res) => {
  const html = fs.readFileSync('public/index.html').toString('utf-8')
  res.write(html)
})

app.get('/api/users', (_, res) => {
  const initialItems = [...Array(100)].map(() => generateRandomUser());
  res.json(initialItems)
})

app.listen(PORT)