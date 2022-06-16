const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const header = req.headers.authentication
  if (!header) return res.sendStatus(401)

  const token = header.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })
}