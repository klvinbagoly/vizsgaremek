const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const { join } = require('path')

const login = require('./auth/login')
const authentication = require('./auth/authenticate')

const swaggerDoc = YAML.load(join(__dirname, '../docs/swagger.yaml'))
console.log(swaggerDoc)

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

app.use('/artist', authentication, require('./controller/artist/artist.router'))
app.use('/artistInfo', authentication, require('./controller/artist-info/artist-info.router'))
app.use('/albums', authentication, require('./controller/top-albums/top-albums.router'))
app.use('/albumInfo', authentication, require('./controller/album-info/album-info.router'))
app.use('/tags', authentication, require('./controller/tag/tag.router'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))




module.exports = app

