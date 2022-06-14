const TopAlbums = require('../../models/topAlbums.model')

exports.findTopAlbumsByArtist = (artist) => TopAlbums.findOne({ '@attr.artist': artist })