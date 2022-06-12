const mongoose = require('mongoose')

const ArtistInfoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  url: String,
  image: {
    type: Array,
    items: {
      url: String,
      size: String
    }
  },
  streamable: String,
  ontour: String,
  stats: {
    listeners: String,
    playcount: String
  },
  similar: {
    artist: {
      type: Array,
      items: {
        name: {
          type: String,
          required: true
        },
        url: String,
        image: {
          type: Array,
          items: {
            url: String,
            size: String
          }
        }
      }
    }
  },
  tags: {
    tag: {
      type: Array,
      items: {
        name: String,
        url: String
      }
    }
  },
  bio: {
    links: {
      link: {
        rel: String,
        href: String
      }
    },
    published: String,
    summary: String,
    content: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ArtistInfo', ArtistInfoSchema)