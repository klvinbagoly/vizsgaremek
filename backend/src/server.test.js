const config = require('config')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('./server')
const AlbumInfoModel = require('./models/albumInfo.model')
const ArtistModel = require('./models/artist.model')
const ArtistInfoModel = require('./models/artistInfo.model')
const TagModel = require('./models/tag.model')
const UserModel = require('./models/user.model')

beforeEach(done => {
  const { username, password, host } = config.get('database')
  mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(async () => {
      console.log('Test running')
      const user = new UserModel({ "name": "Kristin Jzak", "email": "kjzak1@chronoengine.com", "password": "pass123", "role": 3 })
      await user.save()
      supertest(app).post('/login').set('Content-Type', 'application/json').send(user).end((err, response) => {
        console.log(response.body)
        done()
      })
    })
    .catch(err => {
      console.error(err)
      process.exit()
    })
})


afterEach(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

describe('/artist path', () => {
  const insertData = [
    { name: 'Michael Jackson' },
    { name: 'Nirvana' },
  ]

  beforeEach(() => {
    console.log('First describe block started')
    return ArtistModel.insertMany(insertData).then(() => console.log('TestDB seeded'))
  })
  afterEach(() => mongoose.connection.dropCollection('artists'))

  test('GET /artists', done => {
    supertest(app).get('/artist').expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        done()
      }).catch(err => console.error(err))
  })
})