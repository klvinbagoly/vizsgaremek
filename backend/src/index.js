const app = require('./server')
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening at http://localhost:3000/${port}`)
})