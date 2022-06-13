const fsp = require('fs').promises
const { join } = require('path')
const mongoose = require('mongoose')
const ArtistModel = require('../models/artist.model')
const ArtistInfoModel = require('../models/artistInfo.model')
const TopAlbumModel = require('../models/topAlbums.model')
const AlbumInfoModel = require('../models/albumInfo.model')
const TagModel = require('../models/tag.model')
const artists = require('../../../frontend/temp/artists.json').artist
const artistInfo = require('../../../frontend/temp/artistInfo.json').artistInfo
const topAlbums = require('../../../frontend/temp/albums.json').albums
const albumInfo = require('../../../frontend/temp/albumInfo.json').albumInfo
const tagInfo = require('../../../frontend/temp/tagInfo.json').tags

mongoose.connection.dropDatabase();

(async () => {
  await ArtistModel.insertMany(artists);
  await ArtistInfoModel.insertMany(artistInfo)
  await TopAlbumModel.insertMany(topAlbums)
  await AlbumInfoModel.insertMany(albumInfo)
  await TagModel.insertMany(tagInfo)
  console.log('Database seeded!')
})()