const mongoose = require('mongoose')

const ArtistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  playcount: String,
  listeners: String,
  mbid: String,
  url: String,
  streamable: String,
  image: {
    type: Array,
    items: {
      url: String,
      size: String
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Artist', ArtistSchema)