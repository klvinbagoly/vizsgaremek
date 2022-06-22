// To run all tests, turn off authentication for all paths in server.js, rows 41-45.
// Sometimes tests may break due to MongoDB Server error.
require('dotenv').config()

const config = require('config')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('./server')
const AlbumInfoModel = require('./models/albumInfo.model')
const ArtistModel = require('./models/artist.model')
const ArtistInfoModel = require('./models/artistInfo.model')
const TagModel = require('./models/tag.model')
const UserModel = require('./models/user.model')
let token

beforeEach(done => {
  const { username, password, host } = config.get('database')
  mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(async () => {
      const user = new UserModel({ "name": "Kristin Jzak", "email": "kjzak1@chronoengine.com", "password": "pass123", "role": 3 })
      await user.save().then(() => {
        return supertest(app)
          .post('/login')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ "email": "kjzak1@chronoengine.com", "password": "pass123" })
          .expect(200)
          .then((response) => {
            token = response.body.accessToken
            done()
          })
      }).catch(err => console.log(err))
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
  let firstPostId

  beforeEach(() => {
    return ArtistModel.insertMany(insertData).then((artists) => firstPostId = artists[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('artists'))

  test('GET /artist', done => {
    supertest(app).get('/artist').set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((artist, index) => {
          expect(artist.name).toBe(insertData[index].name)
        })
        done()
      }).catch(err => console.error(err))
  })

  test('GET /artist/:id', done => {
    supertest(app).get(`/artist/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        const artist = response.body
        expect(artist.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

  test('GET /artist/name/:name', done => {
    const name = 'Nirvana'
    supertest(app).get(`/artist/name/${name}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(response.body.name).toBe(name)
        done()
      }).catch(err => console.error(err))
  })

  test('POST /artist', done => {
    const newArtist = { name: 'Björk' }
    supertest(app).post('/artist')
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(newArtist)
      .expect(201)
      .then(response => {
        expect(response.body.name).toBe(newArtist.name)
      })
      .then(() => supertest(app)
        .get('/artist')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body.length).toBe(3)
          expect(response.body[2].name).toBe(newArtist.name)
          done()
        })).catch(err => console.error(err))
  })

  test('PUT /artist/:id', done => {
    const update = { _id: firstPostId, name: 'Rihanna' }
    supertest(app).put(`/artist/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(update)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe(update.name)
      })
      .then(() => supertest(app)
        .get('/artist')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body[0].name).toBe(update.name)
          done()
        })
      ).catch(err => console.error(err))
  })

  test('DELETE /artist/:id', done => {
    supertest(app).delete(`/artist/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        supertest(app).get('/artist')
          .set('Authentication', 'Bearer ' + token).then(response => {
            expect(response.body.length).toBe(1)
            expect(response.body[0].name).toBe(insertData[1].name)
            done()
          })
      }).catch(err => console.error(err))
  })
})

describe('/artistInfo path', () => {
  const insertData = [
    { name: 'Michael Jackson', tags: { tag: [{ name: 'pop' }] } },
    { name: 'Nirvana', tags: { tag: [{ name: 'rock' }] } },
  ]
  let firstPostId

  beforeEach(() => {
    return ArtistInfoModel.insertMany(insertData).then((artists) => firstPostId = artists[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('artistinfos'))

  test('GET /artistInfo', done => {
    supertest(app).get('/artistInfo').set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((artist, index) => {
          expect(artist.name).toBe(insertData[index].name)
        })
        done()
      }).catch(err => console.error(err))
  })

  test('GET /artistInfo/:id', done => {
    supertest(app).get(`/artistInfo/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        const artist = response.body
        expect(artist.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

  test('GET /artistInfo/name/:name', done => {
    const name = 'Nirvana'
    supertest(app).get(`/artistInfo/name/${name}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(response.body.name).toBe(name)
        done()
      }).catch(err => console.error(err))
  })

  test('POST /artistInfo', done => {
    const newArtist = { name: 'Björk' }
    supertest(app).post('/artistInfo')
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(newArtist)
      .expect(201)
      .then(response => {
        expect(response.body.name).toBe(newArtist.name)
      })
      .then(() => supertest(app)
        .get('/artistInfo')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body.length).toBe(3)
          expect(response.body[2].name).toBe(newArtist.name)
          done()
        })).catch(err => console.error(err))
  })

  test('PUT /artistInfo/:id', done => {
    const update = { _id: firstPostId, name: 'Rihanna', tags: { tag: ['pop'] } }
    supertest(app).put(`/artistInfo/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(update)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe(update.name)
      })
      .then(() => supertest(app)
        .get('/artistInfo')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body[0].name).toBe(update.name)
          done()
        })
      ).catch(err => console.error(err))
  })

  test('DELETE /artistInfo/:id', done => {
    supertest(app).delete(`/artistInfo/${firstPostId}`).expect(200)
      .set('Authentication', 'Bearer ' + token)
      .then(response => {
        supertest(app).get('/artistInfo')
          .set('Authentication', 'Bearer ' + token).then(response => {
            expect(response.body.length).toBe(1)
            expect(response.body[0].name).toBe(insertData[1].name)
            done()
          })
      }).catch(err => console.error(err))
  })

  test('POST /artistInfo/:id/tag', done => {
    const NEW_TAG = { name: 'dance' }
    supertest(app).post(`/artistInfo/${firstPostId}/tag`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(NEW_TAG)
      .expect(200)
      .then(() => {
        supertest(app).get('/artistInfo')
          .set('Authentication', 'Bearer ' + token).then(response => {
            const firstArtist = response.body[0]
            expect(firstArtist.tags.tag.length).toBe(2)
            expect(firstArtist.tags.tag[1]).toEqual(NEW_TAG)
            done()
          })
      }).catch(err => console.error(err))
  })
})

describe('/albumInfo path', () => {
  const insertData = [
    { artist: 'Michael Jackson', name: 'Thriller', tags: { tag: [{ name: 'pop' }] } },
    { artist: 'Nirvana', name: 'Nevermind', tags: { tag: [{ name: 'rock' }] } },
  ]
  let firstPostId

  beforeEach(() => {
    return AlbumInfoModel.insertMany(insertData).then((albums) => firstPostId = albums[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('albuminfos'))

  test('GET /albumInfo', done => {
    supertest(app).get('/albumInfo').set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((album, index) => {
          expect(album.name).toBe(insertData[index].name)
          expect(album.artist).toBe(insertData[index].artist)
        })
        done()
      }).catch(err => console.error(err))
  })

  test('GET /albumInfo/:id', done => {
    supertest(app).get(`/albumInfo/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        const album = response.body
        expect(album.name).toBe(insertData[0].name)
        expect(album.artist).toBe(insertData[0].artist)
        done()
      }).catch(err => console.error(err))
  })

  test('GET /albumInfo/name/:name', done => {
    const name = 'Nevermind'
    supertest(app).get(`/albumInfo/name/${name}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(response.body.name).toBe(name)
        done()
      }).catch(err => console.error(err))
  })

  test('POST /albumInfo', done => {
    const newAlbum = { artist: 'Björk', name: 'Homogenic' }
    supertest(app).post('/albumInfo')
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(newAlbum)
      .expect(201)
      .then(response => {
        expect(response.body.name).toBe(newAlbum.name)
        expect(response.body.artist).toBe(newAlbum.artist)
      })
      .then(() => supertest(app)
        .get('/albumInfo')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body.length).toBe(3)
          expect(response.body[2].name).toBe(newAlbum.name)
          expect(response.body[2].artist).toBe(newAlbum.artist)
          done()
        })).catch(err => console.error(err))
  })

  test('PUT /albumInfo/:id', done => {
    const update = { _id: firstPostId, artist: 'Michael Jackson', name: 'Bad', tags: { tag: [{ name: 'pop' }] } }
    supertest(app).put(`/albumInfo/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(update)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe(update.name)
      })
      .then(() => supertest(app)
        .get('/albumInfo')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body[0].name).toBe(update.name)
          done()
        })
      ).catch(err => console.error(err))
  })

  test('DELETE /albumInfo/:id', done => {
    supertest(app).delete(`/albumInfo/${firstPostId}`).expect(200)
      .set('Authentication', 'Bearer ' + token)
      .then(response => {
        supertest(app).get('/albumInfo')
          .set('Authentication', 'Bearer ' + token).then(response => {
            expect(response.body.length).toBe(1)
            expect(response.body[0].name).toBe(insertData[1].name)
            done()
          })
      }).catch(err => console.error(err))
  })

  test('POST /albumInfo/:id/tag', done => {
    const NEW_TAG = { name: 'dance' }
    supertest(app).post(`/albumInfo/${firstPostId}/tag`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(NEW_TAG)
      .expect(200)
      .then(() => {
        supertest(app).get('/albumInfo')
          .set('Authentication', 'Bearer ' + token).then(response => {
            const firstAlbum = response.body[0]
            expect(firstAlbum.tags.tag.length).toBe(2)
            expect(firstAlbum.tags.tag[1].name).toEqual(NEW_TAG.name)
            done()
          })
      }).catch(err => console.error(err))
  })
})

describe('/tags path', () => {
  const insertData = [
    { name: 'pop' },
    { name: 'rock' },
  ]
  let firstPostId

  beforeEach(() => {
    return TagModel.insertMany(insertData).then((tags) => firstPostId = tags[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('tags'))

  test('GET /tags', done => {
    supertest(app).get('/tags').set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((tag, index) => {
          expect(tag.name).toBe(insertData[index].name)
        })
        done()
      }).catch(err => console.error(err))
  })

  test('GET /tags/:id', done => {
    supertest(app).get(`/tags/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        const tag = response.body
        expect(tag.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

  test('GET /tags/name/:name', done => {
    const name = 'pop'
    supertest(app).get(`/tags/name/${name}`)
      .set('Authentication', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(response.body.name).toBe(name)
        done()
      }).catch(err => console.error(err))
  })

  test('POST /tags', done => {
    const newTag = { name: 'progressive rock' }
    supertest(app).post('/tags')
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(newTag)
      .expect(201)
      .then(response => {
        expect(response.body.name).toBe(newTag.name)
      })
      .then(() => supertest(app)
        .get('/tags')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body.length).toBe(3)
          expect(response.body[2].name).toBe(newTag.name)
          done()
        })).catch(err => console.error(err))
  })

  test('PUT /tags/:id', done => {
    const update = { _id: firstPostId, name: 'indie rock' }
    supertest(app).put(`/tags/${firstPostId}`)
      .set('Authentication', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(update)
      .expect(200)
      .then(response => {
        expect(response.body.name).toBe(update.name)
      })
      .then(() => supertest(app)
        .get('/tags')
        .set('Authentication', 'Bearer ' + token)
        .then(response => {
          expect(response.body[0].name).toBe(update.name)
          done()
        })
      ).catch(err => console.error(err))
  })

  test('DELETE /tags/:id', done => {
    supertest(app).delete(`/tags/${firstPostId}`).expect(200)
      .set('Authentication', 'Bearer ' + token)
      .then(response => {
        supertest(app).get('/tags')
          .set('Authentication', 'Bearer ' + token).then(response => {
            expect(response.body.length).toBe(1)
            expect(response.body[0].name).toBe(insertData[1].name)
            done()
          })
      }).catch(err => console.error(err))
  })
})
