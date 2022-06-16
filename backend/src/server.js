const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const login = require('./auth/login')

const app = express()

if (!config.has('database')) {
  throw new Error('No config database found!')
}

const { username, host, password } = config.get('database')

mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  // .then(() => require('./seed/seeder'))
  .then(() => console.log('MongoDB connection has been established successfully.'))
  .catch(err => {
    throw new Error(err)
  })

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/login', login.login)
app.post('/refresh', login.refresh)
app.post('/logout', login.logout)

app.use('/artist', require('./controller/artist/artist.router'))
app.use('/artistInfo', require('./controller/artist-info/artist-info.router'))
app.use('/albums', require('./controller/top-albums/top-albums.router'))
app.use('/albumInfo', require('./controller/album-info/album-info.router'))
app.use('/tags', require('./controller/tag/tag.router'))




module.exports = app

