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