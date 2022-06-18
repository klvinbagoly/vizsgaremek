const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  total: Number,
  reach: Number,
  url: String,
  wiki: {
    summary: String,
    content: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Tag', TagSchema)