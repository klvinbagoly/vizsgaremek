const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const refreshTokenArray = []

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.sendStatus(404)

  const isValid = user.verifyPasswordSync(password)
  if (!isValid) return res.sendStatus(401)

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRY }
  )

  const refreshToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET
  )
  refreshTokenArray.push(refreshToken)

  return res.json({
    accessToken, refreshToken, user: { ...user._doc, password: '' }
  })
}

exports.refresh = (req, res, next) => {
  const { refreshToken } = req.body

  if (!refreshToken) return res.sendStatus(401)

  if (!refreshTokenArray.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    const { email, password } = user
    const accessToken = jwt.sign(
      { email, password },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY }
    )
    return res.json({ accessToken })
  })
}

exports.logout = (req, res, next) => {
  const { refreshToken } = req.body
  if (!refreshTokenArray.includes(refreshToken)) {
    return res.sendStatus(403)
  }

  const index = refreshTokenArray.indexOf(refreshToken)
  refreshTokenArray.splice(index, 1)

  return res.sendStatus(200)
}