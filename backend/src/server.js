const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

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

app.use('/artist', require('./controller/artist/artist.router'))




module.exports = app

