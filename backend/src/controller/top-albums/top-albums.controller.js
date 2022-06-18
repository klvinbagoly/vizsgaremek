const topAlbumsService = require('./top-albums.service')

exports.findTopAlbumsByArtist = async (req, res, next) => {
  const topAlbums = await topAlbumsService.findTopAlbumsByArtist(req.params.artist)
  res.json(topAlbums)
}

exports.updateOneAlbum = async (req, res, next) => {
  try {
    const album = req.body
    const albumid = album._id
    const response = await topAlbumsService.updateOneAlbum(req.params.id, albumid, album)
    res.json(response)
  } catch (err) {
    res.status(501)
    res.json({ hasError: true, error: err.message })
  }
}

exports.addOneAlbum = async (req, res, next) => {
  try {
    const album = req.body
    const response = await topAlbumsService.addOneAlbum(req.params.id, album)
    res.json(response)
  } catch (err) {
    res.status(501)
    res.json({ hasError: true, error: err.message })
  }
}

exports.deleteOneAlbum = async (req, res, next) => {
  try {
    const response = await topAlbumsService.deleteOneAlbum(req.params.id, req.params.albumid)
    res.json(response)
  } catch (err) {
    res.status(501)
    res.json({ hasError: true, error: err.message })
  }
}