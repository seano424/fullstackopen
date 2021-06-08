const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('http://localhost:3001/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})
