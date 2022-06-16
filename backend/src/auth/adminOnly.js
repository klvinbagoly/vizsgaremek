module.exports = (req, res, next) => {
  if (req.user.role < 3) return res.sendStatus(403)
  next()
}