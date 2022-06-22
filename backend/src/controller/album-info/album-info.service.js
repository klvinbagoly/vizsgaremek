const AlbumInfo = require('../../models/albumInfo.model')

exports.addTrack = (id, track) => AlbumInfo.updateOne(
  { _id: id },
  { $push: { 'tracks.track': track } }
)

exports.updateTrack = (id, track) => AlbumInfo.updateOne(
  { _id: id, 'tracks.track._id': track._id },
  { $set: { 'tracks.track.$': track } }
)