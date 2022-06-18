const TopAlbums = require('../../models/topAlbums.model')

exports.findTopAlbumsByArtist = (artist) => TopAlbums.findOne({ '@attr.artist': artist })

exports.updateOneAlbum = (id, albumid, data) => TopAlbums.updateOne(
  { _id: id, 'album._id': albumid },
  { $set: { 'album.$': data } }
)

exports.addOneAlbum = (id, data) => TopAlbums.updateOne(
  { _id: id },
  { $push: { album: data } }
)