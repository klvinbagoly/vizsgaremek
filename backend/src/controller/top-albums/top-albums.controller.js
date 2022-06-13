const topAlbumsService = require('./top-albums.service')

exports.findTopAlbumsByArtist = async (req, res, next) => {
  const topAlbums = await topAlbumsService.findTopAlbumsByArtist(req.params.artist)
  res.json(topAlbums)
}