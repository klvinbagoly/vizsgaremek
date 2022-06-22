const albumInfoService = require('./album-info.service')

exports.addTrack = async (req, res, next) => {
  try {
    const update = await albumInfoService.addTrack(req.params.id, req.body)
    res.json(update)
  } catch (err) {
    res.status(501)
    res.json({ hasError: true, error: err.message })
  }
}

exports.updateTrack = async (req, res, next) => {
  try {
    const update = await albumInfoService.updateTrack(req.params.id, req.body)
    res.json(update)
  } catch (err) {
    res.status(501)
    res.json({ hasError: true, error: err.message })
  }
}