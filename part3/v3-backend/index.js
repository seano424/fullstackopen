const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => {
  const max = Math.max(...persons.map((p) => p.id))
  return max + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
  const information = `Phonebook has info for ${persons.length} people`
  response.send(`<div><h1>${information}</h1><p>${new Date()}</p></div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const person = persons.find((p) => p.id === id)
  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = [...persons, person]

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter((person) => person.id !== id)
  response.status(404).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
