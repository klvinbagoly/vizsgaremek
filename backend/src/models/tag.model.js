const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  total: Number,
  reach: Number,
  wiki: {
    summary: String,
    content: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Tag', TagSchema)