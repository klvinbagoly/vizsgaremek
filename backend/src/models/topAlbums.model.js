const mongoose = require('mongoose')

const TopAlbumSchema = mongoose.Schema({
  album: [
    {
      name: {
        type: String,
        required: true, index: true
      },
      playcount: String,
      mbid: String,
      url: String,
      artist: {
        name: String,
        mbid: String,
        url: String
      },
      image: [
        {
          url: String,
          size: String
        }
      ],


    }
  ],
  '@attr': {
    artist: {
      type: String,
      index: true
    },
    page: String,
    perPage: String,
    totalPages: String,
    total: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('TopAlbums', TopAlbumSchema)