const TopAlbums = require('../../models/topAlbums.model')

exports.findTopAlbumsByArtist = (artist) => TopAlbums.find({ '@attr.artist': artist })