const mongoose = require('mongoose')

const AlbumInfoSchema = mongoose.Schema({
  artist: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  mbid: String,
  tags: {
    tag: [
      {
        url: String,
        name: String
      }
    ]
  },
  image: [
    {
      url: String,
      size: String
    }
  ],
  tracks: {
    track: [
      {
        streamable: {
          fulltrack: String
        },
        duration: Number,
        url: String,
        name: String,
        '@attr': {
          rank: String
        },
        artist: {
          url: String,
          name: String,
          mbid: String
        }
      }
    ]
  },
  listeners: String,
  playcount: String,
  url: String,
  wiki: {
    published: String,
    summary: String,
    content: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('AlbumInfo', AlbumInfoSchema)